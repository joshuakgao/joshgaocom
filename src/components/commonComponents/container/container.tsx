import React from "react";

export function Container({
  children,
  className,
  style,
  d,
}: {
  children?: any;
  className?: string;
  style?: React.CSSProperties;
  d?: boolean;
}) {
  require("./styles.css");
  let debug = d ? "d" : null;
  return (
    <div className={`container ${debug} ${className}`} style={style}>
      {children}
    </div>
  );
}
