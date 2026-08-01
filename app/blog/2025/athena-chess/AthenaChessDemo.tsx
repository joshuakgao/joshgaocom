"use client";

/**
 * Play against Athena in the browser.
 *
 * The exported checkpoint runs entirely client-side through onnxruntime-web:
 * there is no server, no search tree, and no opening book. Every move is one
 * forward pass over the whole legal move list —
 *
 *   fen_tokens : (n_legal, 78)   the same position, tokenized once per move
 *   action_idx : (n_legal,)      each legal move's index in the 1968-move vocab
 *   -> logits  : (n_legal, 193)  a distribution over evaluation bins per move
 *
 * — batched into a single session run, after which the highest-scoring move is
 * played. That is the whole engine, and it mirrors `select_model_move` in the
 * training repo's `inference.py`, repetition penalty included. Tokenization and
 * bin decoding live in `athena.ts` and are validated against the exporter's
 * PyTorch fixtures by `athena.test.mjs`.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { Chess, type Square } from "chess.js";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Small } from "@/components/ui";
import {
  buildMoveIndex,
  encodeFen,
  rankMoves,
  type AthenaMeta,
  type ScoredMove,
} from "./athena";
import { PieceIcon } from "./pieces";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const RANKS = ["8", "7", "6", "5", "4", "3", "2", "1"];

const LIGHT_SQUARE = "#f0d9b5";
const DARK_SQUARE = "#b58863";

/**
 * Moves within this much expected utility of the best one are treated as tied
 * and sampled between, so the same opening does not repeat every game.
 * `inference.py` samples uniformly from the top N regardless of the gap, which
 * can throw away a won position; gating on the gap keeps the strength.
 */
const VARIETY_MARGIN = 0.02;
const VARIETY_CANDIDATES = 3;

/**
 * For each side's first two moves the top `OPENING_CANDIDATES` are sampled
 * uniformly, ignoring `VARIETY_MARGIN`. Nothing is decided this early, so the
 * widened pick costs no real strength and is what stops every game opening the
 * same way — the gap gate alone is often narrow enough to leave one move.
 */
const OPENING_PLIES = 4;
const OPENING_CANDIDATES = 4;

type Status = "loading" | "ready" | "error";

type Engine = {
  session: any;
  ort: any;
  meta: AthenaMeta;
  moveIndex: Map<string, number>;
};

type LegalMove = {
  uci: string;
  san: string;
  from: string;
  to: string;
  promotion?: string;
  repeats: boolean;
};

/** All legal moves of the current position, tagged with whether they repeat. */
function legalMovesOf(game: Chess): LegalMove[] {
  // Repetition is counted on piece placement only, as `inference.py` does.
  const counts = new Map<string, number>();
  const bump = (fen: string) => {
    const key = fen.split(" ")[0];
    counts.set(key, (counts.get(key) ?? 0) + 1);
  };
  const history = game.history({ verbose: true });
  if (history.length) bump(history[0].before);
  for (const h of history) bump(h.after);

  return game.moves({ verbose: true }).map((m) => ({
    uci: m.lan,
    san: m.san,
    from: m.from as string,
    to: m.to as string,
    promotion: m.promotion as string | undefined,
    repeats: (counts.get(m.after.split(" ")[0]) ?? 0) >= 2,
  }));
}

/**
 * A piece with a stable identity across moves. Pieces are drawn in one absolutely
 * positioned layer above the squares and placed with a transform, so keeping the
 * same React key for the same physical piece is what lets CSS slide it from one
 * square to the next instead of snapping.
 */
type PieceView = { id: number; color: "w" | "b"; type: string; square: string };

let nextPieceId = 0;

/** Snapshot every piece on the board with fresh identities (no animation). */
function buildLayout(game: Chess): PieceView[] {
  const pieces: PieceView[] = [];
  for (const row of game.board())
    for (const cell of row)
      if (cell)
        pieces.push({
          id: nextPieceId++,
          color: cell.color,
          type: cell.type,
          square: cell.square,
        });
  return pieces;
}

/**
 * Carry the layout through one move, preserving ids. chess.js's flags tell us
 * about the pieces that move or vanish without being the move's own from/to:
 * 'e' en passant (the captured pawn is beside the target square), 'k'/'q'
 * castling (the rook jumps too), 'p' promotion (same piece, new type).
 */
