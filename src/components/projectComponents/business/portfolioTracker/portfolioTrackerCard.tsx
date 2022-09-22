import React from "react";
import { TitleCard } from "../../titleCard";
import stockBackground from "../../../../assets/projects/business/PortfolioTracker/piechart.jpg";

export function PortfolioTrackerCard({
  toFullscreen = false,
}: {
  toFullscreen?: boolean;
}) {
  return (
    <TitleCard
      backgroundImage={stockBackground}
      textPosition={["bottom", "left"]}
      to="/business/PortfolioTracker"
      toFullscreen={toFullscreen}
    >
      <h1 className="primary">Portolio Tracker</h1>
      <h2 className="primary">
        A personal stock portfolio built with Google Sheets
      </h2>
    </TitleCard>
  );
}
