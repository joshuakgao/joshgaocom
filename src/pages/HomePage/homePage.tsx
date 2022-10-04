import React from "react";
import { FullscreenDiv } from "../../components/commonComponents";
import { DotObject } from "../../components/customComponents";
import "./styles.css";

export function HomePage() {
  return (
    <FullscreenDiv style={styles.container} className="home-page">
      <DotObject />
      <div style={styles.contentContainer}>
        <h1 style={styles.title} className="secondary fade-up">
          Joshua Gao
        </h1>
        <h4 style={styles.subtitle} className="secondary fade-up-later">
          Exploring software, business and more
        </h4>
      </div>
    </FullscreenDiv>
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  container: {
    display: "flex",
    alignItems: "center",
  },
  contentContainer: {
    marginLeft: "15%",
    marginRight: "15%",
    textAlign: "left",
  },
  title: {
    fontWeight: "bolder",
  },
  subtitle: {
    marginTop: 8,
  },
};
