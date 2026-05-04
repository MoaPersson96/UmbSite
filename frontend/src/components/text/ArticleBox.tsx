interface ArticleProps {
  heading: string;
  intro: string;
  sectionTitle: string;
  sectionBody: string;
  subTitle: string;
  bullets: string[];
  numbered: string[];
  quote: string;
}

export function Article({
  heading,
  intro,
  sectionTitle,
  sectionBody,
  subTitle,
  bullets,
  numbered,
  quote,
}: ArticleProps) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 mt-20 md:mt-28">
      <div className="max-w-[760px] mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.05]">
          {heading}
        </h1>
        <p className="mt-8 text-lg text-gray-900/80 leading-relaxed">{intro}</p>

        <h2 className="mt-14 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
          {sectionTitle}
        </h2>
        <p className="mt-5 text-lg text-gray-900/80 leading-relaxed">{sectionBody}</p>

        <h3 className="mt-12 text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          {subTitle}
        </h3>

        <ul className="mt-5 list-disc pl-6 space-y-2 text-lg text-gray-900/80">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        <ol className="mt-6 list-decimal pl-6 space-y-2 text-lg text-gray-900/80">
          {numbered.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ol>

        <blockquote className="mt-10 border-l-4 border-black pl-6 italic text-lg text-gray-900/80">
          {quote}
        </blockquote>
      </div>
    </section>
  );
}