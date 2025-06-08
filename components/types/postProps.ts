// 1. Base shared fields
export type BaseProps = {
  slug: string;
  title: string;
  description?: string;
  tags?: string[];
  contentType: "Research" | "Project" | "Talk"; // ← key for narrowing
  date: string;
  year: string;
  thumbnail: string;
  starred?: boolean;
  links?: { [key: string]: string };
};

// 2. Research-specific
export type ResearchProps = BaseProps & {
  contentType: "Research";
  authors: string[];
  journal: string;
  journalHighlighted: boolean;
};

// 3. Project-specific
export type ProjectProps = BaseProps & {
  contentType: "Project";
  // add any project-specific fields here in the future
};

// 4. Talk-specific
export type TalkProps = BaseProps & {
  contentType: "Talk";
  // add talk-specific fields here later
};

// 5. Unified post type
export type PostProps = ResearchProps | ProjectProps | TalkProps;
