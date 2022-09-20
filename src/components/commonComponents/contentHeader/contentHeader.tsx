import React from "react";
import { RowDiv } from "../rowDiv";
import githubIcon from "../../../assets/images/github.png";

export function ContentHeader({
  date,
  skills,
  components,
  github,
}: {
  date: string;
  skills?: string;
  components?: string;
  github?: string;
}) {
  return (
    <div>
      <p>Joshua Gao - {date}</p>

      {skills ? (
        <RowDiv>
          <p style={styles.bold}>{skills}</p>
        </RowDiv>
      ) : null}

      {components ? (
        <RowDiv>
          <p style={styles.bold}>{components}</p>
        </RowDiv>
      ) : null}

      {github ? (
        <a href={github} target="_blank" rel="noopener noreferrer">
          <img style={styles.image} className="icon" src={githubIcon} />
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
  image: {
    marginTop: 16,
    height: 36,
    width: 36,
  },
};
