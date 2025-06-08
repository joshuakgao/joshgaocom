"use client";

import { Col, H1, H2, Row, GradientText } from "@/components/ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Row className="items-center justify-center px-2 shadow-[0_4px_8px_-4px_rgba(0,0,0,0.10)] w-full bg-white">
      <Row className="w-full mx-8 items-center justify-between">
        <Col>
          <Link href="/">
            <H1 className="translate-y-[5px]">
              <GradientText>Joshua Gao,</GradientText>
            </H1>
          </Link>
          <H2 className="pt-0 pb-0 text-gray-500 translate-y-[-5px]">
            deep learning researcher at{" "}
            <Link
              href="https://sail.cive.uh.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GradientText base="gradient" className="font-medium">
                SAIL
              </GradientText>
            </Link>
          </H2>
        </Col>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden relative">
          <button
            className="flex items-center px-3 py-2 rounded text-gray-500 hover:text-gray-700"
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

        {/* Desktop Links */}
        <H2 className="hidden md:flex flex-row gap-4 text-gray-500">
          <a
            href="/assets/docs/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-colors"
          >
            CV
          </a>
          <a
            href="https://scholar.google.com/citations?user=E7cW1dQAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-colors"
          >
            Scholar
          </a>
          <a
            href="https://github.com/joshuakgao"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-colors"
          >
            Github
          </a>
          <a
            href="mailto:joshuakgao@gmail.com"
            className="hover:text-gray-700 transition-colors"
          >
            Email
          </a>
        </H2>
      </Row>
    </Row>
  );
}
