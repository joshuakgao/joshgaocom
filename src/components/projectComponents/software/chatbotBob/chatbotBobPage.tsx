import React from "react";
import { ScrollDiv } from "../../../commonComponents";
import { ChatbotBobCard } from "./chatbotBobCard";

export function ChatbotBobPage() {
  return (
    <ScrollDiv>
      <ChatbotBobCard toFullscreen />
    </ScrollDiv>
  );
}
