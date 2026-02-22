"use client";

import { MyTimeline, posts } from "@/components/content";
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Col,
  H1,
  H2,
  P,
  PostCard,
  Row,
  ScrollDiv,
  Small,
  Spacer,
} from "@/components/ui";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

export default function Home() {
  // Filter publications (assuming they have a type or category property)
  const publications = posts.filter(
    (post) => post.contentType === "Research" || post.journal,
  );

  return (
    <ScrollDiv className="min-h-screen bg-transparent">
      <>
        <Col className="w-full flex items-center justify-center p-8 md:p-16">
          <Col className={`w-full max-w-7xl rounded-lg space-y-8 md:my-8`}>
            <Col>
              <H1>My AI Timeline</H1>
              <H2>A snapshot of my major milestones</H2>
            </Col>
            <MyTimeline />

            <Spacer size={64} />
            <Row className="justify-between">
              <Col>
                <H1>Things I've Built</H1>
                <H2>From research papers to weekend tinkering</H2>
              </Col>
              <Button asChild variant={"ghost"} className="text-pop">
                <Link href="/blog">
                  <Row>
                    View all works <LuArrowRight size={18} className="ml-2" />
                  </Row>
                </Link>
              </Button>
            </Row>

            <Col className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] pb-16">
              <Carousel
                className="relative"
                opts={{
                  align: "start",
                  loop: false,
                }}
              >
                <CarouselContent className="ml-[max(1rem,calc((98vw-theme(maxWidth.7xl))/2))] md:ml-[max(3rem,calc((98vw-theme(maxWidth.7xl))/2))] mr-[max(1rem,calc((96vw-theme(maxWidth.7xl))/2))] md:mr-[max(3rem,calc((96vw-theme(maxWidth.7xl))/2))]">
                  {posts.map((props, idx) =>
                    props.starred ? (
                      <CarouselItem
                        key={props.slug || idx}
                        className="basis-[340px] md:basis-[430px] mr-4 md:mr-8"
                      >
                        <PostCard {...props} />
                      </CarouselItem>
                    ) : null,
                  )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </Col>

            <Spacer size={64} />

            <H1>Publications</H1>
            <Col>
              {publications.map((publication, idx) => (
                <Link
                  href={`/blog/${publication.year}/${publication.slug}`}
                  key={publication.slug || idx}
                >
                  <Row className="items-start gap-6 p-4 border-b border-gray-20 hover:bg-gray-50 transition-colors duration-300">
                    {/* Date for larger screens - hidden on small screens */}
                    <Row className="flex-shrink-0 w-32 hidden md:block">
                      <P>{publication.date}</P>
                    </Row>

                    <Col className="align-start justify-start flex-1">
                      {/* Date for small screens - shown only on small screens */}
                      <P className="md:hidden mb-2">{publication.date}</P>
                      <P className="text-black">{publication.title}</P>
                      <Small>{publication.authors?.join(", ")}</Small>
                      <Small>{publication.journal}</Small>
                    </Col>
                  </Row>
                </Link>
              ))}
            </Col>
            <Spacer size={64} />
            <H1>Misc</H1>
            <Col>
              <Button
                asChild
                variant={"ghost"}
                className="text-pop justify-start"
              >
                <Link href="/misc/volleyball">
                  <Row>
                    Volleyball Timeline{" "}
                    <LuArrowRight size={18} className="ml-2" />
                  </Row>
                </Link>
              </Button>
            </Col>
          </Col>
        </Col>
        <Spacer size={256} />
      </>
    </ScrollDiv>
  );
}
