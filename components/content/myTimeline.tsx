import { timelineData } from "@/app";
import { Button, Col, H3, P, Small } from "@/components/ui";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import { LuExternalLink } from "react-icons/lu";

// Fallback dwell time for slides that have no natural "end" (e.g. images)
const IMAGE_INTERVAL = 8000;

function getStartYear(date: string): string {
  const match = date.match(/\b(\d{4})\b/);
  return match ? match[1] : "";
}

type YearGroup = { year: string; items: { idx: number; label: string }[] };

function buildYearGroups(): YearGroup[] {
  const seen = new Map<string, YearGroup>();
  const order: string[] = [];
  timelineData.forEach((item, idx) => {
    const year = getStartYear(item.date);
    if (!seen.has(year)) {
      seen.set(year, { year, items: [] });
      order.push(year);
    }
    seen.get(year)!.items.push({ idx, label: item.label });
  });
  return order.map((y) => seen.get(y)!);
}

const yearGroups = buildYearGroups();
const LAST = timelineData.length - 1;

export function MyTimeline() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [visible, setVisible] = useState(true);
  // Track which indices have been loaded at least once
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(new Set([0]));
  const activeIdxRef = useRef(activeIdx);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const transitionTo = useCallback((idx: number) => {
    setVisible(false);
    setTimeout(() => {
      activeIdxRef.current = idx;
      setActiveIdx(idx);
      // Mark this index as loaded so its media is rendered in the DOM
      setLoadedIndices((prev) => new Set(prev).add(idx));
      setVisible(true);
    }, 200);
  }, []);

  const advanceToNext = useCallback(() => {
    const prev = activeIdxRef.current;
    const next = prev === LAST ? 0 : prev + 1;
    transitionTo(next);
  }, [transitionTo]);

  useEffect(() => {
    videoRefs.current.forEach((ref, i) => {
      if (!ref) return;
      if (i === activeIdx) {
        ref.currentTime = 0;
        ref.play().catch(() => {});
      } else {
        ref.pause();
      }
    });

    // Videos advance via their onEnded handler; slides without a natural
    // end (images) fall back to a fixed dwell timer.
    const current = timelineData[activeIdx];
    const isVid = current.img.endsWith(".mov") || current.img.endsWith(".mp4");
    if (isVid) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(advanceToNext, IMAGE_INTERVAL);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIdx, advanceToNext]);

  const handleSelect = (idx: number) => {
    if (idx === activeIdxRef.current) return;
    transitionTo(idx);
  };

  const item = timelineData[activeIdx];

  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-12 md:items-start">
      {/* Left column: year groups with item labels */}
      <Col className="md:shrink-0 space-y-4">
        {yearGroups.map(({ year, items }) => (
          <Col key={year} className="space-y-1">
            <Small className="text-gray-400 font-semibold tracking-wide">
              {year}
            </Small>
            {items.map(({ idx, label }) => (
              <Button
                key={idx}
                variant="ghost"
                onClick={() => handleSelect(idx)}
                className={`justify-start px-0 h-auto py-0.5 hover:bg-transparent transition-colors duration-200 ${
                  activeIdx === idx ? "text-gray-800" : "text-gray-400"
                }`}
              >
                {label}
              </Button>
            ))}
          </Col>
        ))}
      </Col>

      {/* Right side: content card */}
      <Col
        className={`flex-1 border border-gray-200 rounded-xl p-6 space-y-4 transition-all duration-200 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
        }`}
      >
        <Col>
          <Link
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row items-center space-x-2 w-fit"
          >
            <H3>{item.title}</H3>
            <LuExternalLink size={12} />
          </Link>
          <Small className="text-gray-400">{item.date}</Small>
        </Col>
        <P>{item.description}</P>

        {/* Only render media for indices that have been visited */}
        <div className="relative rounded-2xl overflow-hidden w-full aspect-video mt-2">
          {timelineData.map((d, i) => {
            const isVid = d.img.endsWith(".mov") || d.img.endsWith(".mp4");

            // Don't mount media until this slide has been active at least once
            if (!loadedIndices.has(i)) {
              return (
                <div
                  key={d.img}
                  className="absolute inset-0 w-full h-full opacity-0"
                />
              );
            }

            return (
              <div
                key={d.img}
                className={`absolute inset-0 w-full h-full transition-opacity duration-200 ${
                  i === activeIdx ? "opacity-100" : "opacity-0"
                }`}
              >
                {isVid ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    src={d.img}
                    muted
                    playsInline
                    disablePictureInPicture
                    disableRemotePlayback
                    preload="auto"
                    onEnded={() => {
                      if (i === activeIdxRef.current) advanceToNext();
                    }}
                    onError={() => {
                      if (i === activeIdxRef.current) advanceToNext();
                    }}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={d.img}
                    alt={d.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            );
          })}
        </div>
      </Col>
    </div>
  );
}
