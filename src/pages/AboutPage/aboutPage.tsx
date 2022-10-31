import React from "react";
import me from "../../assets/images/me.jpg";
import { ScrollDiv } from "../../components/commonComponents";
import ChatbotJoshButton from "../../components/customComponents/chatbotJoshButton/chatbotJoshButton";

export default function AboutPage() {
  return (
    <>
      <ScrollDiv style={styles.container}>
        <div style={styles.textContainer}>
          <h1>About Me</h1>
          <h4 style={styles.subtitle} className="fade-up">
            I'm Josh Gao, I am a Machine Learning Engineer based in Texas. I
            love analyzing and visualizing large amounts of data and providing
            unique and helpful insights. Some of my other interests include
            playing volleyball and writing music.
          </h4>
        </div>
        <img style={styles.img} src={me} />
      </ScrollDiv>
      <div style={styles.chatbotJoshButtonContainer}>
        <ChatbotJoshButton />
      </div>
    </>
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "100vh",
    paddingLeft: "calc(32px + 10vw)",
    paddingRight: "calc(32px + 10vw)",
  },
  textContainer: {
    maxWidth: 500,
    marginTop: 50,
  },
  title: {
    fontWeight: "bolder",
  },
  subtitle: {
    marginTop: 8,
    textAlign: "justify",
  },
  img: {
    borderRadius: "var(--borderRadius)",
    marginTop: 32,
    marginBottom: 32,
    width: "100%",
    maxWidth: 450,
    minWidth: 200,
    height: undefined,
  },
  chatbotJoshButtonContainer: {
    position: "fixed",
    bottom: "calc(16px + 1vw)",
    right: "calc(16px + 1vw)",
  },
};
