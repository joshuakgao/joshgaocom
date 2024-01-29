import React from "react";
import me from "../assets/images/me.jpg";
import {
  MyIcon,
  Row,
  ScrollDiv,
  Spacer,
  Col,
} from "../components/commonComponents";
import "../assets/styles.css";
import { cv, github, linkedin_transparent } from "../assets/customIcons";
import cvPdf from "../assets/docs/cv.pdf";

export function HomePage() {
  return (
    <ScrollDiv style={styles.container}>
      <Col style={styles.textContainer}>
        <h1 style={{ fontSize: "calc(16px + 2vw)" }} className="fade-in-0">
          Hey, I'm Joshua Gao
        </h1>
        <h4 style={styles.subtitle} className="fade-in-3">
          By day, I'm an AI Engineer navigating the realms of computer vision
          and natural language processing. I'm passionate about unraveling
          complex algorithms and creating new machine learning models, and am
          genuinely excited to shape the future of technology. By night, I'm an
          avid volleyball player and coach.
        </h4>
        <Spacer />
        <Row className="fade-in-4">
          <h4
            style={{ color: "var(--tertiary)", marginRight: 16, marginTop: 0 }}
          >
            joshuakgao@gmail.com
          </h4>
          <a
            style={styles.footerLink}
            href="https://github.com/tugonbob"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MyIcon className="icon" icon={github} size="2xl" monochrome />
          </a>
          <a
            style={styles.footerLink}
            href="https://www.linkedin.com/in/joshua-gao/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MyIcon
              className="icon"
              icon={linkedin_transparent}
              size="2xl"
              monochrome
            />
          </a>
          <a
            style={styles.footerLink}
            href={cvPdf}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MyIcon className="icon" icon={cv} size="2xl" monochrome />
          </a>
        </Row>
      </Col>
      <img
        style={styles.img}
        src={me}
        className="fade-in-5"
        alt="" // required by eslint
      />
    </ScrollDiv>
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
    justifyContent: "space-evenly",
    minHeight: "98.5vh",
  },
  textContainer: {
    maxWidth: 550,
    marginTop: 50,
  },
  title: {
    fontWeight: "bolder",
  },
  subtitle: {
    marginTop: 8,
    textAlign: "justify",
    fontSize: "calc(16px + 0.5vw)",
  },
  img: {
    borderRadius: "var(--borderRadius)",
    marginTop: 32,
    marginBottom: 32,
    width: "100%",
    maxWidth: 422,
    minWidth: 200,
    height: undefined,
  },
  chatbotJoshButtonContainer: {
    position: "fixed",
    bottom: "calc(16px + 1vw)",
    right: "calc(16px + 1vw)",
  },
  footerLink: {
    display: "flex",
    alignItems: "center",
    marginLeft: 8,
  },
};
