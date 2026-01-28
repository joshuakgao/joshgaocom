import React from "react";

export function PostVideo({
  src,
  title,
  className = "",
  aspectRatio = "auto",
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
}: {
  src: string;
  title: string;
  className?: string;
  aspectRatio?: string | number;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}) {
  const style =
    aspectRatio !== "auto"
      ? {
          aspectRatio:
            typeof aspectRatio === "number"
              ? aspectRatio.toString()
              : aspectRatio,
        }
      : {};

  return (
    <div className="flex justify-center my-4">
      <video
        src={src}
        style={style}
        controls={controls}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        title={title}
        className={`rounded-lg w-full max-w-full object-contain ${className}`}
        playsInline
        preload="auto"
      >
        {/* Fallback for browsers that don't support video */}
        <p>
          Your browser doesn't support HTML5 video. Here's a{" "}
          <a href={src}>link to the video</a> instead.
        </p>
      </video>
    </div>
  );
}
