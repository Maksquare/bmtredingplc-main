"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, Phone, FileText } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { useScrolled } from "@/hooks/useScrolled";
import { Button } from "@/components/ui/Button";
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
            ? "bg-[#071711]/95 backdrop-blur-md shadow-xl py-2.5 sm:py-3 border-b border-white/10"
            : "bg-[#071711] text-white py-3 sm:py-4 border-b border-white/15"
        )}
      >
        <Container size="wide">
          <div className="flex items-center justify-between">
            {/* Brand Logo with Tactile Micro-interaction */}
            <Link
              href="/"
              className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg select-none"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center font-display font-black text-lg sm:text-xl text-white shadow-md shadow-amber-950/40 transition-all duration-300 group-hover:scale-105 group-hover:shadow-amber-500/20 active:scale-95">
                B
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-white transition-colors duration-200 group-hover:text-amber-300">
                  {siteConfig.name}
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-bold text-amber-400/90 leading-tight">
                  Timber & Plywood • Ethiopia
                </span>
              </div>
            </Link>

            {/* Desktop Navigation with Smooth Hover & Active States */}
            <nav
              className="hidden lg:flex items-center gap-1 xl:gap-1.5 p-1 rounded-2xl bg-white/[0.04] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-md"
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
                      "relative px-3.5 xl:px-4 py-2 rounded-xl text-xs xl:text-sm font-medium tracking-wide transition-colors duration-200 select-none flex items-center justify-center",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071711]",
                      isActive
                        ? "text-white font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                        : "text-white/80 hover:text-white"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {/* Hover Glider for Non-active Links */}
                    {isHovered && !isActive && (
                      <motion.span
                        layoutId="navbar-hover-glider"
                        className="absolute inset-0 rounded-xl bg-white/[0.08] border border-white/10 shadow-xs"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    {/* Active Frosted Capsule */}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-capsule"
                        className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.18] via-white/[0.10] to-white/[0.04] border border-amber-400/40 shadow-[0_4px_16px_-2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-md"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Active Radiant Ground Line with Bloom */}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-radiance"
                        className="absolute -bottom-[1px] left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 shadow-[0_0_12px_2px_rgba(251,191,36,0.75)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Label with Animated Amber Dot */}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {isActive && (
                        <motion.span
                          layoutId="navbar-active-dot"
                          className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] shrink-0"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span>{link.name}</span>
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                className="hidden xl:flex items-center gap-2.5 text-xs font-bold text-white/90 hover:text-white bg-white/10 hover:bg-white/15 transition-all duration-200 py-2 px-3.5 rounded-xl border border-white/15 shadow-xs group"
                title="Call Central Distribution Yard"
              >
                <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>{siteConfig.contact.phoneDisplay}</span>
              </a>

              <Button
                href="/quote"
                variant="amber"
                size={isScrolled ? "sm" : "default"}
                leftIcon={<FileText className="w-4 h-4" />}
                className="shadow-lg shadow-amber-950/40 font-bold text-white bg-amber-600 hover:bg-amber-500 border border-amber-400/30 text-xs sm:text-sm"
              >
                Request a Quote
              </Button>
            </div>

            {/* Mobile Actions: Touch-friendly Menu */}
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                href="/quote"
                variant="amber"
                size="sm"
                className="text-xs font-bold py-1.5 px-3 min-h-[38px] shadow-sm"
              >
                Quote
              </Button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all duration-150 border border-white/15 flex items-center justify-center min-w-[40px] min-h-[40px]"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Slide-out Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
