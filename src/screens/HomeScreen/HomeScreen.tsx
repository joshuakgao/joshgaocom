import React from "react";
import "../../assets/css/DefaultStyles.css";
import "./HomeScreen.css";
import Header from "../../components/header/header";

export function HomeScreen() {
  return (
    <>
      <Header />
      <div className="container fullscreen">
        <div className="title">
          <h1 className="secondary">Joshua Gao</h1>
          <h4 className="tertiary">exploring software, business and beyond</h4>
        </div>
      </div>
    </>
  );
}
