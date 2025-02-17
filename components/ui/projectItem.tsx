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
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!isHovered && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    } else if (isHovered && videoRef.current) {
      videoRef.current.play();
    }
  }, [isHovered]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex justify-between items-center p-4 w-64 rounded-3xl hover:bg-white hover:shadow-lg hover:transition-all hover:duration-300 hover:scale-105 backface-hidden backdrop-blur-0 ${
          isMobile ? "w-full" : ""
        }`}
      >
        <P>{title}</P>
        <P className="text-right text-gray-500">{year}</P>
      </a>

      {video && (
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
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
};
