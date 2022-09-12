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
    position: "fixed",
    width: "100%",
    height: "100%",
    zIndex: 1,
    backgroundColor: "#f7f7f7",
  },
};
