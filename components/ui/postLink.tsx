import Link, { LinkProps } from "next/link";

export function PostLink({
  href,
  children,
  ...props
}: LinkProps & { children: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      className="text-blue-500 hover:underline hover:underline-offset-4 transition-all duration-200"
    >
      {children}
    </Link>
  );
}
