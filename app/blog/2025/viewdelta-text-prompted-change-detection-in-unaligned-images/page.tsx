"use client";

import { getPostMetadata } from "@/components/content";
import { P, PostWrapper, PostLink } from "@/components/ui";

export default function ViewDelta() {
  const { year, slug, assetsPath, post } = getPostMetadata();

  return (
    <PostWrapper post={post}>
      <P>
        Remember how long it took to play spot the difference puzzles? With
        ViewDelta, you can do it in seconds!
      </P>
      <P>
        This project introduces a groundbreaking approach to change detection
        using text prompts and unaligned images, making it easier than ever to
        identify changes across various domains.
      </P>
      <P>
        Designed with a vision transformer, ViewDelta is a multimodal model that
        is capable of processing text prompts and unaligned image pairs to
        produce change segmentation maps. But unlike traditional change
        detection methods, ViewDelta can focus on relevant changes through a
        text prompt.
      </P>
      <P>
        If you want to learn more about ViewDelta, check out the{" "}
        <PostLink href="https://joshuakgao.github.io/viewdelta/">
          project website
        </PostLink>
        , read the{" "}
        <PostLink href="https://arxiv.org/pdf/2412.07612">paper</PostLink>, or
        explore the{" "}
        <PostLink href="https://github.com/drags99/ViewDelta">
          GitHub repository.
        </PostLink>
      </P>
    </PostWrapper>
  );
}
