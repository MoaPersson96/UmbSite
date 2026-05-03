import { ArrowRight } from "lucide-react";

export type ImageBlockItem = {
  label: string;
  title: string;
  image: string;
  body?: string;
  href?: string;
};

type Props = {
  items: ImageBlockItem[];
  variant?: "grid" | "blurb";
};

export function ImageBlock({ items, variant = "grid" }: Props) {
  const isGrid = variant === "grid";

  return (
    <section
      className={
        isGrid
          ? "mx-auto max-w-[1400px] px-6 md:px-10 mt-16 md:mt-24"
          : "mx-auto max-w-[760px] px-6 md:px-0 mt-16 md:mt-24"
      }
    >
      <div className={isGrid ? "grid md:grid-cols-3 gap-4" : "relative overflow-hidden min-h-[600px] md:min-h-[700px]"}>
        {items.map((item) => (
          <div
            key={item.title}
            className={
              isGrid
                ? "group relative overflow-hidden h-[460px]"
                : "group relative overflow-hidden max-w-[760px] min-h-[420px] md:min-h-[520px]"
            }
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.title}
              className={
                isGrid
                  ? "absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  : "absolute inset-0 h-full w-full object-cover"
              }
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/45 md:bg-gradient-to-t md:from-black/80 md:via-black/40 md:to-transparent" />

            {/* CONTENT */}
            <div
              className={
                isGrid
                  ? "absolute inset-x-0 bottom-0 p-8 text-center text-white"
                  : "relative z-10 flex flex-col items-center text-center text-white px-8 py-20 md:py-28 min-h-[600px] justify-center"
              }
            >
              {/* LABEL */}
              <div className="text-xs font-bold uppercase tracking-wide">
                {item.label}
              </div>

              {/* TITLE */}
              <h3
                className={
                  isGrid
                    ? "text-xl md:text-2xl font-bold leading-tight max-w-[20ch] mx-auto"
                    : "mt-5 text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.05] max-w-[18ch]"
                }
              >
                {item.title}
              </h3>

              {/* BODY (bara blurb) */}
              {!isGrid && item.body && (
                <p className="mt-5 max-w-[50ch] text-base md:text-lg text-white/90">
                  {item.body}
                </p>
              )}

              {/* CTA ICON */}
              <a
                href={item.href ?? "#"}
                className={
                  isGrid
                    ? "mt-6 mx-auto flex h-12 w-12 items-center justify-center bg-white text-black rounded-full transition-transform duration-300 group-hover:translate-y-[-2px]"
                    : "mt-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#95682A] text-black transition-transform hover:scale-105"
                }
                aria-label={item.title}
              >
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}