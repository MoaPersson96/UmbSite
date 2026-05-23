import type { ArticleBlock } from "@/components/text/ArticleBody";


export interface NewsPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  body: ArticleBlock[];
}

export const news: NewsPost[] = [];

export async function getNews(): Promise<NewsPost[]> {
  return news;
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | undefined> {
  return news.find((n) => n.slug === slug);
}