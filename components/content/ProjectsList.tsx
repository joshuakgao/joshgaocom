"use client";

import { BlogCard, BlogCardProps, Col, Row, Small } from "@/components/ui";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Tags } from "lucide-react";
import { useMemo, useState } from "react";

const projectsByYear: { year: string; items: BlogCardProps[] }[] = [
  {
    year: "2025",
    items: [
      {
        // contentType: "Research Paper",
        thumbnail: "/assets/projects/2025/viewDelta/thumbnail.png",
        title: "ViewDelta: Text-Prompted Change Detection in Unaligned Images",
        authors: ["Subin Varghese", "Joshua Gao", "Vedhus Hoskere"],
        journal: "ICCV 2025",
        hightlightJournal: false,
        description: `Can you spot the difference between these two images? ViewDelta can! We show you how ViewDelta solves text-prompted change detection in many domains.`,
        date: "Nov 2025",
        link: "https://joshuakgao.github.io/viewdelta/",
        tags: ["Research Paper", "AI"],
      },
    ],
  },
  {
    year: "2024",
    items: [
      {
        thumbnail: "/assets/projects/2024/selfHostedCloud/thumbnail.jpg",
        title: "Self Hosted Cloud Storage Is Game Changing",
        description:
          "All it takes to avoid Google Drive and DropBox subscriptions is a RasberryPi and NextCloud.",
        link: "https://github.com/tugonbob/reddit-laughs",
        date: "Dec 2024",
        tags: ["Hardware"],
      },
      {
        title:
          "How Do You Do Change Detection on Unaligned Images? Here's how.",
        description:
          "We leverage the power of vision LLMs and HLoc to do just that.",
        thumbnail: "/assets/images/cat.jpeg",
        link: "https://github.com/tugonbob/reddit-laughs",
        date: "Nov 2024",
        tags: ["AI"],
      },
      {
        title: "Tired of Writing Inspection Reports? Let AI Do It!",
        description:
          "We utilize the power of LLMs, computer vision, and change detection to automate the process of writing engineering inspection reports. Say goodbye to tedious manual work and hello to efficiency!",
        thumbnail: "/assets/projects/2025/viewDelta/thumbnail.png",
        link: "https://github.com/tugonbob/reddit-laughs",
        date: "Sep 2025",
        tags: ["AI"],
      },
      {
        title:
          "How do you find duplicate images despite different views and time taken? HLoc might help.",
        description:
          "Think two photos are totally different? Think again. Discover how HLoc uncovers duplicates hiding in plain sight—even when angles, lighting, or backgrounds change.",
        thumbnail: "/assets/images/cat.jpeg",
        link: "https://github.com/tugonbob/reddit-laughs",
        date: "Sep 2025",
        tags: ["AI"],
      },
      {
        title: "GptNano: Beating OpenAI's GPT-2",
        description:
          "Who says size matters? Meet GptNano: the pint-sized powerhouse that outsmarts GPT-2 without breaking a sweat (or your GPU). Find out how this tiny titan is punching way above its weight.",
        thumbnail: "/assets/projects/2024/gptNano/thumbnail.jpeg",
        date: "May 2024",
        link: "https://github.com/tugonbob/gpt-nano",
        tags: ["AI"],
      },
    ],
  },
  {
    year: "2023",
    items: [
      {
        title: "KNN Image Classification",
        description: "A KNN image classifier trained on CIFAR-10 dataset.",
        thumbnail: "/assets/images/cat.jpeg",
        date: "2023",
        link: "https://github.com/tugonbob/cifar-knn-classifer",
        tags: ["AI"],
      },
      {
        title:
          "How Much Is Your Home Worth? We Optimized a Machine Learning Model",
        description:
          "A machine learning model trained on Zillow data with multi variable stochastic gradient descent.",
        thumbnail: "/assets/projects/2023/realEstateValuation/thumbnail.mp4",
        date: "Jun 2023",
        link: "https://github.com/tugonbob/stanford-cs229-andrew-ng/blob/main/Ch1-SupervisedLearning/1-LinearRegression/1.1.1-LmsAlgorithm.ipynb",
        tags: ["AI"],
      },
    ],
  },
  {
    year: "2022",
    items: [
      {
        title: "Auto Youtube",
        date: "2022",
        link: "https://github.com/tugonbob/reddit-laughs",
        thumbnail: "/assets/projects/2023/realEstateValuation/thumbnail.mp4",
        tags: ["Other"],
      },
      {
        title: "Portfolio Tracker",
        date: "2022",
        link: "https://docs.google.com/spreadsheets/d/1xQtttuAGk5ZZ3QMbSqwCcG1vzEMsXRZjo-5jyx6V-8U/edit?usp=sharing",
        thumbnail: "/assets/projects/2023/realEstateValuation/thumbnail.mp4",
        tags: ["Other"],
      },
    ],
  },
];

