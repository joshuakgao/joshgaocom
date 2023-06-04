import React, { CSSProperties } from "react";

export function ScrollDiv({
  children,
  d,
  style,
  className,
}: {
  children?: any;
  d?: boolean;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div
      style={{
        ...styles.scrollDiv,
        ...style,
        ...{ border: d ? "1px black solid" : undefined },
      }}
      className={className}
    >
      {children}
    </div>
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  scrollDiv: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f7f7f7",
    overflow: "hidden",
    paddingTop: 16,
  },
};
