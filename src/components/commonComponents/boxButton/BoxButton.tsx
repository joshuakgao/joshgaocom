import React, { CSSProperties, HTMLProps, MouseEventHandler } from "react";
import "./styles.css";

export function BoxButton({
  children,
  style,
  className,
  onClick,
}: HTMLProps<HTMLButtonElement>) {
  return (
    <button
      style={{ ...styles.boxButtonContainer, ...style }}
      className={`boxButton ${className}`}
      onClick={onClick}
    >
      {children}
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
