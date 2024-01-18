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
        <img
          className="image"
          src={watermelon}
          style={{ ...styles.image }}
          alt="" // required by eslint
        />
        <h1 style={styles.lastName} className="secondary">
          JOSHUA GAO
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
    textDecoration: "none",
  },
  image: {
    height: 16,
    marginRight: 4,
    zIndex: 11,
  },
  lastName: {
    marginTop: 0,
    marginLeft: 8,
    fontSize: 16,
  },
};
