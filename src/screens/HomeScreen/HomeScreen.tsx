import React from "react";
import "./HomeScreen.css";

export function HomeScreen() {
  return (
    <div className="container">
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
