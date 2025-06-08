"use client";

import { PostList } from "@/components/content";
import { Col, ScrollDiv, Spacer } from "@/components/ui";

export default function Home() {
  return (
    <ScrollDiv className="min-h-screen relative bg-transparent">
      <>
        <Col className="w-full flex items-center justify-center p-4">
          <PostList />
        </Col>
      </>
      <Spacer size={256} />
    </ScrollDiv>
  );
}
