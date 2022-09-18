import React from "react";
import { ScrollDiv } from "../../components/commonComponents";
import {
  ChatbotBobCard,
  ZillowDealFinderCard,
} from "../../components/projectComponents/software";

export function SoftwarePage() {
  return (
    <ScrollDiv>
      <ChatbotBobCard />
      <ZillowDealFinderCard />
    </ScrollDiv>
  );
}
