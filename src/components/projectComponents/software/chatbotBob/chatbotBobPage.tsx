import React from "react";
import { MainContentDiv, ScrollDiv } from "../../../commonComponents";
import { ChatbotBobCard } from "./chatbotBobCard";

export function ChatbotBobPage() {
  return (
    <ScrollDiv>
      <ChatbotBobCard toFullscreen />
      <MainContentDiv>
        <h2>Talk to Bob</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <iframe
            allow="microphone;"
            width="350"
            height="430"
            src="https://console.dialogflow.com/api-client/demo/embedded/b17d18f9-3b6a-48fc-8ea7-956717271319"
            style={{ border: "0px solid black" }}
          />
        </div>
        <h3>Try These Questions</h3>
        <p>
          What is your name?
          <br />
          How are you?
        </p>
      </MainContentDiv>
    </ScrollDiv>
  );
}
