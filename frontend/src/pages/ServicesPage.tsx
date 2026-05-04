import { PageLayout } from "../components/PageLayout";
import { BlockRenderer } from "../components/blocks/BlockRender";
import { Route } from "../routes/tjanster";
import type { PageBlock } from "../api/umbraco";

export function ServicesPage() {
  const blocks: PageBlock[] = Route.useLoaderData();

  console.log("🔥 ALL BLOCK TYPES:", blocks.map(b => b.type));
  console.log("🔥 BLOCKS IN PAGE:", blocks);

  return (
    <PageLayout>
      <BlockRenderer blocks={blocks} />
    </PageLayout>
  );
}