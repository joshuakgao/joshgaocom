import React from "react";
import { TitleCard } from "../../titleCard";
import {
  insideSprouts,
  storeLocations,
  storeFront,
} from "../../../../assets/projects/business/SproutsOct22";

export function SproutsOct22Card({
  toFullscreen = false,
}: {
  toFullscreen?: boolean;
}) {
  return (
    <TitleCard
      to="/business/SproutsOct22"
      toFullscreen={toFullscreen}
      backgroundImage={storeFront}
      backgroundSize="100%"
      backgroundColor="white"
      backgroundPosition="bottom"
    >
      <h1 className="secondary">Sprouts Farmers Market</h1>
      <h2 className="secondary">Growth Play in the Growth Industry?</h2>
    </TitleCard>
  );
}
