"use client";

import { H3, ProjectItem } from "@/components/ui";

export function ResearchSection() {
  return (
    <>
      <H3 className="mb-4">Research</H3>
      <ProjectItem
        title="Change Detection"
        year="2024"
        link="https://google.com"
        video="assets/file_example_MP4_480_1_5MG.mp4"
      />
    </>
  );
}
