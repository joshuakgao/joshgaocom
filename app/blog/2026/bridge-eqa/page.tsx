"use client";

import { getPostMetadata } from "@/components/content";
import { P, PostAbstract, PostWrapper } from "@/components/ui";

export default function ViewDelta() {
  const { year, slug, assetsPath, post } = getPostMetadata();

  return (
    <PostWrapper post={post}>
      <PostAbstract>
        <P className="text-justify">
          Deploying embodied agents that can answer questions about their
          surroundings in realistic real-world settings remains difficult,
          partly due to the scarcity of benchmarks for episodic memory Embodied
          Question Answering (EQA). Inspired by the challenges of infrastructure
          inspections, we propose Inspection EQA as a compelling problem class
          for advancing episodic memory EQA: it demands multi-scale reasoning
          and long-range spatial understanding, while offering standardized
          evaluation, professional inspection reports as grounding, and
          egocentric imagery. We introduce BridgeEQA, a benchmark of 2,200
          open-vocabulary question-answer pairs (in the style of OpenEQA)
          grounded in professional inspection reports across 200 real-world
          bridge scenes with 47.93 images on average per scene. We further
          propose a new EQA metric Image Citation Relevance to evaluate the
          ability of a model to cite relevant images. Evaluations of
          state-of-the-art vision-language models reveal substantial performance
          gaps. To address this, we propose Embodied Memory Visual Reasoning
          (EMVR), which formulates the inspection EQA task as a Markov decision
          process. EMVR shows strong performance over the baselines. Code and
          dataset available at:{" "}
          <a
            href="https://drags99.github.io/bridge-eqa/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            https://drags99.github.io/bridge-eqa/
          </a>
        </P>
      </PostAbstract>
    </PostWrapper>
  );
}
