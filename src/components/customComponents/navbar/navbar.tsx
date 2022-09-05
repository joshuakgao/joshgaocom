import React from "react";
import watermelon from "../../../assets/images/watermelon.png";
import { HamburgerMenu } from "../hamburgerMenu";
import { Logo } from "../logo";

export function Navbar({ d }: { d?: boolean }) {
  return (
    <div
      style={{
        ...styles.navbarContainer,
        ...{ border: d ? "1px black solid" : undefined },
      }}
    >
      <Logo />
      <HamburgerMenu />
    </div>
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  navbarContainer: {
    position: "fixed",
    width: "100vw",
    display: "flex",
    justifyContent: "space-between",
    zIndex: 9,
  },
};
