import React from "react";
import { MainContentDiv, NameDate, ScrollDiv } from "../../../commonComponents";
import { ZillowDealFinderCard } from "./zillowDealFinderCard";

export function ZillowDealFinderPage() {
  return (
    <ScrollDiv>
      <ZillowDealFinderCard toFullscreen />
      <MainContentDiv>
        <NameDate date="6/10/2022" />
      </MainContentDiv>
    </ScrollDiv>
  );
}
