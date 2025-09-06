"use client";

import { PostProps } from "@/components/types";
import {
  ActionBar,
  Col,
  ExtraSmall,
  H0,
  H1,
  P,
  PostContent,
  Spacer,
} from "@/components/ui";

export function PostWrapper({
  post,
  children,
}: {
  post: PostProps | undefined;
  children?: React.ReactNode;
}) {
  if (!post) {
    return (
      <Col className="max-w-4xl mx-auto p-8 text-center space-y-2">
        <H1>Post not found</H1>
        <P>We couldn&#39;t find the page you&#39;re looking for.</P>
      </Col>
    );
  }
  return (
    <Col className="min-h-screen items-center justify-center space-y-8">
      <PostContent>
        <P>{post.contentType}</P>
        <H0>{post.title}</H0>
        {post.date && <ExtraSmall>Joshua Gao · {post.date}</ExtraSmall>}
      </PostContent>
      <PostContent size="max-w-7xl">
        {post.video ? (
          <iframe
            src={`https://www.youtube.com/embed/${
              post.video.split("youtu.be/")[1]
            }?rel=0`}
            title="YouTube video player"
            className="rounded-lg w-full aspect-video"
            allowFullScreen
          />
        ) : post.thumbnail.endsWith(".mp4") ? (
          <video controls className="rounded-lg w-full object-cover">
            <source src={post.thumbnail} type="video/mp4" />
          </video>
        ) : (
          <img
            src={post.thumbnail}
            alt={post.title}
            className="rounded-lg w-full object-cover"
          />
        )}
      </PostContent>
      <PostContent>
        <ActionBar post={post} />
        {post.authors && post.journal && post.contentType && (
          <Col>
            <Spacer size={8} />
            <P>
              <strong>Authors:</strong>{" "}
              {post.authors.map((author, i) => (
                <span key={i}>
                  <span className={author === "Joshua Gao" ? "underline" : ""}>
                    {author}
                  </span>
                  {post.authors && i < post.authors.length - 1 ? ", " : ""}
                </span>
              ))}
            </P>
            <P>
              <strong>Published In:</strong> {post.journal}
            </P>
          </Col>
        )}
      </PostContent>
      <Col className="space-y-4 items-center justify-center">{children}</Col>
      <Spacer size={128} />
    </Col>
  );
}
