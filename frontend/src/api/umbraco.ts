import { normalizeColor } from '../components/utils/colors';
const baseUrl = import.meta.env.VITE_UMBRACO_URL;

import type { NewsPost } from '../data/newsdata';
import type { ArticleBlock } from '../components/text/ArticleBody';


function toString(value: unknown): string {
    if (!value) return "";
    if (Array.isArray(value)) return String(value[0] ?? "");
    return String(value);
}

function toLower(value: unknown): string {
    return toString(value).toLowerCase();
}

function extractMarkup(body: unknown): string {
    if (!body) return "";

    if (typeof body === "object" && body !== null) {
        const b = body as {
            markup?: unknown;
        };

        // Hanterar Umbraco (markup -> markup)
        if (typeof b.markup === "object" && b.markup !== null) {
            const inner = b.markup as { markup?: unknown };
            return String(inner.markup ?? "");
        }

        return String(b.markup ?? "");
    }

    return String(body);
}

function getImageUrl(raw?: string) {
  if (!raw) return "";

  return raw.startsWith("http")
    ? raw
    : `${baseUrl}${raw}`;
}

/* =========================
   GENERIC UMBRACO BLOCK
========================= */

type UmbracoBlock<T> = {
    content: {
        id: string;
        contentType: string;
        properties: T;
    };
};

/* =========================
   BLOCK TYPE UNION
========================= */

export type BlockType =
  | "heroBlock"
  | "coloredPuffBlock"
  | "imagePuffBlock"
  | "textImage"
  | "wideImageCard"
  | "contactSection"
  | "errorRaportBanner";

/* =========================
   BLOCK WRAPPER TYPE
========================= */

type Block<T> = {
    id: string;
    type: BlockType;
    props: T;
};

type PillarColor = "brand" | "ink" | "earth" | "muted";

type PillarItem = {
    title: string;
    href: string;
    color: PillarColor;
};

/* =========================
   BLOCK TYPES
========================= */

export type HeroBlock = Block<HeroProperties>;
export type ColoredPuffBlock = Block<ColoredPuffProperties>;


export type PageBlock =
  | {
      id: string;
      type: "heroBlock";
      props: HeroItem;
    }
  | {
      id: string;
      type: "coloredPuffBlock";
      props: ColorPuff;
    }
  | {
      id: string;
      type: "imageBlock";
      props: ImageBlockItem;
    }
  | {
      id: string;
      type: "textImage";
      props: TextImageItem;
    }
  | {
      id: string;
      type: "wideImageCard";
      props: WideImageCardItem;
    }
  | {
      id: string;
      type: "ctaBannerBlock";
      props: CTABannerItem;
    }
  | {
      id: string;
      type: "articleBlock";
      props: ArticleBlockItem;
    }
  | {
      id: string;
      type: "infoBoxBlock";
      props: InfoBoxItem;
    }
  | {
      id: string;
      type: "pillarBarsBlock";
      props: {
        items: PillarItem[];
      };
    }
  | {
      id: string;
      type: "articleBody";
      props: {
        blocks: ArticleBlock[];
      };
    }
  | {
      id: string;
      type: "newsHeroBlock";
      props: {
        image: string;
        label: string;
        title: string;
        intro: string;
      };
    }
  | {
      id: string;
      type: "infoCardsBlock";
      props: InfoCardsItem;
    }
  | {
      id: string;
      type: "cardGridBlock";
      props: DarkCard;
    }
  | {
      id: string;
      type: "contactSection";
      props: ContactFormItem;
    }
  | {
      id: string;
      type: "errorReportBanner";
      props: ErrorReportBannerItem;
    }
  | {
      id: string;
      type: "servicesBlock";
      props: {
        items: PageBlock[];
      };
    }
  | {
      id: string;
      type: "contactBlock";
      props: {
        items: PageBlock[];
      };
    }

/* =========================
   HOME MODEL
========================= */

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
            items: UmbracoBlock<unknown>[];
        };
        coloredPuff?: {
            items: UmbracoBlock<ColoredPuffProperties>[];
        };
        servicesBlocks?: {
            items: UmbracoBlock<unknown>[];
        };
        contactBlocks?: {
            items: UmbracoBlock<unknown>[];
        };
        header?: {
            items: UmbracoBlock<NavItem>[];
        };
        footer?: {
            items: UmbracoBlock<FooterColumnProperties>[];
        };
    };
};

