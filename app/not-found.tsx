"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Layers, ArrowLeft, Home, FileText, Search, PhoneCall } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const popularQueries = [
  { label: "Marine Plywood (BS 1088)", query: "marine" },
  { label: "Film-Faced Shuttering", query: "film-faced" },
  { label: "Commercial Hardwood", query: "commercial" },
  { label: "TitanDeck Keruing", query: "titandeck" },
  { label: "Flexible Bendy Plywood", query: "flexible" },
  { label: "SolidCore Blockboard", query: "blockboard" },
];

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/products");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-16 sm:py-24 lg:py-32 bg-cream bg-timber-grain">
        <Container size="default">
          <div className="max-w-2xl mx-auto text-center space-y-8 bg-white p-6 sm:p-12 rounded-3xl border border-cream-border shadow-xl">
            {/* 404 Visual Icon Badge */}
            <div className="w-20 h-20 rounded-3xl bg-forest/5 text-amber-oak border border-forest/10 flex items-center justify-center mx-auto shadow-inner">
              <Layers className="w-10 h-10 text-forest" />
            </div>

            {/* Headline and Description */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200 inline-block shadow-2xs">
                404 • Specification Not Located
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-black text-charcoal tracking-tight">
                This Page or Spec Sheet Is Missing
              </h1>
              <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed max-w-lg mx-auto">
                The timber specification, blog dispatch, or resource you requested may have been relocated within the{" "}
                <strong className="text-charcoal font-semibold">{siteConfig.name}</strong> commercial catalog.
              </p>
            </div>

            {/* Quick In-Page Catalog Search */}
            <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search marine plywood, shuttering boards, specs..."
                aria-label="Search timber catalog"
                className="w-full h-12 pl-11 pr-24 text-sm bg-cream-surface/60 rounded-2xl border border-cream-border text-charcoal placeholder:text-charcoal-subtle focus:bg-white focus:border-amber-oak focus:ring-4 focus:ring-amber-oak/15 focus:outline-none transition-all duration-200"
              />
              <Search className="w-4 h-4 text-charcoal-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-amber-oak transition-colors" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-4 text-xs font-bold text-white bg-forest hover:bg-forest-light active:scale-95 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Search
              </button>
            </form>

            {/* Popular Catalog Direct Links */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-subtle block">
                Popular Certified Substrates:
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {popularQueries.map((item) => (
                  <Link
                    key={item.query}
                    href={`/products?search=${encodeURIComponent(item.query)}`}
                    className="text-xs px-3 py-1.5 rounded-xl bg-cream-surface text-charcoal-muted hover:text-forest hover:bg-cream-border/80 border border-cream-border transition-all active:scale-95"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 border-t border-cream-border/70">
              <Button href="/" variant="primary" leftIcon={<Home className="w-4 h-4" />}>
                Return to Homepage
              </Button>
              <Button
                href="/products"
                variant="outline"
                leftIcon={<Layers className="w-4 h-4" />}
              >
                Browse Full Catalog
              </Button>
              <Button
                href="/quote"
                variant="amber"
                leftIcon={<FileText className="w-4 h-4" />}
              >
                Request Custom Quote
              </Button>
            </div>

            {/* Direct Yard Support Call */}
            <div className="pt-2 text-xs text-charcoal-muted">
              Need assistance? Call our Addis Ababa yard desk directly at{" "}
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                className="font-bold text-forest hover:underline"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
