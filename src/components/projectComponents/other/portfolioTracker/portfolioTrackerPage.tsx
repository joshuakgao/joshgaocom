import React from "react";
import {
  ContentHeader,
  GoogleSheetsEmbed,
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
              "https://docs.google.com/spreadsheets/d/1wrPfNQtEmuMB3GUdjDgKffgdOIyPkrvQC0l_QhYNKxE/edit?usp=sharing",
          }}
        />
        <h2>Introduction</h2>
        <p>
          Ever since I started investing, I've always wanted a birds eye view of
          my stock market portfolio. I wanted to track every single penny that I
          made {"("}or more commonly lost{")"} and glean important insights from
          my portfolio.
        </p>
        <p style={{ marginBottom: 64, color: "var(--tertiary)" }}>
          If the sheet below doesn't load, open it with the link in the header.
          See more technical information in the github link in the header as
          well.
        </p>
        <GoogleSheetsEmbed
          src="https://docs.google.com/spreadsheets/d/1wrPfNQtEmuMB3GUdjDgKffgdOIyPkrvQC0l_QhYNKxE/edit?usp=sharing"
          extend
        />
        <h2 style={{ marginTop: "100vh" }}>Tabs Explanations</h2>
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
        <p>Here is where the S{"&"}P 500 map's data lives.</p>
        <h3>VOO Price History</h3>
        <p>
          I needed to be able to compare my portfolio performance to the S&P500.
          First, I took a history of every trading day of prices since I started
          investing. Then, every time I deposited money into a investment
          account, I would pretend to buy the S&P500. And whenever I withdrew
          money, I would pretend to sell the S&P500. This way I can see the vast
          difference in how much I am lagging the S&P500 to each and every
          penny.
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
