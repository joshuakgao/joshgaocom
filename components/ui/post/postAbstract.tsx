import React from "react";
import { Spacer } from "../spacer";
import { H1, P } from "../typography";
import { PostContent } from "./postContent";

export function PostAbstract({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  size?: string;
}) {
  return (
    <PostContent size="max-w-xl">
      <H1>Abstract</H1>
      <Spacer size={8} />
      <P className="text-justify">{children}</P>
    </PostContent>
  );
}
