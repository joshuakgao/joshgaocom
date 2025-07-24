import { PostProps, ResearchProps } from "@/components/types";
import {
  Col,
  ExtraSmall,
  GradientText,
  H1,
  Muted,
  P,
  Row,
  Spacer,
} from "@/components/ui";
import Link from "next/link";
import React, { useMemo } from "react";
import { PiEye, PiHandsClappingLight } from "react-icons/pi";

// Fisher-Yates shuffle
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const PostCard: React.FC<PostProps> = ({
  slug,
  title,
  description,
  contentType,
  date,
  year,
  thumbnail,
  starred,
  claps,
  views,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const gradient = useMemo(() => {
    const colors = ["#7e22ce", "#db2777", "#ea7d08", "#db2777", "#7e22ce"];
    const shuffled = shuffle(colors);
    return `linear-gradient(270deg, ${shuffled.join(", ")})`;
  }, []);

  return (
    <Col
      className={`group flex w-auto shadow-sm rounded-lg bg-white cursor-pointer hover:shadow-lg ${
        starred ? "relative p-[6px]" : ""
      } transition-transform`}
      style={
        starred
          ? {
              background: gradient,
              backgroundSize: "1000% 1000%",
              animation: "gradient-border 5s ease infinite",
            }
          : {}
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/${year}/${slug}`} passHref>
        <div className={starred ? "rounded-lg bg-white w-full h-full" : ""}>
          {thumbnail.endsWith(".mp4") ? (
            <video controls autoPlay className="rounded-lg w-full object-cover">
              <source src={thumbnail} type="video/mp4" />
            </video>
          ) : thumbnail.includes("youtu.be") ? (
            <iframe
              src={`https://www.youtube.com/embed/${
                thumbnail.split("youtu.be/")[1]
              }`}
              title={title}
              className="rounded-lg w-full aspect-video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={thumbnail}
              alt={title}
              className="rounded-lg w-full object-cover"
            />
          )}
          <Spacer size={8} />
          <div className="flex-1 min-w-0 p-4">
            {contentType !== "Project" ? (
              <Muted className="text-gray-500">{contentType}</Muted>
            ) : undefined}
            <H1>
              <GradientText parentHovered={isHovered}>{title}</GradientText>
            </H1>
            <Spacer size={4} />

            {/* Research-specific authors */}
            {contentType === "Research" && (
              <P>
                {(props as ResearchProps).authors?.map(
                  (author: string, index: number) => (
                    <span key={index}>
                      <span
                        className={author === "Joshua Gao" ? "underline" : ""}
                      >
                        {author}
                      </span>
                      {index < (props as ResearchProps).authors.length - 1
                        ? ", "
                        : ""}
                    </span>
                  )
                )}
              </P>
            )}

            {/* Research-specific journal */}
            {(props as ResearchProps).journal && (
              <P>
                {(props as ResearchProps).journalHighlighted ? (
                  <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text font-bold transition-all duration-300">
                    {(props as ResearchProps).journal}
                  </span>
                ) : (
                  (props as ResearchProps).journal
                )}
              </P>
            )}

            <Spacer size={16} />
            <P>{description}</P>
            <Spacer size={16} />
            <Row className="items-center justify-between">
              <ExtraSmall>{date}</ExtraSmall>
              <Row>
                {claps && (
                  <Row className="gap-x-[2px]">
                    <PiHandsClappingLight size={16} className="text-gray-500" />
                    <ExtraSmall className="mt-0.5">{claps}</ExtraSmall>
                  </Row>
                )}
                {views && (
                  <Row className="gap-x-[4px] ml-2">
                    <PiEye size={17} className="text-gray-500 mt-0.5" />
                    <ExtraSmall className="mt-0.5">{views}</ExtraSmall>
                  </Row>
                )}
              </Row>
            </Row>
          </div>
        </div>
      </Link>
    </Col>
  );
};
