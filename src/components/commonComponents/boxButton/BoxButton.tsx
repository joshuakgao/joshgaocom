import React, { CSSProperties } from "react";
import "./styles.css";

export function BoxButton({
  children,
  style,
  className,
  onClick = () => {},
}: {
  children?: any;
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
}) {
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--primary)",
    border: "1px black solid",
    borderRadius: 12,
    padding: 16,
    minWidth: 100,
    minHeight: 100,
  },
};
