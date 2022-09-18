import { ScrollDiv } from "../../components/commonComponents";
import {
  ChatbotBobCard,
  JoshgaocomCard,
  RedditLaughsCard,
  VolleyballConnectCard,
  ZillowDealFinderCard,
} from "../../components/projectComponents/software";

export function SoftwarePage() {
  return (
    <ScrollDiv>
      <ChatbotBobCard />
      <JoshgaocomCard />
      <VolleyballConnectCard />
      <RedditLaughsCard />
      <ZillowDealFinderCard />
    </ScrollDiv>
  );
}
