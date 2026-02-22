import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbSeparator,
  Col,
  H3,
  P,
  Row,
  Small,
  Spacer,
} from "@/components/ui";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { LuExternalLink } from "react-icons/lu";

const CYCLE_INTERVAL = 4000;

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
    label: "Structures and Artificial Intelligence Lab",
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
      "ICCV 2025 SEA Workshop research publication on text-prompted change detection in unaligned images.",
    img: "/assets/projects/2025/viewDelta/viewdelta.mp4",
    date: "Oct 2025",
  },
  {
    label: "CVPR'26 Publication",
    title: "BridgeEQA Publication",
    link: "https://joshgao.com/blog/2026/bridge-eqa",
    description:
      "CVPR 2026 research publication on virtual embodied agents for real bridge inspections.",
    img: "/assets/projects/2026/bridgeEQA/bridge_eqa.mp4",
    date: "Jun 2026",
  },
];

const LAST = timelineData.length - 1;

export function MyTimeline() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [visible, setVisible] = useState(true);
  const activeIdxRef = useRef(activeIdx);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const transitionTo = useCallback((idx: number) => {
    setVisible(false);
    setTimeout(() => {
      activeIdxRef.current = idx;
      setActiveIdx(idx);
      setVisible(true);
    }, 200);
  }, []);

  const startCycle = useCallback(
    (firstTickDelay?: number) => {
      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setTimeout(() => {
        const prev = activeIdxRef.current;
        const next = prev === LAST ? 0 : prev + 1;
        transitionTo(next);

        timerRef.current = setInterval(() => {
          const p = activeIdxRef.current;
          const n = p === LAST ? 0 : p + 1;
          transitionTo(n);
        }, CYCLE_INTERVAL);
      }, firstTickDelay ?? CYCLE_INTERVAL);
    },
    [transitionTo],
  );

  useEffect(() => {
    startCycle();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startCycle]);

  const handleSelect = (idx: number) => {
    if (idx === activeIdxRef.current) return;
    transitionTo(idx);
    startCycle(10000);
  };

  const item = timelineData[activeIdx];
  const isVideo = item.img.endsWith(".mov") || item.img.endsWith(".mp4");

  return (
    <Col className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          {timelineData.map((entry, idx) => (
            <Row key={idx} className="items-center">
              <button
                onClick={() => handleSelect(idx)}
                className={`bg-transparent border-0 p-0 cursor-pointer transition-colors duration-200 ${
                  activeIdx === idx ? "text-accent" : "text-gray-400"
                }`}
              >
                <H3>{entry.label}</H3>
              </button>
              <Spacer horizontal size={8} />
              {idx !== timelineData.length - 1 ? <BreadcrumbSeparator /> : null}
            </Row>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <Col
        className={`space-y-2 border-l-2 border-gray-200 pl-4 transition-all duration-200 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
        }`}
      >
        <Row className="gap-8">
          <Link
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row items-center space-x-2"
          >
            <H3>{item.title}</H3>
            <LuExternalLink size={12} />
          </Link>
        </Row>

        <P className="max-w-7xl">{item.description}</P>
        <Small>{item.date}</Small>

        <Spacer size={4} />

        {isVideo ? (
          <video
            key={item.img}
            src={item.img}
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            className="rounded-lg max-w-xl w-full aspect-video"
            preload="auto"
          />
        ) : (
          <img
            key={item.img}
            src={item.img}
            alt={item.title}
            className="rounded-lg max-w-xl w-full aspect-video object-cover"
          />
        )}
      </Col>
    </Col>
  );
}
