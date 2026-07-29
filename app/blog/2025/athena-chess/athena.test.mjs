/**
 * Validates the browser port of Athena's encoder/decoder against the reference
 * fixtures written by `athena.export_onnx` (PyTorch outputs on real positions).
 *
 *   node --experimental-strip-types app/blog/2025/athena-chess/athena.test.mjs
 *
 * `athena.fixtures.json` is the file the exporter writes next to the .onnx;
 * refresh both together whenever the checkpoint is re-exported.
 *
 * Checks the tokenizer and the action-vocabulary lookup against every fixture,
 * then runs the exported graph through onnxruntime-web's wasm build and compares
 * logits and argmax bins with the PyTorch reference. Also plays a short
 * self-play game to confirm the ranking path never produces an illegal move.
 */

import assert from "node:assert";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { Chess } from "chess.js";

import { encodeFen, buildMoveIndex, rankMoves, decodeBin } from "./athena.ts";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "../../../..");
const modelsDir = path.join(repo, "public/assets/projects/2025/athena-chess/models");

const meta = JSON.parse(readFileSync(path.join(modelsDir, "meta.json"), "utf8"));
const fixtures = JSON.parse(
  readFileSync(process.argv[2] ?? path.join(here, "athena.fixtures.json"), "utf8")
);
const moveIndex = buildMoveIndex(meta);

// --- 1. Tokenizer + action vocabulary -----------------------------------------
for (const c of fixtures.cases) {
  assert.deepStrictEqual(
    encodeFen(c.fen, meta),
    c.fen_tokens,
    `fen_tokens mismatch for ${c.fen}`
  );
  assert.strictEqual(moveIndex.get(c.uci), c.action_idx, `action_idx mismatch for ${c.uci}`);
}
console.log(`✓ tokenizer + action index match on ${fixtures.cases.length} fixtures`);

// --- 2. ONNX graph ------------------------------------------------------------
const ort = await import("onnxruntime-web/wasm");
ort.env.wasm.numThreads = 1;
ort.env.logLevel = "error";

// ort-web resolves a string as a URL; under node we hand it the bytes directly.
const session = await ort.InferenceSession.create(
  new Uint8Array(readFileSync(path.join(modelsDir, "athena.onnx"))),
  { executionProviders: ["wasm"] }
);

async function run(pairs) {
  const seq = meta.tokenizer.seq_len;
  const tokens = new BigInt64Array(pairs.length * seq);
  const actions = new BigInt64Array(pairs.length);
  pairs.forEach(({ fen, uci }, i) => {
    encodeFen(fen, meta).forEach((t, j) => (tokens[i * seq + j] = BigInt(t)));
    actions[i] = BigInt(moveIndex.get(uci));
  });
  const out = await session.run({
    fen_tokens: new ort.Tensor("int64", tokens, [pairs.length, seq]),
    action_idx: new ort.Tensor("int64", actions, [pairs.length]),
  });
  return out.logits.data;
}

// Batched exactly as the demo does it (all pairs in one run).
const bins = meta.output_encoder.output_bins;
const logits = await run(fixtures.cases);
let maxErr = 0;
fixtures.cases.forEach((c, i) => {
  let best = 0;
  for (let b = 0; b < bins; b++) {
    const err = Math.abs(logits[i * bins + b] - c.logits[b]);
    if (err > maxErr) maxErr = err;
    if (logits[i * bins + b] > logits[i * bins + best]) best = b;
  }
  assert.strictEqual(best, c.bin, `argmax bin mismatch for ${c.fen} ${c.uci}`);
});
assert.ok(maxErr < 2e-3, `logits drifted from PyTorch by ${maxErr}`);
console.log(`✓ onnx logits match PyTorch (max abs err ${maxErr.toExponential(2)}), argmax bins match`);

// Batch size must not change the result — the exported graph has a dynamic batch axis.
const single = await run([fixtures.cases[3]]);
for (let b = 0; b < bins; b++) {
  assert.ok(Math.abs(single[b] - logits[3 * bins + b]) < 1e-4, "batch size changed the output");
}
console.log("✓ batch-size invariant");

// --- 3. Ranking path over a real game ----------------------------------------
const game = new Chess();
const counts = new Map();
for (let ply = 0; ply < 24 && !game.isGameOver(); ply++) {
  const fen = game.fen();
  const legal = game.moves({ verbose: true }).map((m) => {
    const after = m.after.split(" ")[0];
    return { uci: m.lan, san: m.san, repeats: (counts.get(after) ?? 0) >= 2 };
  });
  for (const m of legal) assert.ok(moveIndex.has(m.uci), `${m.uci} missing from action vocab`);

  const rows = await run(legal.map((m) => ({ fen, uci: m.uci })));
  const ranked = rankMoves(rows, legal, meta);
  const best = ranked[0];
  assert.ok(best.winProb >= 0 && best.winProb <= 1, "win prob out of range");

  game.move(best.uci);
  const key = game.fen().split(" ")[0];
  counts.set(key, (counts.get(key) ?? 0) + 1);
}
console.log(`✓ 24-ply self-play, all moves legal: ${game.history().join(" ")}`);

// --- 4. Promotions ------------------------------------------------------------
// The UI keys its promotion picker off a square having several legal moves onto
// it, and every promotion must exist in the 1968-move vocabulary.
const promotion = new Chess("8/P6k/8/8/8/8/7K/8 w - - 0 1");
const ontoA8 = promotion.moves({ verbose: true }).filter((m) => m.to === "a8");
assert.strictEqual(ontoA8.length, 4, "expected four promotion moves onto a8");
for (const m of ontoA8) assert.ok(moveIndex.has(m.lan), `${m.lan} missing from action vocab`);
const promotionRanked = rankMoves(
  await run(ontoA8.map((m) => ({ fen: promotion.fen(), uci: m.lan }))),
  ontoA8.map((m) => ({ uci: m.lan, san: m.san, repeats: false })),
  meta
);
assert.strictEqual(promotionRanked[0].uci, "a7a8q", "expected the queen promotion to rank first");
console.log("✓ promotions are encodable and ranked (picks a8=Q)");

// --- 5. Decoder round trip ----------------------------------------------------
const { K, M, output_bins } = meta.output_encoder;
assert.deepStrictEqual(decodeBin(output_bins - 1, meta), { winProb: 1, mate: 0 });
assert.deepStrictEqual(decodeBin(output_bins - 2, meta), { winProb: 1, mate: 1 });
assert.deepStrictEqual(decodeBin(M - 1, meta), { winProb: 0, mate: -1 });
assert.deepStrictEqual(decodeBin(0, meta), { winProb: 0, mate: -M });
assert.strictEqual(decodeBin(M, meta).winProb, 0);
assert.strictEqual(decodeBin(M + K - 1, meta).winProb, 1);
console.log("✓ bin decoder matches WinProbEncoder.decode");
