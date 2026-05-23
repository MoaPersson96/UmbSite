import { createFileRoute, notFound } from "@tanstack/react-router";
import { getNewsPostBySlug } from "../../api/umbraco";
import { NewsPostPage } from "../../pages/NyheterPostPage";

export const Route = createFileRoute("/nyheter/$slug")({
  loader: async ({ params }) => {
    console.log(" 🔍 LOADER TRIGERED FOR SLUG:", params.slug );
    const result = await getNewsPostBySlug(params.slug);

    if (!result) throw notFound();

    return result;
  },

  component: NewsPostPage,
});