"use client";

import { getPostMetadata } from "@/components/content";
import { PostContent, PostWrapper } from "@/components/ui";

export default function ViewDelta() {
  const { year, slug, assetsPath, post } = getPostMetadata();

  return (
    <PostWrapper post={post}>
      <PostContent>Under construction...</PostContent>
    </PostWrapper>
  );
}
