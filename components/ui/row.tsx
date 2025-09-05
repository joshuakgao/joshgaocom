import React, { CSSProperties, ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface RowProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export function Row({ children, style, className, ...rest }: RowProps) {
  return (
    <div
      style={{
        ...style,
      }}
      className={cn("flex items-center", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
