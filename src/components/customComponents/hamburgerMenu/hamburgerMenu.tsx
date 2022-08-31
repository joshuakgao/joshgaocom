import React, { useState } from "react";
import { ContainerFullscreen } from "../../commonComponents";
import github from "../../../assets/images/github.png";
import cv from "../../../assets/images/cv.png";

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
  let hamburgerOpened = pressed ? "open" : "close";
  return (
    <>
      <div
        className={`hamburger-container ${debug} ${className} `}
        onClick={() => setPressed(!pressed)}
        style={style}
      >
        <hr className={`top-line ${hamburgerOpened}`} />
        <hr className={`middle-line ${hamburgerOpened}`} />
        <hr className={`hidden-middle-line ${hamburgerOpened}`} />
        <hr className={`bottom-line ${hamburgerOpened}`} />
      </div>
      <ContainerFullscreen className={pressed ? "opaque" : "clear"}>
        <h1
          className={`right-constraint ${
            pressed ? "fade-in-upwards" : "fade-out-downwards"
          }`}
          style={{ marginTop: 64 }}
        >
          Software
        </h1>
        <h1
          className={`right-constraint ${
            pressed ? "fade-in-upwards" : "fade-out-downwards"
          }`}
        >
          Business
        </h1>
        <h1
          className={`right-constraint ${
            pressed ? "fade-in-upwards" : "fade-out-downwards"
          }`}
        >
          Other
        </h1>
        <h1
          className={`right-constraint ${
            pressed ? "fade-in-upwards" : "fade-out-downwards"
          }`}
        >
          Contact
        </h1>

        <div className="right-constraint bottom-constraint">
          <img className="icon" src={github} height={64} width={64} />
          <img className="icon" src={cv} height={62} width={64} />
        </div>
      </ContainerFullscreen>
    </>
  );
}
