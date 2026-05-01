import { ArrowRight } from "lucide-react";

export interface WideImageCard {
  image: string;
  label: string;
  title: string;
  to?: string;
}

export function WideImageCards({ items }: { items: WideImageCard[] }) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 mt-16 md:mt-24">
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="group relative h-[260px] overflow-hidden">
            <img
              src={item.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/35" />

            <div className="absolute inset-0 p-7 flex flex-col justify-center text-white">
              <div className="text-xs font-bold uppercase tracking-[0.2em] opacity-90">
                {item.label}
              </div>

              <h3 className="mt-2 text-2xl md:text-3xl font-extrabold leading-tight max-w-[14ch]">
                {item.title}
              </h3>
            </div>

            <span className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center bg-black text-white transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-5 w-5" />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}