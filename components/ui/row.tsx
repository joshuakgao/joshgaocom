import React, { CSSProperties, ReactNode } from "react";

interface RowProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export function Row({ children, style, className }: RowProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        ...style, // Inline styles passed via props take precedence
      }}
      className={className}
    >
      {children}
    </div>
  );
}
