import { PostProps } from "@/components/types";

export let posts: PostProps[] = [
  // {
  //   contentType: "Research",
  //   slug: "domain-specific-rag-evaluation",
  //   thumbnail: "/assets/projects/2025/viewDelta/thumbnail.png",
  //   title: "Domain Specific RAG Evaluation",
  //   authors: ["Joshua Gao", "Huy Pham", "Vedhus Hoskere"],
  //   journal: "arvix",
  //   journalHighlighted: false,
  //   description: "",
  //   date: "Sep 2025",
  //   links: {
  //     website: "",
  //   },
  //   year: "2025",
  // },
  // {
  //   contentType: "AI",
  //   slug: "athena-how-well-can-transformers-play-chess",
  //   thumbnail: "/assets/projects/2025/athena/thumbnail.png",
  //   title: "Athena: How Well Can Transformers Play Chess?",
  //   description:
  //     "Discover how Athena, a transformer-based model, is pushing the boundaries of chess AI, challenging traditional engines and human players alike.",
  //   date: "28 Oct 2025",
  //   year: "2025",
  //   links: {
  //     lichess: "https://lichess.org/@/athena-bot",
  //     github: "https://github.com/joshuakgao/athena/tree/main",
  //     huggingfaceDataset:
  //       "https://huggingface.co/datasets/joshuakgao/chessbenchmate",
  //   },
  // },
  {
    contentType: "Research",
    slug: "viewdelta-text-prompted-change-detection-in-unaligned-images",
    thumbnail: "/assets/projects/2025/viewDelta/thumbnail.png",
    video: "https://youtu.be/snSC3JZe_GA",
    title:
      "ViewDelta: Scaling Scene Change Detection through Text-Conditioning",
    authors: ["Subin Varghese", "Joshua Gao", "Vedhus Hoskere"],
    journal: "ICCV 2025, SEA Workshop",
    journalHighlighted: true,
    description: `Can you spot the difference between these two images? ViewDelta can! We show you how ViewDelta solves text-prompted change detection in many domains.`,
    date: "19 Oct 2025",
    links: {
      publication: "https://arxiv.org/abs/2412.07612",
      website: "https://joshuakgao.github.io/viewdelta/",
      pdf: "https://arxiv.org/pdf/2412.07612",
      // github: "https://github.com/drags99/ViewDelta",
      huggingfaceDataset: "https://huggingface.co/datasets/hoskerelab/CSeg",
    },
    year: "2025",
  },
  {
    contentType: "Hardware",
    slug: "self-hosted-cloud-storage",
    thumbnail: "/assets/projects/2024/self-hosted-cloud-storage/thumbnail.jpg",
    title: "Self Hosted NextCloud Is Game Changing",
    description:
      "All it takes to avoid Google Drive and DropBox subscriptions is a RasberryPi and NextCloud.",
    links: { website: "https://cloud.joshgao.com" },
    date: "9 Dec 2024",
    year: "2024",
  },
  // {
  //   contentType: "Project",
  //   slug: "how-do-you-find-duplicate-images-despite-different-views-and-time-taken-hloc-might-help",
  //   title:
  //     "How do you find duplicate images despite different views and time taken? HLoc might help.",
  //   description:
  //     "Think two photos are totally different? Think again. Discover how HLoc uncovers duplicates hiding in plain sight—even when angles, lighting, or backgrounds change.",
  //   thumbnail: "/assets/images/cat.jpeg",
  //   // link: "https://github.com/tugonbob/reddit-laughs",
  //   date: "Sep 2024",
  //   year: "2024",
  //   tags: ["AI"],
  // },
  {
    contentType: "AI",
    slug: "gpt-nano",
    title: "GptNano: Beating OpenAI's GPT-2",
    description:
      "Meet GptNano: the pint-sized powerhouse that outsmarts GPT-2.",
    thumbnail: "/assets/projects/2024/gpt-nano/thumbnail2.png",
    date: "27 Jun 2024",
    year: "2024",
    links: {
      github: "https://github.com/tugonbob/gpt-nano",
    },
  },
  {
    contentType: "AI",
    slug: "knn-image-classification",
    title: "KNN Image Classification",
    description: "A KNN image classifier trained on CIFAR-10 dataset.",
    thumbnail: "/assets/projects/2023/knn-image-classification/thumbnail.png",
    date: "16 Dec 2023",
    year: "2023",
    links: {
      github: "https://github.com/tugonbob/cifar-knn-classifer",
    },
  },
  {
    contentType: "AI",
    slug: "ml-real-estate-valuation",
    title: "How Much Is Your Home Worth? We Optimized a Machine Learning Model",
    description:
      "A machine learning model trained on Zillow data with multi variable stochastic gradient descent.",
    thumbnail: "/assets/projects/2023/ml-real-estate-valuation/thumbnail.png",
    date: "8 Jun 2023",
    year: "2023",
    links: {
      github:
        "https://github.com/tugonbob/stanford-cs229-andrew-ng/blob/main/Ch1-SupervisedLearning/1-LinearRegression/1.1.1-LmsAlgorithm.ipynb",
    },
  },
  {
    contentType: "Software",
    slug: "reddit-laughs",
    title: "Reddit Laughs",
    date: "13 Jun 2022",
    year: "2022",
    links: {
      github: "https://github.com/tugonbob/reddit-laughs",
    },
    thumbnail: "/assets/projects/2022/reddit-laughs/thumbnail.png",
  },
  {
    contentType: "Finance",
    slug: "stock-portfolio-tracker",
    title: "How to Track Your Stock Portfolio with Google Sheets",
    date: "Dec 2022",
    year: "2022",
    thumbnail: "/assets/projects/2022/stock-portfolio-tracker/thumbnail.png",
    links: {
      googleDrive:
        "https://docs.google.com/spreadsheets/d/1wrPfNQtEmuMB3GUdjDgKffgdOIyPkrvQC0l_QhYNKxE/edit?usp=sharing",
    },
  },
];
