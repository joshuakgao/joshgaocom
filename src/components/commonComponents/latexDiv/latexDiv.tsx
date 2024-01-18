import React, { CSSProperties } from "react";

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
      <p style={{ fontSize: 18 }}>{children}</p>
    </div>
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  latexDiv: {
    border: "1px black solid",
    borderRadius: "10px",
    padding: "16px",
  },
};
