import { createFileRoute } from "@tanstack/react-router";
import { mapNewsPage } from "../api/umbraco";
import { NewsPage } from "../pages/NyheterPage";

type NewsPageData = {
  hero: {
    image: string;
    eyebrow: string;
    title: string;
    intro: string;
  };
  news: NewsPost[];
};

export const Route = createFileRoute("/nyheter")({
  loader: async (): Promise<NewsPageData> => {
    const res = await fetch(
      "https://localhost:44365/umbraco/delivery/api/v2/content/item/{45649c70-4883-4edc-b3f7-00be849e5365}"
    );

    if (!res.ok) {
      throw new Error("Kunde inte hämta nyheter från Umbraco");
    }

    const data = await res.json();

    return mapNewsPage(data);
  },

  component: NewsPage,
});