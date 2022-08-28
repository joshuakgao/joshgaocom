import React from "react";
import "../../assets/css/DefaultStyles.css";
import "./HomeScreen.css";
import Header from "../../components/header/header";
import abstract from "../../assets/images/Build_Network.png";
import Row from "../../components/commonComponents/row/row";
import Column from "../../components/commonComponents/column/column";
import FlexSpacing from "../../components/commonComponents/flexSpacing/flexSpacing";
import Container from "../../components/commonComponents/container/container";

export function HomeScreen() {
  return (
    <>
      <Header />
      <img className="center-image" src={abstract} />
      <Container>
        <Row>
          <FlexSpacing flexGrow={1} />
          <Column>
            <h1 className="secondary">Joshua Gao</h1>
            <h4 className="tertiary">
              exploring software, business and beyond
            </h4>
          </Column>
          <FlexSpacing flexGrow={4} />
        </Row>
      </Container>
    </>
  );
}
