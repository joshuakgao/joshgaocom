import { useEffect, useState } from "react";
import "../../assets/css/DefaultStyles.css";
import abstract from "../../assets/images/network.png";
import {
  Column,
  Container,
  FlexSpacing,
  Row,
} from "../../components/commonComponents";

export function HomePage() {
  require("./styles.css");
  return (
    <Container>
      <img className={`center-image`} src={abstract} />
      <Container>
        <Row>
          <FlexSpacing flexGrow={1} />
          <Column>
            <h1 className={`secondary fade-in`}>Joshua Gao</h1>
            <h4 className={`tertiary fade-in`}>
              exploring software, business and beyond
            </h4>
          </Column>
          <FlexSpacing flexGrow={3} />
        </Row>
      </Container>
    </Container>
  );
}
