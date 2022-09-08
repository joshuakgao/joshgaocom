import React from "react";
import { FullscreenDiv } from "../../components/commonComponents";

export function HomePage() {
  return (
    <FullscreenDiv style={styles.container}>
      <div style={styles.contentContainer}>
        <h1 style={styles.title} className="secondary">
          Joshua Gao
        </h1>
        <h2 style={styles.subtitle} className="secondary">
          Exploring software, business and more
        </h2>
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
