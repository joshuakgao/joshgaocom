import React from "react";
import { MainContentDiv, NameDate, ScrollDiv } from "../../../commonComponents";
import { RedditLaughsCard } from "./redditLaughsCard";

export function RedditLaughsPage() {
  return (
    <ScrollDiv>
      <RedditLaughsCard toFullscreen />
      <MainContentDiv>
        <NameDate date="6/13/2022" />
        <h2>Introduction</h2>
      </MainContentDiv>
    </ScrollDiv>
  );
}
