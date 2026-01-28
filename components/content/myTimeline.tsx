import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbSeparator,
  Col,
  H3,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  P,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Row,
  Small,
  Spacer,
} from "@/components/ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuExternalLink } from "react-icons/lu";

export const timelineData = [
  {
    label: "Sharp Vision Software",
    title: "Head of AI",
    description:
      "Developed AI medical simulation prototype that secured $1.3M Defense Health Agency research funding. Engineered a secure AI deployment pipeline for U.S. Navy Fleet Readiness Center.",
    img: "/assets/projects/2023/svs-medical-simulation/thumbnail.png",
    link: "https://www.sbir.gov/awards/206325",
    date: "May 2021 – Aug 2024",
  },
  {
    label: "Structures and Aritifical Intelligence Lab",
    title: "Research Assistant",
    description: "Exploring how AI can transform real-world engineering.",
    img: "/assets/images/sail.mov",
    link: "https://sail.cive.uh.edu/",
    date: "May 2024 – Present",
  },
  {
    label: "ICCV'25 Publication",
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
                  playsInline
                  disablePictureInPicture
                  disableRemotePlayback
                  className="rounded-lg md:max-w-lg"
                  preload="auto"
                />
              ) : (
                <img
                  src={item.img}
                  alt={item.title}
                  className="rounded-lg md:max-w-lg aspect-video"
                />
              )}
            </Col>
          );

          return (
            <Row key={idx}>
              {isTouchDevice ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <H3>{item.label}</H3>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-64">
                    {content}
                  </PopoverContent>
                </Popover>
              ) : (
                <HoverCard openDelay={0} closeDelay={0}>
                  <HoverCardTrigger>
                    <H3>{item.label}</H3>
                  </HoverCardTrigger>
                  <HoverCardContent align="start" className="w-96">
                    {content}
                  </HoverCardContent>
                </HoverCard>
              )}
              <Spacer horizontal size={8} />
              {idx != timelineData.length - 1 ? <BreadcrumbSeparator /> : null}
            </Row>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
