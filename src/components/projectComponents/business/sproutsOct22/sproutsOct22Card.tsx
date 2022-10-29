import { sproutsLogo } from "../../../../assets/projects/business/SproutsOct22";
import { TitleCard } from "../../titleCard";

export function SproutsOct22Card({
  toFullscreen = false,
}: {
  toFullscreen?: boolean;
}) {
  return (
    <TitleCard
      to="/business/SproutsOct22"
      toFullscreen={toFullscreen}
      backgroundImage={sproutsLogo}
      backgroundSize="50%"
      backgroundColor="white"
    >
      <h1 className="secondary">Sprouts Farmers Market</h1>
      <h2 className="secondary">Growth Play in the Grocery Industry?</h2>
    </TitleCard>
  );
}
