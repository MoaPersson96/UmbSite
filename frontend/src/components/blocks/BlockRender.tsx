import type { PageBlock } from "../../api/umbraco";
import { Hero } from "../hero/Hero";
import { Article } from "../text/ArticleBox";
import { InfoBox } from "../text/InfoBox";
import { PillarBars } from "../text/PillarBarsText";
import { ImageBlock } from "../puff/ImageBlock";
import { ColoredPuff } from "../puff/ColoredPuff";
import { WideImageCards } from "../puff/CornerPuff";
import { TextImage } from "../text/TextImage";
import { CTABanner } from "../cta/BigCta";
import { InfoCards } from "../puff/InfoPuff";
import { CardGrid } from "../puff/DarkPuff";
import { ContactSection } from "../text/ContactForm";
import ErrorReportBanner from "../text/ErrorReportBanner";


type Props = {
  blocks: PageBlock[];
};

export function BlockRenderer({ blocks }: Props) {
  const imageBlocks = blocks.filter(
  (b) => b.type === "imageBlock"
);

const wideImageBlocks = blocks.filter(
  (b) => b.type === "wideImageCard"
);

  return (
    <>
      {blocks.map((block) => {
        // använd stabil key från Umbraco
        const key = block.id;

        switch (block.type) {
          case "heroBlock":
            return (
              <Hero
                key={key}
                {...block.props}
              />
            );

          case "articleBlock":
            return (
              <Article
                key={key}
                heading={block.props.heading}
                intro={block.props.intro}
                sectionTitle={block.props.sectionTitle}
                sectionBody={block.props.sectionBody}
                subTitle={block.props.subTitle}
                bullets={block.props.bullets}
                numbered={block.props.numbered}
                quote={block.props.quote}
              />
            );

          case "infoBoxBlock":
            return (
              <InfoBox
                key={key}
                title={block.props.title}
                body={block.props.body}
              />
            );

          case "pillarBarsBlock":
            return (
              <PillarBars
                key={key}
                items={block.props.items}
              />
            );

          case "imageBlock": {
            const firstImageBlock = imageBlocks[0];

            if (!firstImageBlock) {
              return null;
            }

            // rendera bara en gång
            if (block.id !== firstImageBlock.id) {
              return null;
            }

            // flera = grid
            if (imageBlocks.length > 1) {
              return (
                <ImageBlock
                  key="image-grid"
                  items={imageBlocks.map((b) => b.props)}
                  variant="grid"
                />
              );
            }

            // en = centered blurb
            return (
              <ImageBlock
                key={block.id}
                items={[block.props]}
                variant="blurb"
              />
            );
          };

          case "coloredPuffBlock": {
            const coloredPuffs = blocks.filter(
              (b) => b.type === "coloredPuffBlock"
            );

            const firstPuff = coloredPuffs[0];

            if (!firstPuff) {
              return null;
            }

            if (block.id !== firstPuff.id) {
              return null;
            };

            return (
              <ColoredPuff
                key="colored-puff-grid"
                items={coloredPuffs.map((b) => b.props)}
              />
            );
          }

          case "textImage":
            return (
              <TextImage
                key={key}
                {...block.props}
              />
            );

          case "wideImageCard": {
            const firstWideBlock = wideImageBlocks[0];

            if (!firstWideBlock) {
              return null;
            }

            if (block.id !== firstWideBlock.id) {
              return null;
            }

            return (
              <WideImageCards
                key="wide-image-grid"
                items={wideImageBlocks.map((b) => b.props)}
              />
            );
          }

          case "ctaBannerBlock":
            return (
              <CTABanner
                key={key}
                {...block.props}
              />
            );

          case "infoCardsBlock": {
            const infoCards = blocks.filter(
              (b) => b.type === "infoCardsBlock"
            );

            const firstInfoCard = infoCards[0];

            if (!firstInfoCard) {
              return null;
            }

            if (block.id !== firstInfoCard.id) {
              return null;
            }

            return (
              <InfoCards
                key="info-cards-grid"
                items={infoCards.flatMap((b) => b.props.items)}
              />
            );
          }

          case "cardGridBlock": {
            const cardBlocks = blocks.filter(
              (b) => b.type === "cardGridBlock"
            );

            const firstCard = cardBlocks[0];

            if (!firstCard) {
              return null;
            }

            if (block.id !== firstCard.id) {
              return null;
            }

            return (
              <CardGrid
                key="card-grid"
                items={cardBlocks.map((b) => b.props)}
              />
            );
          }

          case "contactSection":
            return (
              <ContactSection
                key={key}
                {...block.props}
              />
            );

          case "errorReportBanner":
            return (
              <ErrorReportBanner
                {...block.props}
              />
            );

          default:
            console.warn("UNKNOWN BLOCK TYPE:", block.type);

            return null;
        }
      })}
    </>
  );
}