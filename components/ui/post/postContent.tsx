import { Col } from "@/components/ui";
import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function PostContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: HTMLAttributes<HTMLDivElement>;
  size?: string;
}) {
  return (
    <Col
      className={cn(`w-full max-w-3xl mx-4 space-y-4 items-start`, className)}
      {...props}
    >
      {children}
    </Col>
  );
}
