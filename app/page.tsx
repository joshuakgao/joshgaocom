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
    const colors = ["#fbf2ff", "#f2f5ff", "#fff2f2", "#fafaf9"]; // pink, blue, orange, white
    let index = 0;

    // Create a smooth transition between colors using animation frames
    const animate = () => {
      const startColor = colors[index];
      const endColor = colors[(index + 1) % colors.length];
      // Decrease duration for pink to blue transition
      const duration =
        startColor === "#fbf2ff" && endColor === "#f2f5ff"
          ? 3000 // 5 seconds for pink to blue
          : 10000; // 10 seconds for other transitions

      const startTime = performance.now();

      const interpolateColor = (
        start: string,
        end: string,
        progress: number
      ) => {
        const r1 = parseInt(start.slice(1, 3), 16);
        const g1 = parseInt(start.slice(3, 5), 16);
        const b1 = parseInt(start.slice(5, 7), 16);
        const r2 = parseInt(end.slice(1, 3), 16);
        const g2 = parseInt(end.slice(3, 5), 16);
        const b2 = parseInt(end.slice(5, 7), 16);

        const r = Math.round(r1 + (r2 - r1) * progress);
        const g = Math.round(g1 + (g2 - g1) * progress);
        const b = Math.round(b1 + (b2 - b1) * progress);

        return `#${r.toString(16).padStart(2, "0")}${g
          .toString(16)
          .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
      };

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        setBgColor(interpolateColor(startColor, endColor, progress));

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          index = (index + 1) % colors.length;
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(step);
    };

    animate();
    return () => {};
  }, []);

  return (
    <ScrollDiv
      className="pl-6 pr-6"
      style={{
        backgroundColor: bgColor,
      }}
    >
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
