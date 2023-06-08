import React from "react";
import "./styles.css";

type iconSize =
  | "2xs"
  | "xs"
  | "sm"
  | "lg"
  | "xl"
  | "2xl"
  | "1x"
  | "2x"
  | "3x"
  | "4x"
  | "5x"
  | "6x"
  | "7x"
  | "8x"
  | "9x"
  | "10x";

const sizes = {
  "2xs": "10px",
  xs: "12px",
  sm: "14px",
  lg: "17px",
  xl: "24px",
  "2xl": "32px",
  "1x": "8px",
  "2x": "16px",
  "3x": "24px",
  "4x": "32px",
  "5x": "40px",
  "6x": "48px",
  "7x": "56px",
  "8x": "64px",
  "9x": "72px",
  "10x": "80px",
};

export function MyIcon({
  className,
  style,
  icon,
  monochrome,
  size = "lg",
}: {
  className?: string;
  style?: React.CSSProperties;
  icon: string;
  monochrome?: boolean;
  size?: iconSize;
}) {
  return (
    <img
      style={style}
      className={`${className} ${monochrome ? "monochrome" : ""}`}
      src={icon}
      width={sizes[size]}
      height={sizes[size]}
      alt="" // required by eslint
    />
  );
}
