import { posts } from "@/components/content";
import { Col, GradientText, H0, PostCard, Row, Small } from "@/components/ui";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { IoCalendarClearOutline } from "react-icons/io5";
import { RiHashtag } from "react-icons/ri";

export function PostLists() {
  const [selectedYear, setSelectedYear] = useState<string | "All">("All");
  const [selectedTag, setSelectedTag] = useState<string | "All">("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaps = async () => {
      const clapsDoc = await getDoc(doc(db, "claps", "claps"));
      if (clapsDoc.exists()) {
        const data = clapsDoc.data();

        for (const key in data) {
          posts.forEach((post) => {
            if (post.slug === key) {
              post.claps = data[key];
            }
          });
        }
      }
      setLoading(false);
    };
    fetchClaps();
  }, []);

  const allYears = useMemo(() => {
    const years = new Set(posts.map((p) => p.year));
    return Array.from(years).sort((a, b) => Number(b) - Number(a)); // most recent first
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => post.tags?.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    return posts.filter(
      (post) =>
        (selectedYear === "All" || post.year === selectedYear) &&
        (selectedTag === "All" || post.tags?.includes(selectedTag))
    );
  }, [selectedYear, selectedTag]);

  if (loading) {
    return (
      <Col className="items-center justify-center w-full h-96">
        <GradientText base="gradient" animate="always">
          <H0>Hi! I'm Joshua Gao</H0>
        </GradientText>
      </Col>
    );
  }

  return (
    <Col className="w-full max-w-7xl mx-auto px-4 md:px-0">
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

      {/* Masonry Cards */}
      <div className="columns-1 sm:columns-2 lg:columns-3">
        {filteredProjects.map((props, idx) => (
          <div key={props.slug || idx} className="break-inside-avoid mb-6">
            <PostCard {...props} />
          </div>
        ))}
      </div>
    </Col>
  );
}
