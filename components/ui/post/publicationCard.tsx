import { PostProps } from "@/components/types";
import {
  Col,
  ExtraSmall,
  H2,
  H3,
  H4,
  Muted,
  P,
  Row,
  Small,
  Spacer,
} from "@/components/ui";
import Link from "next/link";
import React from "react";

export const PublicationCard: React.FC<PostProps> = ({
  slug,
  title,
  description,
  contentType,
  date,
  year,
  thumbnail,
  starred,
  authors,
  journal,
  journalHighlighted,
  ...props
}) => {
  return (
    <Link href={`/blog/${year}/${slug}`} key={slug}>
      <Row className="items-start gap-6 p-4 border-b border-gray-20 hover:bg-gray-50 transition-colors duration-300">
        {thumbnail.endsWith(".mov") || thumbnail.endsWith(".mp4") ? (
          <video
            src={thumbnail}
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            className="inset-0 max-w-64 object-cover aspect-video rounded-xl"
            preload="auto"
          />
        ) : (
          <img
            src={thumbnail}
            alt={title}
            loading="eager"
            className="inset-0 max-w-64 object-cover aspect-video rounded-xl"
          />
        )}
        <Col className="flex-1 self-stretch items-start justify-between">
          <Col>
            <H2 className="font-medium text-lg">{title}</H2>
            <P>
              {authors?.map((author, i) => (
                <span key={i}>
                  <span className={author === "Joshua Gao" ? "underline" : ""}>
                    {author}
                  </span>
                  {authors && i < authors.length - 1 ? ", " : ""}
                </span>
              ))}
            </P>
            <P className={journalHighlighted ? "text-pop italic" : "italic"}>
              {journal}
            </P>
          </Col>
          <ExtraSmall>{date}</ExtraSmall>
        </Col>
      </Row>
    </Link>
  );
};
