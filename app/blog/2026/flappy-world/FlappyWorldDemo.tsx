"use client";

/**
 * Flappy World — a playable "dream".
 *
 * Runs the frozen World Models (Ha) V / M / C stack entirely in the browser with
 * onnxruntime-web. There is no game engine here: every frame is *hallucinated* by
 * the VAE decoder from a latent the MDN-RNN imagines, exactly like
 * `src/flappy_world/ha/dream.py`'s human mode. Each tick:
 *
 *   z_t  --VAE decoder-->  the frame you see
 *   a_t  =  SPACE this frame ? flap : Controller(z_t, h_t)   (you can override the AI)
 *   (mus, sigmas, logpi), (h_{t+1}, c_{t+1})  =  MDRNN(a_t, z_t, h_t, c_t)
 *   z_{t+1}  =  the GMM's mode (deterministic dream, matching the config)
 *
 * The controller flies on its own; pressing SPACE forces a flap that frame, so you
 * and the policy share the stick inside the model's imagination. When the MDRNN's
 * own predicted crash probability crosses the threshold, the dream ends and a new
 * one is seeded.
 */

import { useEffect, useRef, useState } from "react";

// Shapes come from meta.json (fetched at runtime), but these are the trained values.
type Meta = {
  frame_height: number;
  frame_width: number;
  img_channels: number;
  latent_size: number;
  hidden_size: number;
  action_dim: number;
  gaussians: number;
};

// Match src/flappy_world/ha/config.yaml (dream section): decode the GMM *mode*
// (no sampling noise) for the steadiest, cleanest dream. p(crash) past the
// threshold ends the episode, but only after a grace period while the LSTM's
// memory warms up from the seed frame.
const DETERMINISTIC = true;
const TEMPERATURE = 1.0;
const DONE_THRESHOLD = 0.01;
const GRACE_STEPS = 45;
const FPS = 30; // target rate; wasm fallback just runs as fast as it can
const DISPLAY_SCALE = 3;

const FLAP = 1;
const NOOP = 0;

function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

function argmax(a: ArrayLike<number>) {
  let best = 0;
  for (let i = 1; i < a.length; i++) if (a[i] > a[best]) best = i;
  return best;
}

