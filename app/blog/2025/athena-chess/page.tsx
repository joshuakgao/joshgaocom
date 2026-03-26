"use client";

import { getPostMetadata } from "@/components/content";
import {
  Col,
  H1,
  H2,
  MultilineCode,
  P,
  PostContent,
  PostImg,
  PostLink,
  PostWrapper,
  Row,
  Small,
} from "@/components/ui";
import { BlockMath, InlineMath } from "react-katex";

export default function Athena() {
  const { year, slug, assetsPath, post } = getPostMetadata();

  return (
    <PostWrapper post={post}>
      <PostContent>
        <P className="italic">
          Presenting Athena: Follow how this transformer based chess model
          achieves an ELO of 2000!
        </P>
        <H1>Approach</H1>
        <P>
          I distill Stockfish 17's ability to play chess into a transformer
          model. I label 15.3 billion chess positions using Stockfish 17 to
          create a comprehensive dataset for training. This work is heavily
          inspired by:{" "}
          <PostLink href="https://arxiv.org/pdf/2402.04494">
            Ruoss et al.
          </PostLink>
        </P>
        <H1>Method</H1>
        <H2>Chessbenchmate Dataset</H2>
        <P>
          The dataset consists of all unique board positions based on 10 million{" "}
          <PostLink href="https://database.lichess.org">LiChess</PostLink>{" "}
          games. For each unique position, all legal moves were labeled with
          Stockfish 17 for 0.05 seconds with unbounded depth for{" "}
          <i>win probability and mate-in-N.</i>
        </P>
        <P>
          We convert Stockfish 17's centipawn evaluation to a win percentage
          with a sigmoid function:
        </P>
        <Col className="items-center w-full">
          <BlockMath math="P(\text{win}) = \frac{1}{1 + e^{-cp / 173.718}}" />
        </Col>
        <P>
          This results in 15.3 billion position and move pairs. Note that
          positions that mate-in-N are labeled with win probability of 0% or
          100% depending on which side is potentially mated.
        </P>
        <H2>Architecture</H2>
        <P>
          Athena is a 270 million parameter transformer that is trained on the
          Chessbenchmate dataset. Other architectures like ResNet, ViT's, and
          Mamba were explored. However, during initial testing, the transformer
          architecture yielded strong results over the other architectures.
        </P>
        <H2>Input Encoding</H2>
        <P>
          Each position is converted from a FEN string into tokens by assigning
          each possible FEN character a token integer ID - a total of 78
          character tokens. The UCI move is encoded by assigning all possible
          moves for all pieces a unique token integer ID - a total of 1968 total
          possible moves.
        </P>
        <MultilineCode>
          <Small>fen_tokens → [0, 34, 12, 7, ..., 45]</Small>
          <Small>move_token → 843</Small>
        </MultilineCode>
        <H2>Output Encoding</H2>
        <P>
          Chessbenchmate's probability and mate-in-N pairs are encoded into{" "}
          <InlineMath math="K+(M*2)+1" /> evaluation bins structured where the
          lower you are indexed in the bins, the more likely you are to lose and
          vice versa. The bins are structured like so:
        </P>
        <MultilineCode>
          <Small>
            [ negative mates | win prob bins | positive mates | checkmate ]
          </Small>
          <Small># or</Small>
          <Small>
            [-M, ..., -2, -1, wp_0, wp_1, ..., wp_(k-1), +M, ..., +2, +1, #]
          </Small>
        </MultilineCode>
        <H1>Experiments</H1>
        <H2>Athena Training</H2>
        <P>
          We evaluate our trained models using a set of 10 thousand chess
          puzzles. The higher number of puzzles the model can solve the better
          the model should play chess.
        </P>
        <P>
          During our training run, achieves a puzzle accuracy of 80.15% after
          training on 40% of Chessbenchmate, or over 6.12 billion positions. We
          do not train for a full epoch due to diminishing returns on invested
          time and compute.
        </P>
        <PostImg
          src={`${assetsPath}/wandb_puzzle_accuracy.png`}
          alt="Wandb Puzzle Accuracy"
        />
        <P>
          Athena's puzzle accuracy decreases significantly as puzzle difficulty
          increases, but is still able to solve a decent chunk of the hardest
          puzzles.
        </P>
        <PostImg src={`${assetsPath}/elo_accuracy.png`} alt="Elo Accuracy" />
        <P>
          Additionally, Athena reaches a surprisingly strong peak elo of 2000 on
          Lichess against other bots. You can challenge Athena or watch it play
          other bots{" "}
          <PostLink href="https://lichess.org/@/athena-bot">here</PostLink>.
        </P>
        <H2>Other Bin Values and Encoders</H2>
        <P>
          The original{" "}
          <PostLink href="https://arxiv.org/pdf/2402.04494">
            Ruoss et al.
          </PostLink>{" "}
          paper used a rather inelegant solution to its discussed limitation of
          "Indecisiveness in the face of overwhelming victory". This occurs when
          the agent is in a very strong position and many moves result in a high
          output bin. Since the agent doesn't have position history, it tends to
          shuffle its pieces back and forth since the resulting evaluation is
          still high. The authors hand off the chess game to Stockfish whenever
          the agent achieves an "inevitable win" position to close out the game.
        </P>
        <P>
          We try and solve this by not only adding the mating bins, but also
          trying to dramatically increase the number of bins, as well as an
          arcsin output encoder.
        </P>
        <Col className="items-center w-full">
          <PostImg
            src={`${assetsPath}/bin_ablation.png`}
            alt="Bin Ablations"
            className="max-w-md"
          />
        </Col>
        <P>
          Through these results, it is clear that adding mating bins does
          improve performance, but only by a small margin. Arcsin bin encoding
          doesn't significantly improve performance.
        </P>
        <H1>Limitations</H1>
        Although mating bins do mitigate the "Indecisiveness in the face of
        overwhelming victory" issue, there are still many chess positions that
        are completely winning, but no clear mating pattern exists. Athena still
        struggles with this issue, and other methods should be explored. A good
        first step may be to provide the agent with some level of move history.
        Additionally, the win probability output bins may not be the best way to
        decisively rank all moves. Training a transformer to output what is the
        best move, rather than training the transformer to evaluate a position
        move pair, may be a better approach.
        <H1>Conclusion</H1>
        <P>
          Despite Athena not achieving stronger performance than in the{" "}
          <PostLink href="https://arxiv.org/pdf/2402.04494">
            Ruoss et al.
          </PostLink>{" "}
          due to compute restraints, Athena is still a very strong chess engine.
          It absolutely stomps me in every game I played against it lol.
        </P>
      </PostContent>
    </PostWrapper>
  );
}
