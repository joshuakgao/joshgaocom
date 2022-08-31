import React, { useState } from "react";

export function HamburgerMenu({
  className,
  style,
  d,
}: {
  className?: string;
  style?: React.CSSProperties;
  d?: boolean;
}) {
  const [pressed, setPressed] = useState<boolean>(false);

  require("./styles.css");
  let debug = d ? "d" : null;
  let toggleOpenClass = pressed ? "open" : "close";
  return (
    <div
      className={`hamburger-container ${debug} ${className} `}
      onClick={() => setPressed(!pressed)}
      style={style}
    >
      <hr className={`top-line ${toggleOpenClass}`} />
      <hr className={`middle-line ${toggleOpenClass}`} />
      <hr className={`hidden-middle-line ${toggleOpenClass}`} />
      <hr className={`bottom-line ${toggleOpenClass}`} />
    </div>
  );
}
