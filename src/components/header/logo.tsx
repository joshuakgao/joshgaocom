import React from "react";
import watermelon from "../../assets/images/watermelon.png";

export default function Logo() {
  return (
    <>
      <img className="logo" src={watermelon} alt="Logo" />
      <h4 className="tertiary">Gao</h4>
    </>
  );
}
