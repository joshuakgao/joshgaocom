import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

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

export const H1 = createComponent<HTMLHeadingElement>(
  "h1",
  "scroll-m-20 text-2xl font-bold tracking-tight lg:text-2xl",
  "H1"
);

export const H2 = createComponent<HTMLHeadingElement>(
  "h2",
  "scroll-m-20 py-2 text-lg font-medium tracking-tight first:mt-0",
  "H2"
);

export const H3 = createComponent<HTMLHeadingElement>(
  "h3",
  "scroll-m-20 text-lg font-bold tracking-tight",
  "H3"
);

export const H4 = createComponent<HTMLHeadingElement>(
  "h4",
  "scroll-m-20 text-md font-medium tracking-tight",
  "H4"
);

export const Lead = createComponent<HTMLParagraphElement>(
  "p",
  "text-lg text-gray-600",
  "Lead"
);

export const P = createComponent<HTMLParagraphElement>(
  "p",
  "leading-relaxed mt-6",
  "P"
);

export const Large = createComponent<HTMLDivElement>(
  "div",
  "text-lg font-medium",
  "Large"
);

export const Small = createComponent<HTMLParagraphElement>(
  "p",
  "text-sm font-normal leading-tight",
  "Small"
);

export const Muted = createComponent<HTMLSpanElement>(
  "span",
  "text-sm text-gray-500",
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
