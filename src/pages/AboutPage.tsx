import React from "react";
import { cv, github, linkedin_transparent } from "../assets/customIcons";
import cvPdf from "../assets/docs/cv.pdf";
import {
  MyIcon,
  RowDiv,
  ScrollDiv,
  SkillDiv,
} from "../components/commonComponents";

const HIGHLIGHTED_SKILLS = [
  "Python",
  "JavaScript",
  "TypeScript",
  "Java",
  "C++",
  "HTML",
  "CSS",
  "SQL",
  "Computer Vision",
  "NLP",
  "React-Native",
  "React",
];

const SKILLS = [
  "Git",
  "Github",
  "OpenCV",
  "TensorFlow",
  "Pandas",
  "Scikit-Learn",
  "Numpy",
  "Rasa",
  "Google Cloud Platform",
  "Firebase",
  "Dialogflow",
  "VirtualBox",
  "Expo",
  "Figma",
  "Raspberry Pi",
];

export function AboutPage() {
  return (
    <ScrollDiv style={styles.container}>
      <div style={styles.textContainer} className="fade-in-1">
        <h1>More about me</h1>
        <RowDiv style={{ flexWrap: "wrap" }}>
          <h4 style={{ color: "var(--tertiary)", marginRight: 16 }}>
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
        </RowDiv>
        <h4>
          I'm a Frontend Web Developer building the Front-end of Websites and
          Web Applications that leads to the success of the overall product.
          Check out some of my work in the Projects section. I also like sharing
          content related to the stuff that I have learned over the years in Web
          Development so it can help other people of the Dev Community. Feel
          free to Connect or Follow me on my Linkedin where I post useful
          content related to Web Development and Programming I'm open to Job
          opportunities where I can contribute, learn and grow. If you have a
          good opportunity that matches my skills and experience then don't
          hesitate to contact me.
        </h4>
      </div>
      <div style={styles.textContainer} className="fade-in-4">
        <h1>My skills</h1>
        <div
          style={{
            marginTop: 32,
          }}
        >
          {HIGHLIGHTED_SKILLS.map((text, i) => (
            <SkillDiv key={i} text={text} />
          ))}
          {SKILLS.map((text, i) => (
            <SkillDiv
              key={i}
              text={text}
              backgroundColor="lightgray"
              textColor="gray"
            />
          ))}
        </div>
      </div>
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
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    minHeight: "100vh",
    paddingTop: 128,
  },
  textContainer: {
    width: 500,
    marginTop: 50,
  },
  footerLink: {
    marginLeft: 8,
    marginTop: 28,
  },
};
