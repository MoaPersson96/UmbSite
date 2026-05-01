import { ArrowDown } from "lucide-react"

type HeroProps = {
    image: string;
    label: string;
    title: string;
    ctaLabel?: string;
    ctaHref?: string;
}

export function Hero({ image, label, title, ctaLabel = "Läs mer", ctaHref = "#" }: HeroProps) {
    return (
        <section className="relative">
            <div className="relative h-[70vh] min-h-[520px] md:h-[78vh] w-full overflow-hidden">
                <img
                    src={image}
                    alt=""
                    width={1920}
                    height={1080}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

                <div className="absolute inset-0">
                    <div className="mx-auto h-full max-w-[1400px] px-6 md:px-10 flex items-start">
                        <div className="w-full max-w-[560px] mt-[12vh]">
                            <div className="bg-white p-8 md:p-12">
                                {label && (
                                    <div className="text-sm font-bold uppercase tracking-[0.2rem] text-gray-500 mb-5">
                                        {label}
                                    </div>
                                )}
                                <h1 className="text-3xl md:text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground">
                                    {title}
                                </h1>
                            </div>
                            <a
                                href={ctaHref}
                                className="flex items-center justify-between bg-black px-8 py-5 text-white font-bold hover:bg-ink/90 transition-colors"
                            >
                                <span>{ctaLabel}</span>
                                <ArrowDown className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}