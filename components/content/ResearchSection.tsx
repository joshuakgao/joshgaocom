"use client";

import { H3, ProjectItem, Spacer } from "@/components/ui";

export function ResearchSection() {
  return (
    <>
      <H3 className="mb-4">Research Publications</H3>
      <ProjectItem
        title="Change Detection"
        year="2024"
        link="https://arxiv.org/abs/2412.07612v1"
        video="assets/file_example_MP4_480_1_5MG.mp4"
      />
      <Spacer size={64} />

      <H3 className="mb-4">Other Works</H3>
      <ProjectItem
        title="Gpt Nano"
        year="2023"
        video="assets/projects/other/gptNano/gptNanoPreview.mp4"
        link="https://github.com/tugonbob/gpt-nano"
      />
      <ProjectItem title="Knn Image Search" year="2023" />
      <ProjectItem
        title="Real Estate Valuation"
        year="2023"
        // link="https://arxiv.org/abs/2412.07612v1"
        video="assets/file_example_MP4_480_1_5MG.mp4"
      />
      <ProjectItem title="Auto Youtube" year="2022" />
      <ProjectItem title="Portfolio Tracker" year="2022" />
    </>
  );
}
