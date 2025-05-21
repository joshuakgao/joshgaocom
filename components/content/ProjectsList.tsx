"use client";

import { BlogCard, H1 } from "@/components/ui";

interface BlogCardProps {
  title?: string;
  description?: string;
  authors?: string[];
  tag?: string;
  date?: string;
  link?: string;
  thumbnail?: string;
  starred?: boolean;
}

const projectsByYear: { year: string; items: BlogCardProps[] }[] = [
  {
    year: "2025",
    items: [
      {
        title: "ViewDelta: Text-Prompted Change Detection in Unaligned Images",
        authors: ["Subin Varghese", "Joshua Gao", "Vedhus Hoskere"],
        description:
          "Can you spot the difference between these two images? ViewDelta can! We show you how ViewDelta solves text-prompted change detection in many domains.",
        tag: "Research Paper",
        thumbnail: "/assets/projects/2025/viewDelta/thumbnail.png",
        date: "Nov 2025",
        link: "https://joshuakgao.github.io/viewdelta/",
        starred: true,
      },
    ],
  },
  {
    year: "2024",
    items: [
      {
        title: "Self Hosted Cloud Storage Is Game Changing",
        description:
          "All it takes to avoid Google Drive and DropBox subscriptions is a RasberryPi and NextCloud.",
        thumbnail: "/assets/projects/2024/selfHostedCloud/thumbnail.jpg",
        date: "Dec 2024",
      },
      {
        title:
          "How Do You Do Change Detection on Unaligned Images? Here's how.",
        description:
          "We leverage the power of vision LLMs and HLoc to do just that.",
        thumbnail: "/assets/images/cat.jpeg",
        date: "Nov 2024",
      },
      {
        title: "Tired of Writing Inspection Reports? Let AI Do It!",
        description:
          "We utilize the power of LLMs, computer vision, and change detection to automate the process of writing engineering inspection reports. Say goodbye to tedious manual work and hello to efficiency!",
        thumbnail: "/assets/projects/2025/viewDelta/thumbnail.png",
        date: "Sep 2025",
      },
      {
        title:
          "How do you find duplicate images despite different views? HLoc might help.",
        description:
          "Think two photos are totally different? Think again. Discover how HLoc uncovers duplicates hiding in plain sight—even when angles, lighting, or backgrounds change.",
        thumbnail: "/assets/images/cat.jpeg",
        date: "Sep 2025",
      },
      {
        title: "GptNano: Beating OpenAI's GPT-2",
        description:
          "Who says size matters? Meet GptNano: the pint-sized powerhouse that outsmarts GPT-2 without breaking a sweat (or your GPU). Find out how this tiny titan is punching way above its weight.",
        thumbnail: "/assets/projects/2024/gptNano/thumbnail.jpeg",
        date: "May 2024",
        link: "https://github.com/tugonbob/gpt-nano",
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
      },
      {
        title:
          "How Much Is Your Home Worth? We Optimized a Machine Learning Model",
        description:
          "A machine learning model trained on Zillow data with multi variable stochastic gradient descent.",
        thumbnail: "/assets/projects/2023/realEstateValuation/thumbnail.mp4",
        date: "Jun 2023",
        link: "https://github.com/tugonbob/stanford-cs229-andrew-ng/blob/main/Ch1-SupervisedLearning/1-LinearRegression/1.1.1-LmsAlgorithm.ipynb",
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
      },
      {
        title: "Portfolio Tracker",
        date: "2022",
        link: "https://docs.google.com/spreadsheets/d/1xQtttuAGk5ZZ3QMbSqwCcG1vzEMsXRZjo-5jyx6V-8U/edit?usp=sharing",
      },
    ],
  },
];

export function ProjectsList() {
  const cardWrapper = "mb-6";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-0 space-y-16">
      {projectsByYear.map(({ year, items }) => (
        <section key={year}>
          <H1 className="mb-8">{year}</H1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((props, idx) => (
              <div key={idx} className={cardWrapper}>
                <BlogCard {...props} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
