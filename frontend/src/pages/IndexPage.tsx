import { useEffect, useState } from "react";
import { getHome, mapBlocks } from "../api/umbraco";

import type { PageBlock } from "../api/umbraco";

import { Hero } from "../components/hero/Hero";
import { ColoredPuff } from "../components/puff/ColoredPuff";
import { TextImage } from "../components/text/TextImage";
import { ImageBlock } from "../components/puff/ImageBlock";
import { WideImageCards } from "../components/puff/CornerPuff";
import { CTABanner } from "../components/cta/BigCta";

export function IndexPage() {
  const [blocks, setBlocks] = useState<PageBlock[]>([]);
  console.log("HOME PAGE RENDER");

  useEffect(() => {
    getHome()
      .then((home) => {
        console.log("HOME LOADED", home);

        try {
          const mapped = mapBlocks(home);
          console.log("MAPPED BLOCKS:", mapped);

          setBlocks(mapped);
        } catch (err) {
          console.error("MAPBLOCKS FAILED:", err);
        }
      })
      .catch((err) => {
        console.log("GET HOME FAILED:", err);
      });
  }, []);

  const heroBlocks = blocks.filter(b => b.type === "heroBlock");
  const coloredPuffBlocks = blocks.filter(b => b.type === "coloredPuffBlock").map(b => b.props);
  const textImageBlocks = blocks.filter(b => b.type === "textImage");
  const imageBlocks = blocks.filter(b => b.type === "imageBlock").map(b => b.props);
  console.log("BLOCKS:", blocks);
  const wideImageCards = blocks.filter(b => b.type === "wideImageCard").map(b => b.props);
  const ctaBanners = blocks.filter(b => b.type === "ctaBannerBlock");

  return (
    <div>
      {heroBlocks.map((block, i) => (
        <Hero key={i} {...block.props} />
      ))}

      {coloredPuffBlocks.length > 0 && (
        <ColoredPuff items={coloredPuffBlocks} />
      )}

      {textImageBlocks.map((block, i) => (
        <TextImage key={i} {...block.props} />
      ))}

      {imageBlocks.length > 0 && (
        <ImageBlock variant="grid" items={imageBlocks} />
      )}

      {wideImageCards.length > 0 && (
        <WideImageCards items={wideImageCards} />
      )}

      {ctaBanners.map((block, i) => (
        <CTABanner key={i} {...block.props} />
      ))}
    </div>
  );
}