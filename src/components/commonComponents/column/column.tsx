import React from "react";

export function Column({
  children,
  className = "",
  style,
  d,
}: {
  children?: any;
  className?: string;
  style?: React.CSSProperties;
  d?: boolean;
}) {
  require("./styles.css");
  let debug = d ? "d" : "";
  return (
    <div className={`column-component ${debug} ${className}`} style={style}>
      {children}
    </div>
  );
}
