import React from "react";
import { RowDiv } from "../rowDiv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogleDrive, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FaIcon } from "../faIcon";

export function ContentHeader({
  date,
  skills,
  projectComponents,
  github,
  googleDrive,
}: {
  date: string;
  skills?: string;
  projectComponents?: string;
  github?: string;
  googleDrive?: string;
}) {
  return (
    <div>
      <p>Joshua Gao: {date}</p>

      {skills ? (
        <RowDiv>
          <p style={styles.bold}>{skills}</p>
        </RowDiv>
      ) : null}

      {projectComponents ? (
        <RowDiv>
          <p style={styles.bold}>{projectComponents}</p>
        </RowDiv>
      ) : null}

      {github ? (
        <a href={github} target="_blank" rel="noopener noreferrer">
          <FaIcon style={styles.icon} icon={faGithub} size="2x" />
        </a>
      ) : null}

      {googleDrive ? (
        <a href={googleDrive} target="_blank" rel="noopener noreferrer">
          <FaIcon style={styles.icon} icon={faGoogleDrive} size="2x" />
        </a>
      ) : null}
    </div>
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
    marginTop: 16,
  },
};