// Standard normal via Box–Muller, for the (optional) stochastic dream.
function gauss() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export default function FlappyWorldDemo({ basePath }: { basePath: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const flapRef = useRef(false); // a queued human flap, consumed next step
  const runningRef = useRef(false);

  const [status, setStatus] = useState<"loading" | "running" | "error">(
    "loading"
  );
  const [backend, setBackend] = useState<"webgpu" | "wasm" | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [steps, setSteps] = useState(0);
  const [best, setBest] = useState(0);
  const [crashed, setCrashed] = useState(false);
  const [youFlapped, setYouFlapped] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // Handles created inside init(); released on cleanup.
    let decoder: any = null;
    let mdrnn: any = null;
    let controller: any = null;
    let ort: any = null;

    const modelsPath = `${basePath}/models`;

    async function init() {
      // Dynamic import keeps onnxruntime-web out of SSR/prerender (it needs a
      // browser). The webgpu build runs the conv-heavy VAE decoder on the GPU —
      // the same idea deeplearn.js used for the original worldmodels.github.io
      // demos, and the reason those feel instant. Glue (.jsep.mjs) + binary
      // (.jsep.wasm) load from public/ort at wasmPaths; unsupported ops fall
      // back to wasm within that same build (no COOP/COEP needed).
      //
      // We pick the build by capability instead of loading the heavy 26 MB
      // WebGPU/JSEP module everywhere: browsers without navigator.gpu load the
      // plain wasm build. This also keeps the fallback clean — a failed GPU
      // init poisons its own wasm module, so we recover by importing the
      // separate plain-wasm build fresh rather than reusing the dead one.
      const meta: Meta = await fetch(`${modelsPath}/meta.json`).then((r) =>
        r.json()
      );
      const seeds: number[][] = await fetch(`${modelsPath}/seeds.json`)
        .then((r) => r.json())
        .catch(() => []); // fall back to a zero seed if unavailable

      const urls = [
        `${modelsPath}/vae_decoder.onnx`,
        `${modelsPath}/mdrnn.onnx`,
        `${modelsPath}/controller.onnx`,
      ];
      const create = (eps: string[]) =>
        Promise.all(
          urls.map((u) =>
            ort.InferenceSession.create(u, {
              executionProviders: eps,
              graphOptimizationLevel: "all",
            })
          )
        );

      async function loadWasm() {
        ort = await import("onnxruntime-web/wasm");
        ort.env.wasm.wasmPaths = "/ort/";
        ort.env.wasm.numThreads = 1;
        return create(["wasm"]);
      }

      const wantGpu = typeof navigator !== "undefined" && "gpu" in navigator;
      let usedBackend: "webgpu" | "wasm" = "wasm";
      if (wantGpu) {
        try {
          ort = await import("onnxruntime-web/webgpu");
          ort.env.wasm.wasmPaths = "/ort/";
          ort.env.wasm.numThreads = 1;
          [decoder, mdrnn, controller] = await create(["webgpu"]);
          usedBackend = "webgpu";
        } catch (e) {
          console.warn("WebGPU init failed, falling back to wasm:", e);
          [decoder, mdrnn, controller] = await loadWasm();
        }
      } else {
        [decoder, mdrnn, controller] = await loadWasm();
      }
      if (cancelled) return;
      setBackend(usedBackend);

      const L = meta.latent_size;
      const Hd = meta.hidden_size;
      const A = meta.action_dim;
      const G = meta.gaussians;
      const H = meta.frame_height;
      const W = meta.frame_width;
      const HW = H * W;

      // --- Canvas: an offscreen native-res frame, upscaled onto the visible one.
      const canvas = canvasRef.current!;
      canvas.width = W * DISPLAY_SCALE;
      canvas.height = H * DISPLAY_SCALE;
      const ctx = canvas.getContext("2d")!;
      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const octx = off.getContext("2d")!;
      const imgData = octx.createImageData(W, H);

      function drawFrame(data: Float32Array) {
        const px = imgData.data;
        for (let p = 0; p < HW; p++) {
          const o = p << 2;
          px[o] = Math.max(0, Math.min(255, data[p] * 255)); // R plane
          px[o + 1] = Math.max(0, Math.min(255, data[HW + p] * 255)); // G plane
          px[o + 2] = Math.max(0, Math.min(255, data[2 * HW + p] * 255)); // B plane
          px[o + 3] = 255;
        }
        octx.putImageData(imgData, 0, 0);
        ctx.drawImage(off, 0, 0, W, H, 0, 0, canvas.width, canvas.height);
      }

      // --- Dream state: latent + LSTM memory (h, c).
      let z = new Float32Array(L);
      let h = new Float32Array(Hd);
      let c = new Float32Array(Hd);
      let step = 0;

      function seedDream() {
        // Start from a real encoded frame (precomputed in Python), zero memory —
        // exactly what dream.py's seed_dream returns. Zeros if seeds missing.
        z = seeds.length
          ? Float32Array.from(seeds[(Math.random() * seeds.length) | 0])
          : new Float32Array(L);
        h = new Float32Array(Hd);
        c = new Float32Array(Hd);
        step = 0;
      }

      function nextLatent(
        mus: Float32Array,
        sigmas: Float32Array,
        logpi: Float32Array
      ) {
        // Deterministic: decode the highest-weight component's mean (no noise).
        if (DETERMINISTIC) {
          const k = argmax(logpi);
          const out = new Float32Array(L);
          for (let i = 0; i < L; i++) out[i] = mus[k * L + i];
          return out;
        }
        // Stochastic: temperature-scaled mixture sample (World Models dream knob).
        const tau = TEMPERATURE;
        const logits = new Float32Array(G);
        for (let g = 0; g < G; g++) logits[g] = logpi[g] / tau;
        const m = Math.max(...logits);
        let sum = 0;
        for (let g = 0; g < G; g++) {
          logits[g] = Math.exp(logits[g] - m);
          sum += logits[g];
        }
        let r = Math.random() * sum;
        let k = 0;
        for (; k < G - 1; k++) {
          r -= logits[k];
          if (r <= 0) break;
        }
        const out = new Float32Array(L);
        const sscale = Math.sqrt(tau);
        for (let i = 0; i < L; i++) {
          out[i] = mus[k * L + i] + sigmas[k * L + i] * sscale * gauss();
        }
        return out;
      }

      const t = (buf: Float32Array, dims: number[]) =>
        new ort.Tensor("float32", buf, dims);

      async function stepOnce() {
        // 1. Render what the model currently imagines.
        const dec = await decoder.run({ z: t(z, [1, L]) });
        drawFrame(dec.frame.data as Float32Array);

        // 2. Controller's action from (z, h) — unless you flap this frame.
        const cout = await controller.run({ z: t(z, [1, L]), h: t(h, [1, Hd]) });
        const aiAction = argmax(cout.logits.data as Float32Array);
        const human = flapRef.current;
        flapRef.current = false;
        const action = human ? FLAP : aiAction;

        // 3. MDRNN folds (a, z) into memory and predicts the next-latent GMM.
        const aOneHot = new Float32Array(A);
        aOneHot[action] = 1; // F.one_hot(action, action_dim)
        const m = await mdrnn.run({
          a: t(aOneHot, [1, A]),
          z: t(z, [1, L]),
          h: t(h, [1, Hd]),
          c: t(c, [1, Hd]),
        });
        const doneProb = sigmoid((m.done.data as Float32Array)[0]);

        // 4. Advance: next memory, next latent.
        h = m.nh.data as Float32Array;
        c = m.nc.data as Float32Array;
        z = nextLatent(
          m.mus.data as Float32Array,
          m.sigmas.data as Float32Array,
          m.logpi.data as Float32Array
        );
        step++;

        if (!cancelled) {
          setSteps(step);
          setBest((b) => (step > b ? step : b));
          if (human) {
            setYouFlapped(true);
            setTimeout(() => !cancelled && setYouFlapped(false), 150);
          }
        }

        // The model dreams a crash -> end this episode, seed a fresh one.
        return doneProb > DONE_THRESHOLD && step > GRACE_STEPS;
      }

      // --- Main loop: paced to FPS, never overlapping async runs.
      const frameMs = 1000 / FPS;
      seedDream();
      setStatus("running");
      runningRef.current = true;

      while (runningRef.current && !cancelled) {
        const t0 = performance.now();
        let dreamCrashed = false;
        try {
          dreamCrashed = await stepOnce();
        } catch (e) {
          if (!cancelled) {
            setErrorMsg(String(e));
            setStatus("error");
          }
          break;
        }
        if (dreamCrashed) {
          if (!cancelled) setCrashed(true);
          await new Promise((r) => setTimeout(r, 1300));
          if (cancelled || !runningRef.current) break;
          seedDream();
          if (!cancelled) {
            setCrashed(false);
            setSteps(0);
          }
          continue;
        }
        const dt = performance.now() - t0;
        if (dt < frameMs)
          await new Promise((r) => setTimeout(r, frameMs - dt));
      }
    }

    // --- Input: SPACE / ArrowUp / tap queues a flap for the next step.
    function onKey(e: KeyboardEvent) {
      if (e.code === "Space" || e.code === "ArrowUp" || e.key === " ") {
        e.preventDefault();
        flapRef.current = true;
      }
    }
    window.addEventListener("keydown", onKey);

    init().catch((e) => {
      if (!cancelled) {
        setErrorMsg(String(e));
        setStatus("error");
      }
    });

    return () => {
      cancelled = true;
      runningRef.current = false;
      window.removeEventListener("keydown", onKey);
      // Release sessions on unmount (StrictMode double-invoke in dev is safe).
      decoder?.release?.();
      mdrnn?.release?.();
      controller?.release?.();
    };
  }, [basePath]);

  const flap = () => {
    flapRef.current = true;
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div
        className="relative select-none overflow-hidden rounded-xl border border-neutral-300 bg-neutral-950 shadow-lg dark:border-neutral-700"
        style={{ lineHeight: 0 }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            e.preventDefault();
            flap();
          }}
          className="block cursor-pointer touch-none"
          style={{ imageRendering: "auto" }}
        />

        {/* HUD */}
        <div className="pointer-events-none absolute left-0 top-0 flex w-full items-start justify-between p-2 text-[11px] font-medium text-white/90">
          <span className="rounded bg-black/40 px-1.5 py-0.5 tabular-nums">
            step {steps}
          </span>
          <span className="rounded bg-black/40 px-1.5 py-0.5 tabular-nums">
            best {best}
          </span>
        </div>

        <div
          className={`pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded bg-emerald-500/90 px-2 py-0.5 text-[11px] font-semibold text-white transition-opacity duration-150 ${
            youFlapped ? "opacity-100" : "opacity-0"
          }`}
        >
          you flapped
        </div>

        {status === "loading" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-neutral-950 text-sm text-neutral-300">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-600 border-t-white" />
            loading the dream…
          </div>
        )}
        {status === "error" && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-950 p-4 text-center text-xs text-red-400">
            {errorMsg}
          </div>
        )}
        {crashed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/60 text-center text-white">
            <span className="text-sm font-semibold">dreamed a crash</span>
            <span className="text-[11px] text-white/70">respawning…</span>
          </div>
        )}
      </div>

      <button
        onClick={flap}
        className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        Flap
      </button>
      <p className="max-w-md text-center text-xs text-neutral-500 dark:text-neutral-400">
        The controller flies on its own inside the model&#39;s dream. Press{" "}
        <kbd className="rounded border border-neutral-400 px-1 dark:border-neutral-600">
          Space
        </kbd>{" "}
        (or tap the frame) to take over and flap. Nothing here is a real game —
        every pixel is hallucinated by the VAE from a latent the MDN-RNN imagines.
        {backend && (
          <>
            {" "}
            Running on{" "}
            <span className="font-mono">
              {backend === "webgpu" ? "WebGPU (GPU)" : "wasm (CPU)"}
            </span>
            .
          </>
        )}
      </p>
    </div>
  );
}
