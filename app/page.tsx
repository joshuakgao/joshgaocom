"use client";

import { ProjectsList } from "@/components/content";
import { Col, H1, H2, Row, ScrollDiv, Spacer } from "@/components/ui";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  return (
    <ScrollDiv className="min-h-screen relative bg-transparent">
      <>
        <Col className="w-full flex items-center justify-center p-4">
          <ProjectsList />
        </Col>
      </>
      <Spacer size={256} />
    </ScrollDiv>
  );
}
