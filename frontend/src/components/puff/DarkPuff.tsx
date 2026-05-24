import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export interface DarkCard {
  label: string;
  title: string;
  to?: string;
}

interface CardGridProps {
  items: DarkCard[];
}

export function CardGrid({ items }: CardGridProps) {
  return (
    <section className="mx-auto mt-16 max-w-[1400px] px-4 md:mt-20 md:px-6">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {items.map((item) => {
          const content = (
            <div className="group relative flex min-h-[220px] flex-col justify-between bg-black p-7 text-white transition-transform hover:-translate-y-1">
              {/* Label */}
              <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/60">
                {item.label}
              </div>

              {/* Bottom content */}
              <div className="mt-12 flex items-end justify-between gap-4">
                <h3 className="max-w-[18ch] text-2xl font-bold leading-tight">
                  {item.title}
                </h3>

                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:rotate-[-45deg]">
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