/* =========================
   SITE SETTINGS
========================= */

export type SiteSettings = {
    properties: {
        header?: {
            items: UmbracoBlock<UmbracoNavItem>[];
        };
        footer?: {
            items: UmbracoBlock<FooterColumnProperties>[];
        };
    };
};

/* =========================
   FETCH
========================= */

export async function getHome(): Promise<Home> {
    const res = await fetch(
        "https://localhost:44365/umbraco/delivery/api/v2/content/item?route=/&expand=all&expand=media"
    );

    return res.json();
}

export async function getSiteSettings(): Promise<SiteSettings> {
    const res = await fetch(
        "https://localhost:44365/umbraco/delivery/api/v2/content/item/45649c70-4883-4edc-b3f7-00be849e5365"
    );

    return res.json();
}

export async function getContactPage() {
  const res = await fetch("DIN_ENDPOINT");
  return res.json();
}

/* =========================
   NEWS POST PAGE
========================= */

export async function getNewsPostBySlug(slug: string) {
  console.log("🔥 SEARCHING FOR SLUG:", slug);

  // hämta nyhetssidan (containern)
  const res = await fetch(
    "https://localhost:44365/umbraco/delivery/api/v2/content/item/7cae9e60-bf7a-4c64-91a0-647537de7218?expand=all"
  );

  const data: UmbracoNewsPage = await res.json();
  console.log("RAW NEWS DATA", data);
  console.log("BLOCKS", data?.properties?.blocks?.items);
  const mapped = mapNewsPage(data);
  console.log(data);


  console.log(
    "ALL NEWS:",
    mapped.news.map((n) => ({
      title: n.title,
      slug: n.slug,
    }))
  );

  const post = mapped.news.find(
    (item) => item.slug === slug
  );

  console.log("FOUND POST:", post);

  if (!post) {
    return null;
  }

  return {
    post,
    others: mapped.news.filter((x) => x.slug !== slug).slice(0, 3),
  };
}

/* =========================
   NAV
========================= */

export type NavItem = {
    label: string;
    url: string;
    isButtonCTA?: boolean;
    color?: "brand" | "ink" | "earth" | "muted";
};

type UmbracoNavItem = {
  label?: string;
  url?: Array<{
    route?: {
      path?: string;
    };
  }>;
  isButtonCta?: boolean;
  color?: string | string[];
};

export function mapHeader(data: SiteSettings): NavItem[] {
  const blocks = data?.properties?.header?.items || [];

  return blocks.map((block) => {
    const props = block.content?.properties as UmbracoNavItem

    console.log("UMBRACO NAV ITEM RAW:", props);
    console.log("LINK OBJECT:", props.url);

    const rawColor = Array.isArray(props.color)
      ? props.color[0]
      : props.color;

    const firstUrl = props.url?.[0];

    const path =
      firstUrl?.route?.path ??
      "/";

    return {
      label: props.label ?? "",
      url: path.replace(/\/$/, ""), // tar bort trailing slash
      isButtonCTA: props.isButtonCta ?? false,
      color: normalizeColor(rawColor),
    };
  });
}


/* =========================
   BLOCK MAPPING
========================= */

