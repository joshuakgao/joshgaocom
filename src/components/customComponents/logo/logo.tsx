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
        marginLeft: 32,
        ...{ border: d ? "1px black solid" : undefined },
      }}
    >
      <Link
        to="/"
        style={{ display: "flex", alignItems: "center" }}
        onClick={() => setMenuOpen(false)}
      >
        <img className="image" src={watermelon} style={{ ...styles.image }} />
        <h1 className="secondary">Gao</h1>
      </Link>
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
