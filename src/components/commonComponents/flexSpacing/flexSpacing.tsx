import React from "react";

export default function FlexSpacing({
  flexGrow = 1,
  d,
}: {
  flexGrow?: number;
  d?: boolean;
}) {
  return (
    <div className={`flex-spacing ${d ? "d" : null}`} style={{ flexGrow }} />
  );
}
