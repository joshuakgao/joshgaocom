import React, { useState } from "react";
import { ContainerFullscreen } from "../../commonComponents";
import github from "../../../assets/images/github.png";
import cv from "../../../assets/images/cv.png";
import cvPdf from "../../../assets/docs/cv.pdf";
import { Link } from "react-router-dom";

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
        className={`hamburger-container ${debug} ${className}`}
        onClick={() => setPressed(!pressed)}
        style={style}
      >
        <hr className={`top-line ${hamburgerOpened}`} />
        <hr className={`middle-line ${hamburgerOpened}`} />
        <hr className={`hidden-middle-line ${hamburgerOpened}`} />
        <hr className={`bottom-line ${hamburgerOpened}`} />
      </div>
      <ContainerFullscreen className={pressed ? "opaque" : "clear"}>
        <Link to="/software" onClick={() => setPressed(false)}>
          <h1
            className={`secondary right-constraint ${
              pressed ? "fade-in-upwards" : "fade-out-downwards"
            }`}
            style={{ marginTop: "30vh", fontSize: "10vh", lineHeight: "5vh" }}
          >
            Software
          </h1>
        </Link>
        <Link to="/business" onClick={() => setPressed(false)}>
          <h1
            className={`secondary right-constraint ${
              pressed ? "fade-in-upwards" : "fade-out-downwards"
            }`}
            style={{ fontSize: "10vh", lineHeight: "5vh" }}
          >
            Business
          </h1>
        </Link>
        <Link to="/other" onClick={() => setPressed(false)}>
          <h1
            className={`secondary right-constraint ${
              pressed ? "fade-in-upwards" : "fade-out-downwards"
            }`}
            style={{ fontSize: "10vh", lineHeight: "5vh" }}
          >
            Other
          </h1>
        </Link>
        <div className="right-constraint bottom-constraint">
          <h4
            className="tertiary"
            style={{ marginBottom: 16, fontSize: "3vh" }}
          >
            joshuakgao@gmail.com
          </h4>
          <Link to="https://github.com/tugonbob" target="_blank">
            <img className="icon" src={github} />
          </Link>
          <Link to={cvPdf} target="_blank" rel="noreferrer">
            <img className="icon" src={cv} />
          </Link>
        </div>
      </ContainerFullscreen>
    </>
  );
}
