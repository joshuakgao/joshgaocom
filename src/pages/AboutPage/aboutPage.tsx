import React from "react";
import { FullscreenDiv, ScrollDiv } from "../../components/commonComponents";
import me from "../../assets/images/me.jpg";
import ChatbotJoshButton from "../../components/customComponents/chatbotJoshButton/chatbotJoshButton";

export default function AboutPage() {
  return (
    <FullscreenDiv style={styles.container}>
      <div style={styles.contentContainer}>
        <h1 style={styles.title} className="secondary fade-up">
          About Me
        </h1>
        <h4 style={styles.subtitle} className="secondary fade-up">
          I'm Josh Gao, I am a Machine Learning Engineer based in Texas. I love
          analyzing and visualizing large amounts of data and providing unique
          and helpful insights. Some of my other interests include playing
          volleyball and writing music.
        </h4>
      </div>
      <img style={styles.img} src={me} />
      <div style={styles.chatbotJoshButtonContainer}>
        <ChatbotJoshButton />
      </div>
    </FullscreenDiv>
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  contentContainer: {
    marginRight: "5%",
    textAlign: "left",
  },
  title: {
    fontWeight: "bolder",
  },
  subtitle: {
    marginTop: 8,
    maxWidth: 600,
    textAlign: "justify",
  },
  img: {
    borderRadius: "var(--borderRadius)",
    height: "80vh",
    zIndex: "-1",
  },
  chatbotJoshButtonContainer: {
    position: "absolute",
    bottom: 26,
    right: 26,
  },
};
