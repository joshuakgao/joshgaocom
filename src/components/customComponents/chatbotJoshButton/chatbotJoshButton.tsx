import React, { useState } from "react";
import { MyIcon } from "../../commonComponents";
import { dialogflow } from "../../../assets/customIcons";

export default function ChatbotJoshButton() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div style={styles.buttonAndChatContainer}>
      <iframe
        allow="microphone;"
        height={showChat ? "500" : "0"}
        src="https://console.dialogflow.com/api-client/demo/embedded/a3b4c3fb-13eb-4d22-a5a8-ec7d4f659e0e"
        style={{ border: "0px solid lightgrey", minWidth: "37vw" }}
      />
      <div
        style={styles.buttonContainer}
        onClick={() => setShowChat(!showChat)}
      >
        <MyIcon icon={dialogflow} size="4x" />
      </div>
    </div>
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  buttonAndChatContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    // justifyContent: "flex-end",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffe135",
    height: 50,
    width: 50,
    borderRadius: 1000,
    marginLeft: 16,
  },
};
