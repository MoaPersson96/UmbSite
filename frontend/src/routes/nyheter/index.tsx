import { createFileRoute } from "@tanstack/react-router";
import { mapNewsPage } from "../../api/umbraco";
import { NewsPage } from "../../pages/NyheterPage";

export const Route = createFileRoute("/nyheter/")({
  loader: async () => {
    const res = await fetch(
      "https://localhost:44365/umbraco/delivery/api/v2/content/item/7cae9e60-bf7a-4c64-91a0-647537de7218"
    );

    const data = await res.json();
    console.log("🔥 1. RAW API DATA:", data);

    const mapped = mapNewsPage(data);
    console.log("🔥 2. AFTER MAP:", mapped);

    if (!mapped) {
      throw new Error("Nyheter kunde inte mappas");
    }

    return mapped;
  },

  component: NewsIndex,
});

function NewsIndex() {
  const data = Route.useLoaderData();
  console.log("🔥 NEWS INDEX DATA:", data);

  return <NewsPage data={data} />;
}