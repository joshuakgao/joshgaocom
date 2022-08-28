import React from "react";

export default function Column({
  children,
  d,
}: {
  children?: any;
  d?: boolean;
}) {
  require("./styles.css");
  return <div className={`column ${d ? "d" : null}`}>{children}</div>;
}
