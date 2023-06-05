import background from "../../../../assets/projects/other/realEstateDealFinder/beachHouse.jpg";
import { TitleCard } from "../../titleCard";

export function RealEstateDealFinderCard({
  toFullscreen,
}: {
  toFullscreen?: boolean;
}) {
  return (
    <TitleCard
      backgroundImage={background}
      backgroundPosition={"center"}
      textPosition={["top", "right"]}
      textWidth="33vw"
      to="/other/realEstateDealFinder"
      toFullscreen={toFullscreen}
    >
      <h1 className="primary">Real Estate Deal Finder</h1>
      <h2 className="primary">
        Automating the search for your next great real estate deal
      </h2>
    </TitleCard>
  );
}
