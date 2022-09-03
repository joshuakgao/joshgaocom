import React from "react";
import {
  FlexSpacing,
  ScrollContainer,
} from "../../components/commonComponents";
import Tofu60Card from "../../components/projectComponents/Tofu60/tofu60Card";

export function OtherPage() {
  require("./styles.css");
  return (
    <ScrollContainer>
      <Tofu60Card />

      {/* <div className="item-container">
        <FlexSpacing flexGrow={1} />
        <div className="item-inner-container">
          <p>Project 1</p>
        </div>
        <FlexSpacing flexGrow={1} />
      </div> */}
    </ScrollContainer>
  );
}
