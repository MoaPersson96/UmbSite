import { Helmet } from "react-helmet-async";
import { Route } from "../routes/kontakt";
import type { PageBlock } from "@/api/umbraco";
import { PageLayout } from "../components/PageLayout";
import { BlockRenderer } from "../components/blocks/BlockRender";

export function ContactPage() {
  const blocks = Route.useLoaderData() as PageBlock[];

  return (
    <>
      <Helmet>
        <title>Kontakta — Nordvikens kommun</title>
      </Helmet>

      <PageLayout>
        <BlockRenderer blocks={blocks} />
      </PageLayout>
    </>
  );
}