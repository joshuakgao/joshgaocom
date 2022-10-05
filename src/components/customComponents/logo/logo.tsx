import React from "react";
import { RowDiv } from "../../commonComponents";
import watermelon from "../../../assets/images/watermelon.png";
import { Link } from "react-router-dom";

export function Logo({
  setMenuOpen,
}: {
  setMenuOpen: (menuOpen: boolean) => void;
}) {
  return (
    <RowDiv
      className="logo"
      style={{
        pointerEvents: "auto",
        zIndex: 11,
        marginLeft: "2vw",
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
    alignItems: "flex-start",
    textDecoration: "none",
  },
  image: {
    marginTop: 4,
    height: "1.3rem",
    marginRight: 8,
    zIndex: 11,
  },
  lastName: {
    fontSize: 28,
  },
};
