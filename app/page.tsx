"use client";

import { posts, MyTimeline } from "@/components/content";
import {
  Col,
  H0,
  P,
  PostCard,
  Row,
  ScrollDiv,
  Small,
  Spacer,
} from "@/components/ui";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

export default function Home() {
  // Filter publications (assuming they have a type or category property)
  const publications = posts.filter(
    (post) => post.contentType === "Research" || post.journal
  );

  return (
    <ScrollDiv className="min-h-screen relative bg-transparent">
      <>
        <Col className="w-full flex items-center justify-center p-8 lg:p-16">
          <Col className={`w-full max-w-7xl mx-4 rounded-lg space-y-4 md:my-8`}>
            <H0>My AI Journey</H0>
            <MyTimeline />

            <Spacer size={32} />

            <Row className="justify-between">
              <H0>Latest Works</H0>
              <Button asChild variant={"ghost"} className="text-blue-500">
                <Link href="/blog">
                  <Row>
                    View all works <LuArrowRight size={18} className="ml-2" />
                  </Row>
                </Link>
              </Button>
            </Row>

            <Spacer size={32} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {posts.slice(0, 3).map((props, idx) => (
                <PostCard key={props.slug || idx} {...props} />
              ))}
            </div>

            <Spacer size={64} />

            {/* Improved Publications Section */}
            <Row className="justify-between items-end">
              <H0>Publications</H0>
              {/* <PostLink href="/publications">View all publications</PostLink> */}
            </Row>

            <Spacer size={32} />

            <div className="mt-8 space-y-8">
              {publications.map((publication, idx) => (
                <Link
                  href={`/blog/${publication.year}/${publication.slug}`}
                  key={publication.slug || idx}
                >
                  <Row className="items-start gap-6 p-4 border-b border-gray-20 hover:bg-gray-50 transition-colors duration-300">
                    {/* Date for larger screens - hidden on small screens */}
                    <div className="flex-shrink-0 w-32 hidden sm:block">
                      <P>{publication.date}</P>
                    </div>

                    <Col className="align-start justify-start flex-1">
                      {/* Date for small screens - shown only on small screens */}
                      <P className="sm:hidden mb-2">{publication.date}</P>
                      <P className="text-black">{publication.title}</P>
                      <Small>{publication.authors?.join(", ")}</Small>
                      <Small>{publication.journal}</Small>
                    </Col>
                  </Row>
                </Link>
              ))}
            </div>
          </Col>
        </Col>
        <Spacer size={256} />
      </>
    </ScrollDiv>
  );
}
