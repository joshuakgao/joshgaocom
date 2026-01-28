import { PostProps } from "@/components/types";
import { Col, ExtraSmall, H2, Muted, P, Row, Spacer } from "@/components/ui";
import Link from "next/link";
import React from "react";

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
      className={`group flex h-[480px] w-[340px] md:w-[430px] bg-white cursor-pointer scale-[98%] hover:scale-[100%] transition-all duration-300`}
    >
      <Link href={`/blog/${year}/${slug}`} passHref className="w-full h-full">
        <Col className="overflow-hidden w-full h-full">
          {thumbnail.endsWith(".mov") || thumbnail.endsWith(".mp4") ? (
            <video
              src={thumbnail}
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              disableRemotePlayback
              className="inset-0 w-full h-full object-cover aspect-video rounded-2xl"
            />
          ) : (
            <img
              src={thumbnail}
              alt={title}
              className="inset-0 w-full h-full object-cover aspect-video rounded-2xl"
            />
          )}
          {/* <img
            src={thumbnail}
            alt={title}
            className="inset-0 w-full h-full object-cover aspect-video rounded-2xl"
          /> */}
          <Spacer size={32} />
          {/* Content area as flex column */}
          <Col className="min-w-0 h-full flex flex-col">
            <Muted className="text-gray-500">{contentType}</Muted>
            <H2>{title}</H2>
            <Spacer size={8} />
            <P className="line-clamp-3">{description}</P>
            <Row className="items-center justify-between mt-auto">
              <ExtraSmall>{date}</ExtraSmall>
            </Row>
          </Col>
        </Col>
      </Link>
    </Col>
  );
};
