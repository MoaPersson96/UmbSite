import { Helmet } from "react-helmet-async";
import { BlockRenderer } from "../components/blocks/BlockRender";
import { Route } from "../routes/tjanster";

export function ServicesPage() {
  const blocks = Route.useLoaderData();

  return (
    <>
      <Helmet>
        <title>Tjänster — Nordvikens kommun</title>
      </Helmet>

      <BlockRenderer blocks={blocks} />
    </>
  );
}