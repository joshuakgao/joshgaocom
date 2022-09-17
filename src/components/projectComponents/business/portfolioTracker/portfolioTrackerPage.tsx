import React from "react";
import { MainContentDiv, ScrollDiv } from "../../../commonComponents";
import { PortfolioTrackerCard } from "./portfolioTrackerCard";

export function PortfolioTrackerPage() {
  return (
    <ScrollDiv>
      <PortfolioTrackerCard toFullscreen />
      <MainContentDiv>
        <h1>hi</h1>
      </MainContentDiv>
    </ScrollDiv>
  );
}
