import { useEffect, useState } from "react";
import { getHome, mapPuffs, mapFooter, mapHero, mapColorPuff } from './api/umbraco';
import { SiteHeader } from "./components/Header";
import { Hero } from "./components/hero/Hero"
import { type PuffItem, type FooterColumn, type HeroItem, type ColorPuff } from "./api/umbraco";
import { ColoredPuffGrid } from "./components/patterns/ColoredPuffGrid";
import { ImagePuffGrid } from "./components/patterns/ImagePuffGrid";
import { SiteFooter } from "./components/Footer";


export default function App() {
  const [colorPuffs, setColorPuffs] = useState<ColorPuff[]>([]);
  const [hero, setHero] = useState<HeroItem | null>(null);
  const [items, setItems] = useState<PuffItem[]>([]);
  const [footer, setFooter] = useState<FooterColumn[]>([]);

  useEffect(() => {
    getHome().then((data) => {
      console.log("RAW DATA:", data);
      const hero = mapHero(data);
      setHero(hero);

      setColorPuffs(mapColorPuff(data));


      const puffs = mapPuffs(data);
      setItems(puffs);


      const footer = mapFooter(data);
      setFooter(footer);
    });
  }, []);

  return (
    <div>
      <SiteHeader />

      {hero && <Hero {...hero} />}

      <div className="mt-5">
        <ColoredPuffGrid items={colorPuffs} />
      </div>

      <ImagePuffGrid items={items} />




      <SiteFooter columns={footer} />
    </div>
  );
}