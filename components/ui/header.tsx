"use client";

import { Col, H0, H1, H2, Row } from "@/components/ui";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

// Email is base64-encoded so the raw address never appears as a plain-text
// literal in the client bundle, defeating naive regex-based scrapers.
const ENCODED_EMAIL = "am9zaHVha2dhb0BnbWFpbC5jb20=";

function copyEmail() {
  const email = atob(ENCODED_EMAIL);
  toast("Email has been copied to clipboard!");
  navigator.clipboard.writeText(email);
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Row className="items-center justify-center px-1 md:px-2 w-full bg-white">
      <Row className="w-full mx-8 mt-4 justify-between">
        <Col>
          <Link href="/">
            <H0 className="md:text-2xl">Joshua Gao</H0>
          </Link>
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
                href="/assets/docs/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Resume
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
                onClick={copyEmail}
              >
                Email
              </div>
            </div>
          )}
        </div>

        {/* Desktop Links */}
        <H2 className="hidden md:flex flex-row gap-4 text-gray-500">
          <a
            href="/assets/docs/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-colors"
          >
            Resume
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
            onClick={copyEmail}
          >
            Email
          </div>
        </H2>
      </Row>
    </Row>
  );
}
