import React from "react";
import "./HomeScreen.css";

export function HomeScreen() {
  return (
    <div className="container">
      <div
        style={{
          flex: "flex",
        }}
      >
        <img
          src={require("../../assets/watermelon.jpg")}
          style={{ margin: 25 }}
          height={50}
          width={60}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
          marginLeft: 50,
        }}
      >
        <h1>Joshua Gao</h1>
        <p>An exploration of software, business, and beyond</p>
      </div>
    </div>
  );
}
