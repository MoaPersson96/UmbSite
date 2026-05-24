import { createFileRoute } from "@tanstack/react-router";
import { mapBlocks } from "../api/umbraco";
import { ContactPage } from "../pages/KontaktPage";

export const Route = createFileRoute("/kontakt")({
  loader: async () => {
    const res = await fetch(
      "https://localhost:44365/umbraco/delivery/api/v2/content/item/db7751d2-2365-4aea-9c26-a94ff2a3fb14"
    );

    if (!res.ok) {
      throw new Error("Kunde inte hitta kontaktsidan");
    }

    const data = await res.json();

    const mapped = mapBlocks(data);


    return mapped;
  },
  component: ContactPage,
});