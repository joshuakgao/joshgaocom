import React from "react";
import { Spacer } from "../spacer";
import { H1, P } from "../typography";
import { PostContent } from "./postContent";
import { Col } from "../col";

export function PostAbstract({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
}) {
  const isString = typeof children === "string";

  return (
    <PostContent className="w-full items-center">
      <H1>Abstract</H1>
      <Spacer size={8} />
      <Col className="max-w-xl">
        {isString ? <P className="text-justify">{children}</P> : children}
      </Col>
    </PostContent>
  );
}
