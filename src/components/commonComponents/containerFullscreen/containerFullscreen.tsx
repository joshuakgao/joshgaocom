import React, { CSSProperties } from "react";

export function ContainerFullscreen({
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
  let debug = d ? "d" : null;
  return (
    <div className={`container-fullscreen ${className} ${debug}`} style={style}>
      {children}
    </div>
  );
}
