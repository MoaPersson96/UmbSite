
const baseUrl = import.meta.env.VITE_UMBRACO_URL;

type UmbracoBlock<T> = {
    content: {
        contentType: string;
        properties: T;
    };
};

type PuffProperties = {
    label?: string;
    title?: string;
    image?: {
        url: string;
        media?: {
            url?: string;
        };
    }[];
    link?: {
        url: string;
    };
    arrowBackgroundColor?: string;
};

export type Home = {
    name: string;
    route?: {
        path: string;
    };
    properties?: {
        hero?: {
            items: UmbracoBlock<HeroProperties>[];
        };
        blocks?: {
            items: UmbracoBlock<PuffProperties>[];
        };
        coloredPuff?: {
            items: UmbracoBlock<ColoredPuffProperties>[];
        };
        header?: {
            items: UmbracoBlock<NavItem>[];
        }
        footer?: {
            items: UmbracoBlock<FooterColumnProperties>[];
        };
    };
};

export async function getHome(): Promise<Home> {
  const res = await fetch(
    "https://localhost:44365/umbraco/delivery/api/v2/content/item?route=/&expand=all"
  );

  return res.json();
}

export type NavItem = {
    label: string;
    url: string;
    isButtonCTA?: boolean;
};

export function mapHeader(data: Home): NavItem[] {
    const blocks = data?.properties?.header?.items || [];

    return blocks.map((block) => {
        const props = block.content?.properties as {
            label?: string;
            url?: string;
            isButtonCTA?: boolean;
        };

        return {
            label: props.label ?? "",
            url: props.url ?? "",
            isButtonCTA: props.isButtonCTA ?? false,
        };
    });
}

export type HeroItem = {
    label: string;
    title: string;
    image: string;
    ctaLabel: string;
    ctaHref?: string;
};

type HeroProperties = {
    label?: string;
    title?: string;
    image?: {
        url: string;
        media?: {
            url: string;
        };
    }[];
    ctaLabel?: string;
    ctaHref?: { url: string }[];
};

export function mapHero(data: Home): HeroItem | null {
    const heroBlock = data?.properties?.hero?.items?.[0];

    if (!heroBlock) return null;

    const props = heroBlock.content.properties;

    const rawImage = 
        props.image?.[0]?.url ||
        props.image?.[0]?.media?.url ||
         "";

    const imageUrl =
        rawImage.startsWith("http")
            ? rawImage
            : `${baseUrl}${rawImage}`;

    console.log("FINAL HERO IMAGE:", imageUrl);        


    return {
        label: props.label ?? "",
        title: props.title ?? "",
        image: imageUrl,
        ctaLabel: props.ctaLabel ?? "",
        ctaHref: props.ctaHref?.[0]?.url ?? "",

    };
}

export type ColorPuff = {
    label: string;
    title: string;
    href?: string;
    arrowBackgroundColor?: string;
};

type ColoredPuffProperties = {
    label?: string;
    title?: string;
    link?: {
        url: string;
    }
    arrowBackgroundColor?: string;
};

export function mapColorPuff(data: Home): ColorPuff[] {
    const blocks = data?.properties?.coloredPuff?.items || [];

    console.log("🔥 COLORED PUFF RAW:", blocks);

    const filtered = blocks.filter(
        (block: UmbracoBlock<ColoredPuffProperties>) => block.content?.contentType === "coloredPuffs"
    );

    console.log("🔥 FILTERED:", filtered);

    const mapped = filtered.map((block: UmbracoBlock<ColoredPuffProperties>) => {
        const props = block.content.properties as ColoredPuffProperties;

        return {
            label: props.label ?? "",
            title: props.title ?? "",
            href: props.link?.url ?? "",
            arrowBackgroundColor: props.arrowBackgroundColor ?? "#F3F4F6",
        };
    });

    console.log("🔥 FINAL MAPPED:", mapped);

    return mapped;
}


export type PuffItem = {
    label: string;
    title: string;
    image: string;
    href: string;
};

export function mapPuffs(data: Home): PuffItem[] {
    const blocks = data?.properties?.blocks?.items || [];

    return blocks
        .filter((block) => block.content?.contentType === "puff")
        .map((block) => {
            const props = block.content.properties;

            console.log("IMAGE OBJECT:", props.image?.[0]);

            const rawImage = 
                props.image?.[0]?.url ||
                props.image?.[0]?.media?.url ||
                "";

            const imageUrl = rawImage
                ? `${baseUrl}${rawImage}`
                : "";

            console.log("FINAL IMAGE URL:", imageUrl);

            return {
                label: props.label ?? "",
                title: props.title ?? "",
                image: imageUrl,
                href: props.link?.url ?? "#",
            };
        });
}

type FooterColumnProperties = {
    heading?: string;
    content?: string;
};

export type FooterColumn = {
    heading: string;
    content: {
        markup: string;
    };
};

export function mapFooter(data: Home): FooterColumn[] {
    const blocks = data?.properties?.footer?.items || [];

    console.log("FOOTER BLOCKS:", blocks);

    return blocks.map((block) => {
        const props = block.content?.properties as {
            heading?: string;
            content?: {
                markup?: string;
            };
        };

        return {
            heading: props.heading ?? "",
            content: {
                markup: props.content?.markup ?? ""
            }
        };
    });
}