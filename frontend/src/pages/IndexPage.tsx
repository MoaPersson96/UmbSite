import { useEffect, useState } from "react";
import { getHome, mapBlocks } from "../api/umbraco";

import type { PageBlock } from "../api/umbraco";

import { BlockRenderer } from "../components/blocks/BlockRender";

export function IndexPage() {
  const [blocks, setBlocks] = useState<PageBlock[]>([]);

  useEffect(() => {
    getHome()
      .then((home) => {
        const mapped = mapBlocks(home);
        setBlocks(mapped);
      })
      .catch(console.error);
  }, []);

  return (
    <BlockRenderer blocks={blocks} />
  );
}