import React from "react";

export function GoogleSheetsEmbed({
  className,
  style,
  extend,
  src,
}: {
  className?: string;
  style?: React.CSSProperties;
  extend?: boolean;
  src: string;
}) {
  return (
    <iframe
      className={className}
      style={Object.assign(
        {},
        extend ? styles.extendIframe : styles.flexIframe,
        style
      )}
      src={src}
    />
  );
}

type StyleSheet = {
  [key: string]: React.CSSProperties;
};

const styles: StyleSheet = {
  flexIframe: {
    height: "86vh",
    width: "100%",
    marginTop: 32,
    border: "1px solid lightgrey",
    borderRadius: 10,
  },
  extendIframe: {
    position: "absolute",
    left: 0,
    right: 0,
    margin: "auto",
    height: "94vh",
    width: "94vw",
    maxWidth: 1615,
    maxHeight: 675,
    border: "1px solid lightgrey",
    borderRadius: 10,
  },
};
