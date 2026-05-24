import { Route } from "../routes/kontakt";
import type { PageBlock } from "@/api/umbraco";
import { PageLayout } from "../components/PageLayout";
import { BlockRenderer } from "../components/blocks/BlockRender";

export function ContactPage() {
  const blocks = Route.useLoaderData() as PageBlock[];

  return (
    <PageLayout>
      <BlockRenderer blocks={blocks} />
    </PageLayout>
  );
}