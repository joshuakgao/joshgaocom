// 1. Base shared fields
export type PostProps = {
  slug: string;
  title: string;
  description?: string;
  contentType: string;
  date: string;
  year: string;
  thumbnail: string;
  video?: string;
  // When set, the card links straight here instead of to the post page.
  externalUrl?: string;
  starred?: boolean;
  links?: { [key: string]: string };
  authors?: string[];
  journal?: string;
  journalHighlighted?: boolean;
};
