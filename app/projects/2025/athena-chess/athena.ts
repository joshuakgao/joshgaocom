/**
 * Browser port of Athena's input tokenizer and output-bin decoder.
 *
 * This is a direct translation of `ActionTokenizer.encode` and
 * `WinProbEncoder.decode` from the training repo; the vocabularies and bin
 * layout are read from the exported `meta.json` rather than hardcoded, so the
 * two can never drift. Everything here is pure — the ONNX session is passed in
 * — which keeps it testable outside a browser (see `athena.test.mjs`).
 */

export type AthenaMeta = {
  model_version: string;
  architecture: {
    type: string;
    size: string;
    depth: number;
    width: number;
    heads: number;
  };
  tokenizer: {
    seq_len: number;
    cls_id: number;
    pad_id: number;
    vocab_size: number;
    char_vocab: Record<string, number>;
    uci_moves: string[];
  };
  output_encoder: {
    type: string;
    K: number;
    M: number;
    output_bins: number;
    win_prob_bin_start: number;
    mate_now_bin: number;
  };
};

/** Right-align `s` in a field of `width`, padding with '.' as the tokenizer does. */
function rjust(s: string, width: number) {
  return s.length >= width ? s.slice(-width) : ".".repeat(width - s.length) + s;
}

function ljust(s: string, width: number) {
  return s.length >= width ? s.slice(0, width) : s + ".".repeat(width - s.length);
}

/**
 * FEN -> 78 token ids: [CLS] + 64 board squares + side + 4 castling + 2 en
 * passant + 3 halfmove + 3 fullmove. Digits in the board field expand to '.'
 * (empty), a missing castling/en-passant field pads with '.', and the two move
 * counters are right-aligned in 3 characters.
 */
export function encodeFen(fen: string, meta: AthenaMeta): number[] {
  const { char_vocab, cls_id, pad_id } = meta.tokenizer;
  const [board, player, castling, ep, half, full] = fen.split(" ");

  const chars: string[] = [];
  for (const ch of board) {
    if (ch === "/") continue;
    if (ch >= "1" && ch <= "8") {
      for (let i = 0; i < Number(ch); i++) chars.push(".");
    } else {
      chars.push(ch);
    }
  }
  if (chars.length !== 64) throw new Error(`bad board field in FEN: ${fen}`);

  chars.push(player);
  chars.push(...ljust(castling === "-" ? "" : castling, 4));
  chars.push(...(ep === "-" ? "-." : ep));
  chars.push(...rjust(half, 3));
  chars.push(...rjust(full, 3));

  const tokens = [cls_id, ...chars.map((c) => char_vocab[c] ?? pad_id)];
  if (tokens.length !== meta.tokenizer.seq_len) {
    throw new Error(`expected ${meta.tokenizer.seq_len} tokens, got ${tokens.length}`);
  }
  return tokens;
}

/** UCI string -> index into the 1968-move action vocabulary. */
export function buildMoveIndex(meta: AthenaMeta): Map<string, number> {
  const index = new Map<string, number>();
  meta.tokenizer.uci_moves.forEach((uci, i) => index.set(uci, i));
  return index;
}

/**
 * Map a bin index to a scalar utility for the side to move. The layout is
 *
 *   [ mated in M..1 | win prob 0..1 | mate in M..1 | checkmate ]
 *
 * so utility is *not* monotonic in the bin index: inside the leading mate
 * block a higher index means being mated sooner, i.e. worse. (`inference.py`
 * ranks on the raw argmax bin and so slightly misorders lost positions; it
 * never matters there because every such move loses anyway.) Win-probability
 * bins keep their natural [0, 1] value, being mated sits below all of them,
 * and delivering mate sits above. Scoring a move by the *expected* utility
 * under the bin distribution rather than by its argmax bin costs nothing and
 * breaks the ties that a 193-way argmax leaves behind.
 */
export function binUtility(bin: number, meta: AthenaMeta): number {
  const { K, M, output_bins } = meta.output_encoder;
  if (bin === output_bins - 1) return 2; // this move is checkmate
  if (bin < M) return -1 + (0.5 * (M - bin)) / M; // mated in (M - bin): sooner is worse
  if (bin < M + K) return (bin - M) / (K - 1); // win probability bin
  return 1 + (0.5 * (bin - (M + K) + 1)) / M; // mate in (K + 2M - bin): sooner is better
}

/** Decode one row of logits into the same (win_prob, mate) pair the Python encoder returns. */
export function decodeBin(bin: number, meta: AthenaMeta): { winProb: number; mate: number | null } {
  const { K, M, output_bins } = meta.output_encoder;
  if (bin === output_bins - 1) return { winProb: 1, mate: 0 };
  if (bin < M) return { winProb: 0, mate: -(M - bin) };
  if (bin < M + K) return { winProb: (bin - M) / (K - 1), mate: null };
  return { winProb: 1, mate: K + 2 * M - bin };
}

/** Softmax over one row, written in place into `out`. */
function softmaxInto(logits: Float32Array, offset: number, n: number, out: Float32Array) {
  let max = -Infinity;
  for (let i = 0; i < n; i++) if (logits[offset + i] > max) max = logits[offset + i];
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const e = Math.exp(logits[offset + i] - max);
    out[i] = e;
    sum += e;
  }
  for (let i = 0; i < n; i++) out[i] /= sum;
}

export type ScoredMove = {
  uci: string;
  san: string;
  /** Expected bin utility — the value moves are ranked by. */
  score: number;
  /** argmax bin, i.e. what `inference.py` ranks on. */
  bin: number;
  /** Win probability for the side to move, expectation over the win-prob bins. */
  winProb: number;
  /** Signed mate distance in moves if the argmax bin is a mate bin, else null. */
  mate: number | null;
  /** True if this move repeats a position already seen twice. */
  repeats: boolean;
};

/**
 * Turn a (batch, output_bins) logit block into ranked moves.
 *
 * `winProb` is the expectation over the win-probability bins plus the mate
 * bins' implied 0/1, which reads much better on an eval bar than the argmax
 * bin's value: it moves continuously instead of snapping between 193 levels.
 * Repetitions are demoted exactly as in `inference.py` — a move that would
 * bring a position to its third occurrence is only played if nothing else is
 * legal — which stops the engine from shuffling in winning positions.
 */
export function rankMoves(
  logits: Float32Array,
  moves: { uci: string; san: string; repeats: boolean }[],
  meta: AthenaMeta
): ScoredMove[] {
  const bins = meta.output_encoder.output_bins;
  const probs = new Float32Array(bins);
  const utility = Array.from({ length: bins }, (_, b) => binUtility(b, meta));
  const winProbOf = Array.from({ length: bins }, (_, b) => decodeBin(b, meta).winProb);

  const scored: ScoredMove[] = moves.map((move, i) => {
    softmaxInto(logits, i * bins, bins, probs);

    let score = 0;
    let winProb = 0;
    let bestBin = 0;
    for (let b = 0; b < bins; b++) {
      score += probs[b] * utility[b];
      winProb += probs[b] * winProbOf[b];
      if (probs[b] > probs[bestBin]) bestBin = b;
    }

    return {
      ...move,
      score,
      bin: bestBin,
      winProb,
      mate: decodeBin(bestBin, meta).mate,
    };
  });

  // Rank by score, but push repetitions below everything else.
  return scored.sort(
    (a, b) => Number(a.repeats) - Number(b.repeats) || b.score - a.score
  );
}
