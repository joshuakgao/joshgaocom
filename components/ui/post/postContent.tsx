import React from "react";
import { Col } from "../col";

export function PostContent({
  size = "max-w-2xl",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  size?: string;
}) {
  return (
    <Col
      className={`w-full ${size} mx-4 p-8 rounded-lg bg-white space-y-4`}
      {...props}
    >
      {children}
    </Col>
  );
}
