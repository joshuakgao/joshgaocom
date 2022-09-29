import background from "../../../../assets/projects/software/realEstateDealFinder/house2.jpg";
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
      to="/software/realEstateDealFinder"
      toFullscreen={toFullscreen}
    >
      <h1 className="primary">Real Estate Deal Finder</h1>
      <h2 className="primary">
        Automating the search for your next great real estate deal
      </h2>
    </TitleCard>
  );
}
