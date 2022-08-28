import React from "react";

export function Row({ children, d }: { children?: any; d?: boolean }) {
  require("./styles.css");
  return <div className={`row ${d ? "d" : null}`}>{children}</div>;
}
