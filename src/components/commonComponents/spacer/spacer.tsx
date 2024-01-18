import React, { CSSProperties } from "react";

export function Spacer({
  size = 16,
  horizontal = false,
  style,
  className,
}: {
  size?: number;
  horizontal?: boolean;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div
      style={{
        ...styles.container,
        ...{
          height: !horizontal ? size : "auto",
          width: horizontal ? size : "auto",
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
