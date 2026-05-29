import { ArrowRight } from "lucide-react";

interface TextBlockProps {
  label?: string;
  heading: string;
  body: string;
  linkLabel?: string;
  linkHref?: string;
}

export function TextBlock({ label, heading, body, linkLabel, linkHref = "#" }: TextBlockProps) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 mt-24 md:mt-32 grid gap-10 md:grid-cols-12">
      <div className="md:col-span-4">
        {label && (
          <div className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-black/60 mb-4">
            {label}
          </div>
        )}
        <h2 className="font-sans text-3xl md:text-4xl font-black tracking-tight text-black leading-[1.1]">
          {heading}
        </h2>
      </div>
      <div className="md:col-span-7 md:col-start-6 flex flex-col">
        <p className="font-sans text-lg leading-relaxed text-black/80">{body}</p>
        {linkLabel && (
          <a
            href={linkHref}
            className="mt-8 inline-flex items-center gap-2 self-start font-sans font-bold text-black border-b-2 border-black pb-1 hover:gap-4 transition-all"
          >
            {linkLabel}
            <ArrowRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </section>
  );
}