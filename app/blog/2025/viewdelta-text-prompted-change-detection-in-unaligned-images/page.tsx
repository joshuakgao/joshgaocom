"use client";

import { getPostMetadata } from "@/components/content";
import { PostAbstract, PostContent, PostWrapper } from "@/components/ui";

export default function ViewDelta() {
  const { year, slug, assetsPath, post } = getPostMetadata();

  return (
    <PostWrapper post={post}>
      <PostAbstract>
        We introduce a generalized framework for Scene Change Detection (SCD)
        that addresses the core ambiguity of distinguishing “relevant” from
        “nuisance” changes, enabling effective joint training of a single model
        across diverse domains and applications. Existing methods struggle to
        generalize due to differences in dataset labeling, where changes such as
        vegetation growth or lane marking alterations may be labeled as relevant
        in one dataset and irrelevant in another. To resolve this ambiguity, we
        propose ViewDelta, a text conditioned change detection framework that
        uses natural language prompts to define relevant changes precisely, such
        as a single attribute, a specific set of classes, or all observable
        differences. To facilitate training in this paradigm, we release the
        Conditional Change Segmentation dataset (CSeg), the first large-scale
        synthetic dataset for text conditioned SCD, consisting of over 500,000
        image pairs with more than 300,000 unique textual prompts describing
        relevant changes. Experiments demonstrate that a single ViewDelta model
        trained jointly on CSeg, SYSU-CD, PSCD, VL-CMU-CD, and their unaligned
        variants achieves performance competitive with or superior to dataset
        specific models, highlighting text conditioning as a powerful approach
        for generalizable SCD. Our code and dataset are available at
        joshuakgao.github.io/viewdelta/.
      </PostAbstract>
    </PostWrapper>
  );
}
