import React from "react";
import { cn } from "@/lib/utils";

interface SpacerProps {
  size?: number;
  horizontal?: boolean;
  line?: boolean;
  className?: string;
}

export const Spacer: React.FC<SpacerProps> = ({
  size = 16,
  horizontal = false,
  line = false,
  className,
}) => {
  const spacerStyle = {
    flexShrink: 0, // Ensures the spacer doesn't collapse
    height: horizontal ? "auto" : size,
    width: horizontal ? size : "auto",
  };

  if (line) {
    return (
      <div
        style={spacerStyle}
        className={cn("flex items-center justify-center", className)}
      >
        <div
          className="bg-border"
          style={{
            width: horizontal ? 1 : "100%",
            height: horizontal ? "100%" : 1,
          }}
        />
      </div>
    );
  }

  return <div style={spacerStyle} className={cn(className)} />;
};
