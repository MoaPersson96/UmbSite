import { Info } from "lucide-react";

interface InfoBoxProps {
  title: string;
  body: string;
}

export function InfoBox({ title, body }: InfoBoxProps) {
  return (
    <section className="mx-auto max-w-[760px] px-6 md:px-0 mt-12 md:mt-16">
      <div className="bg-[#f5f5f5] p-8 md:p-12 grid gap-6 md:grid-cols-[auto_1fr] md:gap-8 items-start">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black">
          <Info className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-black">
            {title}
          </h3>
          <p className="mt-4 text-base md:text-lg text-gray-900/80 leading-relaxed">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}