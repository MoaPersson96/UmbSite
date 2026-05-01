import { ArrowRight } from "lucide-react";

export interface ImagePuffProps {
  label: string;
  title: string;
  image: string;
  href?: string;
}

type Props = {
  items: ImagePuffProps[];
};

export function ImagePuff({ items }: Props) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 mt-16 md:mt-24">
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="group relative overflow-hidden h-[460px]"
          >
            <img
              src={item.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-8 text-center text-white">
              <div className="text-sm font-medium mb-2 opacity-90">
                {item.label}
              </div>

              <h3 className="text-xl md:text-2xl font-bold leading-tight max-w-[20ch] mx-auto">
                {item.title}
              </h3>

              <span className="mt-6 mx-auto flex h-12 w-12 items-center justify-center bg-white text-black rounded-full transition-transform duration-300 group-hover:translate-y-[-2px]">
                <ArrowRight className="h-5 w-5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}