function advanceLayout(previous: PieceView[], move: any): PieceView[] {
  const capturedSquare = move.flags.includes("e")
    ? `${move.to[0]}${move.from[1]}`
    : move.captured
      ? move.to
      : null;

  const rookMove = move.flags.includes("k")
    ? {
        from: move.color === "w" ? "h1" : "h8",
        to: move.color === "w" ? "f1" : "f8",
      }
    : move.flags.includes("q")
      ? {
          from: move.color === "w" ? "a1" : "a8",
          to: move.color === "w" ? "d1" : "d8",
        }
      : null;

  return previous
    .filter((piece) => piece.square !== capturedSquare)
    .map((piece) => {
      if (piece.square === move.from)
        return {
          ...piece,
          square: move.to,
          type: move.promotion ?? piece.type,
        };
      if (rookMove && piece.square === rookMove.from)
        return { ...piece, square: rookMove.to };
      return piece;
    });
}

function resultText(game: Chess): string | null {
  if (!game.isGameOver()) return null;
  if (game.isCheckmate())
    return game.turn() === "w"
      ? "Checkmate — Black wins"
      : "Checkmate — White wins";
  if (game.isStalemate()) return "Draw — stalemate";
  if (game.isThreefoldRepetition()) return "Draw — threefold repetition";
  if (game.isInsufficientMaterial()) return "Draw — insufficient material";
  if (game.isDraw()) return "Draw — fifty-move rule";
  return "Game over";
}

