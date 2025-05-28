import React, { CSSProperties, ReactNode, HTMLAttributes } from "react";

interface ColumnProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export function Col({ children, style, className, ...rest }: ColumnProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
      className={className}
      {...rest} // Spread the remaining props like id, onClick, etc.
    >
      {children}
    </div>
  );
}
