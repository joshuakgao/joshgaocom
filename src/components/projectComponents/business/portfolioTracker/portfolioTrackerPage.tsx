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
          projectComponents="Data Scraping - Excel Scripting"
          sources={{
            github: "https://github.com/tugonbob/PortfolioTracker.git",
            googleDrive:
              "https://docs.google.com/spreadsheets/d/1VVdyaR6301wR6bW8tCLX5kh-q9Qt_3s0AiSrbTvzYKQ/edit?usp=sharing",
          }}
        />
        <h2>Quick Summary</h2>
        <p>
          I created a stock market portfolio tracker with Google Sheets to track
          my returns. I input every trade, dividend, and deposit and use Google
          Sheet's App Script to code up the calculation of all the data. I
          update my actions regularly.
        </p>
        <p>
          If the sheet below doesn't load, open it with the link in the header.
          See more technical information in the github link in the header as
          well.
        </p>
        <iframe
          style={styles.iframe}
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_r0kZBuN8E-M-JmVtZQNNa-2UZmzNq0lOSG0YF4ic1o4EiHgGbApFApUizRJc6mPTVEaHFZt34dbx/pubhtml?widget=true&amp;autosize=true&amp;headers=false&amp;chrome=false"
        />
        <h2 style={{ marginTop: "95vh" }}>Tabs Explanations</h2>
        <h3>Dashboard</h3>
        <p>
          Here is the main tab of the whole spreadsheet. It features some
          portfolio stats, a performance chart, a map of the S{"&"}P 500, recent
          super investory trades, and more!
        </p>
        <h3>History</h3>
        <p>
          This tab is used to track every single action that I've taken with my
          stock portfolio since it's inception. It includes any buys or sells
          and their ticker and price. As well as deposits or withdrawals. And
          lastly, any dividends that have been given.
        </p>
        <p>
          All this is used to calculate pretty much every little thing in the
          spreadsheet.
        </p>
        <h3>Positions</h3>
        <p>
          Here, I can get quick stats on all the tickers that I have ever traded
          on - including gains and losses and any dividends.
        </p>
        <h3>Chart Data</h3>
        <p>
          This chart data has four main sections: Dynamic Chart, Portfolio
          Value, Minute Gains, and Daily Gains. We are going to come back to
          Dynamic Chart and describe the rest first.
        </p>
        <p>
          Portfolio Value is current dollar value of the entire portoflio. This
          is tracked daily after market close by adding up the value of my
          postions with the amount of cash.
        </p>
        <p>
          Minute Gains is used to track the amount of money gained or lossed
          during today's trading day. Before the next trading day, this column
          deletes itself.
        </p>
        <p>
          Daily Gains records the sum of realized and unrealized gains at market
          close everyday.
        </p>
        <p>
          These columns are not only used to keep a history of portoflio
          performance, but also to create the performance chart in the
          "Dashboard" tab.
        </p>
        <h3>Market Map Data</h3>
        <p>
          Here is where the S{"&"}P 500 map's data lives. I also keep track of
          major inidices day gain and YTD gain.
        </p>
        <h3>Super Investor</h3>
        <p>
          I wanted a way to find quality stock ideas. I do this by keeping track
          of all trades of "Super Investors" from the website: dataroma.com and
          displaying them in the "Dashboard" tab.
        </p>
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
    left: "3vw",
    height: "94vh",
    width: "94vw",
    maxWidth: 1615,
    maxHeight: 675,
    border: "1px solid lightgrey",
    borderRadius: 10,
  },
};
