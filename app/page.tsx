"use client";

import { ProjectsList } from "@/components/content";
import { Col, H1, H2, ScrollDiv, Spacer } from "@/components/ui";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [bgColor, setBgColor] = useState("#fafaf9");

  useEffect(() => {
    const colors = ["#fafaf9", "#fbf2ff", "#f2f5ff", "#fff2f2"]; // pink, blue, orange, white
    let index = 0;

    // Create a smooth transition between colors using animation frames
    const animate = () => {
      const startColor = colors[index];
      const endColor = colors[(index + 1) % colors.length];
      const duration = 10000; // 10 seconds for other transitions

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

  const Bio = () => (
    <>
      <H1>
        Joshua Gao,
        <br />
        deep learning researcher at{" "}
        <a
          href="https://sail.cive.uh.edu/people"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text font-bold transition-all duration-300"
        >
          SAIL
        </a>
      </H1>
      <H2 className="flex flex-row gap-4 text-gray-500">
        <a href="/assets/docs/cv.pdf" target="_blank" rel="noopener noreferrer">
          CV
        </a>
        <a
          href="https://scholar.google.com/citations?user=E7cW1dQAAAAJ&hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          Scholar
        </a>
        <a
          href="https://github.com/tugonbob"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a href="mailto:joshuakgao@gmail.com">Email</a>
      </H2>
    </>
  );

  const asOfDate = "Feb '24";

  return (
    <ScrollDiv
      className="pl-6 pr-6 min-h-screen relative"
      style={{ backgroundColor: bgColor }}
    >
      {isMobile ? (
        <>
          <Col className="pt-[calc(20vh)] pb-[calc(20vh)]">
            <Bio />
          </Col>
          <Col>
            <ProjectsList />
          </Col>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <p className="text-xs text-gray-400">As of {asOfDate}</p>
          </div>
        </>
      ) : (
        <>
          <Col className={`w-2/5 pl-[calc(15vw-80px)] pt-[calc(25vh)]`}>
            <ProjectsList />
          </Col>
          <Col className="fixed right-0 top-0 h-full w-3/5 flex items-start justify-center pl-6">
            <Bio />
          </Col>
          <div className="fixed bottom-6 right-6 text-sm text-gray-500">
            <p className="text-xs text-gray-400">As of {asOfDate}</p>
          </div>
        </>
      )}
      <Spacer size={64} />
    </ScrollDiv>
  );
}
