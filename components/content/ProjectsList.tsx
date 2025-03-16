"use client";

import { H3, ProjectItem, Spacer } from "@/components/ui";

export function ProjectsList() {
  return (
    <div>
      <H3 className="mb-4">Research Publications</H3>
      <ProjectItem
        title="Change Detection"
        year="2024"
        link="https://joshuakgao.github.io/viewdelta/"
        video="assets/file_example_MP4_480_1_5MG.mp4"
        starred
      />
      <Spacer size={64} />

      <H3 className="mb-4">Other Works</H3>
      <ProjectItem
        title="Self Hosted Cloud"
        year="2024"
        link="https://cloud.joshgao.com"
        video="assets/projects/other/selfHostedCloud/selfHostedCloudPreview.mp4"
      />
      <ProjectItem
        title="Gpt Nano"
        year="2023"
        link="https://github.com/tugonbob/gpt-nano"
        video="assets/projects/other/gptNano/gptNanoPreview.mp4"
        starred
      />
      <ProjectItem
        title="Image Search"
        year="2023"
        link="https://github.com/tugonbob/cifar-knn-classifer"
        video="assets/projects/other/imageSearch/imageSearchPreview.mp4"
      />
      {/* <ProjectItem title="Medical Chatbot" year="2023" /> */}
      <ProjectItem
        title="Real Estate Valuation"
        year="2023"
        link="https://github.com/tugonbob/stanford-cs229-andrew-ng/blob/main/Ch1-SupervisedLearning/1-LinearRegression/1.1.1-LmsAlgorithm.ipynb"
        video="assets/projects/other/realEstateValuation/realEstateValuationPreview.mp4"
      />
      <ProjectItem
        title="Auto Youtube"
        year="2022"
        link="https://github.com/tugonbob/reddit-laughs"
        video="assets/projects/other/autoYoutube/autoYoutubePreview.mp4"
      />
      <ProjectItem
        title="Portfolio Tracker"
        year="2022"
        link="https://docs.google.com/spreadsheets/d/1xQtttuAGk5ZZ3QMbSqwCcG1vzEMsXRZjo-5jyx6V-8U/edit?usp=sharing"
        video="/assets/projects/other/portfolioTracker/portfolioTrackerPreview.mp4"
      />
    </div>
  );
}
