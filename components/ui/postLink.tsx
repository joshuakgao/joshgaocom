import Link, { LinkProps } from "next/link";
import { GradientText } from "./gradientText";

export function PostLink({
  href,
  children,
  ...props
}: LinkProps & { children: React.ReactNode }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" {...props}>
      <GradientText base="gradient">{children}</GradientText>
    </Link>
  );
}
