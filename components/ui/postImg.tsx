import React from "react";

export function PostImg({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className="flex justify-center">
      <img
        src={src}
        alt={alt}
        className={`rounded-lg w-full object-cover my-4 ${className}`}
      />
    </div>
  );
}