export function mapBlocks(data: Home): PageBlock[] {

    console.log("🔥 SERVICES RAW:", data?.properties?.servicesBlocks);
    console.log("🔥 SERVICES ITEMS:", data?.properties?.servicesBlocks?.items);
    console.log("🔥 NORMAL BLOCKS:", data?.properties?.blocks?.items);

    const blocks =
        data?.properties?.contactBlocks?.items ??
        data?.properties?.servicesBlocks?.items ??
        data?.properties?.blocks?.items ??
        [];

    return blocks.flatMap((block): PageBlock[] => {
        console.log("🔥 PILLAR RAW BLOCK:", block.content);
        console.log("🔥 PILLAR TYPE:", block.content.contentType);

        const type = block.content.contentType;

        console.log("👉 BLOCK TYPE IN MAP:", type);

        switch (type) {
            case "heroBlock": {
                const props = block.content.properties as HeroProperties;

                const rawImage =
                    props.image?.[0]?.url ||
                    props.image?.[0]?.media?.url ||
                    "";

                const imageUrl = rawImage
                    ? rawImage.startsWith("http")
                        ? rawImage
                        : `${baseUrl}${rawImage}`
                    : "";

                console.log("🔥 HERO RAW IMAGE:", rawImage);
                console.log("🔥 HERO FINAL IMAGE URL:", imageUrl);

                return [{
                    id: block.content.id,
                    type: "heroBlock",
                    props: {
                        label: props.label ?? "",
                        title: props.title ?? "",
                        image: imageUrl,
                        ctaLabel: props.ctaLabel ?? "",
                        ctaHref: props.ctaHref?.[0]?.url ?? "",
                    },
                }];
            }

            case "coloredPuffBlock": {
                const props = block.content.properties as ColoredPuffProperties;

                return [{
                    id: block.content.id,
                    type: "coloredPuffBlock",
                    props: {
                        label: props.label ?? "",
                        title: props.title ?? "",
                        href: props.link?.url ?? "",
                        color: normalizeColor(props.color),
                    },
                }];
            }

            case "textImage": {
                const props = block.content.properties as TextImageProperties;

                const rawImage =
                    props.image?.[0]?.url ||
                    props.image?.[0]?.media?.url ||
                    "";

                const imageUrl = rawImage
                    ? rawImage.startsWith("http")
                        ? rawImage
                        : `${baseUrl}${rawImage}`
                    : "";

                const side = Array.isArray(props.imageSide)
                    ? toLower(props.imageSide[0])
                    : toLower(props.imageSide);

                return [{
                    id: block.content.id,
                    type: "textImage",
                    props: {
                        label: props.label ?? "",
                        title: props.title ?? "",
                        body: {
                            markup: extractMarkup(props.body),
                        },
                        image: imageUrl,
                        imageSide: side === "right" ? "right" : "left",
                        ctas:
                            props.cta?.items?.map((cta: UmbracoCTAItem) => {
                                const rawColor = Array.isArray(cta.content.properties.color)
                                    ? cta.content.properties.color[0]
                                    : cta.content.properties.color;

                                return {
                                    label: cta.content.properties.label ?? "",
                                    href: cta.content.properties.link?.url ?? "#",
                                    color: normalizeColor(rawColor),
                                };
                            }) ?? [],
                    },
                }];
            }

            case "imagePuffBlock": {
                const props = block.content.properties as {
                    label?: string;
                    title?: string;
                    image?: { url: string; media?: { url?: string } }[];
                    link?: { url: string };
                    body?: string;
                };

                const rawImage =
                    props.image?.[0]?.url ||
                    props.image?.[0]?.media?.url ||
                    "";

                const imageUrl = rawImage
                    ? rawImage.startsWith("http")
                        ? rawImage
                        : `${baseUrl}${rawImage}`
                    : "";

                return [{
                    id: block.content.id,
                    type: "imageBlock",
                    props: {
                        label: props.label ?? "",
                        title: props.title ?? "",
                        image: imageUrl,
                        href: props.link?.url ?? "#",
                        body: extractMarkup(props.body),
                    },
                }];
            }

            case "wideImageCard": {
                const props = block.content.properties as WideImageCardProperties;

                const rawImage =
                    props.image?.[0]?.url ||
                    props.image?.[0]?.media?.url ||
                    "";

                const imageUrl = rawImage
                    ? rawImage.startsWith("http")
                        ? rawImage
                        : `${baseUrl}${rawImage}`
                    : "";

                return [{
                    id: block.content.id,
                    type: "wideImageCard",
                    props: {
                        image: imageUrl,
                        label: props.label ?? "",
                        title: props.title ?? "",
                    },
                }];
            }

            case "ctaBannerBlock": {
                const props = block.content.properties as CTABannerProperties;

                return [{
                    id: block.content.id,
                    type: "ctaBannerBlock",
                    props: {
                        title: props.title ?? "",
                        body: extractMarkup(props.body),
                        ctaLabel: props.ctaLabel ?? "",
                        ctaHref: props.ctaHref?.url ?? "#",
                        color: normalizeColor(props.bigCtaColor),
                    },
                }];
            }

            case "articleBlock": {
                const p = block.content.properties as {
                    heading?: string;
                    intro?: string;
                    sectionTitle?: string;
                    sectionBody?: string;
                    subTitle?: string;
                    bullets?: string[];
                    numbered?: string[];
                    quote?: string;
                };

                return [{
                    id: block.content.id,
                    type: "articleBlock",
                    props: {
                        heading: p.heading ?? "",
                        intro: extractMarkup(p.intro),
                        sectionTitle: p.sectionTitle ?? "",
                        sectionBody: extractMarkup(p.sectionBody),
                        subTitle: p.subTitle ?? "",
                        bullets: p.bullets ?? [],
                        numbered: p.numbered ?? [],
                        quote: extractMarkup(p.quote),
                    },
                }];
            }

            case "infoBoxBlock": {
                const props = block.content.properties as {
                    title?: string;
                    body?: string;
                };

                return [{
                    id: block.content.id,
                    type: "infoBoxBlock",
                    props: {
                        title: props.title ?? "",
                        body: props.body ?? "",
                    },
                }];
            }

            case "pillarBarsBlock": {
                const props = block.content.properties as {
                    items?: {
                        items?: UmbracoPillarItem[];
                    };
                };
                console.log("🔥 RAW PILLAR ITEMS:", props.items);

                const rawItems = props.items?.items ?? [];

                const items: PillarItem[] = rawItems.map((item) => {
                    const p = item.content.properties;

                        const rawColor = Array.isArray(p.color)
                            ? p.color[0]
                            : p.color;

                        const color =
                            rawColor === "brand" ||
                            rawColor === "ink" ||
                            rawColor === "earth" ||
                            rawColor === "muted"
                                ? rawColor
                                : "brand";

                        const rawLink = Array.isArray(p.link)
                            ? p.link[0]
                            : p.link;

                        return {
                            title: p.title ?? "",
                            href: 
                                rawLink?.route?.path ??
                                rawLink?.url ?? "#",
                            color,
                        };
                    });

                console.log("🟣 FINAL ITEMS:", items);

                return [
                    {
                        id: block.content.id,
                        type: "pillarBarsBlock",
                        props: { items },
                    },
                ];
            }

            case "articleBody": {
                const p = block.content.properties as {
                    content?: ArticleBlock[];
                };

                const blocks = p.content ?? [];

                return [
                    {
                        id: block.content.id,
                        type: "articleBody",
                        props: {
                            blocks: blocks,
                        },
                    },
                ];
            }

            case "newsHeroBlock": {
                const props = block.content.properties as {
                    image?: { url?: string; media?: { url?: string } }[];
                    label?: string;
                    title?: string;
                    intro?: string;
                };

                const rawImage =
                    props.image?.[0]?.url ||
                    props.image?.[0]?.media?.url ||
                    "";

                const imageUrl = rawImage
                    ? rawImage.startsWith("http")
                        ? rawImage
                        : `${baseUrl}${rawImage}`
                    : "";

                return [
                    {
                        id: block.content.id,
                        type: "newsHeroBlock",
                        props: {
                            image: imageUrl,
                            label: props.label ?? "",
                            title: props.title ?? "",
                            intro: props.intro ?? "",
                        },
                    },
                ];
            }

            case "contactCard": {
                const p = block.content.properties as {
                    icon?: string;
                    title?: string;
                    value?: string;
                    extra?: string;
                    link?: {
                        url?: string;
                    };
                };

                const icon =
                    p.icon === "phone" ||
                    p.icon === "mail" ||
                    p.icon === "map-pin"
                        ? p.icon
                        : "phone";

                return [
                    {
                        id: block.content.id,
                        type: "infoCardsBlock",
                        props: {
                            items: [
                                {
                                    icon,
                                    title: p.title ?? "",
                                    value: p.value ?? "",
                                    extra: p.extra ?? "",
                                    href: p.link?.url ?? "#",
                                },
                            ],
                        },
                    },
                ];
            }

            case "cardGrid": {
                const p = block.content.properties as {
                    items?: {
                        items?: Array<{
                            content: {
                                id: string;
                                properties: {
                                    label?: string;
                                    title?: string;
                                    link?: {
                                        url?: string;
                                    };
                                };
                            };
                        }>;
                    };
                };

                const cards = p.items?.items ?? [];

                return cards.map((card) => ({
                    id: card.content.id,
                    type: "cardGridBlock" as const,
                    props: {
                        label: card.content.properties.label ?? "",
                        title: card.content.properties.title ?? "",
                        to: card.content.properties.link?.url ?? "#",
                    },
                }));
            }

            case "contactSection": {
                const props = block.content.properties as ContactFormProperties;

                return [
                    {
                        id: block.content.id,
                        type: "contactSection",
                        props: {
                            label: props.label ?? "",
                            heading: props.heading ?? "",
                            body: extractMarkup(props.body),
                            buttonLabel: props.buttonLabel ?? "Skicka",
                        },
                    },
                ];
            }

            case "errorReportBanner": {
                const props =
                    block.content.properties as ErrorReportBannerProperties;

                return [
                    {
                        id: block.content.id,
                        type: "errorReportBanner",
                        props: {
                            label: props.label ?? "",
                            title: props.title ?? "",
                            description: extractMarkup(props.description),
                            ctaLabel: props.ctaLabel ?? "",
                            href: props.href?.[0]?.url ?? "#",
                        },
                    },
                ];
            }

            default:
                return [];
        }
    });
}

