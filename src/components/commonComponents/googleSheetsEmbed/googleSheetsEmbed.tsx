import React from "react";

export function GoogleSheetsEmbed({
  className,
  style,
  extend,
  src,
  gid, // sheet id
  // range, // the rows and columns that are published to the web. For example, A1:B15
  widget = true, // If true, the sheet tab is displayed at the bottom
  headers = false, // If true, row numbers and column letters are displayed
  // autosize, // boolean, not sure what it does
  // output, // Display google sheet as this type
  // ui, // select the interface version
  // q, // search query
  // gridlines, // If true, the gridlines will be displayed
  chrome = false, // If true, the title and footer are displayed
}: {
  className?: string;
  style?: React.CSSProperties;
  extend?: boolean;
  src: string;
  gid?: number;
  // range?: string;
  widget?: boolean;
  headers?: boolean;
  chrome?: boolean;
  // autosize?: boolean;
  // output?: "html" | "txt" | "csv";
  // ui?: number;
  // q?: string;
  // gridlines?: boolean;
}) {
  src = src.substring(0, src.indexOf("?") + 1); // remove default options if there are any
  src = src + createOptionsString(); // add given options

  function createOptionsString() {
    let addons = "";

    if (gid) addons += `&amp;gid=${gid}&amp;single=true`;
    // if (range) addons += `&amp;range=${range}`;
    addons += `&amp;widget=${widget}`;
    addons += `&amp;headers=${headers}`;
    addons += `&amp;chrome=${chrome}`;
    // if (gridlines) addons += `&amp;gridlines=${gridlines}`;
    // if (autosize) addons += `&amp;autosize=${autosize}`;
    // if (output) addons += `&amp;output=${output}`;
    // if (ui) addons += `&amp;ui=${ui}`;
    // if (q) addons += `&amp;q=${q}`;

    addons = addons.slice(5);

    return addons;
  }

  return (
    <>
      <iframe
        className={className}
        style={Object.assign(
          {},
          extend ? styles.extendIframe : styles.flexIframe,
          style
        )}
        src={src}
        title={src} // required by eslint
      />
    </>
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