export default function AthenaChessDemo({ basePath }: { basePath: string }) {
  const engineRef = useRef<Engine | null>(null);
  const gameRef = useRef(new Chess());
  // Bumped on every board mutation; the board renders straight from gameRef, so
  // this is what tells React the position changed.
  const [ply, setPly] = useState(0);

  const [status, setStatus] = useState<Status>("loading");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [playerColor, setPlayerColor] = useState<"w" | "b">("w");
  const [selected, setSelected] = useState<string | null>(null);
  const [pendingPromotion, setPendingPromotion] = useState<{
    from: string;
    to: string;
  } | null>(null);
  const [thinking, setThinking] = useState(false);
  const [candidates, setCandidates] = useState<ScoredMove[] | null>(null);
  const [showEvals, setShowEvals] = useState(true);
  // Win probability for White, from Athena's own read of the position.
  const [whiteWinProb, setWhiteWinProb] = useState(0.5);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(
    null,
  );
  const [thinkMs, setThinkMs] = useState<number | null>(null);

  // The animated piece layer, and a key that remounts it whenever the position
  // changes discontinuously (new game, take back, switching sides) so pieces
  // reappear in place instead of gliding across the board.
  const [layout, setLayout] = useState<PieceView[]>(() =>
    buildLayout(gameRef.current),
  );
  const [layoutKey, setLayoutKey] = useState(0);

  const showEvalsRef = useRef(showEvals);
  useEffect(() => {
    showEvalsRef.current = showEvals;
  }, [showEvals]);

  const game = gameRef.current;
  const turn = game.turn();
  const gameOver = game.isGameOver();
  const result = resultText(game);
  // Note this does not depend on `thinking`: a background evaluation of your own
  // position (for the candidate list) must not lock the board.
  const humanToMove = status === "ready" && !gameOver && turn === playerColor;

  // --- Model loading ----------------------------------------------------------
  // Set synchronously so StrictMode's double-invoked effect cannot start the
  // ~27 MB download twice; `engineRef` is only assigned once the fetch lands.
  const startedRef = useRef(false);

  const load = useCallback(async () => {
    if (startedRef.current) return;
    startedRef.current = true;
    setStatus("loading");
    setProgress(0);
    try {
      const modelsPath = `${basePath}/models`;
      const meta: AthenaMeta = await fetch(`${modelsPath}/meta.json`).then(
        (r) => r.json(),
      );

      // Stream the weights so the button can show real progress — it is a ~27 MB
      // download and a silent spinner would look broken.
      const response = await fetch(`${modelsPath}/athena.onnx`);
      if (!response.ok)
        throw new Error(`failed to fetch model (${response.status})`);
      const total = Number(response.headers.get("content-length")) || 0;
      const chunks: Uint8Array[] = [];
      let received = 0;
      const reader = response.body!.getReader();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        received += value.length;
        if (total) setProgress(received / total);
      }
      const bytes = new Uint8Array(received);
      let offset = 0;
      for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.length;
      }
      setProgress(1);

      // A move takes long enough to freeze the page if it ran on the main
      // thread, so the session is proxied into a worker. WebGPU is deliberately
      // not used: it needs a second 24 MB runtime artifact, and where the
      // browser only has a software adapter it is an order of magnitude slower
      // than wasm on a batch this small.
      const ort = await import("onnxruntime-web/wasm");
      ort.env.wasm.wasmPaths = "/ort/";
      ort.env.wasm.numThreads = 1; // SharedArrayBuffer needs COOP/COEP we do not control
      ort.env.wasm.proxy = true;
      const session = await ort.InferenceSession.create(bytes, {
        executionProviders: ["wasm"],
        graphOptimizationLevel: "all",
      });

      engineRef.current = {
        session,
        ort,
        meta,
        moveIndex: buildMoveIndex(meta),
      };
      setStatus("ready");
    } catch (e) {
      console.error(e);
      setErrorMsg(String(e));
      setStatus("error");
      startedRef.current = false; // let the retry button try again
    }
  }, [basePath]);

  // Start the download as soon as the demo mounts.
  useEffect(() => {
    load();
  }, [load]);

  // Release the session on unmount. Clearing `startedRef` too matters in dev,
  // where StrictMode unmounts and remounts: without it the second mount would
  // skip loading and sit on the spinner forever.
  useEffect(
    () => () => {
      engineRef.current?.session?.release?.();
      engineRef.current = null;
      startedRef.current = false;
    },
    [],
  );

  // --- Inference --------------------------------------------------------------
  // One session, one run at a time: a hint evaluation can still be in flight
  // when you move, and ORT sessions are not re-entrant.
  const queueRef = useRef<Promise<unknown>>(Promise.resolve());

  /** Score every legal move of the current position in one batched run. */
  const evaluate = useCallback(async (): Promise<ScoredMove[] | null> => {
    const run = queueRef.current.then(async () => {
      const engine = engineRef.current;
      if (!engine) return null;
      const { session, ort, meta, moveIndex } = engine;

      const board = gameRef.current;
      const legal = legalMovesOf(board);
      if (!legal.length) return null;

      const seq = meta.tokenizer.seq_len;
      const tokens = encodeFen(board.fen(), meta); // identical for every legal move
      const fenTokens = new BigInt64Array(legal.length * seq);
      const actionIdx = new BigInt64Array(legal.length);
      legal.forEach((move, i) => {
        for (let j = 0; j < seq; j++)
          fenTokens[i * seq + j] = BigInt(tokens[j]);
        actionIdx[i] = BigInt(moveIndex.get(move.uci)!);
      });

      const output = await session.run({
        fen_tokens: new ort.Tensor("int64", fenTokens, [legal.length, seq]),
        action_idx: new ort.Tensor("int64", actionIdx, [legal.length]),
      });
      return rankMoves(output.logits.data as Float32Array, legal, meta);
    });
    // Keep the chain alive even if this run throws.
    queueRef.current = run.catch(() => null);
    return run;
  }, []);

  /** Play a move on the board and slide the piece to its new square. */
  const applyMove = useCallback((uci: string) => {
    const move = gameRef.current.move(uci);
    setLayout((previous) => advanceLayout(previous, move));
    setLastMove({ from: move.from, to: move.to });
    setSelected(null);
    setPendingPromotion(null);
    setPly((p) => p + 1);
  }, []);

  /** Snap the board back to a position that is not one move away (no animation). */
  const rebuild = useCallback(() => {
    setLayout(buildLayout(gameRef.current));
    setLayoutKey((k) => k + 1);
    setSelected(null);
    setPendingPromotion(null);
    setPly((p) => p + 1);
  }, []);

  /**
   * Pick from the moves statistically tied with the best one — or, for the
   * first `OPENING_PLIES` plies, from the top few outright. The ply count is
   * read off the board so it covers each side's first two moves whichever
   * colour Athena has.
   */
  const chooseMove = useCallback((ranked: ScoredMove[]) => {
    const best = ranked[0];
    const opening = gameRef.current.history().length < OPENING_PLIES;
    const pool = ranked
      .slice(0, opening ? OPENING_CANDIDATES : VARIETY_CANDIDATES)
      .filter(
        (m) =>
          m.repeats === best.repeats &&
          (opening || best.score - m.score <= VARIETY_MARGIN),
      );
    return pool[Math.floor(Math.random() * pool.length)];
  }, []);

  // After every ply: evaluate the position, then move if it is Athena's turn.
  // Evaluating on your turn as well is what keeps the eval bar and the candidate
  // list live; that pass is skipped when evaluations are hidden.
  useEffect(() => {
    if (status !== "ready") return;
    const board = gameRef.current;
    if (board.isGameOver()) {
      setCandidates(null);
      return;
    }
    const athenaToMove = board.turn() !== playerColor;
    if (!athenaToMove && !showEvalsRef.current) return;

    let cancelled = false;
    const positionAtStart = board.fen();
    setThinking(true);

    (async () => {
      const started = performance.now();
      try {
        const ranked = await evaluate();
        // Guard against a stale run landing after a move, reset, undo or side switch.
        if (cancelled || gameRef.current.fen() !== positionAtStart || !ranked)
          return;

        setCandidates(ranked);
        setThinkMs(performance.now() - started);
        setWhiteWinProb(
          board.turn() === "w" ? ranked[0].winProb : 1 - ranked[0].winProb,
        );

        if (athenaToMove) applyMove(chooseMove(ranked).uci);
      } catch (e) {
        if (!cancelled) {
          console.error(e);
          setErrorMsg(String(e));
          setStatus("error");
        }
      } finally {
        if (!cancelled) setThinking(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [ply, status, playerColor, showEvals, evaluate, chooseMove, applyMove]);

  // --- Board interaction ------------------------------------------------------
  const legal = humanToMove ? legalMovesOf(game) : [];
  const targets = selected ? legal.filter((m) => m.from === selected) : [];

  const onSquare = (square: string) => {
    if (!humanToMove || pendingPromotion) return;
    const hit = targets.filter((m) => m.to === square);
    if (hit.length) {
      // A promotion shows up as four legal moves onto the same square.
      if (hit.length > 1 || hit[0].promotion) {
        setPendingPromotion({ from: hit[0].from, to: square });
        return;
      }
      applyMove(hit[0].uci);
      return;
    }
    const piece = game.get(square as Square);
    setSelected(piece && piece.color === playerColor ? square : null);
  };

  const reset = (color: "w" | "b" = playerColor) => {
    gameRef.current = new Chess();
    setPlayerColor(color);
    setLastMove(null);
    setCandidates(null);
    setWhiteWinProb(0.5);
    setThinkMs(null);
    rebuild();
  };

  /** Take back a full move — yours and Athena's reply. */
  const undo = () => {
    const board = gameRef.current;
    if (!board.history().length) return;
    board.undo();
    if (board.history().length && board.turn() !== playerColor) board.undo();
    const history = board.history({ verbose: true });
    const previous = history[history.length - 1];
    setLastMove(previous ? { from: previous.from, to: previous.to } : null);
    setCandidates(null);
    rebuild();
  };

  // --- Rendering --------------------------------------------------------------
  const flipped = playerColor === "b";
  const files = flipped ? [...FILES].reverse() : FILES;
  const ranks = flipped ? [...RANKS].reverse() : RANKS;

  const checkSquare = (() => {
    if (!game.inCheck()) return null;
    for (const file of FILES)
      for (const rank of RANKS) {
        const square = `${file}${rank}`;
        const piece = game.get(square as Square);
        if (piece && piece.type === "k" && piece.color === game.turn())
          return square;
      }
    return null;
  })();

  const best = candidates?.[0];
  const evalLabel = (() => {
    if (!candidates) return "—";
    if (best && best.mate !== null) {
      const mateIn = Math.max(1, Math.abs(best.mate));
      const winner = best.mate >= 0 ? turn : turn === "w" ? "b" : "w";
      return `${winner === "w" ? "White" : "Black"} mates in ${mateIn}`;
    }
    return `White ${(whiteWinProb * 100).toFixed(0)}% · Black ${((1 - whiteWinProb) * 100).toFixed(0)}%`;
  })();

  // While a run is in flight the numbers on screen still describe the previous
  // position, so they are dimmed until the new ones land.
  const staleClass = `transition-opacity duration-200 ${thinking ? "opacity-30" : "opacity-100"}`;

  const statusLabel = gameOver
    ? "Final position"
    : thinking && turn !== playerColor
      ? "Athena is thinking…"
      : turn === playerColor
        ? "Your move"
        : "Athena to move";

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full flex-col items-center gap-5 sm:flex-row sm:items-start sm:justify-center">
        <div className="flex items-stretch gap-2">
          {/* Eval bar — White's win probability as Athena reads it, with the
              side you are playing at the bottom, as on the board itself. */}
          {showEvals && (
            <div className="relative flex w-3 shrink-0 flex-col overflow-hidden rounded-full border border-neutral-400/60 bg-neutral-800">
              <div
                className="w-full bg-neutral-100 transition-[height] duration-500 ease-out"
                style={{
                  height: `${whiteWinProb * 100}%`,
                  // Whichever colour sits at the bottom of the board owns the
                  // bottom of the bar, so the fill grows towards you. Only the
                  // anchor flips — the fill is always White's share.
                  marginTop: flipped ? 0 : "auto",
                  marginBottom: flipped ? "auto" : 0,
                }}
              />
              {/* Even mark, so a glance tells you which way the position leans. */}
              <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-neutral-500/70" />
            </div>
          )}

          {/* Board */}
          <div className="relative w-[min(72vw,400px)] select-none">
            <div
              className="relative grid aspect-square w-full overflow-hidden rounded-md shadow-lg"
              style={{
                // Explicit equal rows: without these the empty ranks collapse to
                // the height of their (zero-height) contents.
                gridTemplateColumns: "repeat(8, 1fr)",
                gridTemplateRows: "repeat(8, 1fr)",
                touchAction: "manipulation",
              }}
            >
              {ranks.map((rank, r) =>
                files.map((file, f) => {
                  const square = `${file}${rank}`;
                  const occupied = !!game.get(square as Square);
                  const isLight = (r + f) % 2 === 0;
                  const isTarget = targets.some((m) => m.to === square);
                  const isSelected = selected === square;
                  const isLast =
                    lastMove &&
                    (lastMove.from === square || lastMove.to === square);
                  const coordinate = isLight ? DARK_SQUARE : LIGHT_SQUARE;
                  return (
                    <button
                      key={square}
                      onClick={() => onSquare(square)}
                      disabled={!humanToMove}
                      aria-label={square}
                      className="relative flex items-center justify-center disabled:cursor-default"
                      style={{
                        backgroundColor: isLight ? LIGHT_SQUARE : DARK_SQUARE,
                        cursor: humanToMove ? "pointer" : "default",
                      }}
                    >
                      {isLast && (
                        <span className="absolute inset-0 bg-yellow-300/35" />
                      )}
                      {isSelected && (
                        <span className="absolute inset-0 bg-emerald-400/45" />
                      )}
                      {square === checkSquare && (
                        <span className="absolute inset-0 bg-red-500/45" />
                      )}

                      {/* Coordinates, tucked into the edge squares. */}
                      {f === 0 && (
                        <span
                          className="pointer-events-none absolute left-[3px] top-[1px] text-[9px] font-semibold leading-none sm:text-[10px]"
                          style={{ color: coordinate }}
                        >
                          {rank}
                        </span>
                      )}
                      {r === 7 && (
                        <span
                          className="pointer-events-none absolute bottom-[1px] right-[3px] text-[9px] font-semibold leading-none sm:text-[10px]"
                          style={{ color: coordinate }}
                        >
                          {file}
                        </span>
                      )}

                      {isTarget && (
                        <span
                          className={
                            occupied
                              ? "absolute inset-[8%] z-20 rounded-full border-4 border-emerald-600/60"
                              : "absolute z-20 h-[26%] w-[26%] rounded-full bg-emerald-700/55"
                          }
                        />
                      )}
                    </button>
                  );
                }),
              )}

              {/* Pieces: one layer above the squares, each placed by transform so
                  a change of square animates instead of snapping. Remounted via
                  `layoutKey` when the position jumps. */}
              <div
                key={layoutKey}
                className="pointer-events-none absolute inset-0 z-10"
              >
                {layout.map((piece) => {
                  const column = files.indexOf(piece.square[0]);
                  const row = ranks.indexOf(piece.square[1]);
                  const moving = lastMove?.to === piece.square;
                  return (
                    <div
                      key={piece.id}
                      className="absolute left-0 top-0 flex items-center justify-center"
                      style={{
                        width: "12.5%",
                        height: "12.5%",
                        transform: `translate(${column * 100}%, ${row * 100}%)`,
                        transition:
                          "transform 220ms cubic-bezier(0.2, 0.8, 0.3, 1)",
                        zIndex: moving ? 2 : 1,
                      }}
                    >
                      <PieceIcon
                        color={piece.color}
                        type={piece.type}
                        className="h-[86%] w-[86%] drop-shadow-[0_1px_1px_rgba(0,0,0,0.28)]"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Promotion picker */}
            {pendingPromotion && (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50">
                <div className="flex gap-1 rounded-md bg-neutral-200 p-2 shadow-xl dark:bg-neutral-800">
                  {["q", "r", "b", "n"].map((p) => (
                    <button
                      key={p}
                      onClick={() =>
                        applyMove(
                          `${pendingPromotion.from}${pendingPromotion.to}${p}`,
                        )
                      }
                      className="flex h-11 w-11 items-center justify-center rounded hover:bg-neutral-400/50"
                      style={{ backgroundColor: LIGHT_SQUARE }}
                      aria-label={`promote to ${p}`}
                    >
                      <PieceIcon
                        color={playerColor}
                        type={p}
                        className="h-9 w-9"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Load / error overlay */}
            {status !== "ready" && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 rounded-md bg-black/75 p-4 text-center backdrop-blur-[2px]">
                {status === "loading" && (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-600 border-t-white" />
                    <span className="text-xs text-neutral-300">
                      {progress > 0
                        ? `loading Athena… ${(progress * 100).toFixed(0)}%`
                        : "loading Athena…"}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      27 MB checkpoint, then it runs entirely in your browser
                    </span>
                  </>
                )}
                {status === "error" && (
                  <>
                    <span className="text-xs text-red-400">{errorMsg}</span>
                    <Button size="sm" variant="secondary" onClick={load}>
                      Retry
                    </Button>
                  </>
                )}
              </div>
            )}

            {result && status === "ready" && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-black/60 text-white">
                <span className="text-sm font-semibold">{result}</span>
                <Button size="sm" variant="secondary" onClick={() => reset()}>
                  New game
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Athena's read on the position */}
        {showEvals && (
          <div className="w-[min(72vw,400px)] sm:w-56">
            <div className="mb-2 flex items-baseline justify-between gap-2 border-b border-neutral-300/60 pb-1 dark:border-neutral-700">
              <Small className="font-medium">{statusLabel}</Small>
              {thinkMs !== null && !thinking && (
                <Small className="text-[10px] tabular-nums opacity-60">
                  {thinkMs.toFixed(0)} ms
                </Small>
              )}
            </div>
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <Small>Athena recommends:</Small>
            </div>
            <ol className={`space-y-1 ${staleClass}`}>
              {(candidates ?? []).slice(0, 4).map((move, i) => (
                <li
                  key={move.uci}
                  className={`flex items-baseline justify-between rounded px-2 py-1 text-xs tabular-nums ${
                    i === 0
                      ? "bg-neutral-200/80 dark:bg-neutral-800"
                      : "opacity-60"
                  }`}
                >
                  <span className="font-medium">{move.san}</span>
                  <span>
                    {move.mate !== null
                      ? `mate in ${Math.max(1, Math.abs(move.mate))}`
                      : `${(move.winProb * 100).toFixed(1)}%`}
                  </span>
                </li>
              ))}
              {!candidates && (
                <li className="px-2 py-1 text-xs opacity-50">
                  {status === "ready" ? "—" : "waiting for the model…"}
                </li>
              )}
            </ol>
          </div>
        )}
      </div>

      {/* With the panel hidden there is nothing else saying whose turn it is,
          so the status moves under the board. */}
      {!showEvals && status === "ready" && (
        <Small className="-mt-1 text-center">{statusLabel}</Small>
      )}

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
        <Button
          size="sm"
          variant="outline"
          onClick={() => reset(playerColor === "w" ? "b" : "w")}
          disabled={status !== "ready"}
        >
          Play as {playerColor === "w" ? "Black" : "White"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => reset()}
          disabled={status !== "ready"}
        >
          New game
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={undo}
          disabled={
            status !== "ready" || !humanToMove || !game.history().length
          }
        >
          Take back
        </Button>
        <div className="flex items-center gap-2">
          <Switch
            id="athena-evals"
            checked={showEvals}
            onCheckedChange={setShowEvals}
          />
          <label
            htmlFor="athena-evals"
            className="cursor-pointer select-none text-sm"
          >
            Show evaluations
          </label>
        </div>
      </div>

      <Small className="max-w-lg text-center">
        This demo runs the 6.9M parameter Athena - trained on 25% of
        chessbenchmate dataset rather than the full 270M parameter model
        described below.
      </Small>
    </div>
  );
}
