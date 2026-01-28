"use client";

import { MyVbTimeline } from "@/components/content";
import { Col, H0, ScrollDiv, Spacer } from "@/components/ui";

export default function Volleyball() {
  return (
    <ScrollDiv className="min-h-screen relative bg-transparent">
      <>
        <Col className="w-full flex items-center justify-center p-8 lg:p-16">
          <Col className={`w-full max-w-7xl mx-4 rounded-lg space-y-4 md:my-8`}>
            <H0>Volleyball 🏐</H0>
            <Spacer size={32} />
            <MyVbTimeline />
          </Col>
        </Col>
      </>
    </ScrollDiv>
  );
}
