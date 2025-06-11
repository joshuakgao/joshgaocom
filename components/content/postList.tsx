import { posts } from "@/components/content";
import { Col, PostCard, Row, Small } from "@/components/ui";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { IoCalendarClearOutline } from "react-icons/io5";
import { RiHashtag } from "react-icons/ri";
import Masonry from "react-masonry-css";

export function PostList() {
  const [selectedYear, setSelectedYear] = useState<string | "All">("All");
  const [selectedTag, setSelectedTag] = useState<string | "All">("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClapsAndViews = async () => {
      // Fetch claps
      const clapsDoc = await getDoc(doc(db, "claps", "claps"));
      if (!clapsDoc.exists()) return setLoading(false);

      const data = clapsDoc.data();

      for (const key in data) {
        posts.forEach((post) => {
          if (post.slug === key) {
            post.claps = data[key];
          }
        });
      }

      // Fetch views
      const viewsDoc = await getDoc(doc(db, "views", "views"));
      if (!viewsDoc.exists()) return setLoading(false);
      const viewsData = viewsDoc.data();
      for (const key in viewsData) {
        posts.forEach((post) => {
          if (post.slug === key) {
            post.views = viewsData[key];
          }
        });
      }

      setLoading(false);
    };
    fetchClapsAndViews();
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
      <Col className="w-full max-w-7xl mx-auto px-4 md:px-0">
        <Col className="my-8 space-y-4">
          <Row className="gap-2 flex-wrap items-center animate-pulse">
            {/* Calendar icon */}
            <div className="h-4 w-4 bg-gray-300 rounded" />

            {/* Placeholder buttons */}
            {Array.from({ length: allYears.length }).map((_, idx) => (
              <div key={idx} className="h-6 w-12 bg-gray-200 rounded-md" />
            ))}
          </Row>
          <Row className="gap-2 flex-wrap items-center animate-pulse">
            {/* Calendar icon */}
            <div className="h-4 w-4 bg-gray-300 rounded" />

            {/* Placeholder buttons */}
            {Array.from({ length: allYears.length }).map((_, idx) => (
              <div key={idx} className="h-6 w-12 bg-gray-200 rounded-md" />
            ))}
          </Row>
        </Col>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {Array.from({ length: posts.length }).map((_, idx) => (
            <div
              key={idx}
              className="break-inside-avoid mb-6 w-full h-full rounded-lg bg-white shadow-sm animate-pulse"
            >
              {/* Thumbnail placeholder */}
              <div className="w-full bg-gray-200 rounded-t-lg h-[300px]" />

              <div className="flex-1 min-w-0 p-4 space-y-3">
                {/* ContentType */}
                <div className="h-3 w-24 bg-gray-300 rounded" />

                {/* Title */}
                <div className="h-5 w-3/4 bg-gray-300 rounded" />

                {/* Authors */}
                <div className="h-4 w-1/2 bg-gray-200 rounded" />

                {/* Journal */}
                <div className="h-4 w-1/3 bg-gray-200 rounded" />

                {/* Description */}
                <div className="h-4 w-full bg-gray-100 rounded" />
                <div className="h-4 w-5/6 bg-gray-100 rounded" />

                {/* Footer row */}
                <div className="flex items-center justify-between pt-4">
                  <div className="h-3 w-16 bg-gray-300 rounded" />
                  <div className="flex gap-1 items-center">
                    <div className="h-4 w-4 bg-gray-300 rounded-full" />
                    <div className="h-3 w-6 bg-gray-300 rounded" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
      <Masonry
        breakpointCols={{ default: 3, 1024: 2, 768: 1 }}
        className="flex -ml-4"
        columnClassName="pl-4"
      >
        {filteredProjects.map((props, idx) => (
          <div key={props.slug || idx} className="mb-4">
            <PostCard {...props} />
          </div>
        ))}
      </Masonry>
    </Col>
  );
}
