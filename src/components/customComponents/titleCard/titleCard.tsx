import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export function TitleCard({
  children,
  border,
  backgroundImage,
  backgroundColor,
  backgroundSize = "cover",
  backgroundPosition = "center",
  backgroundDarken = 0,
  foregroundImage,
  foregroundSize = "50%",
  foregroundPosition = ["center"],
  textPosition = ["top", "left"],
  textWidth = "40vw",
  to = "/",
  toFullscreen = false,
  isFolder = false,
}: {
  children?: any;
  border?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  backgroundSize?: string | number;
  backgroundPosition?: string;
  backgroundDarken?: number;
  foregroundImage?: string;
  foregroundSize?: string;
  foregroundPosition?: [string, string] | [string];
  textPosition?: [string, string] | [string];
  textWidth?: string;
  to?: string;
  toFullscreen?: boolean;
  isFolder?: boolean;
}) {
  const navigate = useNavigate();
  const myRef = useRef<null | HTMLDivElement>(null);

  const goToPage = () => {
    if (!myRef.current) return;

    window.scrollTo({
      left: 0,
      top: myRef.current.offsetTop,
      behavior: "smooth",
    });

    setTimeout(() => {
      navigate(to);
    }, 400);
  };

  let parseTextPosition = () => {
    let alignItems = "";
    let justifyContent = "";

    let position = textPosition.map((e) => e.toLocaleLowerCase());

    // deal with all positions except center, because center could be meant for alignItems and justifyContent
    if (position.includes("left")) justifyContent = "flex-start";
    else if (position.includes("right")) justifyContent = "flex-end";
    if (position.includes("top")) alignItems = "flex-start";
    else if (position.includes("bottom")) alignItems = "flex-end";

    // deal with center. If either alignItems and justifyContent is empty, assume center is meant for that variable
    if (position.includes("center")) {
      if (alignItems === "" && justifyContent === "") {
        alignItems = "center";
        justifyContent = "center";
      } else if (alignItems === "") alignItems = "center";
      else if (justifyContent === "") justifyContent = "center";
    }

    return { alignItems, justifyContent };
  };

  let parseForegroundPosition = () => {
    let top;
    let bottom;
    let right;
    let left;

    let position = foregroundPosition.map((e) => e.toLocaleLowerCase());

    // deal with all positions except center
    if (position.includes("left")) left = "calc(8vw + 16px)";
    else if (position.includes("right")) right = "calc(8vw + 16px)";
    if (position.includes("top")) top = "calc(10vh + 16px)";
    else if (position.includes("bottom")) bottom = "calc(10vh + 16px)";

    // deal with center. If either alignItems and justifyContent is empty, assume center is meant for that variable
    if (position.includes("center")) {
      if (
        top === undefined &&
        bottom === undefined &&
        right === undefined &&
        left === undefined
      ) {
        top = 0;
        bottom = 0;
        right = 0;
        left = 0;
      } else if (left === undefined && right === undefined) {
        left = 0;
        right = 0;
      } else if (top === undefined && bottom === undefined) {
        top = 0;
        bottom = 0;
      }
    }

    return { top, bottom, right, left };
  };

  // parse textPosition
  let textPositionObj = parseTextPosition();
  let alignItems = textPositionObj.alignItems;
  let justifyContent = textPositionObj.justifyContent;

  // parse foregroundLocation
  let foregroundPositionObj = parseForegroundPosition();
  let top = foregroundPositionObj.top;
  let bottom = foregroundPositionObj.bottom;
  let right = foregroundPositionObj.right;
  let left = foregroundPositionObj.left;

  return (
    <>
      {isFolder ? (
        <div
          ref={myRef}
          style={{
            ...styles.projectContainer,
            ...{
              marginBottom: toFullscreen ? "128px" : "20%",
              position: "absolute",
              left: -20,
              top: -5,
            },
          }}
          className={`title-card-container`}
        >
          <div
            onClick={goToPage}
            style={{
              ...styles.titleCard,
              ...{
                cursor: "pointer",
                pointerEvents: toFullscreen ? "none" : undefined,
                // backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.${backgroundDarken}) 0%, rgba(0,0,0,0.${backgroundDarken}) 100%), url(${backgroundImage})`,
                backgroundColor: "lightgray",
                backgroundSize,
                backgroundPosition,
                backgroundRepeat: "no-repeat",
                alignItems,
                justifyContent,
              },
            }}
            className={
              toFullscreen
                ? "enlarge-fullscreen"
                : "enlarge-fullscreen-reverse link"
            }
          >
            {foregroundImage ? (
              <div
                style={{
                  position: "absolute",
                  margin: "auto",
                  top,
                  bottom,
                  right,
                  left,
                  height: undefined,
                  width: foregroundSize,
                }}
              >
                <img
                  src={foregroundImage}
                  style={{ height: undefined, width: foregroundSize }}
                  alt="" // required by eslint
                />
              </div>
            ) : null}

            <div
              style={{ width: textWidth, filter: "brightness(100%)" }}
              className={toFullscreen ? "fade-in-out" : "remove-fade-in"}
            >
              {children}
            </div>
          </div>
        </div>
      ) : null}
      <div
        ref={myRef}
        style={{
          ...styles.projectContainer,
          ...{
            marginBottom: toFullscreen ? "128px" : "20%",
          },
        }}
        className={`title-card-container`}
      >
        <div
          onClick={goToPage}
          style={{
            ...styles.titleCard,
            ...{
              border,
              cursor: "pointer",
              pointerEvents: toFullscreen ? "none" : undefined,
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.${backgroundDarken}) 0%, rgba(0,0,0,0.${backgroundDarken}) 100%), url(${backgroundImage})`,
              backgroundColor,
              backgroundSize,
              backgroundPosition,
              backgroundRepeat: "no-repeat",
              alignItems,
              justifyContent,
            },
          }}
          className={
            toFullscreen
              ? "enlarge-fullscreen"
              : "enlarge-fullscreen-reverse link"
          }
        >
          {foregroundImage ? (
            <div
              style={{
                position: "absolute",
                margin: "auto",
                top,
                bottom,
                right,
                left,
                height: undefined,
                width: foregroundSize,
              }}
            >
              <img
                src={foregroundImage}
                style={{ height: undefined, width: foregroundSize }}
                alt="" // required by eslint
              />
            </div>
          ) : null}

          <div
            style={{ width: textWidth, filter: "brightness(100%)" }}
            className={toFullscreen ? "fade-in-out" : "remove-fade-in"}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  projectContainer: {
    display: "flex",
    height: "100vh",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  titleCard: {
    position: "relative",
    display: "flex",
    height: "80%",
    width: "70%",
    boxSizing: "border-box",
    paddingTop: "calc(10vh + 16px)",
    paddingBottom: "calc(8vh + 16px)",
    paddingRight: "calc(16px)",
    paddingLeft: "calc(8vw + 16px)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    textDecorationLine: "none",
    overflow: "hidden",
    borderRadius: "var(--borderRadius)",
  },
};
