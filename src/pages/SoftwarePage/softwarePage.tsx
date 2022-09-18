import { ScrollDiv } from "../../components/commonComponents";
import {
  ChatbotBobCard,
  RedditLaughsCard,
  VolleyballConnectCard,
  ZillowDealFinderCard,
} from "../../components/projectComponents/software";

export function SoftwarePage() {
  return (
    <ScrollDiv>
      <ChatbotBobCard />
      <VolleyballConnectCard />
      <RedditLaughsCard />
      <ZillowDealFinderCard />
    </ScrollDiv>
  );
}
