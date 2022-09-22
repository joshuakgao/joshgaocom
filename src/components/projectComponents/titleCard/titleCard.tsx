import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

export function TitleCard({
  children,
  d,
  backgroundImage,
  backgroundColor,
  backgroundSize = "cover",
  backgroundPosition = "center",
  textLocation = ["top", "left"],
  to = "/",
  toFullscreen = false,
}: {
  children?: any;
  d?: boolean;
  backgroundImage?: string;
  backgroundColor?: string;
  backgroundSize?: string | number;
  backgroundPosition?: string;
  textLocation?: [string, string] | [string];
  to?: string;
  toFullscreen?: boolean;
}) {
  const navigate = useNavigate();
  const myRef = useRef<null | HTMLDivElement>(null);

  // window.addEventListener("orientationchange", () => {
  //   let afterOrientationChange = () => {
  //     window.removeEventListener("resize", afterOrientationChange);
  //   };
  //   window.addEventListener("resize", afterOrientationChange);
  // });

  const goToPage = () => {
    if (!myRef.current) return;

    window.scrollTo({
      left: 0,
      top: myRef.current.offsetTop,
      behavior: "smooth",
    });

    setTimeout(() => {
      navigate(to);
    }, 500);
  };

  // parse textLocation
  let alignItems = "";
  let justifyContent = "";

  let location = textLocation.map((e) => e.toLocaleLowerCase());

  // deal with all locations except center, because center could be meant for alignItems and justifyContent
  if (location.includes("left")) justifyContent = "flex-start";
  else if (location.includes("right")) justifyContent = "flex-end";
  if (location.includes("top")) alignItems = "flex-start";
  else if (location.includes("bottom")) alignItems = "flex-end";

  // deal with center. If either alignItems and justifyContent is empty, assume center is meant for that variable
  if (location.includes("center")) {
    if (alignItems === "" && justifyContent === "") {
      alignItems = "center";
      justifyContent = "center";
    } else if (alignItems === "") alignItems = "center";
    else if (justifyContent === "") justifyContent = "center";
  }

  return (
    <div
      ref={myRef}
      style={{
        ...styles.projectContainer,
        ...{
          border: d ? "1px solid black" : undefined,
          marginBottom: toFullscreen ? "10%" : "20%",
        },
      }}
      className={`title-card-container`}
    >
      <div
        onClick={goToPage}
        style={{
          ...styles.titleCard,
          ...{
            border: d ? "1px solid black" : undefined,
            cursor: "pointer",
            pointerEvents: toFullscreen ? "none" : undefined,
            backgroundImage: `url(${backgroundImage})`,
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
        <div className={toFullscreen ? "fade-in-out" : "remove-fade-in"}>
          {children}
        </div>
      </div>
    </div>
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
    display: "flex",
    height: "80%",
    width: "70%",
    boxSizing: "border-box",
    paddingTop: "calc(10vh + 16px)",
    paddingBottom: "calc(8vh + 16px)",
    paddingRight: "calc(8vw + 16px)",
    paddingLeft: "calc(8vw + 16px)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    textDecorationLine: "none",
    overflow: "hidden",
  },
};
