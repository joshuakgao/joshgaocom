import React, { CSSProperties } from "react";
import Latex from "react-latex-next";
import { Col } from "../col";

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
    <Col style={{ ...styles.latexDiv, ...style }}>
      <p style={{ fontSize: 20, margin: 0 }}>{children}</p>
    </Col>
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
