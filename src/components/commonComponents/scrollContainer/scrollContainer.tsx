import React, { CSSProperties } from "react";

export function ScrollContainer({
  children,
  className,
  style,
  d,
}: {
  children?: any;
  className?: string;
  style?: CSSProperties;
  d?: boolean;
}) {
  require("./styles.css");
  let debug = d ? "d" : "";
  return (
    <div
      className={`scroll-container-component ${className} ${debug}`}
      style={style}
    >
      {children}
    </div>
  );
}
