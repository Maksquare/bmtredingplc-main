"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, Phone, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { useScrolled } from "@/hooks/useScrolled";
import { MobileMenu } from "./MobileMenu";
import { Container } from "@/components/ui/Container";
import { cn, isRouteActive } from "@/lib/utils";

export function Navbar() {
  const isScrolled = useScrolled(15);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 ease-out",
          isScrolled
            ? "bg-[#FCFBF8]/90 backdrop-blur-xl shadow-sm py-2.5 sm:py-3 border-b border-[#E5DEC9]/80"
            : "bg-[#FCFBF8]/80 backdrop-blur-md py-3 sm:py-4 border-b border-transparent"
        )}
      >
        <Container size="wide">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-oak rounded-xl select-none"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0B241B] flex items-center justify-center font-display font-black text-lg sm:text-xl text-white shadow-sm transition-transform duration-300 group-hover:scale-105 active:scale-95">
                B
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl sm:text-2xl tracking-[-0.03em] text-[#141715] transition-colors group-hover:text-[#C8832A]">
                  {siteConfig.name}
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-bold text-[#5A6961] leading-none">
                  Safarian &amp; Plywood
                </span>
              </div>
            </Link>

            {/* Centered Airy Navigation Links (Inspo-inspired Dock) */}
            <nav
              className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/90 border border-[#E5DEC9]/90 shadow-xs"
              aria-label="Main Navigation"
              onMouseLeave={() => setHoveredHref(null)}
            >
              {siteConfig.navLinks.map((link) => {
                const isActive = isRouteActive(pathname, link.href);
                const isHovered = hoveredHref === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHoveredHref(link.href)}
                    className={cn(
                      "relative px-4 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-colors duration-200 select-none",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-oak",
                      isActive ? "text-white" : "text-[#2D332F] hover:text-[#141715]"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {isHovered && !isActive && (
                      <motion.span
                        layoutId="navbar-hover-glider"
                        className="absolute inset-0 rounded-full bg-[#F4EFE6]"
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      />
                    )}

                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-capsule"
                        className="absolute inset-0 rounded-full bg-[#0B241B] shadow-xs"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}

                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions: Phone + Pill CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                className="hidden xl:inline-flex items-center gap-2 text-xs font-bold text-[#141715] hover:text-[#C8832A] bg-white hover:bg-[#FBF4EB] transition-colors py-2 px-3.5 rounded-full border border-[#E5DEC9]"
                title="Call bmtradingplc Office"
              >
                <Phone className="w-3.5 h-3.5 text-[#C8832A]" />
                <span className="tabular-nums">{siteConfig.contact.phoneDisplay}</span>
              </a>

              <Link
                href="/quote"
                className="inline-flex items-center gap-2.5 pl-4 pr-1.5 py-1.5 rounded-full bg-[#141715] hover:bg-[#0B241B] text-white text-xs sm:text-sm font-bold shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] group"
              >
                <span>Request a Quote</span>
                <span className="w-7 h-7 rounded-full bg-[#C8832A] text-white flex items-center justify-center transition-transform duration-200 group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/quote"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#141715] text-white text-xs font-bold shadow-xs"
              >
                <span>Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#EAA84F]" />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-full bg-white text-[#141715] hover:bg-[#F4EFE6] border border-[#E5DEC9] active:scale-95 transition-all flex items-center justify-center min-w-[40px] min-h-[40px]"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}