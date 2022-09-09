import React from "react";
import { TitleCard } from "../../titleCard";
import chatbot_background from "../../../../assets/projects/software/chatbotBob/chatbot_title_card.png";

export function ChatbotBobCard({
  toFullscreen = false,
}: {
  toFullscreen?: boolean;
}) {
  return (
    <TitleCard
      backgroundImage={chatbot_background}
      textLocation={["bottom", "left"]}
      to="/software/chatbotBob"
      toFullscreen={toFullscreen}
    >
      <h1 className="primary">Chatbot Bob</h1>
    </TitleCard>
  );
}
