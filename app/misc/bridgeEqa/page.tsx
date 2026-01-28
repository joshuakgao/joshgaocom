"use client";

import { PostContent, PostVideo, ScrollDiv } from "@/components/ui";

export default function BridgeEqa() {
  return (
    <ScrollDiv className="bg-white items-center p-8">
      <PostContent className="justify-center max-w-[1000px]">
        <PostVideo
          src="/assets/projects/2025/bridgeEqa/bridge_eqa.mp4"
          title="Bridge EQA"
        />
      </PostContent>
    </ScrollDiv>
  );
}
