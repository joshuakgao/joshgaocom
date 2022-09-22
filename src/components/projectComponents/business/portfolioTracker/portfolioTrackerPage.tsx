import React from "react";
import {
  ContentHeader,
  MainContentDiv,
  ScrollDiv,
} from "../../../commonComponents";
import { PortfolioTrackerCard } from "./portfolioTrackerCard";

export function PortfolioTrackerPage() {
  return (
    <ScrollDiv>
      <PortfolioTrackerCard toFullscreen />
      <MainContentDiv>
        <ContentHeader
          date="3/9/2022"
          skills={["js", "googleDrive"]}
          sources={[
            {
              googleDrive:
                "https://docs.google.com/spreadsheets/d/1VVdyaR6301wR6bW8tCLX5kh-q9Qt_3s0AiSrbTvzYKQ/edit?usp=sharing",
            },
          ]}
        />
        <h2>Introduction</h2>
        <iframe
          style={styles.iframe}
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_r0kZBuN8E-M-JmVtZQNNa-2UZmzNq0lOSG0YF4ic1o4EiHgGbApFApUizRJc6mPTVEaHFZt34dbx/pubhtml?widget=true&amp;autosize=true&amp;headers=false&amp;chrome=false"
        />
        <h2 style={{ marginTop: "75vh" }}>Tabs Explanations</h2>
        <h3>Dashboard</h3>
        <h3>History</h3>
        <h3>Positions</h3>
        <h3>Chart Data</h3>
        <h3>Market Map Data</h3>
        <h3>Recent Super Investor Trades</h3>
      </MainContentDiv>
    </ScrollDiv>
  );
}

type StyleSheet = {
  [key: string]: React.CSSProperties;
};

const styles: StyleSheet = {
  iframe: {
    position: "absolute",
    left: "2vw",
    height: "65vh",
    width: "96vw",
    maxWidth: 1615,
    maxHeight: 675,
    border: "1px solid lightgrey",
    borderRadius: 10,
  },
};
