"use client";

import { P } from "@/components/ui";
import React, { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { IoLinkOutline, IoClose } from "react-icons/io5";

interface ProjectItemProps {
  title?: string;
  year?: string;
  link?: string;
  video?: string;
  starred?: boolean;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  year,
  link,
  video,
  starred,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const isTouchDevice =
    "maxTouchPoints" in navigator && navigator.maxTouchPoints > 0;
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const scrollYRef = React.useRef<number>(0); // Track scroll position
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [maxVideoHeight, setMaxVideoHeight] = useState(500); // Default height

  // Calculate hover video max height depending on window size
  useEffect(() => {
    if (typeof window !== "undefined") {
      const calculateMaxHeight = () => {
        const windowHeight = window.innerHeight;
        setMaxVideoHeight(Math.min(windowHeight - 100, windowHeight * 0.8));
      };

      calculateMaxHeight();
      window.addEventListener("resize", calculateMaxHeight);
      return () => window.removeEventListener("resize", calculateMaxHeight);
    }
  }, []);

  // Mouse position tracker
  useEffect(() => {
    if (!isMobile && !isTouchDevice) {
      const handleMouseMove = (e: MouseEvent) => {
        // Calculate mouse position relative to window center
        const x = (e.clientX / window.innerWidth - 0.5) * 1000;
        const y = (e.clientY / window.innerHeight - 0.5) * 1000;
        setMousePosition({ x, y });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [isMobile, isTouchDevice]);

  // Mobile button touch handler
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
    if (!isMobile && !isTouchDevice) {
      if (!isHovered && videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.pause();
      } else if (isHovered && videoRef.current) {
        videoRef.current.play();
      }
    }
  }, [isHovered, isMobile, isTouchDevice]);

  const handleClick = () => {
    if (video) {
      setShowModal(true); // Always show modal if video exists and device is touch-based
    }
    if (!isTouchDevice && !isMobile && link) {
      window.open(link, "_blank"); // Open link in new tab for non-touch devices
    }
  };

  // Update scroll position on scroll
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTouchStart = () => {
    scrollYRef.current = window.scrollY;
    touchTimerRef.current = setTimeout(() => {
      // Long press detected, prevent click
      touchTimerRef.current = null;
    }, 20); // Adjust delay as needed
  };

  const handleTouchEnd = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = null;
      if (window.scrollY === scrollYRef.current) {
        handleClick();
      }
    }
  };

  return (
    <div className="relative">
      <div
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => {
          if (touchTimerRef.current) {
            clearTimeout(touchTimerRef.current);
            touchTimerRef.current = null;
          }
        }}
        className={`flex justify-between items-center p-4 w-64 rounded-3xl hover:bg-white hover:shadow-lg hover:transition-all hover:duration-300 hover:scale-105 backface-hidden backdrop-blur-0 cursor-pointer radius${
          isMobile ? "w-full" : ""
        }`}
        onMouseEnter={() => !isMobile && !isTouchDevice && setIsHovered(true)}
        onMouseLeave={() => !isMobile && !isTouchDevice && setIsHovered(false)}
      >
        <div className="flex flex-row">
          <P
            className={`${
              starred
                ? "bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent font-bold"
                : ""
            }`}
          >
            {title}
          </P>
        </div>
        <P className={`text-right text-gray-500`}>{year}</P>
      </div>
      {/* Hover-based video display (only for non-touch devices) */}
      {video && !isMobile && !isTouchDevice && (
        <div
          className={`fixed z-50 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 ease-out pointer-events-none ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(calc(${
              mousePosition.x * 0.5
            }px), calc(-50% + ${mousePosition.y * 0.2}px))`,
            maxHeight: `${maxVideoHeight}px`,
            maxWidth: `calc(min(50vw, ${maxVideoHeight * (16 / 9)}px))`,
            aspectRatio: "16/9",
            willChange: "transform, opacity",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            loop
            className="w-full h-full object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
      )}
      {showModal &&
        video &&
        (isTouchDevice || (isMobile && !isTouchDevice)) && (
          <div className="fixed flex-col justify-center inset-0 bg-black bg-opacity-50 z-50 flex items-center p-3">
            <div className="relative w-full max-w-[min(99vw,calc(60vh*16/9))] min-h-[calc(min(99vw,calc(60vh*16/9))*9/16)] rounded-3xl overflow-hidden aspect-video">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                loop
                className="w-full h-full object-cover"
                onClick={(e) => e.stopPropagation()}
              >
                <source src={video} type="video/mp4" />
              </video>
            </div>

            <div className="fixed bottom-[5vh] z-10 flex gap-4 flex-row items-end justify-center text-white w-full px-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(link, "_blank");
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  window.open(link, "_blank");
                }}
                className="w-[calc(5vw+5vh)] h-[calc(5vw+5vh)] max-w-16 max-h-16 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-white text-xl"
              >
                <IoLinkOutline />
              </button>
              {/* Added a close button here as well for mobile users */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(false);
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  setShowModal(false);
                }}
                className="fixed top-4 right-4 z-10 w-[calc(5vw+5vh)] h-[calc(5vw+5vh)] max-w-16 max-h-16 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-white text-xl"
              >
                <IoClose size={24} /> {/* Use IoClose icon */}
              </button>
            </div>
          </div>
        )}
    </div>
  );
};
