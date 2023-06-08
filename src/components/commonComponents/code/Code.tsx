import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";

export function Code({
  children,
  language,
  style = { github },
  customStyle = {
    backgroundColor: "var(--primary)",
    border: "1px solid lightgray",
    borderRadius: 25,
    padding: 16,
    fontSize: 14,
  },
}: {
  children: any;
  language: string;
  style?: { [key: string]: React.CSSProperties };
  customStyle?: React.CSSProperties;
}) {
  return (
    <SyntaxHighlighter
      language={language}
      style={style}
      customStyle={customStyle}
    >
      {children}
    </SyntaxHighlighter>
  );
}
