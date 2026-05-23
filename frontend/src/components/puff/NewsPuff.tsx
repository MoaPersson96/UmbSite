import { Link } from "@tanstack/react-router";
import type { NewsPost } from "../../data/newsdata";

export function NewsList({ items }: { items: NewsPost[] }) {
  console.log(
    items.map((post) => ({
      title: post.title,
      slug: post.slug,
      href: `/nyheter/${post.slug}`,
    }))
  );

  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 mt-16 md:mt-24 mb-24">
      <div className="grid gap-8 md:grid-cols-3">
        {items.map((post) => (
          <Link
            key={post.slug}
            to="/nyheter/$slug"
            params={{ slug: post.slug }}
            className="group block bg-background border border-border hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] transition-shadow"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={post.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-black">
                {post.title}
              </h3>

              <div className="mt-2 text-sm font-bold italic text-black/80">
                {post.date}
              </div>

              <p className="mt-4 text-sm text-black/70 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}