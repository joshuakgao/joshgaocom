import React from "react";
import {
  FlexSpacing,
  ScrollContainer,
} from "../../components/commonComponents";

export function SoftwarePage() {
  require("./styles.css");
  return (
    <ScrollContainer>
      <div className="item-container">
        <FlexSpacing flexGrow={1} />
        <div className="item-inner-container">
          <p>Project 1</p>
        </div>
        <FlexSpacing flexGrow={1} />
      </div>
      <div className="item-container">
        <FlexSpacing flexGrow={1} />
        <div className="item-inner-container">
          <p>Project 2</p>
        </div>
        <FlexSpacing flexGrow={1} />
      </div>
      <div className="item-container">
        <FlexSpacing flexGrow={1} />
        <div className="item-inner-container">
          <p>Project 3</p>
        </div>
        <FlexSpacing flexGrow={1} />
      </div>
      <div className="item-container">
        <FlexSpacing flexGrow={1} />
        <div className="item-inner-container">
          <p>Project 4</p>
        </div>
        <FlexSpacing flexGrow={1} />
      </div>
      <div className="item-container">
        <FlexSpacing flexGrow={1} />
        <div className="item-inner-container">
          <p>Project 5</p>
        </div>
        <FlexSpacing flexGrow={1} />
      </div>
    </ScrollContainer>
  );
}