/* =========================
   HERO
========================= */

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

export function mapHeroBlock(props: HeroProperties): HeroItem {

    const rawImage =
        props.image?.[0]?.url ||
        props.image?.[0]?.media?.url ||
        "";

    const imageUrl =
        rawImage.startsWith("http")
            ? rawImage
            : `${baseUrl}${rawImage}`;

    return {
        label: props.label ?? "",
        title: props.title ?? "",
        image: imageUrl,
        ctaLabel: props.ctaLabel ?? "",
        ctaHref: props.ctaHref?.[0]?.url ?? "",
    };
}

/* =========================
   COLOR PUFF
========================= */

export type ColorPuff = {
    label: string;
    title: string;
    href?: string;
    color?: "brand" | "ink" | "earth" | "muted";
};

export type ColoredPuffProperties = {
    label?: string;
    title?: string;
    link?: {
        url: string;
    };
    color?: string;
};

export function mapColorPuff(data: Home): ColorPuff[] {
    const blocks = data?.properties?.coloredPuff?.items || [];

    return blocks
        .filter((block) => block.content?.contentType === "coloredPuffs")
        .map((block) => {
            const props = block.content.properties as ColoredPuffProperties;


            return {
                label: props.label ?? "",
                title: props.title ?? "",
                href: props.link?.url ?? "",
                color: normalizeColor(props.color),
            };
        });
}

