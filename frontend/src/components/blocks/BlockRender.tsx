import type { PageBlock } from "../../api/umbraco";
import { Hero } from "../hero/Hero";
import { Article } from "../text/ArticleBox";
import { InfoBox } from "../text/InfoBox";
import { PillarBars } from "../text/PillarBarsText";
import { ImageBlock } from "../puff/ImageBlock";


type Props = {
  blocks: PageBlock[];
};

export function BlockRenderer({ blocks }: Props) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heroBlock":
            return <Hero key={i} {...block.props} />;

          case "articleBlock":
            console.log("🔥 ARTICLE RENDER HIT:", block.props);
            return (
              <Article
                key={i}
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
                key={i}
                title={block.props.title}
                body={block.props.body}
              />
            );

          case "pillarBarsBlock":
            console.log("🟣 PILLAR RENDER:", block.props);
            return <PillarBars key={i} items={block.props.items} />

          case "ctaBannerBlock":
            return (
              <InfoBox
                key={i}
                title={block.props.title}
                body={block.props.body}
              />
            );

          case "imageBlock":
            console.log("IMAGE BLOCK PROPS:", block.props);
            return (
              <ImageBlock
                key={i}
                items={[block.props]}
                variant="blurb"
              />

            )

          default:
            return null;
        }
      })}
    </>
  );
}