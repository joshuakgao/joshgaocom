import React, { CSSProperties, ReactNode, HTMLAttributes } from "react";

interface RowProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export function Row({ children, style, className, ...rest }: RowProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        ...style,
      }}
      className={className}
      {...rest}
    >
      {children}
    </div>
  );
}
