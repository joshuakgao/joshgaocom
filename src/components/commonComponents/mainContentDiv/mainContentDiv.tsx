import React, { CSSProperties } from "react";

export function MainContentDiv({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: any;
}) {
  return (
    <main style={{ ...styles.content, ...style }} className={className}>
      {children}
    </main>
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  content: {
    paddingLeft: "calc(30vw - 115px)",
    paddingRight: "calc(30vw - 115px)",
    paddingBottom: "calc(8vh + 12px)",
  },
};
