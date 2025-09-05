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
  claps: number | undefined;
  views: number | undefined;
  starred?: boolean;
  links?: { [key: string]: string };
  authors?: string[];
  journal?: string;
  journalHighlighted?: boolean;
};
