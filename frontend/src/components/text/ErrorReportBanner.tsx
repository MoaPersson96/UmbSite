import { ArrowRight } from "lucide-react";

type ErrorReportBannerProps = {
  label?: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
};

export default function ErrorReportBanner({
  label = "",
  title,
  description,
  ctaLabel,
  href,
}: ErrorReportBannerProps) {
  return (
    <section className="mx-auto mt-24 grid max-w-[1400px] gap-10 px-6 md:mt-32 md:grid-cols-12 md:px-10">
        {/* Left side */}
        <div className="md:col-span-4">
            {label && (
                <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-neutral-700">
                    {label}
                </div>
            )}

            <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.02em] text-black md:text-5xl">
                {title}
            </h2>
        </div>

        {/* Right side */}
        <div className="flex flex-col md:col-span-7 md:col-start-6">
            <p className="text-lg leading-relaxed text-black/80">
                {description}
            </p>

            <a
                href={href}
                className="mt-8 inline-flex items-center gap-2 self-start border-b-2 border-black pb-1 font-bold transition-all hover:gap-4"
            >
                <span>{ctaLabel}</span>

                <ArrowRight size={18} />
            </a>
        </div>
    </section>
  );
}