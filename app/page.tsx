"use client";

import { ProjectsList } from "@/components/content";
import { Col, H1, H2, Row, ScrollDiv, Spacer } from "@/components/ui";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const Header = () => (
    <Row
      className={`items-center justify-center p-x-2 shadow-[0_4px_8px_-4px_rgba(0,0,0,0.10)] w-full`}
    >
      <Row className={`w-full max-w-7xl items-center justify-between`}>
        <Col>
          <H1>Joshua Gao,</H1>
          <H2 className="pt-0 text-gray-500">
            deep learning researcher at{" "}
            <a
              href="https://sail.cive.uh.edu/people"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text font-bold transition-all duration-300"
            >
              SAIL
            </a>
          </H2>
        </Col>
        {useMediaQuery({ maxWidth: 768 }) ? (
          // Hamburger menu for small screens
          <div className="relative">
            <button
              className="flex items-center px-3 py-2 rounded text-gray-500 hover:text-gray-700 hover:border-gray-700"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Open menu"
            >
              <svg className="fill-current h-5 w-5" viewBox="0 0 20 20">
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50">
                <a
                  href="/assets/docs/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  CV
                </a>
                <a
                  href="https://scholar.google.com/citations?user=E7cW1dQAAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Scholar
                </a>
                <a
                  href="https://github.com/tugonbob"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Github
                </a>
                <a
                  href="mailto:joshuakgao@gmail.com"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Email
                </a>
              </div>
            )}
          </div>
        ) : (
          <H2 className="flex flex-row gap-4 text-gray-500">
            <a
              href="/assets/docs/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
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
        )}
      </Row>
    </Row>
  );

  return (
    <ScrollDiv className="min-h-screen relative bg-transparent">
      <>
        <Col className="w-full flex items-center justify-center p-4">
          <Header />
          <Spacer size={128} />
          <ProjectsList />
        </Col>
      </>
      <Spacer size={256} />
    </ScrollDiv>
  );
}
