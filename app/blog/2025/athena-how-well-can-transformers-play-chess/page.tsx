"use client";

import { getPostMetadata } from "@/components/content";
import {
  H1,
  P,
  PostContent,
  PostImg,
  PostLink,
  PostWrapper,
} from "@/components/ui";

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
      </PostContent>
    </PostWrapper>
  );
}
