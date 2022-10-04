import React from "react";

type iconSize = "2xs" | "xs" | "sm" | "lg" | "xl" | "2xl";

const sizes = {
  "2xs": "10px",
  xs: "12px",
  sm: "14px",
  lg: "17px",
  xl: "24px",
  "2xl": "32px",
};

export function MyIcon({
  className,
  style,
  icon,
  size = "sm",
}: {
  className?: string;
  style?: React.CSSProperties;
  icon: string;
  color?: string;
  size?: iconSize;
}) {
  return (
    <img
      style={style}
      className={className}
      src={icon}
      width={sizes[size]}
      height={sizes[size]}
    />
  );
}
