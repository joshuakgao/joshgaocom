import React from "react";
import { Row, Col, MyIcon } from "..";
import {
  firebase,
  typescript,
  react,
  googleDrive,
  javascript,
  python,
  sql,
  youtube,
  github,
  css,
  figma,
  dialogflow,
} from "../../../assets/customIcons";
import "./styles.css";

export function ContentHeader({
  date,
  skills,
  projectComponents,
  sources,
}: {
  date: string;
  skills?: string[];
  projectComponents?: string;
  sources?: { [key: string]: string };
}) {
  let skillsObj: { [key: string]: any } = {
    css: <MyIcon icon={css} />,
    dialogflow: <MyIcon icon={dialogflow} />,
    figma: <MyIcon icon={figma} />,
    firebase: <MyIcon icon={firebase} />,
    googleDrive: <MyIcon icon={googleDrive} />,
    js: <MyIcon icon={javascript} />,
    javascript: <MyIcon icon={javascript} />,
    python: <MyIcon icon={python} />,
    react: <MyIcon icon={react} />,
    sql: <MyIcon icon={sql} />,
    typescript: <MyIcon icon={typescript} />,
  };

  let sourcesObj: { [key: string]: any } = {
    googleDrive: <MyIcon className="icon" icon={googleDrive} />,
    github: <MyIcon className="icon" icon={github} />,
    youtube: <MyIcon className="icon" icon={youtube} />,
    dialogflow: <MyIcon className="icon" icon={dialogflow} />,
  };

  return (
    <>
      <Row
        className="content-header"
        style={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Col>
          <Row>
            {/* NAME DATE */}
            <p style={{ marginTop: 0, marginBottom: 0 }}>Joshua Gao: {date}</p>

            {/* SKILLS */}
            {skills ? (
              <Row style={{ marginBottom: 5 }}>
                {skills.map((skill) => {
                  return (
                    <Col style={{ marginLeft: 4 }}>{skillsObj[skill]}</Col>
                  );
                })}
              </Row>
            ) : null}
          </Row>

          {/* MAIN IDEAS */}
          {projectComponents ? (
            <Col>
              <p style={styles.bold}>{projectComponents}</p>
            </Col>
          ) : null}
        </Col>

        {/* SOURCE LINKS */}
        {sources ? (
          <Row>
            {Object.keys(sources).map((source) => (
              <a
                href={sources[source]} // get object value with its own key
                target="_blank"
                rel="nopener noreferrer"
                style={{ marginRight: 4 }}
              >
                {sourcesObj[source]}
              </a>
            ))}
          </Row>
        ) : null}
      </Row>
      <hr />
    </>
  );
}

type StyleSheet = {
  [key: string]: React.CSSProperties;
};

const styles: StyleSheet = {
  bold: {
    fontWeight: "bold",
    marginBottom: 0,
    marginTop: 0,
  },
  icon: {
    zIndex: 1,
  },
};
