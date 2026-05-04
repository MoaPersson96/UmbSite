import { PageLayout } from "../components/PageLayout";
import { NewsHero } from "../components/hero/NewsHero";
import { NewsList } from "../components/puff/NewsPuff";
import { Route } from "../routes/nyheter";

export function NewsPage() {
  const data = Route.useLoaderData();

  return (
    <PageLayout>
      <NewsHero
        image={data.hero.image}
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        intro={data.hero.intro}
      />

      <NewsList items={data.news} />
    </PageLayout>
  );
}