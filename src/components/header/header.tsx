import React from "react";
import "./styles.css";
import Logo from "./logo";
import HamburgerMenu from "./hamburgerMenu";

export default function Header() {
  return (
    <div className="fixed">
      <div className="header row">
        <Logo />
        <HamburgerMenu />
      </div>
    </div>
  );
}
