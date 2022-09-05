import React, { CSSProperties } from "react";

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

export function FullscreenDiv({
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
        ...styles.fullscreen,
        ...style,
        ...{ border: d ? "1px black solid" : undefined },
      }}
      className={`${className}`}
    >
      {children}
    </div>
  );
}

const styles: StyleSheet = {
  fullscreen: {
    flex: 1,
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  },
};
