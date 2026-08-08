"use client";

import { getPostMetadata } from "@/components/content";
import {
  H1,
  H2,
  H3,
  MultilineCode,
  P,
  PostContent,
  PostLink,
  PostWrapper,
  Small,
} from "@/components/ui";
import { InlineMath } from "react-katex";
import FlappyWorldDemo from "./FlappyWorldDemo";

export default function FlappyWorld() {
  const { assetsPath, post } = getPostMetadata();

  return (
    <PostWrapper post={post}>
      <PostContent className="items-center">
        <FlappyWorldDemo basePath={assetsPath} />
      </PostContent>

      <PostContent>
        <H1>Overview</H1>

        <H1>Method</H1>

        <H2>Environment</H2>

        <H2>Baselines</H2>

        <H2>Collecting a behaviourally diverse dataset</H2>

        <H2>The world model</H2>

        <H1>Experiments</H1>

        <H1>Limitations</H1>

        <H1>Conclusion</H1>
      </PostContent>
    </PostWrapper>
  );
}
