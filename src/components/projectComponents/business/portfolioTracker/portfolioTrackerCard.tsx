import React from "react";
import { TitleCard } from "../../titleCard";
import stockBackground from "../../../../assets/projects/business/PortfolioTracker/background.jpg";

export function PortfolioTrackerCard({
  toFullscreen = false,
}: {
  toFullscreen?: boolean;
}) {
  return (
    <TitleCard
      backgroundImage={stockBackground}
      textLocation={["bottom", "left"]}
      to="/business/PortfolioTracker"
      toFullscreen={toFullscreen}
    >
      <h1 className="primary">Portolio Tracker</h1>
    </TitleCard>
  );
}
