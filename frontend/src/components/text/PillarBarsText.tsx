import { ArrowRight } from "lucide-react";

type ColorVariant = "brand" | "ink" | "earth" | "muted";

export interface PillarItem {
  title: string;
  href?: string;
  color?: ColorVariant;
}

const colorStyles: Record<ColorVariant, string> = {
  brand: "bg-[#95682A] text-white hover:bg-[#7d5523]",
  ink: "bg-[#000000] text-white hover:bg-[#000000]",
  earth: "bg-[#ffae00] text-black hover:bg-[#e69c00]",
  muted: "bg-[#151515b3] text-white hover:bg-[#151515]",
};

interface PillarBarsProps {
  items: PillarItem[];
}

export function PillarBars({ items }: PillarBarsProps) {
  console.log("PILLAR ITEMS:", items);
  return (
    <section className="mx-auto max-w-[760px] px-6 md:px-0 mt-12 md:mt-16">
      <ul className="flex flex-col gap-3">
        {items.map((item) => {
          const variant: ColorVariant = item.color ?? "earth";

          return (
            <li key={item.title}>
              <a
                href={item.href ?? "#"}
                className={`group flex items-center justify-between px-8 py-6 transition-colors ${colorStyles[variant]}`}
              >
                <span className="font-bold text-base md:text-lg">
                  {item.title}
                </span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}