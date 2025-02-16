import React from "react";
import { cn } from "@/lib/utils";

interface SpacerProps {
  size?: number;
  horizontal?: boolean;
  className?: string;
}

export const Spacer: React.FC<SpacerProps> = ({
  size = 16,
  horizontal = false,
  className,
}) => {
  const spacerStyle = {
    flexShrink: 0, // Ensures the spacer doesn't collapse
    height: horizontal ? "auto" : size,
    width: horizontal ? size : "auto",
  };

  return <div style={spacerStyle} className={cn(className)} />;
};
