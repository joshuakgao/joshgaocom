import React from "react";
import "../../assets/css/DefaultStyles.css";
import "./HomeScreen.css";
import Header from "../../components/header/header";
import abstract from "../../assets/images/Build_Network.png";
import Row from "../../components/commonComponents/row/row";

export function HomeScreen() {
  return (
    <>
      <Header />
      <img className="center-image" src={abstract} />
      <div className="fullscreen container">
        <Row>
          <div className="flex-spacing" style={{ flexGrow: 1 }} />
          <div className="column fixed-size">
            <h1 className="secondary">Joshua Gao</h1>
            <h4 className="tertiary">
              exploring software, business and beyond
            </h4>
          </div>
          <div className="flex-spacing" style={{ flexGrow: 4 }} />
        </Row>
      </div>
    </>
  );
}
