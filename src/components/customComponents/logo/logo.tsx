import React from "react";
import { Row } from "../../commonComponents";
import watermelon from "../../../assets/images/watermelon.png";
import { Link } from "react-router-dom";

export function Logo({
  setMenuOpen,
  size = "full",
}: {
  setMenuOpen: (menuOpen: boolean) => void;
  size: "full" | "small";
}) {
  return (
    <Row
      className="logo"
      style={{
        pointerEvents: "auto",
        zIndex: 11,
        marginLeft: "2vw",
      }}
    >
      <Link to="/" style={styles.link} onClick={() => setMenuOpen(false)}>
        <h1 style={styles.lastName} className="secondary">
          {size === "full" ? "JOSHUA GAO" : "JOSH"}
        </h1>
      </Link>
    </Row>
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
