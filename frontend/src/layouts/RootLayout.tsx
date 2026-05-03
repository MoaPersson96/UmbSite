// import { Outlet } from "@tanstack/react-router";
// import { SiteHeader } from "../components/Header";
// import { SiteFooter } from "../components/Footer";
// import { useGlobal } from "../hooks/useGlobal";

// export function RootLayout() {
//   const { nav, footer } = useGlobal();

//   if (!nav.length || !footer.length) {
//     return <div>Laddar...</div>;
//   }

//   return (
//     <>
//       <SiteHeader nav={nav} />
//       <Outlet />
//       <SiteFooter columns={footer} />
//     </>
//   );
// }