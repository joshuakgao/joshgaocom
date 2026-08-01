"use client";

/**
 * Flappy World — a playable DreamerV3 "dream".
 *
 * Runs the frozen DreamerV3 world model + actor entirely in the browser with
 * onnxruntime-web. There is no game engine here: every frame is *hallucinated* by
 * the RSSM's decoder from a latent state the model imagines, exactly like
 * `src/flappy_world/dreamer/dream.py`'s human mode. Each tick:
 *
 *   feat_t = [deter_t, flatten(stoch_t)]  --decoder-->  the frame you see
 *   a_t    = SPACE this frame ? flap : Actor(feat_t)     (you can override the AI)
 *   (next_deter, prior_logits)  =  RSSM.img_step(stoch_t, a_t, deter_t)
 *   stoch_{t+1}  ~  categorical(prior_logits)            (the dream's stochastic draw)
 *
 * The actor flies on its own; pressing SPACE forces a flap that frame, so you and
 * the policy share the stick inside the model's imagination. The continue head
 * predicts p(episode continues); when it drops below threshold the dream ends and
 * a new one is seeded from a precomputed real starting state.
 *
 * The seed states (deter + stoch, an encoded real reset frame run through the
 * RSSM posterior) are precomputed in Python, so the browser never needs the
 * encoder or the posterior graph — only decoder / actor / rssm_img / heads.
 */

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Small } from "@/components/ui";

// Shapes come from meta.json (fetched at runtime), but these are the trained values.
type Meta = {
  img_height: number;
  img_width: number;
  img_channels: number;
  stoch: number; // number of categorical groups (S)
  classes: number; // classes per group (K)
  deter: number; // deterministic GRU state width (D)
  feat_dim: number; // D + S*K
  action_dim: number;
};

type Seed = { deter: number[]; stoch: number[] };

// Match src/flappy_world/dreamer/config.yaml (dream section): the actor acts
// greedily (argmax), and the dream ends when the continue head's p(continue)
// drops below the threshold — but only after a grace period while the state
// settles from the seed frame.
const GREEDY = true;
const CONT_THRESHOLD = 0.99;
const GRACE_STEPS = 45;
const FPS = 30; // target rate; wasm fallback just runs as fast as it can
const DISPLAY_SCALE = 3;

const FLAP = 1;
const NOOP = 0;

function argmax(a: ArrayLike<number>) {
  let best = 0;
  for (let i = 1; i < a.length; i++) if (a[i] > a[best]) best = i;
  return best;
}

