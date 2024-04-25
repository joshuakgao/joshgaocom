import React, { CSSProperties, HTMLProps } from "react";
import { BoxButton } from "../boxButton";

export function ColorBoxButton({
  children,
  style,
  className,
  onClick,
  isLoading,
}: HTMLProps<HTMLButtonElement> & { isLoading?: boolean }) {
  return (
    <BoxButton
      style={{ ...styles.container, ...style }}
      className={className}
      onClick={onClick}
      isLoading={isLoading}
      disabled={isLoading}
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
