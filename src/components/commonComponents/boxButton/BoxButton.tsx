import React, { HTMLProps } from "react";
import { ThreeDot } from "react-loading-indicators";
import "./styles.css";

export function BoxButton({
  children,
  style,
  className,
  onClick,
  isLoading,
}: HTMLProps<HTMLButtonElement> & { isLoading?: boolean }) {
  return (
    <button
      style={{ ...styles.boxButtonContainer, ...style }}
      className={`boxButton ${className}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <ThreeDot size="small" color="var(--primary)" /> : children}
    </button>
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  boxButtonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--primary)",
    border: "1px black solid",
    borderRadius: "var(--borderRadius)",
    padding: 8,
    minWidth: 100,
    minHeight: 100,
    cursor: "pointer",
  },
};
