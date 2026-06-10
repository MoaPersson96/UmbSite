import { ArrowRight } from "lucide-react";
import { RichText } from "../RichText";
import { Link } from "@tanstack/react-router";

interface CTABannerProps {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref?: string;
  color?: "brand" | "ink" | "earth" | "muted";
}

const ctaColors: Record<NonNullable<CTABannerProps["color"]>, string> = {
  brand: "bg-[#864d2be6] text-white",
  ink: "bg-[#000000] text-white",
  earth: "bg-[#ef8600] text-black",
  muted: "bg-[#151515b3] text-white",
};

export function CTABanner({ title, body, ctaLabel, ctaHref = "/tjanster", color = "ink" }: CTABannerProps) {
  const target = ctaHref === "#" ? "/tjanster" : ctaHref;

  console.log(ctaHref);
  
  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 mt-16 md:mt-24">
      <div className="bg-[#f8f8f8] py-16 md:py-24 px-6 text-center flex flex-col items-center">
        <h2 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight text-black max-w-[22ch]">
          {title}
        </h2>
        <RichText 
            html={body}
            className="mt-5 max-w-[60ch] font-sans text-base md:text-lg text-black/75"
         />
        <Link
          to={target}
          className={`mt-10 inline-flex items-center font-sans gap-6 px-9 py-5 font-semibold hover:translate-y-[-2px] transition-transform ${
            ctaColors[color]
          }`}
        >
          <span>{ctaLabel}</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}