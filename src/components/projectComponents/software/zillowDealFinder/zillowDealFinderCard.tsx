import ZillowLogo from "../../../../assets/projects/software/zillowDealFinder/zillow.jpg";
import { TitleCard } from "../../titleCard";

export function ZillowDealFinderCard({
  toFullscreen,
}: {
  toFullscreen?: boolean;
}) {
  return (
    <TitleCard
      backgroundImage={ZillowLogo}
      backgroundSize="20vh"
      backgroundPosition="85% 85%"
      backgroundColor="#006afe"
      textPosition={["top", "center"]}
      to="/software/zillowDealFinder"
      toFullscreen={toFullscreen}
    >
      <h1 className="primary">Zillow Deal Finder</h1>
      <h2 className="primary">
        Automating the search for your next great real estate deal
      </h2>
    </TitleCard>
  );
}