/* =========================
   TEXT IMAGE
========================= */

export type TextImageCTA = {
    label: string;
    href?: string;
    color?: "brand" | "ink" | "earth" | "muted";
};

type UmbracoCTAItem = {
    content: {
        contentType: string;
        properties: {
            label?: string;
            link?: {
                url: string;
            };
            color?: string[];
        };
    };
};

export type TextImageItem = {
    label: string;
    title: string;
    body: {
        markup: string;
    };
    image: string;
    imageSide: "left" | "right";
    ctas: TextImageCTA[];
};

type TextImageProperties = {
    label?: string;
    title?: string;
    body?: string;
    image?: {
        url: string;
        media?: {
            url?: string;
        };
    }[];
    imageSide?: "left" | "right"
    cta?: {
        items?: UmbracoCTAItem[];
    };
};



/* =========================
   IMAGE PUFFS
========================= */

export type ImageBlockItem = {
  label: string;
  title: string;
  image: string;
  body?: string;
  href?: string;
};

/* =========================
   WIDE PUFF
========================= */

export type WideImageCardItem = {
    label: string;
    title: string;
    image: string;
};

export type WideImageCardProperties = {
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
};

/* =========================
   INFO CARDS
========================= */

export type InfoCardItem = {
    icon: "phone" | "mail" | "map-pin";
    title: string;
    value: string;
    extra?: string;
    href?: string;
};

export type InfoCardsItem = {
    items: InfoCardItem[];
};

/* =========================
   DARK CARDS
========================= */

export type DarkCard = {
    label: string;
    title: string;
    to?: string;
};

/* =========================
   CONTACT FORM
========================= */

export type ContactFormItem = {
    label: string;
    heading: string;
    body: string;
    buttonLabel: string;
};

type ContactFormProperties = {
    label?: string;
    heading?: string;
    body?: string;
    buttonLabel?: string;
};


/* =========================
   BIG CTA
========================= */

export type CTABannerItem = {
    title: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
    color?: "brand" | "ink" | "earth" | "muted",
};

export type CTABannerProperties = {
    title?: string;
    body?: string;
    ctaLabel?: string;
    ctaHref?: {
        url: string;
    };
    bigCtaColor?: string[];
};

type UmbracoNewsPage = {
  properties?: {
    blocks?: {
      items?: UmbracoBlock<unknown>[];
    };
  };
};

