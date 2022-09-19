import React from "react";
import { MainContentDiv, ScrollDiv } from "../../../commonComponents";
import { ZillowDealFinderCard } from "./zillowDealFinderCard";

export function ZillowDealFinderPage() {
  return (
    <ScrollDiv>
      <ZillowDealFinderCard toFullscreen />
      <MainContentDiv>
        <h1>Introduction</h1>
      </MainContentDiv>
    </ScrollDiv>
  );
}
