"use client";

import { getPostMetadata } from "@/components/content";
import { H1, P, PostContent, PostLink, PostWrapper } from "@/components/ui";

export default function Athena() {
  const { year, slug, assetsPath, post } = getPostMetadata();

  return (
    <PostWrapper post={post}>
      <PostContent>
        <P className="italic">
          Presenting Athena: Follow how this transformer based chess model
          achieves an ELO of 2500!
        </P>
        <H1>Approach</H1>
        <P>
          Drawing inspiration from{" "}
          <PostLink href="https://arxiv.org/pdf/2402.04494">
            Ruoss et al.
          </PostLink>
          , I distill Stockfish 17's ability to play chess into a transformer
          model. I label 15.3 billion chess positions using Stockfish 17 to
          create a comprehensive dataset for training.
        </P>

        <H1>Chessbenchmate Dataset</H1>
        <P>
          The dataset consists of all unique board positions based on 10 million{" "}
          <PostLink href="https://database.lichess.org">LiChess</PostLink>{" "}
          games. For each unique position, all legal moves were labeled with
          Stockfish 17 for 0.05 seconds with unbounded depth for win probability
          and mate-in-N. This results in 15.3 billion position and move pairs.
          Note that positions that mate-in-N are labeled with win probability of
          0% or 100% depending on which side is potentially mated.
        </P>
      </PostContent>
    </PostWrapper>
  );
}
