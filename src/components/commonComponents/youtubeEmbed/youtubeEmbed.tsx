import React from "react";

export function YoutubeEmbed({ embedId }: { embedId: string }) {
  return (
    <iframe
      title={embedId} // required by eslint
      src={`https://youtube.com/embed/${embedId}`}
      allow="autoplay; encrypted-media"
      allowFullScreen
      style={styles.videoContainer}
    />
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  videoContainer: {
    display: "block",
    width: "100%",
    height: "calc(40vh + 100px)",
  },
};
