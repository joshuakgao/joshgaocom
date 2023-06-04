import { ScrollDiv } from "../components/commonComponents";
import {
  PortfolioTrackerCard,
  RealEstateDealFinderCard,
  RedditLaughsCard,
} from "../components/projectComponents/other";

export function OtherPage() {
  return (
    <ScrollDiv>
      <RedditLaughsCard />
      <PortfolioTrackerCard />
      <RealEstateDealFinderCard />
    </ScrollDiv>
  );
}
