import React from "react";
import { ScrollDiv } from "../../components/commonComponents";
import {
  ChatbotBobCard,
  RedditLaughsCard,
  ZillowDealFinderCard,
} from "../../components/projectComponents/software";

export function SoftwarePage() {
  return (
    <ScrollDiv>
      <ChatbotBobCard />
      <RedditLaughsCard />
      <ZillowDealFinderCard />
    </ScrollDiv>
  );
}
