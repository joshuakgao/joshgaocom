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
      textLocation={["bottom", "left"]}
      to="/business/PortfolioTracker"
      toFullscreen={toFullscreen}
    >
      <h1 className="primary">Portolio Tracker</h1>
      <h2 className="tertiary">
        A personal stock portfolio built with Google Sheets
      </h2>
    </TitleCard>
  );
}
