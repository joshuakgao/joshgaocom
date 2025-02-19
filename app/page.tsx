"use client";

import { ProjectsList } from "@/components/content";
import { Col, H1, H2, ScrollDiv, Spacer } from "@/components/ui";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

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
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text font-bold transition-all duration-300"
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
    <ScrollDiv className="pl-6 pr-6 min-h-screen relative bg-transparent">
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
