"use client";

import { posts } from "@/components/content";
import { P, PostWrapper } from "@/components/ui";
import { usePathname } from "next/navigation";

export default function ViewDelta2025() {
  const pathname = usePathname();
  const [, year, slug] = pathname.split("/");

  const post = posts.find((item) => item.slug === slug && item.year === year);

  return (
    <PostWrapper post={post}>
      <P>
        This is a deep dive into the ViewDelta algorithm, with real-world
        examples, comparisons to baselines, and visualizations.
      </P>
      <P>
        We show significant improvements over traditional alignment-based
        methods, particularly on unstructured image pairs.
      </P>
    </PostWrapper>
  );
}
