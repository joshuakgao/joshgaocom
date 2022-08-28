import React from "react";
import "../../assets/css/DefaultStyles.css";
import "./HomeScreen.css";
import { Header } from "../../components/customComponents";
import abstract from "../../assets/images/network.png";
import {
  Row,
  Column,
  FlexSpacing,
  Container,
} from "../../components/commonComponents";

export function HomeScreen() {
  require("./styles.css");
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
