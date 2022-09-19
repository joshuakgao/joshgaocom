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
};
