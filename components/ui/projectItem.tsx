"use client";

import React from "react";
import { useMediaQuery } from "react-responsive";
import { Row } from "./row";

interface ProjectItemProps {
  title: string;
  year: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ title, year }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div
      className={`flex justify-between items-center p-4 rounded-3xl ${
        isMobile
          ? ""
          : "hover:bg-white hover:shadow-lg hover:transition-all hover:duration-300 max-w-64"
      }`}
    >
      {isMobile ? (
        <button className="w-full text-left">
          <span>{title}</span>
          <span className="float-right">{year}</span>
        </button>
      ) : (
        <Row className="justify-between w-full">
          <p>{title}</p>
          <p className="text-right">{year}</p>
        </Row>
      )}
    </div>
  );
};

export default ProjectItem;
