import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";

import type { NavItem } from "../api/umbraco";
import type { AllowedColor } from "./utils/colors";

type HeaderProps = {
  nav: NavItem[];
};

const navColor: Record<AllowedColor, string> = {
  brand: "bg-[#864d2be6] text-white",
  ink: "bg-[#000000] text-white",
  earth: "bg-[#ef8600] text-black",
  muted: "bg-[#151515b3] text-white",
};


export function SiteHeader({ nav }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const cta = nav.find((n) => n.isButtonCTA);
  const links = nav.filter((n) => !n.isButtonCTA);

  return (
    <header className="sticky top-0 z-40 bg-white transition-all">
      <div className="mx-auto flex h-24 max-w-[1400px] items-center justify-between px-6 md:px-10">

        {/* LOGO */}
        <Link
          to="/"
          className="group flex flex-col leading-[0.78] text-black"
        >
          <span className="font-black font-sans text-[26px] md:text-[30px] tracking-[-0.04em]">
            NORD
          </span>
          <span className="font-black font-sans text-[26px] md:text-[30px] tracking-[-0.04em]">
            VIKEN
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-2">
          {links.map((n) => {
            const href = n.label.toLowerCase() === "hem" ? "/" : n.url;
            const isActive = location.pathname === href;
          

            return (
              <Link
                key={n.label}
                to={href}
                className={`group relative px-4 py-2 text-base font-sans font-semibold transition-colors
                  ${isActive ? "text-black" : "text-gray-500 hover:text-black"}
                  `}
              >
                <span className="font-sans">{n.label}</span>

                <span className={`
                  pointer-events-none absolute left-4 bottom-0 h-[2px] w-[calc(100%-2rem)] bg-black origin-left transition-transform duration-300 ease-out
                  ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                `}
                 />
              </Link>
            );
          })}

          {/* CTA */}
          {cta && (
            <Link to={cta.url}
              className={`ml-4 inline-flex items-center gap-2 rounded-sm px-5 py-3 text-sm font-sans font-bold hover:translate-y-[-2px] transition-transform ${
                navColor[cta.color ?? "ink"]
              }`}
            >
              {cta.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </nav>

        {/* MOBILE BUTTON */}
        <button
          aria-label={open ? "Stäng meny" : "Öppna meny"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-black"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (

        <div className="md:hidden border-t border-border bg-background">
          <div className="mx-auto max-w-[1400px] px-6 py-6 flex flex-col">

            {nav.map((n) => {
              const href = n.label.toLowerCase() === "hem" ? "/" : n.url;
              return (
                <Link
                  key={n.label}
                  to={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-border py-4 text-2xl font-sans font-bold tracking-tight"
                >
                  <span className="font-sans">{n.label}</span>
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              );
            })}

          </div>
        </div>
      )}
    </header>
  );
}