export default function FlappyWorldDemo({ basePath }: { basePath: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const flapRef = useRef(false); // a queued human flap, consumed next step
  const runningRef = useRef(false);
  const assistRef = useRef(true); // mirrors `assist` so the loop reads it live

  const [status, setStatus] = useState<"loading" | "running" | "error">(
    "loading"
  );
  const [backend, setBackend] = useState<"webgpu" | "wasm" | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // Two leaderboards: a run counts as assisted from the moment the actor picks
  // a frame's action, so flying the whole episode yourself scores unassisted.
  const [bestAssisted, setBestAssisted] = useState(0);
  const [bestUnassisted, setBestUnassisted] = useState(0);
  const [crashed, setCrashed] = useState(false);
  const [youFlapped, setYouFlapped] = useState(false);
  const [assist, setAssist] = useState(true);
  // Bumped by the retry button; the load effect keys off it, so incrementing
  // tears the old sessions down and re-runs init from scratch.
  const [attempt, setAttempt] = useState(0);

  const retry = () => {
    setErrorMsg(null);
    setCrashed(false);
    setStatus("loading");
    setAttempt((a) => a + 1);
  };

  // The dream loop lives in a long-running effect, so it reads the toggle
  // through a ref rather than a captured state value.
  useEffect(() => {
    assistRef.current = assist;
  }, [assist]);

  useEffect(() => {
    let cancelled = false;
    // Handles created inside init(); released on cleanup.
    let decoder: any = null;
    let actor: any = null;
    let rssmImg: any = null;
    let heads: any = null;
    let ort: any = null;

    const modelsPath = `${basePath}/models`;

    async function init() {
      // Dynamic import keeps onnxruntime-web out of SSR/prerender (it needs a
      // browser). The webgpu build runs the conv-heavy decoder on the GPU — the
      // same idea deeplearn.js used for the original worldmodels.github.io demos.
      // Pick the build by capability: browsers without navigator.gpu load the
      // plain wasm build (a failed GPU init poisons its own wasm module, so the
      // fallback imports the separate plain-wasm build fresh).
      const meta: Meta = await fetch(`${modelsPath}/meta.json`).then((r) =>
        r.json()
      );
      const seeds: Seed[] = await fetch(`${modelsPath}/seeds.json`)
        .then((r) => r.json())
        .catch(() => []); // fall back to a zero seed if unavailable

      const urls = [
        `${modelsPath}/decoder.onnx`,
        `${modelsPath}/actor.onnx`,
        `${modelsPath}/rssm_img.onnx`,
        `${modelsPath}/heads.onnx`,
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
          [decoder, actor, rssmImg, heads] = await create(["webgpu"]);
          usedBackend = "webgpu";
        } catch (e) {
          console.warn("WebGPU init failed, falling back to wasm:", e);
          [decoder, actor, rssmImg, heads] = await loadWasm();
        }
      } else {
        [decoder, actor, rssmImg, heads] = await loadWasm();
      }
      if (cancelled) return;
      setBackend(usedBackend);

      const S = meta.stoch;
      const K = meta.classes;
      const SK = S * K;
      const D = meta.deter;
      const F = meta.feat_dim; // D + SK
      const A = meta.action_dim;
      const H = meta.img_height;
      const W = meta.img_width;
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
        // Decoder output is centered ([-0.5, 0.5]); undo it and clamp to [0, 1].
        const px = imgData.data;
        for (let p = 0; p < HW; p++) {
          const o = p << 2;
          px[o] = Math.max(0, Math.min(255, (data[p] + 0.5) * 255)); // R plane
          px[o + 1] = Math.max(0, Math.min(255, (data[HW + p] + 0.5) * 255)); // G
          px[o + 2] = Math.max(0, Math.min(255, (data[2 * HW + p] + 0.5) * 255)); // B
          px[o + 3] = 255;
        }
        octx.putImageData(imgData, 0, 0);
        ctx.drawImage(off, 0, 0, W, H, 0, 0, canvas.width, canvas.height);
      }

      // --- Dream state: deterministic GRU memory + one-hot stochastic latent.
      let deter = new Float32Array(D);
      let stoch = new Float32Array(SK); // flattened (S groups × K classes)
      const feat = new Float32Array(F); // reused each step: [deter, flatten(stoch)]
      let step = 0;
      let usedAssist = false; // did the actor drive any frame of this episode?

      function seedDream() {
        // Start from a precomputed real posterior state (encoder + RSSM posterior
        // over one real reset frame, done offline). Zeros if seeds missing.
        if (seeds.length) {
          const s = seeds[(Math.random() * seeds.length) | 0];
          deter = Float32Array.from(s.deter);
          stoch = Float32Array.from(s.stoch);
        } else {
          deter = new Float32Array(D);
          stoch = new Float32Array(SK);
        }
        step = 0;
        usedAssist = false;
      }

      function sampleStoch(logits: Float32Array) {
        // Per group: softmax over K classes (logits already have unimix baked in),
        // draw a class, emit its one-hot. Returns a fresh (S*K) buffer.
        const out = new Float32Array(SK);
        for (let g = 0; g < S; g++) {
          const base = g * K;
          let maxL = -Infinity;
          for (let k = 0; k < K; k++)
            if (logits[base + k] > maxL) maxL = logits[base + k];
          let sum = 0;
          for (let k = 0; k < K; k++) sum += Math.exp(logits[base + k] - maxL);
          let r = Math.random() * sum;
          let k = 0;
          for (; k < K - 1; k++) {
            r -= Math.exp(logits[base + k] - maxL);
            if (r <= 0) break;
          }
          out[base + k] = 1;
        }
        return out;
      }

      const t = (buf: Float32Array, dims: number[]) =>
        new ort.Tensor("float32", buf, dims);

      async function stepOnce() {
        // feat = [deter, flatten(stoch)]
        feat.set(deter, 0);
        feat.set(stoch, D);

        // 1. Render what the model currently imagines.
        const dec = await decoder.run({ feat: t(feat, [1, F]) });
        drawFrame(dec.frame.data as Float32Array);

        // 2. Continue head -> p(episode continues); crash when it drops.
        const hd = await heads.run({ feat: t(feat, [1, F]) });
        const cont = (hd.cont.data as Float32Array)[0];

        // 3. Actor's action (greedy argmax over unimixed probs) — unless you flap.
        // With assist off the actor never runs: you're the only pilot, and the
        // dream coasts on NOOP whenever you don't flap.
        const human = flapRef.current;
        flapRef.current = false;
        let action = human ? FLAP : NOOP;
        if (!human && assistRef.current) {
          const act = await actor.run({ feat: t(feat, [1, F]) });
          action = argmax(act.probs.data as Float32Array);
          usedAssist = true;
        }

        // 4. Prior step: advance the GRU, get next-latent logits, sample stoch.
        const aOneHot = new Float32Array(A);
        aOneHot[action] = 1;
        const out = await rssmImg.run({
          stoch: t(stoch, [1, S, K]),
          a: t(aOneHot, [1, A]),
          deter: t(deter, [1, D]),
        });
        deter = Float32Array.from(out.next_deter.data as ArrayLike<number>);
        stoch = sampleStoch(out.logits.data as Float32Array);
        step++;

        if (!cancelled) {
          const setBest = usedAssist ? setBestAssisted : setBestUnassisted;
          setBest((b) => (step > b ? step : b));
          if (human) {
            setYouFlapped(true);
            setTimeout(() => !cancelled && setYouFlapped(false), 150);
          }
        }

        // The model predicts termination -> end this episode, seed a fresh one.
        return cont < CONT_THRESHOLD && step > GRACE_STEPS;
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
          if (!cancelled) setCrashed(false);
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
      actor?.release?.();
      rssmImg?.release?.();
      heads?.release?.();
    };
  }, [basePath, attempt]);

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
        {/* The dream frame is only 72px wide natively, so the two scores stack
            into one panel instead of sitting on opposite corners. */}
        <div className="pointer-events-none absolute left-2 bottom-2 rounded-md bg-black/45 px-2 py-1 text-[10px] leading-relaxed text-white backdrop-blur-[2px]">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-white/60">DreamerV3 Best</span>
            <span className="font-semibold tabular-nums">{bestAssisted}</span>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-white/60">Your Best</span>
            <span className="font-semibold tabular-nums">{bestUnassisted}</span>
          </div>
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
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-950 p-4 text-center">
            <span className="text-xs text-red-400">{errorMsg}</span>
            <Button size="sm" variant="secondary" onClick={retry}>
              Retry
            </Button>
          </div>
        )}
        {crashed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/60 text-center text-white">
            <span className="text-sm font-semibold">dreamed a crash</span>
            <span className="text-[11px] text-white/70">respawning…</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch
            id="dreamer-assist"
            checked={assist}
            onCheckedChange={setAssist}
          />
          <label
            htmlFor="dreamer-assist"
            className="cursor-pointer select-none text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            DreamerV3 Assist
          </label>
        </div>
      </div>
      <Small className="max-w-md text-center">
        Press{" "}
        <kbd className="rounded border border-neutral-400 px-1 dark:border-neutral-600">
          Space
        </kbd>{" "}
        (or tap the frame) to take over and flap, or switch off{" "}
        <span className="font-medium">DreamerV3 Assist</span> to fly the dream
        yourself.
      </Small>
      <Small className="max-w-md text-center">
        Nothing here is a real game — every pixel is hallucinated by
        the RSSM from a latent it imagines.
      </Small>
    </div>
  );
}
