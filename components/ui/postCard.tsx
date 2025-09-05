import { PostProps } from "@/components/types";
import {
  Col,
  ExtraSmall,
  GradientText,
  H1,
  H2,
  Muted,
  P,
  Row,
  Spacer,
} from "@/components/ui";
import Link from "next/link";
import React from "react";
import { PiEye, PiHandsClappingLight } from "react-icons/pi";

export const PostCard: React.FC<PostProps> = ({
  slug,
  title,
  description,
  contentType,
  date,
  year,
  thumbnail,
  starred,
  ...props
}) => {
  return (
    <Col
      className={`group flex w-auto h-[500px] rounded-lg bg-white cursor-pointer border-gray-200 border hover:shadow-md transition-all duration-300`}
    >
      <Link href={`/blog/${year}/${slug}`} passHref className="w-full h-full">
        <Col className="rounded-lg overflow-hidden w-full h-full">
          <div className="w-full relative" style={{ aspectRatio: "16/9" }}>
            <img
              src={thumbnail}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <Spacer size={8} />
          {/* Content area as flex column */}
          <Col className="min-w-0 p-4 h-full flex flex-col">
            <Muted className="text-gray-500">{contentType}</Muted>
            <H2>{title}</H2>
            <Spacer size={8} />
            <P
              className="line-clamp-2"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minHeight: "2.8em", // ensures space for two lines
              }}
            >
              {description}
              {description && description.length > 80 ? "..." : ""}
            </P>
            {/* Footer pinned at bottom */}
            <Row className="items-center justify-between mt-auto">
              <ExtraSmall>{date}</ExtraSmall>
            </Row>
          </Col>
        </Col>
      </Link>
    </Col>
  );
};
