import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "../pages/ServicesPage";
import { mapBlocks } from "../api/umbraco";

export const Route = createFileRoute("/tjanster")({
  loader: async () => {
    const res = await fetch(
      "https://localhost:44365/umbraco/delivery/api/v2/content/item/e3252f18-9d3c-4615-98b1-82a48c4c956b"
    );

    if (!res.ok) {
      throw new Error("Kunde inte hämta tjänster");
    }

    const data = await res.json();

    console.log("🔥 HOME DATA (source of truth):", data);

    const mapped = mapBlocks(data);

    console.log("🔥 ALL BLOCKS:", mapped);

    return mapped;
  },

  component: ServicesPage,
});