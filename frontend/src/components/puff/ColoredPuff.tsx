import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
export interface BlurbItem {
  label: string;
  title: string;
  href?: string;
  color?: "brand" | "ink" | "earth" | "muted";
}

const dotColor: Record<NonNullable<BlurbItem["color"]>, string> = {
  brand: "bg-[#864d2be6] text-white",
  ink: "bg-[#000000] text-white",
  earth: "bg-[#ef8600] text-black",
  muted: "bg-[#151515b3] text-white",
};

type Props = {
  items: BlurbItem[];
};

export function ColoredPuff({ items }: Props) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 mt-16 md:mt-20">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {

          const rawColor = item.color;

          const validColors = ["brand", "ink", "earth", "muted"] as const;
          type Color = typeof validColors[number];

          const safeColor: Color =
            rawColor && validColors.includes(rawColor as Color)
              ? (rawColor as Color)
              : "ink";

          return (
            <Link
              key={item.title}
              to="/tjanster"
              className="group flex h-full flex-col items-center justify-between gap-8 p-10 text-center min-h-[260px] bg-[#f8f8f8] transition-colors hover:bg-foreground/5"
            >
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-black">
                {item.label}
              </div>

              <h3 className="font-sans text-2xl md:text-[28px] font-extrabold leading-[1.1] tracking-tight text-black max-w-[16ch]">
                {item.title}
              </h3>

              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:rotate-[-45deg] ${
                  dotColor[safeColor]
                }`}
              >
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}