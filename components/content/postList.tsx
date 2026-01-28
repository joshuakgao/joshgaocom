import { posts } from "@/components/content";
import { Col, H0, PostCard, Row, Small, Spacer } from "@/components/ui";
import { useMemo, useState } from "react";
import { IoCalendarClearOutline } from "react-icons/io5";
import { RiHashtag } from "react-icons/ri";

export function PostList() {
  const [selectedYear, setSelectedYear] = useState<string | "All">("All");
  const [selectedTag, setSelectedTag] = useState<string | "All">("All");

  const allYears = useMemo(() => {
    const years = new Set(posts.map((p) => p.year));
    return Array.from(years).sort((a, b) => Number(b) - Number(a)); // most recent first
  }, []);

  const allTags = useMemo(() => {
    const tagCounts: Record<string, number> = {};
    posts.forEach((post) => {
      tagCounts[post.contentType] = (tagCounts[post.contentType] || 0) + 1;
    });
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);
  }, []);

  const filteredProjects = useMemo(() => {
    return posts.filter(
      (post) =>
        (selectedYear === "All" || post.year === selectedYear) &&
        (selectedTag === "All" || post.contentType === selectedTag),
    );
  }, [selectedYear, selectedTag]);

  return (
    <Col className="w-full max-w-7xl mx-auto px-4 md:px-0">
      <Spacer size={64} />
      <H0>Blog</H0>
      <Spacer size={64} />
      {/* Filters */}
      <Col className="my-8 space-y-4">
        {/* Year Filter */}
        <Row className="gap-2 flex-wrap items-center">
          <IoCalendarClearOutline size={16} />
          {selectedYear === "All" ? (
            allYears.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className="px-2 py-1 rounded-md hover:underline transition"
              >
                <Small>{year}</Small>
              </button>
            ))
          ) : (
            <div className="flex items-center gap-2">
              <span className="ml-2 px-2 py-1 rounded-md bg-indigo-400 text-white">
                <Small>{selectedYear}</Small>
              </span>
              <button
                onClick={() => setSelectedYear("All")}
                className="text-sm hover:text-gray-800 transition"
              >
                &times;
              </button>
            </div>
          )}
        </Row>

        {/* Tag Filter */}
        <Row className="gap-2 flex-wrap items-center">
          <RiHashtag size={16} />
          {selectedTag === "All" ? (
            allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className="px-2 py-1 text-sm rounded-full hover:underline transition"
              >
                {tag}
              </button>
            ))
          ) : (
            <div className="flex items-center gap-2">
              <span className="ml-2 px-2 py-1 text-sm rounded-md bg-indigo-400 text-white">
                {selectedTag}
              </span>
              <button
                onClick={() => setSelectedTag("All")}
                className="text-sm text-gray-500 hover:text-gray-800 transition"
              >
                &times;
              </button>
            </div>
          )}
        </Row>
      </Col>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
        {filteredProjects.map((props, idx) => (
          <PostCard key={props.slug || idx} {...props} />
        ))}
      </div>
    </Col>
  );
}
