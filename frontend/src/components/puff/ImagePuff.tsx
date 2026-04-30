import { ArrowRight } from "lucide-react";

// Moa
interface ImagePuffProps {
  label: string;
  title: string;
  image: string;
  href?: string;
}

export function ImagePuff({ label, image, title, href = "#" }: ImagePuffProps) {
  return (
    <section className="mx-auto max-w-[760px] px-6 md:px-0 mt-16 md:mt-24">
      <div className="relative overflow-hidden group">
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex flex-col items-center text-center text-white px-8 py-20 md:py-28">
          <div className="text-xs font-bold uppercase tracking-[0.25em]">
            {label}
          </div>

          <h3 className="mt-5 text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.05] max-w-[18ch]">
            {title}
          </h3>

          <a
            href={href}
            aria-label={title}
            className="
              mt-10
              relative
              flex h-16 w-16 items-center justify-center
              transition-transform duration-700
              hover:scale-110
              group
            "
          >
            {/* outer ring */}
            <span
              className="
                absolute inset-0
                rounded-full
                bg-white
                shadow-lg
                transition-transform duration-700
                group-hover:opacity-100
              "
              aria-hidden="true"
            />

            <ArrowRight className="h-6 w-6 relative z-10" stroke="black" />
          </a>
        </div>
      </div>
    </section>
  );
}