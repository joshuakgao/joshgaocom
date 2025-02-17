"use client";

import { Col, H3 } from "@/components/ui";
import ProjectItem from "@/components/ui/projectItem";

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
