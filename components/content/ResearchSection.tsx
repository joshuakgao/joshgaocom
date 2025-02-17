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
        link="https://github.com/tugonbob/gpt-nano"
        video="assets/projects/other/gptNano/gptNanoPreview.mp4"
      />
      <ProjectItem
        title="Knn Image Search"
        year="2023"
        link="https://github.com/tugonbob/cifar-knn-classifer"
      />
      {/* <ProjectItem title="Medical Chatbot" year="2023" /> */}
      <ProjectItem
        title="Real Estate Valuation"
        year="2023"
        link="https://github.com/tugonbob/stanford-cs229-andrew-ng/blob/main/Ch1-SupervisedLearning/1-LinearRegression/1.1.1-LmsAlgorithm.ipynb"
      />
      <ProjectItem
        title="Auto Youtube"
        year="2022"
        link="https://github.com/tugonbob/reddit-laughs"
      />
      <ProjectItem
        title="Portfolio Tracker"
        year="2022"
        link="https://docs.google.com/spreadsheets/d/1xQtttuAGk5ZZ3QMbSqwCcG1vzEMsXRZjo-5jyx6V-8U/edit?usp=sharing"
      />
    </>
  );
}
