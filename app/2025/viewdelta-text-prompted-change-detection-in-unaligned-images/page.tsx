"use client";

import { getPostMetadata } from "@/components/content";
import { P, PostWrapper } from "@/components/ui";

export default function ViewDelta() {
  const { year, slug, assetsPath, post } = getPostMetadata();

  return (
    <PostWrapper post={post}>
      <P>
        Change detection has long been a cornerstone of computer vision
        applications, from infrastructure monitoring to environmental analysis.
        Yet traditional methods struggle when faced with unaligned image pairs
        or unfamiliar change types. Enter ViewDelta — a groundbreaking approach
        that merges the power of vision transformers with natural language
        understanding to detect user-specified changes across a wide range of
        real-world scenarios.
      </P>
      <P>
        ViewDelta introduces a multimodal architecture capable of processing
        text prompts and unaligned image pairs to produce precise change
        segmentation maps. Unlike conventional models locked into rigid
        definitions of change, ViewDelta adapts to the user’s intent — be it
        identifying construction updates, vehicle movements, or altered
        landscapes — all through a simple text prompt.
      </P>
      <P>
        To support this new task, the team also created CSeg, the first
        large-scale dataset tailored for prompt-conditioned change detection,
        featuring over 500,000 image pairs with corresponding prompts and
        labels. With state-of-the-art performance across diverse datasets and
        domains, ViewDelta sets a new standard for flexibility, scalability, and
        accuracy in change detection.
      </P>
    </PostWrapper>
  );
}
