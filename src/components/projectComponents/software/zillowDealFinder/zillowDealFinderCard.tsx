import React from "react";
import { TitleCard } from "../../titleCard";
import ZillowLogo from "../../../../assets/projects/software/zillowDealFinder/ZillowLogo.png";

export function ZillowDealFinderCard({
  toFullscreen = false,
}: {
  toFullscreen?: boolean;
}) {
  return (
    <TitleCard
      backgroundImage={ZillowLogo}
      textLocation={["center", "center"]}
      to="/software/zillowDealFinder"
      toFullscreen={toFullscreen}
    >
      <h1 className="primary">Zillow Deal Finder</h1>
    </TitleCard>
  );
}
