import React from "react";
import { RowDiv } from "../../commonComponents";
import watermelon from "../../../assets/images/watermelon.png";
import { Link } from "react-router-dom";

export function Logo({
  setMenuOpen,
  d,
}: {
  setMenuOpen: (menuOpen: boolean) => void;
  d?: boolean;
}) {
  return (
    <RowDiv
      className="logo"
      style={{
        zIndex: 11,
        marginLeft: "2vw",
        ...{ border: d ? "1px black solid" : undefined },
      }}
    >
      <Link to="/" style={styles.link} onClick={() => setMenuOpen(false)}>
        <img className="image" src={watermelon} style={{ ...styles.image }} />
        <h1 style={styles.lastName} className="secondary">
          Gao
        </h1>
      </Link>
    </RowDiv>
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  link: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  image: {
    height: "1.5rem",
    marginRight: 8,
    zIndex: 11,
  },
  lastName: {
    fontSize: 28,
  },
};
