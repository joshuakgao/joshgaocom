import React from "react";
import "../../assets/css/DefaultStyles.css";
import "./HomeScreen.css";
import Header from "../../components/header/header";
import abstract from "../../assets/images/Build_Network.png";

export function HomeScreen() {
  return (
    <>
      <Header />
      <div className="center-image-container">
        <img className="center-image" src={abstract} />
      </div>
      <div className="container fullscreen">
        <div className="row">
          <div className="scrunch" />
          <div className="column">
            <h1 className="secondary">Joshua Gao</h1>
            <h4 className="tertiary">
              exploring software, business and beyond
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}
