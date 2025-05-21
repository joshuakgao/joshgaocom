"use client";

import { Col, ExtraSmall, H1, Muted, P, Spacer } from "@/components/ui";
import React, { useMemo } from "react";

interface BlogCardProps {
  title?: string;
  description?: string;
  authors?: string[];
  tag?: string;
  date?: string;
  link?: string;
  thumbnail?: string;
  starred?: boolean;
}

// Fisher-Yates shuffle
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  description,
  authors,
  tag,
  date,
  link,
  thumbnail,
  starred,
}) => {
  // Shuffle gradient colors only once per mount
  const gradient = useMemo(() => {
    const colors = ["#ff8a00", "#e52e71", "#007cf0", "#00dfd8", "#ff8a00"];
    const shuffled = shuffle(colors);
    return `linear-gradient(270deg, ${shuffled.join(", ")})`;
  }, []);

  return (
    <Col
      className={`flex w-auto h-full shadow-sm rounded-lg bg-white cursor-pointer hover:shadow-md transition-shadow ${
        starred ? "relative p-1" : ""
      } hover:scale-102 transition-transform`}
      style={
        starred
          ? {
              background: gradient,
              backgroundSize: "800% 800%",
              animation: "gradient-border 10s ease infinite",
            }
          : {}
      }
    >
      {starred && (
        <style>
          {`
                        @keyframes gradient-border {
                            0% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                            100% { background-position: 0% 50%; }
                        }
                        .hover\\:scale-102:hover {
                            transform: scale(1.02);
                        }
                    `}
        </style>
      )}
      <div className={starred ? "rounded-lg bg-white w-full h-full" : ""}>
        <a
          href={link}
          className="no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className="rounded-t-lg w-full"
            style={{ aspectRatio: "4 / 3", overflow: "hidden" }}
          >
            {thumbnail?.endsWith(".mp4") ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={thumbnail} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <Spacer size={8} />
          <div className="flex-1 min-w-0 p-4">
            <Muted className="text-gray-500">{tag}</Muted>
            <H1>{title}</H1>
            <Spacer size={4} />
            <Muted className="text-gray-500">
              {authors?.map((author, index) => (
                <span key={index}>
                  <span
                    className={`${author == "Joshua Gao" ? "underline" : ""}`}
                  >
                    {author}
                  </span>
                  {index < authors.length - 1 ? ", " : ""}
                </span>
              ))}
            </Muted>
            <Spacer size={4} />
            <P>{description}</P>
            <Spacer size={16} />
            <ExtraSmall>{date}</ExtraSmall>
          </div>
        </a>
      </div>
    </Col>
  );
};
