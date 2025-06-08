"use client";

import { PostProps } from "@/components/types";
import { ActionBar, Col, ExtraSmall, H0, H1, P, Spacer } from "@/components/ui";

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
    <Col className="min-h-screen items-center justify-center bg-gray-100">
      <Col className="max-w-4xl mx-4 p-8 my-8 rounded-lg bg-white space-y-4">
        <H0>{post.title}</H0>
        {post.date && <ExtraSmall>Joshua Gao · {post.date}</ExtraSmall>}

        {post.thumbnail?.endsWith(".mp4") ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="rounded-lg w-full object-cover"
          >
            <source src={post.thumbnail} type="video/mp4" />
          </video>
        ) : (
          post.thumbnail && (
            <img
              src={post.thumbnail}
              alt={post.title}
              className="rounded-lg w-full object-cover"
            />
          )
        )}

        <ActionBar claps={28} />

        {post.contentType === "Research" && (
          <Col>
            <Spacer size={8} />
            <P>
              <strong>Authors:</strong>{" "}
              {post.authors.map((a, i) => (
                <span key={i}>
                  {a}
                  {post.authors && i < post.authors.length - 1 ? ", " : ""}
                </span>
              ))}
            </P>

            <P>
              <strong>Published In:</strong> {post.journal}
            </P>

            <P>
              <strong>Type:</strong> {post.contentType}
            </P>
          </Col>
        )}
        <Col className="space-y-4">{children}</Col>
      </Col>
    </Col>
  );
}
