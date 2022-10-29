import React from "react";
import { ScrollDiv } from "../../components/commonComponents";
import { PortfolioTrackerCard } from "../../components/projectComponents/business";
import { SproutsOct22Card } from "../../components/projectComponents/business/sproutsOct22";

export function BusinessPage() {
  return (
    <ScrollDiv>
      <SproutsOct22Card />
      <PortfolioTrackerCard />
    </ScrollDiv>
  );
}
