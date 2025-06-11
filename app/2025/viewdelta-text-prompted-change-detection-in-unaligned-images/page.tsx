"use client";

import { getPostMetadata } from "@/components/content";
import { P, PostWrapper } from "@/components/ui";

export default function ViewDelta() {
  const { year, slug, assetsPath, post } = getPostMetadata();

  return (
    <PostWrapper post={post}>
      <P>
        This is a deep dive into the ViewDelta algorithm, with real-world
        examples, comparisons to baselines, and visualizations.
      </P>
      <P>
        We show significant improvements over traditional alignment-based
        methods, particularly on unstructured image pairs.
      </P>
    </PostWrapper>
  );
}
