import React, { useState, useEffect } from "react";
import { FlexSpacing } from "../../commonComponents";
import { Link } from "react-router-dom";
import tofu_profile from "../../../assets/projects/tofu60/try2.png";

export default function Tofu60Card() {
  require("../styles.css");

  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    console.log(position);
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="item-container">
      <div
        className="item-inner-container"
        style={{
          backgroundImage: `url(${tofu_profile})`,
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
          backgroundColor: "lightblue",
        }}
      >
        <Link to="/other/tofu60" style={{ textDecoration: "none" }}>
          <div
            className="left-text"
            style={{ display: "flex", alignItems: "flex-end" }}
          >
            <h1
              className="title primary"
              style={{
                transform: `translateY(${scrollPosition / 8}px)`,
              }}
            >
              Tofu60
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
}
