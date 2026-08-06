/**
 * Shared loader for onnxruntime-web's plain-wasm build.
 *
 * That module is a page-wide singleton in two ways that bite when more than one
 * demo uses it. `ort.env` is module state, and the wasm runtime is initialized
 * exactly once — on the first `InferenceSession.create()` — latching there and
 * then whether inference runs in a proxy worker. But `env.wasm.proxy` is still
 * re-read on every `create()` and `run()` afterwards, so a second demo that
 * wants the other mode desynchronizes the two halves:
 *
 *   - runtime latched non-proxied, `proxy` later set true  -> `create()` throws
 *     "worker not ready", because no worker was ever spawned.
 *   - runtime latched proxied, `proxy` later set false     -> runs take the
 *     main-thread path against a session that only exists inside the worker.
 *
 * The module survives client-side navigation, so without a single owner for
 * these settings whichever demo mounted first would decide the other's fate,
 * and only a hard refresh would clear it. Hence: configure once, here, and let
 * every demo import the already-configured module.
 *
 * Proxying is on because athena-chess's runs are long enough to freeze the page
 * if they happen on the main thread. The cost, which callers must respect, is
 * that ORT *transfers* input buffers into the worker — a Float32Array handed to
 * `run()` is detached when it returns, so never reuse one across runs.
 */
let loading: Promise<typeof import("onnxruntime-web/wasm")> | null = null;

export function loadOrtWasm() {
  loading ??= import("onnxruntime-web/wasm").then((ort) => {
    ort.env.wasm.wasmPaths = "/ort/";
    ort.env.wasm.numThreads = 1; // SharedArrayBuffer needs COOP/COEP we do not control
    ort.env.wasm.proxy = true;
    return ort;
  });
  return loading;
}
