import tofu60_profile from "../../../../assets/projects/other/tofu60/tofu60_profile.jpeg";
import { TitleCard } from "../../titleCard";

export function Tofu60Card({
  toFullscreen = false,
}: {
  toFullscreen?: boolean;
}) {
  return (
    <TitleCard
      backgroundImage={tofu60_profile}
      textLocation={["left", "bottom"]}
      to="/other/tofu60"
      toFullscreen={toFullscreen}
    >
      <h1>Tofu60</h1>
      <h2>A custom built mechanical keyboard</h2>
    </TitleCard>
  );
}
