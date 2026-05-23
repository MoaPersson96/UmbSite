interface NewsHeroProps {
  image: string;
  label: string;
  title: string;
  intro?: string;
}

export function NewsHero({ image, label, title, intro }: NewsHeroProps) {
  return (
    <section className="relative w-full h-[60vh] min-h-[420px] md:h-[68vh] overflow-hidden">
      <img
        src={image}
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 mx-auto h-full max-w-[1400px] px-6 md:px-10 flex items-center justify-center">
        <div className="max-w-[820px] text-center text-white">
          <div className="text-xs font-bold uppercase tracking-[0.25em] opacity-90 mb-5">
            {label}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 text-base md:text-lg opacity-90 max-w-[640px] mx-auto">{intro}</p>
          )}
        </div>
      </div>
    </section>
  );
}