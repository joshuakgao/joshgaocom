import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties } from "react";

export function FaIcon({
  className,
  style,
  icon,
  size,
  color = "var(--secondary)",
}: {
  className?: string;
  style?: CSSProperties;
  icon: any;
  size?: SizeProp;
  color?: string;
}) {
  return (
    <FontAwesomeIcon
      className={className}
      style={style}
      icon={icon}
      size={size}
      color={color}
    />
  );
}
