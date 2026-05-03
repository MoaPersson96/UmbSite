/* eslint-disable react-refresh/only-export-components */

import { createRootRoute, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "../components/Header";
import { SiteFooter } from "../components/Footer";
import { useGlobal } from "../hooks/useGlobal";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const { nav = [], footer = [] } = useGlobal();
  console.log("ROOT RENDER");
  console.log("FOOTER RAW:", footer);

  return (
    <>
      <SiteHeader nav={nav} />
      <Outlet />
      <SiteFooter columns={footer} />
    </>
  );
}