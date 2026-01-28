import {
  P,
  Row,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbSeparator,
  HoverCard,
  Col,
  Small,
  H3,
  PostLink,
  Spacer,
} from "@/components/ui";
import { HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuExternalLink } from "react-icons/lu";

export const timelineData = [
  {
    longLabel: "Sharp Vision Software",
    shortLabel: "SVS",
    title: "Head of AI",
    description:
      "Developed AI medical simulation prototype that secured $1.3M Defense Health Agency research funding. Engineered a secure AI deployment pipeline for U.S. Navy Fleet Readiness Center.",
    img: "/assets/projects/2023/svs-medical-simulation/thumbnail.png",
    link: "https://www.sbir.gov/awards/206325",
    date: "May 2021 – Aug 2024",
  },
  {
    longLabel: "Structures and Aritifical Intelligence Lab",
    shortLabel: "SAIL",
    title: "Research Assistant",
    description: "Exploring how AI can transform real-world engineering.",
    img: "/assets/images/sail.mov",
    link: "https://sail.cive.uh.edu/",
    date: "May 2024 – Present",
  },
  {
    longLabel: "ICCV'25 Publication",
    shortLabel: "ICCV'25",
    title: "ViewDelta Publication",
    link: "https://joshuakgao.github.io/viewdelta/",
    description:
      "Published research on text-prompted change detection in unaligned images, presented at ICCV 2025 SEA Workshop.",
    img: "/assets/projects/2025/viewDelta/viewdelta.mp4",
    date: "Oct 2025",
  },
];

export function MyTimeline() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if touch events are supported
    const hasTouchScreen =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouchScreen);
  }, []);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {timelineData.map((item, idx) => {
          const content = (
            <Col className="space-y-2">
              <Col>
                <Row>
                  <H3>{item.title}</H3>
                  <Spacer horizontal size={8} />
                  <Link href={item.link}>
                    <LuExternalLink size={16} />
                  </Link>
                </Row>
                <Small>{item.date}</Small>
              </Col>
              <P>{item.description}</P>
              <Spacer size={2} />
              {item.img.endsWith(".mov") || item.img.endsWith(".mp4") ? (
                <video
                  src={item.img}
                  autoPlay
                  loop
                  muted
                  className="rounded-lg md:max-w-lg"
                />
              ) : (
                <img
                  src={item.img}
                  alt={item.title}
                  className="rounded-lg md:max-w-lg"
                />
              )}
            </Col>
          );

          return (
            <Row key={idx} className="space-x-2">
              {idx != 0 ? <BreadcrumbSeparator /> : null}
              {isTouchDevice ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <H3>{item.shortLabel}</H3>
                  </PopoverTrigger>
                  <PopoverContent>{content}</PopoverContent>
                </Popover>
              ) : (
                <HoverCard openDelay={0} closeDelay={0}>
                  <HoverCardTrigger>
                    <H3>{item.longLabel}</H3>
                  </HoverCardTrigger>
                  <HoverCardContent className="z-50 w-96 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-hover-card-content-transform-origin]">
                    {content}
                  </HoverCardContent>
                </HoverCard>
              )}
            </Row>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
