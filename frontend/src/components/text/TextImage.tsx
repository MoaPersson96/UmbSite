import { ArrowRight } from "lucide-react";
import type { AllowedColor } from "../utils/colors";
import { isAllowedColor } from "../utils/colors";

export type TextImageCTA = {
  label: string;
  href?: string;
  color?: "brand" | "ink" | "earth" | "muted";
};

interface TextImageProps {
  image: string;
  imageSide?: "left" | "right";
  label: string;
  title: string;
  body: {
    markup: string;
  };
  ctas?: TextImageCTA[];
}


const ctaColor: Record<AllowedColor, string> = {
  brand: "bg-[#95682A] text-white",
  ink: "bg-[#000000] text-white",
  earth: "bg-[#ffae00] text-black",
  muted: "bg-[#151515b3] text-white",
};

export function TextImage({
  image,
  imageSide = "left",
  label,
  title,
  body,
  ctas = [],
}: TextImageProps) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 mt-20 md:mt-28">
      <div
        className={`grid gap-10 md:grid-cols-2 items-center ${
          imageSide === "right" ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="aspect-[4/5] md:aspect-[5/6] overflow-hidden">
          <img src={image} alt="" className="h-full w-full object-cover" />
        </div>

        <div className={`max-w-[520px] ${imageSide === "left" ? "md:pl-6" : "md:pr-6"}`}>
          <div className="text-sm font-bold text-black mb-3">
            {label}
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-black leading-[1.1]">
            {title}
          </h2>

          <div
            className="mt-5 text-base md:text-lg text-gray-500 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: body.markup }}
          />

          {ctas.length > 0 && (
            <div className="mt-8 flex flex-col gap-3">
              {ctas.map((cta) => {
                const color: AllowedColor = isAllowedColor(cta.color)
                  ? cta.color
                  : "ink";

                return (
                  <a
                    key={cta.label}
                    href={cta.href ?? "#"}
                    className={`group flex items-center justify-between px-7 py-5 font-semibold transition-transform hover:translate-x-1 ${
                      ctaColor[color]
                    }`}
                  >
                    <span>{cta.label}</span>
                    <ArrowRight className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}