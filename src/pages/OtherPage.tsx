import { ScrollDiv } from "../components/commonComponents";
import {
  PortfolioTrackerCard,
  RealEstateDealFinderCard,
  RedditLaughsCard,
  Tofu60Card,
} from "../components/projectComponents/other";

export function OtherPage() {
  return (
    <ScrollDiv>
      <RedditLaughsCard />
      <PortfolioTrackerCard />
      <RealEstateDealFinderCard />
      <Tofu60Card />
    </ScrollDiv>
  );
}