export function ProjectsList() {
  const [selectedYear, setSelectedYear] = useState<string | "All">("All");
  const [selectedTag, setSelectedTag] = useState<string | "All">("All");

  const allYears = useMemo(
    () => [...projectsByYear.map(({ year }) => year)],
    []
  );

  const allTags = useMemo(() => {
    const tags: string[] = [];
    projectsByYear.forEach(({ items }) => {
      items.forEach((item) => {
        item.tags?.forEach((t) => {
          if (tags.includes(t)) return;
          tags.push(t);
        });
      });
    });
    return [...tags];
  }, []);

  const allProjects = useMemo(() => {
    return projectsByYear.flatMap(({ items, year }) =>
      items.map((item) => ({ ...item, year }))
    );
  }, []);

  const filteredProjects = useMemo(() => {
    return allProjects.filter(
      (item) =>
        (selectedYear === "All" || item.year === selectedYear) &&
        (selectedTag === "All" || item.tags?.includes(selectedTag))
    );
  }, [selectedYear, selectedTag, allProjects]);

  return (
    <Col className="w-full max-w-7xl mx-auto px-4 md:px-0">
      {/* Filters */}
      <Col className="my-8">
        {/* Year Filter */}
        <Row>
          <Calendar size={16} className="mb-1" />
          <div className="flex flex-wrap gap-2 items-center">
            {selectedYear === "All" ? (
              allYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className="px-3 py-1 rounded-md hover:underline transition"
                >
                  <Small>{year}</Small>
                </button>
              ))
            ) : (
              <div className="flex items-center gap-2">
                <span className="ml-2 px-3 py-1 rounded-md bg-indigo-400 text-white">
                  <Small>{selectedYear}</Small>
                </span>
                <button
                  onClick={() => setSelectedYear("All")}
                  className="text-sm hover:text-gray-800 transition"
                  aria-label="Clear year filter"
                >
                  &times;
                </button>
              </div>
            )}
          </div>
        </Row>

        {/* Tag Filter */}
        <Row>
          <Tags size={16} />
          <div className="flex flex-wrap gap-2 items-center">
            {selectedTag === "All" ? (
              allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className="px-3 py-1 text-sm rounded-full hover:underline transition"
                >
                  {tag}
                </button>
              ))
            ) : (
              <div className="flex items-center gap-2">
                <span className="ml-2 px-3 py-1 text-sm rounded-md bg-indigo-400 text-white">
                  {selectedTag}
                </span>
                <button
                  onClick={() => setSelectedTag("All")}
                  className="text-sm text-gray-500 hover:text-gray-800 transition"
                  aria-label="Clear tag filter"
                >
                  &times;
                </button>
              </div>
            )}
          </div>
        </Row>
      </Col>

      {/* Masonry Cards */}
      <AnimatePresence mode="popLayout">
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3">
          {filteredProjects.map((props, idx) => (
            <motion.div
              layout
              key={props.title + idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: idx * 0.02, // 🎯 stagger each card by index
              }}
              className="break-inside-avoid mb-6"
            >
              <BlogCard {...props} />
            </motion.div>
          ))}
          {/* Phantom cards to balance layout */}
          <div className="break-inside-avoid mb-6 opacity-100 pointer-events-none">
            <div className="h-[0px]"> </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Col>
  );
}
