import React from "react";
import clsx from "clsx";

const baseClass = {
  gradient: "text-gradient",
  black: "text-black-to-gradient",
} as const;

const animateClass = {
  none: "",
  hover: "gradient-animate-hover",
  always: "gradient-animate",
} as const;

type BaseType = keyof typeof baseClass;
type AnimateType = keyof typeof animateClass;

interface GradientTextProps {
  base?: BaseType;
  animate?: AnimateType;
  children: React.ReactNode;
  className?: string;
  parentHovered?: boolean;
}

export const GradientText = ({
  base = "black",
  animate = "none",
  children,
  className,
  parentHovered = false,
}: GradientTextProps) => {
  const effectiveBaseClass = parentHovered
    ? baseClass.gradient
    : baseClass[base];

  return (
    <span
      className={clsx(
        "inline-block transition-all duration-500 ease-in-out",
        effectiveBaseClass,
        animateClass[animate],
        className,
      )}
    >
      {children}
    </span>
  );
};
