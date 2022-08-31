import React, { useState } from "react";
import { ContainerFullscreen } from "../../commonComponents";
import github from "../../../assets/images/github.png";
import cv from "../../../assets/images/cv.png";
import cvPdf from "../../../assets/docs/cv.pdf";

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
        <a href="/software">
          <h1
            className={`right-constraint ${
              pressed ? "fade-in-upwards" : "fade-out-downwards"
            }`}
            style={{ marginTop: 64 }}
          >
            Software
          </h1>
        </a>
        <a href="/business">
          <h1
            className={`right-constraint ${
              pressed ? "fade-in-upwards" : "fade-out-downwards"
            }`}
          >
            Business
          </h1>
        </a>
        <a href="/other">
          <h1
            className={`right-constraint ${
              pressed ? "fade-in-upwards" : "fade-out-downwards"
            }`}
          >
            Other
          </h1>
        </a>
        <div className="right-constraint bottom-constraint">
          <a href="https://github.com/tugonbob" target="_blank">
            <img className="icon" src={github} height={64} width={64} />
          </a>
          <a href={cvPdf} target="_blank" rel="noreferrer">
            <img className="icon" src={cv} height={62} width={64} />
          </a>
        </div>
      </ContainerFullscreen>
    </>
  );
}
