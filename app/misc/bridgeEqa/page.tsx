"use client";

import { getPostMetadata } from "@/components/content";
import { PostContent, PostVideo, ScrollDiv } from "@/components/ui";

export default function BridgeEqa() {
  const { year, slug, assetsPath, post } = getPostMetadata();

  return (
    <ScrollDiv className="bg-white items-center p-8">
      <PostContent className="justify-center max-w-[1000px]">
        <PostVideo src={`${assetsPath}/bridge_eqa.mp4`} title="Bridge EQA" />
      </PostContent>
    </ScrollDiv>
  );
}
