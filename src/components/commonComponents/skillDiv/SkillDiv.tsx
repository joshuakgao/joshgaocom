import React from "react";
import { MyIcon } from "../myIcon";

export function SkillDiv({
  icon,
  text,
  textColor = "var(--secondary)",
  backgroundColor = "var(--accent)",
}: {
  icon?: string;
  text: string;
  textColor?: string;
  backgroundColor?: string;
}) {
  return (
    <div
      style={{ ...styles.container, ...{ backgroundColor: backgroundColor } }}
    >
      {icon ? <MyIcon icon={icon} style={{ marginRight: 8 }} /> : null}
      <b style={{ ...styles.text, ...{ color: textColor } }}>{text}</b>
    </div>
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  container: {
    display: "inline-block",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: "row",
    borderRadius: 8,
    marginRight: 16,
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
  },
};
