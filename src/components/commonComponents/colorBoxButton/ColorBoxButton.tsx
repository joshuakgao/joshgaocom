import React, { CSSProperties, HTMLProps } from "react";
import { BoxButton } from "../boxButton";

export function ColorBoxButton({
  children,
  style,
  className,
  onClick,
}: HTMLProps<HTMLButtonElement>) {
  return (
    <BoxButton
      style={{ ...styles.container, ...style }}
      className={className}
      onClick={onClick}
    >
      {children}
    </BoxButton>
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  container: {
    borderRadius: "var(--borderRadius)",
    backgroundColor: "var(--accent)",
    border: "none",
  },
};
