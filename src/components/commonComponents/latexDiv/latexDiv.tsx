import React, { CSSProperties } from "react";
import Latex from "react-latex-next";

export function LatexDiv({
  children,
  style,
  className,
}: {
  children?: any;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div style={{ ...styles.latexDiv, ...style }}>
      <p style={{ fontSize: 20 }}>{children}</p>
    </div>
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  latexDiv: {
    border: "1px grey solid",
    borderRadius: "var(--borderRadius)",
    padding: "16px",
  },
};
