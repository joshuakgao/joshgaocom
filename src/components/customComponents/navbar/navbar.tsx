import React, { useState } from "react";
import { HamburgerMenu } from "../hamburgerMenu";
import { Logo } from "../logo";
import "./styles.css";

export function Navbar({ d }: { d?: boolean }) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div
      style={{
        ...styles.navbarContainer,
        ...{ border: d ? "1px black solid" : undefined },
      }}
      className="fade-in"
    >
      <Logo setMenuOpen={(changeMenu) => setMenuOpen(changeMenu)} />
      <HamburgerMenu
        menuOpen={menuOpen}
        setMenuOpen={(changeMenu) => setMenuOpen(changeMenu)}
      />
    </div>
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  navbarContainer: {
    position: "fixed",
    height: 100,
    width: "100vw",
    display: "flex",
    justifyContent: "space-between",
    zIndex: 9,
  },
};
