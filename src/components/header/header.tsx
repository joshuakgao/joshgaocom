import React from "react";
import "./styles.css";
import Logo from "./logo";
import HamburgerMenu from "./hamburgerMenu";
import "../../assets/css/DefaultStyles.css";

export default function Header() {
  return (
    <div className="row header">
      <Logo />
      <HamburgerMenu />
    </div>
  );
}
