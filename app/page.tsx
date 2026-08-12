"use client";

import { posts } from "@/app";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Col,
  H1,
  PostCard,
  PublicationCard,
  Row,
  ScrollDiv,
  Spacer,
} from "@/components/ui";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaGoogleScholar } from "react-icons/fa6";
import { LuArrowRight } from "react-icons/lu";
import { MdAlternateEmail } from "react-icons/md";
import { TbFileCv } from "react-icons/tb";
import { toast } from "sonner";

const ENCODED_EMAIL = "am9zaHVha2dhb0BnbWFpbC5jb20=";

async function copyEmail() {
  const email = atob(ENCODED_EMAIL);
  try {
    await navigator.clipboard.writeText(email);
    toast("Email copied to clipboard", { position: "top-center" });
  } catch {
    toast(`Clipboard unavailable — the address is ${email}`, {
      position: "top-center",
    });
  }
}

export default function Home() {
  // Filter publications (assuming they have a type or category property)
  const publications = posts.filter(
    (post) => post.contentType === "Research" || post.journal,
  );

  const projects = posts.filter((post) => post.contentType !== "Research");

  return (
    <ScrollDiv className="min-h-screen bg-transparent">
      <>
        <Col className="w-full flex items-center justify-center p-8 md:p-16">
          <Col className="w-full max-w-7xl rounded-lg space-y-8 md:my-8">
            <Spacer size={64} />
            <Col className="justify-center items-center">
              <H1 className="text-center">
                Building intelligent embodied systems.
              </H1>
              <Breadcrumb className="mt-4">
                {/* gap-3 sm:gap-3 overrides the component's own gap-1.5 sm:gap-2.5
                    so row/column spacing stays 12px at every breakpoint */}
                <BreadcrumbList className="justify-center gap-3 text-center text-[16px] leading-relaxed text-gray-600 sm:gap-3 md:flex-nowrap [&>li]:text-balance">
                  <BreadcrumbItem className="block">
                    PhD student at{" "}
                    <BreadcrumbLink
                      href="https://sail.cive.uh.edu/"
                      className="hover:text-pop"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      SAIL
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="select-none text-xl text-gray-300">
                    /
                  </BreadcrumbSeparator>
                  <BreadcrumbItem className="block">
                    Deep Learning & Robotics
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block select-none text-xl text-gray-300">
                    /
                  </BreadcrumbSeparator>
                  {/* basis-full forces its own flex line below md; auto rejoins the row at md+ */}
                  <BreadcrumbItem className="block basis-full md:basis-auto">
                    Houston, TX
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <Row className="gap-4 text-xl text-gray-500 items-center mt-4">
                <a
                  href="/assets/docs/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pop scale-[100%] hover:scale-[110%] transition-all duration-300"
                >
                  <TbFileCv size={24} />
                </a>
                <a
                  href="https://scholar.google.com/citations?user=E7cW1dQAAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pop scale-[100%] hover:scale-[110%] transition-all duration-300"
                >
                  <FaGoogleScholar />
                </a>
                <a
                  href="https://github.com/joshuakgao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pop scale-[100%] hover:scale-[110%] transition-all duration-300"
                >
                  <FaGithub />
                </a>
                <button
                  className="hover:text-pop scale-[100%] hover:scale-[110%] transition-all duration-300 cursor-pointer"
                  onClick={copyEmail}
                >
                  <MdAlternateEmail size={22} />
                </button>
              </Row>
            </Col>

            <Spacer size={128} />
            <Row className="justify-between">
              <H1>Highlighted Publications</H1>
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
              <H1>Highlighted Projects</H1>
              <Button asChild variant={"ghost"} className="text-pop">
                <Link href="/projects">
                  <Row>
                    View all projects{" "}
                    <LuArrowRight size={18} className="ml-2" />
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
                  {projects.map((props, idx) =>
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
