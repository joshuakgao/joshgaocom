"use client";

import { Col, H0, H1, H2, Row } from "@/components/ui";
import Link from "next/link";

export default function Header() {
  return (
    <Row className="items-center justify-center px-1 md:px-2 w-full bg-white">
      <Row className="w-full mx-8 mt-4 justify-between">
        <Col>
          <Link href="/">
            <H0 className="text-xl md:text-2xl hover:text-gray-500 transition-all">
              Joshua Gao
            </H0>
          </Link>
        </Col>

        {/* Desktop Links */}
        <H2 className="text-md md:text-xl flex flex-row gap-4 text-gray-500 items-center">
          <a
            href="/assets/docs/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-colors"
          >
            Publications
          </a>
          <a
            href="https://scholar.google.com/citations?user=E7cW1dQAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-colors"
          >
            Projects
          </a>
        </H2>
      </Row>
    </Row>
  );
}
