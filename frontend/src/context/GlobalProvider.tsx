import { createContext, useEffect, useState } from "react";
import { mapHeader, mapFooter, type FooterColumn, type NavItem } from "../api/umbraco";

type UmbracoContentItem = {
  contentType: string;
  properties: unknown;
};

type GlobalContextType = {
  nav: NavItem[];
  footer: FooterColumn[];
};

const GlobalContext = createContext<GlobalContextType | null>(null);

export default GlobalContext;

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [nav, setNav] = useState<NavItem[]>([]);
  const [footer, setFooter] = useState<FooterColumn[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        "https://localhost:44365/umbraco/delivery/api/v2/content?expand=all"
      );

      const data = await res.json();

      console.log("🔥 GLOBAL RAW:", data);

      const siteSettings = data.items.find(
        (x: UmbracoContentItem) => x.contentType === "siteSettings"
      );

      console.log("🔥 SITE SETTINGS:", siteSettings);

      if (!siteSettings) return;

      setNav(mapHeader(siteSettings));
      setFooter(mapFooter(siteSettings));
    }

    load();
  }, []);

  return (
    <GlobalContext.Provider value={{ nav, footer }}>
      {children}
    </GlobalContext.Provider>
  );
}