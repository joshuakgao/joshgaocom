import React from "react";
import { RowDiv } from "../rowDiv";

export function ContentHeader({
  date,
  skills,
  components,
}: {
  date: string;
  skills?: string;
  components?: string;
}) {
  return (
    <div>
      <p style={styles.p}>Joshua Gao - {date}</p>

      {skills ? (
        <RowDiv>
          <p style={styles.p}>Required Skills:</p>
          <p style={styles.bold}>{skills}</p>
        </RowDiv>
      ) : null}

      {components ? (
        <RowDiv>
          <p style={styles.p}>Components:</p>
          <p style={styles.bold}>{components}</p>
        </RowDiv>
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
    marginLeft: 8,
    marginBottom: 0,
    marginTop: 0,
  },
  p: {
    marginTop: 0,
    marginBottom: 0,
  },
};
