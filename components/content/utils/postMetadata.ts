import { usePathname } from "next/navigation";
import { posts } from "@/app";

export function getPostMetadata() {
  const pathname = usePathname();
  const [year, slug] = pathname.split("/").slice(-2);
  const assetsPath = `/assets/projects/${year}/${slug}`;

  const post = posts.find((item) => item.slug === slug && item.year === year);

  return { year, slug, assetsPath, post };
}
