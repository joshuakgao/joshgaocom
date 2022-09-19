import React from "react";
import {
  ContentHeader,
  MainContentDiv,
  ScrollDiv,
} from "../../../commonComponents";
import { RedditLaughsCard } from "./redditLaughsCard";

export function RedditLaughsPage() {
  return (
    <ScrollDiv>
      <RedditLaughsCard toFullscreen />
      <MainContentDiv>
        <ContentHeader
          date="6/13/2022"
          skills="Python"
          components="Reddit API Scraping - Python Video Editing"
        />
        <h2>Introduction</h2>
      </MainContentDiv>
    </ScrollDiv>
  );
}
