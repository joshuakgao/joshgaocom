import React from "react";
import { TitleCard } from "../../titleCard";
import stockBackground from "../../../../assets/projects/business/PortfolioTracker/stockMarketGoingUp-background.jpg";

export function PortfolioTrackerCard({
  toFullscreen = false,
}: {
  toFullscreen?: boolean;
}) {
  return (
    <TitleCard
      backgroundImage={stockBackground}
      textLocation={["top", "right"]}
      to="/business/PortfolioTracker"
      toFullscreen={toFullscreen}
    >
      <h1 className="primary">Portolio Tracker</h1>
    </TitleCard>
  );
}
