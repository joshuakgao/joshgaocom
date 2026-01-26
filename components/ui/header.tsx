"use client";

import { Col, GradientText, H1, H2, H3, H4, Row } from "@/components/ui";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <Row className="items-center justify-center px-1 md:px-2 w-full bg-white">
      <Row className="w-full mx-8 items-center justify-between">
        <Col>
          <Link href="/">
            <Row className="translate-y-[5px]">
              <H1
                className="text-lg md:text-2xl"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <GradientText parentHovered={hovered}>Joshua Gao</GradientText>
              </H1>
            </Row>
          </Link>
          <Row>
            <H2 className="text-gray-500 text-md md:text-xl translate-y-[-5px]">
              deep learning researcher at
            </H2>
            <Link
              href="https://sail.cive.uh.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GradientText
                base="gradient"
                className="text-sm md:text-lg font-bold translate-y-[-4.5px] md:translate-y-[-3.5px] translate-x-[5px]"
              >
                SAIL
              </GradientText>
            </Link>
          </Row>
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
              <div
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  toast("Email has been copied to clipboard!");
                  navigator.clipboard.writeText("joshuakgao@gmail.com");
                }}
              >
                Email
              </div>
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
          <div
            className="hover:text-gray-700 transition-colors cursor-pointer"
            onClick={() => {
              toast("Email has been copied to clipboard!");
              navigator.clipboard.writeText("joshuakgao@gmail.com");
            }}
          >
            Email
          </div>
        </H2>
      </Row>
    </Row>
  );
}
