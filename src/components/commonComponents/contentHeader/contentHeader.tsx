import React, { FC } from "react";
import { RowDiv } from "../rowDiv";
import {
  faGoogleDrive,
  faGithub,
  faJs,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FaIcon } from "../faIcon";
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
  sources?: { [key: string]: string }[];
}) {
  let skillsObj: { [key: string]: any } = {
    js: <FaIcon icon={faJs} size="1x" />,
    googleDrive: <FaIcon icon={faGoogleDrive} size="1x" />,
  };

  let sourcesObj: { [key: string]: any } = {
    googleDrive: <FaIcon className="icon" icon={faGoogleDrive} />,
    github: <FaIcon className="icon" icon={faGithub} />,
    youtube: <FaIcon className="icon" icon={faYoutube} />,
  };

  return (
    <RowDiv style={{ alignItems: "center", justifyContent: "space-between" }}>
      <div>
        {/* NAME DATE */}
        <p style={{ marginTop: 0, marginBottom: 0 }}>Joshua Gao: {date}</p>

        {/* SKILLS */}
        {skills ? (
          <RowDiv>
            {skills.map((skill) => {
              return <div style={{ marginRight: 4 }}>{skillsObj[skill]}</div>;
            })}
          </RowDiv>
        ) : null}

        {/* MAIN IDEAS */}
        {projectComponents ? (
          <RowDiv style={{ marginTop: 16 }}>
            <p style={styles.bold}>{projectComponents}</p>
          </RowDiv>
        ) : null}
      </div>

      {/* SOURCE LINKS */}
      {sources ? (
        <RowDiv>
          {sources.map((obj) => {
            return (
              <a
                href={obj[Object.keys(obj)[0]]} // get object value with its own key
                target="_blank"
                rel="nopener noreferrer"
                style={{ marginRight: 4 }}
              >
                {sourcesObj[Object.keys(obj)[0]]}
              </a>
            );
          })}
        </RowDiv>
      ) : null}
    </RowDiv>
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
    border: "2px solid var(--tertiary)",
    borderRadius: "50%",
    textAlign: "center",
    lineHeight: 100,
    verticalAlign: "middle",
    padding: 8,
    color: "var(--tertiary)",
  },
};
