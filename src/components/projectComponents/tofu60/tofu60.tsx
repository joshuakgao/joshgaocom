import React from "react";
import { TitleCard } from "../titleCard";
import tofu60_profile from "../../../assets/projects/tofu60/tofu60_profile.jpeg";

export function Tofu60() {
  return (
    <TitleCard
      backgroundImage={tofu60_profile}
      textLocation={["left", "bottom"]}
      to="/other/tofu60"
    >
      <h1 className="primary">Tofu60</h1>
    </TitleCard>
  );
}
