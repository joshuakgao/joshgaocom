import React from "react";

export function YoutubeEmbed({ embedId }: { embedId: string }) {
  return (
    <iframe
      src={`https://youtube.com/embed/${embedId}`}
      frameBorder="0"
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
    height: "60vh",
  },
};
