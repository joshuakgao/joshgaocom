import React, { useState } from "react";
import { FullscreenDiv, RowDiv } from "../../commonComponents";
import github from "../../../assets/images/github.png";
import cv from "../../../assets/images/cv.png";
import cvPdf from "../../../assets/docs/cv.pdf";
import { Link } from "react-router-dom";
import "./styles.css";

export function HamburgerMenu({ d }: { d?: boolean }) {
  const [pressed, setPressed] = useState<boolean>(false);

  return (
    <>
      <div
        style={{
          ...styles.hamburgerContainer,
          ...{
            border: d ? "1px solid black" : undefined,
          },
        }}
        onClick={() => setPressed(!pressed)}
        className="hamburger-container"
      >
        <hr
          style={styles.line}
          className={`top-line ${pressed ? "fade-left" : "fade-left-reverse"}`}
        />
        <hr
          style={styles.line}
          className={`middle-line ${
            pressed ? "rotate-clockwise" : "rotate-clockwise-reverse"
          }`}
        />
        <hr
          style={styles.line}
          className={`hidden-middle-line ${
            pressed
              ? "rotate-counter-clockwise"
              : "rotate-counter-clockwise-reverse"
          }`}
        />
        <hr
          style={styles.line}
          className={`bottom-line ${
            pressed ? "fade-right" : "fade-right-reverse"
          }`}
        />
      </div>

      {pressed ? (
        <FullscreenDiv style={styles.menuContainer}>
          <div style={styles.menu}>
            <Link to="/software" onClick={() => setPressed(false)}>
              <h1 style={styles.h1}>Software</h1>
            </Link>
            <Link to="/business" onClick={() => setPressed(false)}>
              <h1 style={styles.h1}>Business</h1>
            </Link>
            <Link to="/other" onClick={() => setPressed(false)}>
              <h1 style={styles.h1}>Other</h1>
            </Link>
          </div>

          <div style={styles.footer}>
            <h4 style={{ marginBottom: 16, fontSize: "3vh" }}>
              joshuakgao@gmail.com
            </h4>
            <RowDiv>
              <Link to="https://github.com/tugonbob" target="_blank">
                <img style={styles.icon} src={github} />
              </Link>
              <Link to={cvPdf} target="_blank" rel="noreferrer">
                <img style={styles.icon} src={cv} />
              </Link>
            </RowDiv>
          </div>
        </FullscreenDiv>
      ) : null}
    </>
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  hamburgerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: 50,
    margin: 32,
    zIndex: 11,
  },
  line: {
    border: "1px solid black",
    height: 0,
    width: 32,
  },
  menuContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginRight: 32,
    opacity: 0.9,
    zIndex: 10,
    border: "1px black solid",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginRight: 32,
    marginTop: "20vh",
  },
  h1: {
    textDecoration: "none",
    fontSize: "10vh",
    marginTop: "2vh",
    marginBottom: "2vh",
  },
  icon: {
    height: "5vh",
    width: "5vh",
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginRight: 32,
    marginBottom: 16,
  },
};
