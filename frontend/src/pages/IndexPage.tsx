import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
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
    <>
      <Helmet>
        <title>Nordvikens kommun — Leva, växa och verka i norr</title>
      </Helmet>
      <BlockRenderer blocks={blocks} />
    </>
  );
}