import React from "react";

export default function Container({
  children,
  d,
}: {
  children?: any;
  d?: boolean;
}) {
  require("./styles.css");
  return <div className={`container ${d ? "d" : null}`}>{children}</div>;
}
