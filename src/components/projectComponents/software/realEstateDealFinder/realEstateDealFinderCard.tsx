import ZillowLogo from "../../../../assets/projects/software/realEstateDealFinder/zillow.jpg";
import { TitleCard } from "../../titleCard";

export function RealEstateDealFinderCard({
  toFullscreen,
}: {
  toFullscreen?: boolean;
}) {
  return (
    <TitleCard
      foregroundImage={ZillowLogo}
      foregroundPosition={["bottom", "right"]}
      foregroundSize="calc(4vw + 10vh + 16px)"
      backgroundColor="#006afe"
      to="/software/realEstateDealFinder"
      toFullscreen={toFullscreen}
    >
      <h1 className="primary">Zillow Deal Finder</h1>
      <h2 className="primary">
        Automating the search for your next great real estate deal
      </h2>
    </TitleCard>
  );
}
