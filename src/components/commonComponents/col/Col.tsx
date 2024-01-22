import React, { CSSProperties } from "react";

export function Col({
  children,
  style,
  className,
  d,
}: {
  children?: any;
  style?: CSSProperties;
  className?: string;
  d?: boolean;
}) {
  return (
    <div
      style={{
        ...{ border: d ? "1px black solid" : undefined },
        ...styles.colFlexDiv,
        ...style,
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
  colFlexDiv: {
    display: "flex",
    flexDirection: "column",
  },
};
