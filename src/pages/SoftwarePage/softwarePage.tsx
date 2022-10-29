import { ScrollDiv } from "../../components/commonComponents";
import {
  ChatbotJoshCard,
  JoshgaocomCard,
  RedditLaughsCard,
  VolleyballConnectCard,
  RealEstateDealFinderCard,
} from "../../components/projectComponents/software";

export function SoftwarePage() {
  return (
    <ScrollDiv>
      <ChatbotJoshCard />
      <JoshgaocomCard />
      <VolleyballConnectCard />
      <RedditLaughsCard />
      <RealEstateDealFinderCard />
    </ScrollDiv>
  );
}
