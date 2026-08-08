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
          <Link
            href="/publications"
            className="hover:text-gray-700 transition-colors"
          >
            Publications
          </Link>
          <Link
            href="/projects"
            className="hover:text-gray-700 transition-colors"
          >
            Projects
          </Link>
        </H2>
      </Row>
    </Row>
  );
}
