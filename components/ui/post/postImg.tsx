import React from "react";

export function PostImg({
  src,
  alt,
  className = "",
  aspectRatio = "auto",
}: {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string | number;
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
    <div className="flex justify-center">
      <img
        src={src}
        alt={alt}
        style={style}
        className={`rounded-lg w-full object-cover my-4 ${className}`}
      />
    </div>
  );
}
