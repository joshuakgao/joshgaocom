import React from "react";
import clsx from "clsx";

type IconButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: number;
};

export const IconButton = ({
  children,
  onClick,
  className = "",
}: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "text-gray-500 hover:text-black hover:scale-105 border-gray-500 border hover:border-black rounded-full p-2",
        className
      )}
    >
      {children}
    </button>
  );
};