type NewsHeroProperties = {
    image?: { url?: string }[];
    label?: string;
    title?: string;
    intro?: string;
};

type UmbracoArticleBodyItem = {
    content: {
        contentType: string;
        properties: {
            text?: string;
            headingText?: string;
            levelTag?: string;
            ordered?: boolean;
            items?: string[];
        };
    };
    settings?: unknown;
};

type NewsPostProperties = {
    slug?: string;
    title: string;
    excerpt?: string;
    date?: string;
    image?: { url?: string }[];
    body?: {
        items?: UmbracoArticleBodyItem[];
    };
};

export function mapNewsPage(data: UmbracoNewsPage): {
    hero: {
        image: string;
        label: string;
        title: string;
        intro: string;
    } | null;
    news: NewsPost[];
} {
    const blocks = data?.properties?.blocks?.items ?? [];

    const heroBlock = blocks.find(
        (b) => b.content.contentType === "newsHero"
    );

    const postBlocks = blocks.filter(
        (b) => b.content.contentType === "newsPost"
    );

    const heroProps =
        heroBlock?.content.properties as NewsHeroProperties | undefined;

    return {
        hero: heroProps
            ? {
                  image: getImageUrl(heroProps.image?.[0]?.url),
                  label: heroProps.label ?? "",
                  title: heroProps.title ?? "",
                  intro: heroProps.intro ?? "",
              }
            : null,

        news: postBlocks.map((post): NewsPost => {
            const p =
                post.content.properties as NewsPostProperties;
                console.log("FULL POST:", p);
                console.log("BODY RAW:", p.body);
                console.log("BODY ITEMS:", p.body?.items);

                console.log("NEWS POST RAW:", p);
                console.log("SLUG VALUE:", p.slug);

            const body: ArticleBlock[] =
                (p.body?.items ?? []).map((item): ArticleBlock => {
                    const type = item.content.contentType;
                    const props = item.content.properties;

                    switch (type) {
                        case "paragraphBlock":
                            return {
                                type: "p",
                                text: props.text ?? "",
                            };

                        case "headingBlock":
                            return {
                                type:
                                    props.levelTag === "H3"
                                        ? "h3"
                                        : "h2",
                                text: props.headingText ?? "",
                            };

                        case "listBlock":
                            return {
                                type: props.ordered ? "ol" : "ul",
                                items: props.items ?? [],
                            };

                        case "quoteBlock":
                            return {
                                type: "quote",
                                text: props.text ?? "",
                            };

                        default:
                            return {
                                type: "p",
                                text: "",
                    };
            }
        });

            return {
                slug: (p.slug ?? "").trim(),
                title: p.title ?? "",
                excerpt: p.excerpt ?? "",
                date: p.date ?? "",
                image: getImageUrl(p.image?.[0]?.url),
                body,
            };
        }),
    };
}

/* =========================
   ARTICLEBOX
========================= */

export type ArticleBlockItem = {
  heading: string;
  intro: string;
  sectionTitle: string;
  sectionBody: string;
  subTitle: string;
  bullets: string[];
  numbered: string[];
  quote: string;
};


/* =========================
   INFO BOX
========================= */

export type InfoBoxItem = {
  title: string;
  body: string;
};

/* =========================
   PILLAR BARS
========================= */

type UmbracoPillarItem = {
  content: {
    properties: {
      title?: string;
      link?: { url?: string };
      color?: string | string[];
    };
  };
};

/* =========================
   ERROR REPORT BANNER
========================= */

export type ErrorReportBannerItem = {
    label: string;
    title: string;
    description: string;
    ctaLabel: string;
    href: string;
};

type ErrorReportBannerProperties = {
    label?: string;
    title?: string;
    description?: string;
    ctaLabel?: string;
    href?: {
        url?: string;
    }[];
};


/* =========================
   FOOTER
========================= */

export type FooterColumn = {
    heading: string;
    content: {
        markup: string;
    };
};

export type FooterColumnProperties = {
    heading?: string;
    content?: {
        markup?: string;
    };
};

export function mapFooter(data: SiteSettings): FooterColumn[] {
    const blocks = data?.properties?.footer?.items || [];

    return blocks.map((block) => {
        const props = block.content?.properties as FooterColumnProperties;

        return {
            heading: props.heading ?? "",
            content: {
                markup: props.content?.markup ?? ""
            }
        };
    });
}