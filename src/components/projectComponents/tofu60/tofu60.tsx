import React from "react";
import { TitleCard } from "../titleCard";
import watermelon from "../../../assets/images/watermelon.png";

export function Tofu60() {
  return (
    <TitleCard
      d
      backgroundImage={watermelon}
      textLocation={["center", "bottom"]}
    >
      <h1>Tofu60</h1>
    </TitleCard>
  );
}
