import React from "react";
import { TitleCard } from "../../titleCard";

export function RedditLaughsCard({ toFullscreen }: { toFullscreen?: boolean }) {
  return (
    <TitleCard
      backgroundColor="red"
      toFullscreen={toFullscreen}
      to="/software/redditLaughs"
    >
      <h1>Reddit Laughs</h1>
    </TitleCard>
  );
}
