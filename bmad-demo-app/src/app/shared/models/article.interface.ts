export interface Article {
  id: string;
  title: string;
  author: string;
  publishDate: Date;
  excerpt: string;
  url: string;
  featuredImage?: string;
  categories?: string[];
}