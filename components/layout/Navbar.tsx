"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, FileText } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { useScrolled } from "@/hooks/useScrolled";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function Navbar() {
  const isScrolled = useScrolled(20);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "bg-[#0B241B]/98 backdrop-blur-md shadow-xl py-3 border-b border-white/10"
            : "bg-[#0B241B] text-white py-4 border-b border-white/15"
        )}
      >
        <Container size="wide">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center font-display font-black text-xl text-white shadow-lg shadow-amber-900/30 transition-transform group-hover:scale-105">
                B
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-2xl tracking-tight text-white transition-colors group-hover:text-amber-300">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] tracking-widest uppercase font-bold text-amber-400">
                  Timber & Plywood • Ethiopia
                </span>
              </div>
            </Link>

            {/* Desktop Navigation with Pristine Contrast */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {siteConfig.navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3.5 py-2 rounded-xl text-sm transition-all duration-150 relative",
                      isActive
                        ? "text-white font-bold bg-white/15 shadow-inner"
                        : "text-white/90 hover:text-white hover:bg-white/10 font-medium"
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-amber-400 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                className="hidden xl:flex items-center gap-2.5 text-xs font-bold text-white bg-white/10 hover:bg-white/20 transition-all py-2 px-3.5 rounded-xl border border-white/20 shadow-xs"
              >
                <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center text-white">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>{siteConfig.contact.phoneDisplay}</span>
              </a>

              <Button
                href="/quote"
                variant="amber"
                size={isScrolled ? "sm" : "default"}
                leftIcon={<FileText className="w-4 h-4" />}
                className="shadow-lg shadow-amber-900/40 font-bold text-white bg-amber-600 hover:bg-amber-500 border border-amber-400/30"
              >
                Request a Quote
              </Button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                href="/quote"
                variant="amber"
                size="sm"
                className="text-xs px-3 sm:hidden font-bold"
              >
                Quote
              </Button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-xl bg-white/15 text-white hover:bg-white/25 transition-colors border border-white/20"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-6 h-6" />
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
