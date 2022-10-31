import React, { useState } from "react";
import { MyIcon } from "../../commonComponents";
import { dialogflow } from "../../../assets/customIcons";
import "./styles.css";

export default function ChatbotJoshButton() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div style={styles.buttonAndChatContainer} className="chatbotJoshButton">
      <iframe
        className={showChat ? "fade-in" : "fade-out"}
        allow="microphone;"
        height={"100%"}
        width={"100%"}
        src="https://console.dialogflow.com/api-client/demo/embedded/a3b4c3fb-13eb-4d22-a5a8-ec7d4f659e0e"
        style={{ border: "0px solid lightgrey", minWidth: "37vw" }}
      />
      <div
        className="button"
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
    height: "85vh",
    width: "90vw",
    maxHeight: 400,
    maxWidth: 400 * 1.618,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffe135",
    minHeight: 50,
    minWidth: 50,
    borderRadius: 1000,
    marginLeft: 16,
  },
};
