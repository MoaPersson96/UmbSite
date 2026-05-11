import { ArrowRight } from "lucide-react";
import { RichText } from "../RichText";

interface CTABannerProps {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref?: string;
  color?: "brand" | "ink" | "earth" | "muted";
}

const ctaColors: Record<NonNullable<CTABannerProps["color"]>, string> = {
  brand: "bg-[#95682A] text-white",
  ink: "bg-[#000000] text-white",
  earth: "bg-[#ffae00] text-black",
  muted: "bg-[#151515b3] text-white",
};

export function CTABanner({ title, body, ctaLabel, ctaHref = "#", color = "ink" }: CTABannerProps) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 mt-16 md:mt-24">
      <div className="bg-[#f8f8f8] py-16 md:py-24 px-6 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground max-w-[22ch]">
          {title}
        </h2>
        <RichText 
            html={body}
            className="mt-5 max-w-[60ch] text-base md:text-lg text-foreground/75"
         />
        <a
          href={ctaHref}
          className={`mt-10 inline-flex items-center gap-6 px-9 py-5 font-semibold hover:translate-y-[-2px] transition-transform ${
            ctaColors[color]
          }`}
        >
          <span>{ctaLabel}</span>
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}