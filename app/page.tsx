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
    <ScrollDiv>
      <ScreenSizeIndicator />
      {isMobile ? (
        <></>
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
          <Col className="fixed right-0 top-0 h-full w-2/3 flex items-center justify-center">
            <H1>
              Joshua Gao,
              <br />
              deep learning researcher at SAIL lab
            </H1>
          </Col>
        </>
      )}
    </ScrollDiv>
  );
}
