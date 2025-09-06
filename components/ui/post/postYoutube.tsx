import React from "react";

export function PostYoutube({ embedId }: { embedId: string }) {
  return (
    <iframe
      title={embedId} // required by eslint
      src={`https://youtube.com/embed/${embedId}`}
      allow="autoplay; encrypted-media"
      allowFullScreen
      style={{ aspectRatio: "16/9" }}
    />
  );
}
