import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export interface DarkCard {
  eyebrow: string;
  title: string;
  to?: string;
}

export function CardGrid({
  items,
  columns = 4,
}: {
  items: DarkCard[];
  columns?: 3 | 4;
}) {
  const colsClass = columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4";
  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 mt-16 md:mt-20">
      <div className={`grid gap-3 ${colsClass}`}>
        {items.map((item) => {
          const content = (
            <div className="group relative flex flex-col justify-between min-h-[220px] rounded-sm bg-ink p-7 text-ink-foreground transition-transform hover:-translate-y-1">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-ink-foreground/60">
                {item.eyebrow}
              </div>
              <div className="flex items-end justify-between gap-4 mt-12">
                <h3 className="text-xl md:text-2xl font-bold leading-tight max-w-[18ch]">
                  {item.title}
                </h3>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-foreground text-ink transition-transform group-hover:rotate-[-45deg]">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </div>
          );
          return item.to ? (
            <Link key={item.title} to={item.to}>
              {content}
            </Link>
          ) : (
            <div key={item.title}>{content}</div>
          );
        })}
      </div>
    </section>
  );
}