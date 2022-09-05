import React from "react";
import { RowDiv } from "../../commonComponents";
import watermelon from "../../../assets/images/watermelon.png";

export function Logo({ d }: { d?: boolean }) {
  return (
    <RowDiv
      className="logo"
      style={{
        marginLeft: 32,
        ...{ border: d ? "1px black solid" : undefined },
      }}
    >
      <img className="image" src={watermelon} style={{ ...styles.image }} />
      <h1>Gao</h1>
    </RowDiv>
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  image: {
    height: "1.5rem",
    marginRight: 8,
    zIndex: 11,
  },
};
