import React, { useEffect } from "react";
import {
  FlexSpacing,
  ScrollContainer,
} from "../../components/commonComponents";
import { Link } from "react-router-dom";
import Tofu60Card from "../../components/projectComponents/Tofu60/tofu60Card";

export function OtherPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
