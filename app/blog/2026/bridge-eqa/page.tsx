"use client";

import { getPostMetadata } from "@/components/content";
import { P, PostAbstract, PostWrapper } from "@/components/ui";

export default function ViewDelta() {
  const { year, slug, assetsPath, post } = getPostMetadata();

  return (
    <PostWrapper post={post}>
      <PostAbstract>
        <P className="text-justify indent-10">
          Deploying embodied agents that can answer questions about their
          surroundings in realistic real-world settings remains difficult,
          partly due to the scarcity of benchmarks that faithfully capture
          practical operating conditions. We propose infrastructure inspection
          as a compelling domain for open-vocabulary Embodied Question Answering
          (EQA): it naturally demands multi-scale reasoning, long-range spatial
          understanding, and complex semantic relationships, while offering
          unique evaluation advantages via standardized National Bridge
          Inventory (NBI) condition ratings (0- 9), professional inspection
          reports, and egocentric imagery.
        </P>
        <P className="text-justify indent-10">
          We introduce BridgeEQA, a benchmark of 2,200 openvocabulary
          question-answer pairs (in the style of OpenEQA) grounded in
          professional inspection reports across 200 real-world bridge scenes
          with 47.93 images on average per scene. Questions require synthesizing
          visual evidence across multiple images and aligning responses with NBI
          condition ratings. We further propose a new EQA metric Image Citation
          Relevance to evaluate the ability of a model to cite relevant images.
        </P>
        <P className="text-justify indent-10">
          Evaluations of state-of-the-art vision-language models reveal
          substantial performance gaps under episodic memory EQA settings. To
          address this, we propose Embodied Memory Visual Reasoning (EMVR),
          which formulates inspection as sequential navigation over an
          image-based scene graph: images are nodes, and an agent takes actions
          to traverse views, compare evidence, and reason within a Markov
          decision process. EMVR shows strong performance over the baselines. We
          publicly release both the dataset and code.
        </P>
      </PostAbstract>
    </PostWrapper>
  );
}
