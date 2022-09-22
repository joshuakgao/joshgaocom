import React, { FC } from "react";
import { RowDiv } from "../rowDiv";
import {
  faGoogleDrive,
  faGithub,
  faJs,
  faYoutube,
  faPython,
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
    googleDrive: <FaIcon icon={faGoogleDrive} size="lg" />,
    js: <FaIcon icon={faJs} size="lg" />,
    python: <FaIcon icon={faPython} size="lg" />,
  };

  let sourcesObj: { [key: string]: any } = {
    googleDrive: <FaIcon className="icon" icon={faGoogleDrive} />,
    github: <FaIcon className="icon" icon={faGithub} />,
    youtube: <FaIcon className="icon" icon={faYoutube} />,
  };

  return (
    <>
      <RowDiv style={{ alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <RowDiv>
            {/* NAME DATE */}
            <p style={{ marginTop: 0, marginBottom: 0 }}>Joshua Gao: {date}</p>

            {/* SKILLS */}
            {skills ? (
              <div style={{ marginLeft: 8 }}>
                {skills.map((skill) => {
                  return (
                    <div style={{ marginLeft: 4 }}>{skillsObj[skill]}</div>
                  );
                })}
              </div>
            ) : null}
          </RowDiv>

          {/* MAIN IDEAS */}
          {projectComponents ? (
            <div>
              <p style={styles.bold}>{projectComponents}</p>
            </div>
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
