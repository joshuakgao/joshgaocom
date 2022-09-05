import React, { useState, useEffect } from "react";
import { FlexSpacing } from "../../commonComponents";
import { Link } from "react-router-dom";
import tofu_profile from "../../../assets/projects/tofu60/tofu60_diagonal.jpeg";

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
    <div className="project-card-container">
      <Link
        to="/other/tofu60"
        className="project-card"
        style={{
          textDecoration: "none",
          backgroundImage: `url(${tofu_profile})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
          }}
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
  );
}
