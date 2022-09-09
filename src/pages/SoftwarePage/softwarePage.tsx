import React from "react";
import { ScrollDiv } from "../../components/commonComponents";

export function SoftwarePage() {
  return (
    <ScrollDiv>
      <iframe
        allow="microphone;"
        width="350"
        height="430"
        src="https://console.dialogflow.com/api-client/demo/embedded/b17d18f9-3b6a-48fc-8ea7-956717271319"
      />
    </ScrollDiv>
  );
}
