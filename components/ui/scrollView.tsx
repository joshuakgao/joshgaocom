import React from "react";
import { Col, Spacer } from "@/components/ui";

export function ScrollDiv({
  children,
  d,
  style,
  className,
}: {
  children?: React.ReactNode;
  d?: boolean;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <Col
      className={`bg-primary overflow-hidden ${
        d ? "border border-black" : ""
      } ${className}`}
      style={style}
    >
      {children}
      <Spacer size={128} />
    </Col>
  );
}
