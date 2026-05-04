import { createFileRoute } from "@tanstack/react-router";
import { getContactPage, mapBlocks } from "../api/umbraco";
import { ContactPage } from "../pages/KontaktPage";

export const Route = createFileRoute("/kontakt")({
  loader: async () => {
    const data = await getContactPage();
    return mapBlocks(data);
  },
  component: ContactPage,
});