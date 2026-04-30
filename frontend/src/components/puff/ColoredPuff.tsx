import { ArrowRight } from 'lucide-react';

interface ColoredPuffProps {
    label: string;
    title: string;
    href?: string;
    arrowBackgroundColor?: string;
}

export function ColoredPuff({
  label,
  title,
  href,
  arrowBackgroundColor = "#F3F4F6",
}: ColoredPuffProps) {
  const content = (
    <div className="group relative flex flex-col justify-between min-h-[220px] rounded-sm bg-[#f8f8f8] p-7 text-black transition-transform hover:-translate-y-1">
      
      {/* Label */}
      <div className="text-xs font-bold uppercase tracking-[0.2em] text-black/60 text-center">
        {label}
      </div>

      {/* Bottom row (DETTA är viktigt) */}
      <div className="flex flex-col items-center gap-6 mt-12 text-center">
        <h3 className="text-xl md:text-2xl font-bold leading-tight max-w-[18ch]">
          {title}
        </h3>

        <span
          className="flex h-10 w-10 items-center justify-center rounded-full transition-transform group-hover:rotate-[-45deg]"
          style={{ backgroundColor: arrowBackgroundColor }}
        >
          <ArrowRight className="h-5 w-5 text-black" />
        </span>
      </div>
    </div>
  );

  return href ? <a href={href}>{content}</a> : content;
}