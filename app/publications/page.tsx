"use client";

import { MyVbTimeline, posts } from "@/components/content";
import { Col, H0, PublicationCard, ScrollDiv, Spacer } from "@/components/ui";

export default function Volleyball() {
  // Filter publications (assuming they have a type or category property)
  const publications = posts.filter(
    (post) => post.contentType === "Research" || post.journal,
  );

  return (
    <ScrollDiv className="min-h-screen relative bg-transparent">
      <>
        <Col className="w-full flex items-center justify-center p-8 lg:p-16">
          <Col className={`w-full max-w-7xl mx-4 rounded-lg space-y-4 md:my-8`}>
            <H0>Publications</H0>
            <Spacer size={32} />
            <Col>
              {publications.map((props, idx) => (
                <PublicationCard key={props.slug || idx} {...props} />
              ))}
            </Col>
          </Col>
        </Col>
      </>
    </ScrollDiv>
  );
}
