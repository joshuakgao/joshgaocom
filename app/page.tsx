"use client";

import {
  Col,
  H1,
  H2,
  H3,
  ScreenSizeIndicator,
  ScrollDiv,
} from "@/components/ui";
import ProjectItem from "@/components/ui/projectItem";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

export default function Home() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [bgColor, setBgColor] = useState("#fafaf9");

  useEffect(() => {
    const colors = ["#fffcff", "#fafdff", "#fffcf7", "#fafaf9"]; // pink, blue, orange, white
    let index = 0;
    const interval = setInterval(() => {
      setBgColor(colors[index]);
      index = (index + 1) % colors.length;
    }, 5000); // Change color every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollDiv
      className={`pl-6 pr-6 transition-colors duration-500`}
      style={{ backgroundColor: bgColor }}
    >
      <ScreenSizeIndicator />
      {isMobile ? (
        <>
          <Col className="pt-[calc(20vh)] pb-[calc(20vh)]">
            <H1>
              Joshua Gao,
              <br />
              deep learning researcher at SAIL lab
            </H1>
            <H2 className="flex flex-row gap-4 text-gray-500">
              <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                CV
              </a>
              <a href="mailto:joshuakgao@gmail.com">Email</a>
              <a
                href="https://www.linkedin.com/in/joshua-gao"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/joshua-gao"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </H2>
          </Col>
          <Col>
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
          <Col className="fixed right-0 top-0 h-full w-3/5 flex items-start justify-center pl-6">
            <div>
              <H1>
                Joshua Gao,
                <br />
                deep learning researcher at SAIL lab
              </H1>
              <H2 className="flex flex-row gap-4 text-gray-500">
                <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                  CV
                </a>
                <a href="mailto:joshuakgao@gmail.com">Email</a>
                <a
                  href="https://www.linkedin.com/in/joshua-gao"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/joshua-gao"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </H2>
            </div>
          </Col>
        </>
      )}
    </ScrollDiv>
  );
}
