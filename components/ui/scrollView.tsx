import React, { CSSProperties } from "react";
import { Col } from "@/components/ui";

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
    <Col
      style={{
        ...styles.scrollDiv,
        ...style,
        ...{ border: d ? "1px black solid" : undefined },
      }}
      className={className}
    >
      {children}
    </Col>
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  scrollDiv: {
    backgroundColor: "var(--primary)",
    overflow: "hidden",
  },
};
