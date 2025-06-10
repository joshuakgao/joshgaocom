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
  "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl font-roboto",
  "H0"
);

export const H1 = createComponent<HTMLHeadingElement>(
  "h1",
  "scroll-m-20 text-2xl font-bold tracking-tight lg:text-2xl font-roboto",
  "H1"
);

export const H2 = createComponent<HTMLHeadingElement>(
  "h2",
  "scroll-m-20 py-2 text-xl font-medium tracking-tight first:mt-0 font-roboto",
  "H2"
);

export const H3 = createComponent<HTMLHeadingElement>(
  "h3",
  "scroll-m-20 text-lg font-medium tracking-tight font-roboto",
  "H3"
);

export const H4 = createComponent<HTMLHeadingElement>(
  "h4",
  "scroll-m-20 text-md font-medium tracking-tight font-roboto",
  "H4"
);

export const Lead = createComponent<HTMLParagraphElement>(
  "p",
  "text-lg text-gray-600 font-roboto",
  "Lead"
);

export const P = createComponent<HTMLParagraphElement>(
  "p",
  "tracking-tight font-roboto text-[16px]",
  "P"
);

export const Large = createComponent<HTMLDivElement>(
  "div",
  "text-lg font-medium font-roboto",
  "Large"
);

export const Small = createComponent<HTMLParagraphElement>(
  "p",
  "text-sm font-normal leading-tight font-roboto",
  "Small"
);

export const ExtraSmall = createComponent<HTMLParagraphElement>(
  "p",
  "text-xs font-normal text-gray-500 leading-tight font-roboto",
  "ExtraSmall"
);

export const Muted = createComponent<HTMLParagraphElement>(
  "p",
  "text-gray-500 font-roboto",
  "P"
);

export const InlineCode = createComponent<HTMLSpanElement>(
  "code",
  "relative rounded bg-gray-100 px-1 py-0.5 font-mono text-sm font-medium font-roboto",
  "InlineCode"
);

export const MultilineCode = createComponent<HTMLPreElement>(
  "pre",
  "relative rounded bg-gray-100 p-4 font-mono text-sm font-medium overflow-x-auto font-roboto",
  "MultilineCode"
);

export const List = createComponent<HTMLUListElement>(
  "ul",
  "my-4 ml-4 list-disc space-y-2 font-roboto",
  "List"
);

export const Quote = createComponent<HTMLQuoteElement>(
  "blockquote",
  "mt-4 border-l-4 pl-4 italic text-gray-600 font-roboto",
  "Quote"
);
