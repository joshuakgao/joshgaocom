"use client";

import { getPostMetadata } from "@/components/content";
import { P, PostAbstract, PostWrapper } from "@/components/ui";

export default function ViewDelta() {
  const { year, slug, assetsPath, post } = getPostMetadata();

  return (
    <PostWrapper post={post}>
      <PostAbstract>
        <P className="text-justify">
          Large language models are increasingly being piloted in civil
          engineering firms to automate workflows and help engineers navigate
          dense design codes and specifications. However, safety critical use
          remains limited by reliability concerns, inconsistent reasoning, and
          the need for auditable, code grounded outputs suitable for quality
          control. While retrieval augmentation and agentic workflows have
          improved factuality in other domains, their effectiveness in civil
          engineering has not been systematically established, and it remains
          unclear how to scale them into transparent, code compliant design
          pipelines with reliable evaluation. To address these limitations, we
          develop the first benchmark, PE Civil Bench, consisting of
          Fundamentals of Engineering and Professional Engineering Civil
          examination questions and produce baseline scores of thirteen frontier
          and open weight large language models, including the state-of-the-art
          GPT-5.5, under baseline prompting, conventional retrieval-augmented
          generation (RAG), and agentic RAG. We then develop a
          retrieval-augmented multi-agent framework for fully automated concrete
          element design, demonstrated on reinforced concrete beams and columns,
          that infers design steps from worked examples and performs code
          retrieval, calculation, validation, and iterative self-correction with
          transparent traces. Across 33 beam configurations it produced
          code-compliant designs in all cases and closely matched ETABS
          finite-element outputs (r ≥ 0.90). Requiring only a new reference
          example and no reprogramming, the same architecture extended to column
          design. Finally, we introduce an autonomous RAG-based evaluator that
          extracts assessment criteria from reference solutions and agrees
          strongly with a traditional rule-based scorer (r = 0.976).
        </P>
      </PostAbstract>
    </PostWrapper>
  );
}
