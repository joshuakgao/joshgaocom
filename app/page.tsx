"use client";

import { posts } from "@/app";
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Col,
  H0,
  H1,
  H2,
  P,
  PostCard,
  PublicationCard,
  Row,
  ScrollDiv,
  Spacer,
} from "@/components/ui";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

export default function Home() {
  // Filter publications (assuming they have a type or category property)
  const publications = posts.filter(
    (post) => post.contentType === "Research" || post.journal,
  );

  const works = posts.filter((post) => post.contentType !== "Research");
  const Sep = () => (
    <span className="mx-2 text-gray-300 select-none text-xl">/</span>
  );

  return (
    <ScrollDiv className="min-h-screen bg-transparent">
      <>
        <Col className="w-full flex items-center justify-center p-8 md:p-16">
          <Col className={`w-full max-w-7xl rounded-lg space-y-8 md:my-8`}>
            <Spacer horizontal />
            <Col className="justify-center items-center gap-y-4">
              <H1 className="text-center mt-16">
                Building intelligent embodied systems.
              </H1>
              <Row className="text-center justify-center">
                <P className="text-gray-600 leading-relaxed">PhD student</P>
                <Sep />
                <P>
                  <a
                    href="https://sail.cive.uh.edu/"
                    className="hover:text-pop transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    SAIL
                  </a>
                </P>
                <Sep />
                <P>
                  Advisor:{" "}
                  <a
                    href="https://scholar.google.com/citations?user=f9M0CiIAAAAJ&hl=en&oi=ao"
                    className="hover:text-pop transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Dr. Hoskere
                  </a>
                </P>
              </Row>
            </Col>

            <Spacer size={128} />
            <Row className="justify-between">
              <Col>
                <H1>Highlighted Publications</H1>
              </Col>
              <Button asChild variant={"ghost"} className="text-pop">
                <Link href="/publications">
                  <Row>
                    View all publications{" "}
                    <LuArrowRight size={18} className="ml-2" />
                  </Row>
                </Link>
              </Button>
            </Row>
            <Col>
              {publications.map((props, idx) =>
                props.starred ? (
                  <PublicationCard key={props.slug || idx} {...props} />
                ) : null,
              )}
            </Col>

            <Spacer size={64} />
            <Row className="justify-between">
              <H1>Highlighted Works</H1>
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
                  {works.map((props, idx) =>
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
          </Col>
        </Col>
        <Spacer size={128} />
      </>
    </ScrollDiv>
  );
}
