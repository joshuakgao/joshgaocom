"use client";

import { P } from "@/components/ui";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface ProjectItemProps {
  title?: string;
  year?: string;
  link?: string;
  video?: string;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  year,
  link,
  video,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const isTouchDevice =
    "maxTouchPoints" in navigator && navigator.maxTouchPoints > 0;
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isMobile && !isTouchDevice) {
      const handleMouseMove = (e: MouseEvent) => {
        // Calculate mouse position relative to window center
        const x = (e.clientX / window.innerWidth - 0.5) * 200;
        const y = (e.clientY / window.innerHeight - 0.5) * 200;
        setMousePosition({ x, y });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [isMobile, isTouchDevice]);

  useEffect(() => {
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
    if (!isTouchDevice && link) {
      window.open(link, "_blank"); // Open link in new tab for non-touch devices
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => !isMobile && !isTouchDevice && setIsHovered(true)}
      onMouseLeave={() => !isMobile && !isTouchDevice && setIsHovered(false)}
    >
      <div
        onClick={handleClick}
        className={`flex justify-between items-center p-4 w-64 rounded-3xl hover:bg-white hover:shadow-lg hover:transition-all hover:duration-300 hover:scale-105 backface-hidden backdrop-blur-0 ${
          isMobile ? "w-full" : ""
        } cursor-pointer`}
      >
        <P>{title}</P>
        <P className="text-right text-gray-500">{year}</P>
      </div>

      {/* Hover-based video display (only for non-touch devices) */}
      {!isMobile && !isTouchDevice && video && (
        <div
          className={`fixed z-50 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 ease-out pointer-events-none ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(calc(-10vw + ${
              mousePosition.x
            }px + 70px), calc(-50% + ${mousePosition.y}px)) scale(${
              isHovered ? 1.1 : 0.9
            })`,
            width: "50vw",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Modal for touch devices (always shown if isTouchDevice is true) */}
      {showModal && video && isTouchDevice && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(false);
          }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3"
        >
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex gap-4 flex-row items-center text-white">
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(link, "_blank");
              }}
              className="w-16 h-16 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-white text-2xl"
            >
              →
            </button>
          </div>
          <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden">
            <video
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
              onClick={(e) => e.stopPropagation()} // Prevent closing modal when tapping the video
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </div>
  );
};
