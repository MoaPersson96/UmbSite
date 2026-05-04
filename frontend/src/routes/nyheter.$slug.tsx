import { createFileRoute, notFound } from "@tanstack/react-router";
import { NewsPostPage } from "../pages/NyheterPostPage";

type NewsPostData = {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    body: unknown;
  };
  others: any[];
};

export const Route = createFileRoute("/nyheter/$slug")({
  loader: async ({ params }): Promise<NewsPostData> => {
    const res = await fetch(`/api/umbraco/nyheter/${params.slug}`);

    if (!res.ok) throw notFound();

    return res.json();
  },

  component: NewsPostPage,
});