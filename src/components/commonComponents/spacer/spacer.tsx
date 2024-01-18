import React, { CSSProperties } from "react";

export function Spacer({
  size = 16,
  vertical = false,
  style,
  className,
}: {
  size?: number;
  vertical?: boolean;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div
      style={{
        ...styles.container,
        ...{
          height: vertical ? size : "auto",
          width: !vertical ? size : "auto",
        },
        ...style,
      }}
      className={className}
    />
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  container: {
    display: "flex",
    alignItems: "center",
  },
};
