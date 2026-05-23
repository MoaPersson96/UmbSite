import { PageLayout } from "../components/PageLayout";
import { ArticleBody } from "../components/text/ArticleBody";
import { NewsList } from "../components/puff/NewsPuff";
import { Route } from "../routes/nyheter/$slug";

export function NewsPostPage() {
  const { post, others } = Route.useLoaderData();

  return (
    <PageLayout>
      <article className="mx-auto max-w-[820px] px-6 md:px-0 pt-16 md:pt-24">
        <div className="text-center">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-black/70">
            Nyheter
          </div>

          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
            {post.title}
          </h1>

          <div className="mt-5 text-sm font-bold italic text-black/80">
            {post.date}
          </div>

          <p className="mt-8 text-lg text-black/80 leading-relaxed max-w-[640px] mx-auto">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-12 mx-auto w-full max-w-[760px] aspect-[4/3] overflow-hidden bg-surface-muted">
          <img
            src={post.image}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-12 mx-auto max-w-[760px]">
          <ArticleBody blocks={post.body} />
        </div>
      </article>

      <div className="mt-16 border-t border-border pt-4">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 mt-8">
          <h2 className="text-2xl md:text-3xl font-extrabold">
            Fler nyheter
          </h2>
        </div>

        <NewsList items={others} />
      </div>

    </PageLayout>
  );
}