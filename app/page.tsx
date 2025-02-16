"use client";

import me from "@/assets/images/me.jpg";
import {
  Col,
  H1,
  H2,
  H4,
  Row,
  Spacer,
  ScrollDiv,
  ScreenSizeIndicator,
  H3,
} from "@/components/ui";
import Image from "next/image";
import ProjectItem from "@/components/ui/projectItem";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <ScrollDiv className="pl-6 pr-6">
      <ScreenSizeIndicator />
      {isMobile ? (
        <>
          <div className="pt-[calc(20vh)] pb-[calc(20vh)]">
            <H1>
              Joshua Gao,
              <br />
              deep learning researcher at SAIL lab
            </H1>
          </div>
          <div className="">
            <H3 className="mb-4">Research</H3>
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
          </div>
        </>
      ) : (
        <>
          <Col className={`w-1/3 pl-[calc(10vw)] pt-[calc(25vh)]`}>
            <H3 className="mb-4">Research</H3>
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
            <ProjectItem title="Change Detection" year="2024" />
          </Col>
          <div className="fixed right-0 top-0 h-full w-2/3 flex items-center justify-center">
            <H1>
              Joshua Gao,
              <br />
              deep learning researcher at SAIL lab
            </H1>
          </div>
        </>
      )}
    </ScrollDiv>
  );
}
