import React from "react";
import { ScrollContainer } from "../../../commonComponents";
import tofu_profile from "../../../../assets/projects/tofu60/tofu60_diagonal.jpeg";

export function Tofu60Page() {
  require("../../styles.css");
  return (
    <ScrollContainer className="tofu60-page project-container">
      <div
        className="title-card"
        style={{
          backgroundImage: `url(${tofu_profile})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "lightblue",
        }}
      >
        <div
          className="left-text"
          style={{ display: "flex", alignItems: "flex-end" }}
        >
          <h1 className="title primary" style={{}}>
            Tofu60
          </h1>
        </div>
      </div>
    </ScrollContainer>
  );
}
