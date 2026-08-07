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
  externalUrl,
  ...props
}) => {
  return (
    <Link
      href={externalUrl ?? `/blog/${year}/${slug}`}
      key={slug}
      target={externalUrl ? "_blank" : undefined}
      rel={externalUrl ? "noopener noreferrer" : undefined}
    >
      {/* Below sm the thumbnail sits above the text — side by side there is not
          enough width left for the title and author list on a phone. */}
      <Row className="flex-col sm:flex-row items-start gap-8 sm:gap-10 mb-8 scale-[100%] hover:scale-[101%] transition-all duration-300">
        {thumbnail.endsWith(".mov") || thumbnail.endsWith(".mp4") ? (
          <video
            src={thumbnail}
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            className="inset-0 w-full sm:max-w-64 shrink-0 object-cover aspect-video rounded-xl"
            preload="auto"
          />
        ) : (
          <img
            src={thumbnail}
            alt={title}
            loading="eager"
            className="inset-0 w-full sm:max-w-64 shrink-0 object-cover aspect-video rounded-xl"
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
