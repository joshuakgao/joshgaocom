"use client";

import React, { useEffect, useState } from "react";

const ScreenSizeIndicator: React.FC = () => {
  const [screenSize, setScreenSize] = useState("sm");

  // Function to detect the screen size
  const detectScreenSize = () => {
    if (window.innerWidth >= 1280) {
      setScreenSize("2xl");
    } else if (window.innerWidth >= 1024) {
      setScreenSize("xl");
    } else if (window.innerWidth >= 768) {
      setScreenSize("lg");
    } else if (window.innerWidth >= 640) {
      setScreenSize("md");
    } else {
      setScreenSize("sm");
    }
  };

  useEffect(() => {
    // Detect screen size on load
    detectScreenSize();

    // Update screen size on window resize
    window.addEventListener("resize", detectScreenSize);

    return () => {
      window.removeEventListener("resize", detectScreenSize);
    };
  }, []);

  return (
    <div className="fixed left-0 bottom-0 p-4">
      <p className="text-lg mt-2">
        <span
          className={`font-semibold ${
            screenSize === "sm"
              ? "text-blue-500"
              : screenSize === "md"
              ? "text-green-500"
              : screenSize === "lg"
              ? "text-purple-500"
              : screenSize === "xl"
              ? "text-orange-500"
              : "text-red-500"
          }`}
        >
          {screenSize.toUpperCase()}
        </span>
      </p>
    </div>
  );
};

export { ScreenSizeIndicator };
