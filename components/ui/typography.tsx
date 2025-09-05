import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

// Reusable helper to create components with consistent structure
const createComponent = <T extends HTMLElement>(
  tag: keyof JSX.IntrinsicElements,
  defaultClassName: string,
  displayName: string
) => {
  const Component = forwardRef<T, React.HTMLAttributes<T>>((props, ref) => {
    return React.createElement(
      tag,
      { ...props, ref, className: cn(defaultClassName, props.className) },
      props.children
    );
  });
  Component.displayName = displayName;
  return Component;
};

export const H0 = createComponent<HTMLHeadingElement>(
  "h1",
  "scroll-m-20 text-2xl sm:text-5xl text-gray-800",
  "H0"
);

export const H1 = createComponent<HTMLHeadingElement>(
  "h1",
  "scroll-m-20 text-2xl text-gray-800",
  "H1"
);

export const H2 = createComponent<HTMLHeadingElement>(
  "h2",
  "scroll-m-20 py-2 text-xl first:mt-0 text-gray-700",
  "H2"
);

export const H3 = createComponent<HTMLHeadingElement>(
  "h3",
  "scroll-m-20 text-lg",
  "H3"
);

export const H4 = createComponent<HTMLHeadingElement>(
  "h4",
  "scroll-m-20 text-md",
  "H4"
);

export const Lead = createComponent<HTMLParagraphElement>(
  "p",
  "text-lg text-gray-600",
  "Lead"
);

export const P = createComponent<HTMLParagraphElement>(
  "p",
  "text-[16px] text-gray-600",
  "P"
);

export const Large = createComponent<HTMLDivElement>(
  "div",
  "text-lg font-medium",
  "Large"
);

export const Small = createComponent<HTMLParagraphElement>(
  "p",
  "text-sm text-gray-600",
  "Small"
);

export const ExtraSmall = createComponent<HTMLParagraphElement>(
  "p",
  "text-xs text-gray-500",
  "ExtraSmall"
);

export const Muted = createComponent<HTMLParagraphElement>(
  "p",
  "text-gray-500",
  "Muted"
);

export const InlineCode = createComponent<HTMLSpanElement>(
  "code",
  "relative rounded bg-gray-100 px-1 py-0.5 font-mono text-sm font-medium",
  "InlineCode"
);

export const MultilineCode = createComponent<HTMLPreElement>(
  "pre",
  "relative rounded bg-gray-100 p-4 font-mono text-sm font-medium overflow-x-auto",
  "MultilineCode"
);

export const List = createComponent<HTMLUListElement>(
  "ul",
  "my-4 ml-4 list-disc space-y-2",
  "List"
);

export const Quote = createComponent<HTMLQuoteElement>(
  "blockquote",
  "mt-4 border-l-4 pl-4 italic text-gray-600",
  "Quote"
);
