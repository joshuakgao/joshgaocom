import React, { CSSProperties, ReactNode } from "react";

interface ColumnProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export function Col({ children, style, className }: ColumnProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // Makes the layout vertical
        ...style, // Inline styles passed via props take precedence
      }}
      className={className}
    >
      {children}
    </div>
  );
}
