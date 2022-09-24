import React from "react";
import {
  ContentHeader,
  MainContentDiv,
  ScrollDiv,
} from "../../../commonComponents";
import { ZillowDealFinderCard } from "./zillowDealFinderCard";

export function ZillowDealFinderPage() {
  return (
    <ScrollDiv>
      <ZillowDealFinderCard toFullscreen />
      <MainContentDiv>
        <ContentHeader
          date="20/6/2022"
          skills={["python", "googleDrive"]}
          projectComponents={"Zillow Data Scraping - Proxies - Google Sheets"}
          sources={{
            github: "https://github.com/tugonbob/ZillowListingsScraper.git",
            googleDrive:
              "https://docs.google.com/spreadsheets/d/1qD2yjneLiJczgDRSSvbo4YF5NHOBaaOxutOvw86UOtg/edit?usp=sharing",
          }}
        />
        <h2>Summary</h2>
        <h2>Introduction</h2>
        <iframe
          style={styles.iframe}
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRV3VF8HIPGQal3m6bUSKfPrIRf1bDqNiCrDDPJ2g50TkPMmXnPbYV-k1v19l-yHt6os7fTJ8kcHSzZ/pubhtml?widget=true&amp;headers=false"
        />
        <h2>Zillow Data Scraping</h2>
        <h2>Taking on Bot Protection with Proxies</h2>
        <h2>Analayzing Data</h2>
        <h2>Conclusion</h2>
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
    left: "7vw",
    height: "86vh",
    width: "86vw",
    maxWidth: 1615,
    maxHeight: 675,
    border: "1px solid lightgrey",
    borderRadius: 10,
  },
};
