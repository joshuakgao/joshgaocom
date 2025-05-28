// 1. Base shared fields
export type BaseProps = {
  slug: string;
  title: string;
  description?: string;
  tags?: string[];
  contentType: "research" | "project" | "talk"; // ← key for narrowing
  date: string;
  year: string;
  thumbnail: string;
  starred?: boolean;
};

// 2. Research-specific
export type ResearchPaperProps = BaseProps & {
  contentType: "research";
  authors: string[];
  journal: string;
  journalHighlighted: boolean;
};

// 3. Project-specific
export type ProjectProps = BaseProps & {
  contentType: "project";
  // add any project-specific fields here in the future
};

// 4. Talk-specific
export type TalkProps = BaseProps & {
  contentType: "talk";
  // add talk-specific fields here later
};

// 5. Unified post type
export type PostProps = ResearchPaperProps | ProjectProps | TalkProps;
