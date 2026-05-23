import { PageLayout } from "../components/PageLayout";
import { NewsHero } from "../components/hero/NewsHero";
import { NewsList } from "../components/puff/NewsPuff";

type Props = {
  data: any;
};

export function NewsPage({ data }: Props) {
  return (
    <PageLayout>
      {data.hero && (
        <NewsHero
          image={data.hero.image}
          label={data.hero.label}
          title={data.hero.title}
          intro={data.hero.intro}
        />
      )}

      <NewsList items={data.news} />
    </PageLayout>
  );
}