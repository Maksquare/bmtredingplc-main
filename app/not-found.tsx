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
  { label: "Safarian (03mm – 12mm)", query: "safarian" },
  { label: "18mm Plywood (Special Product)", query: "plywood" },
  { label: "16mm Plywood", query: "16mm" },
  { label: "All Products", query: "" },
];

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = searchQuery.trim();
    if (cleaned) {
      router.push(`/products?search=${encodeURIComponent(cleaned)}`);
    } else {
      router.push("/products");
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 flex items-center justify-center bg-cream py-20 lg:py-28 px-4 min-h-[75vh] relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-oak/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-forest/5 rounded-full blur-3xl pointer-events-none" />

        <Container size="narrow" className="text-center space-y-8 relative z-10 max-w-2xl">
          <div className="relative inline-flex flex-col items-center">
            <div className="w-24 h-24 rounded-3xl bg-forest text-amber-light flex items-center justify-center shadow-2xl border border-forest-light/40 rotate-6 transition-transform hover:rotate-0 duration-300">
              <Layers className="w-12 h-12" />
            </div>
            <span className="mt-4 px-3 py-1 rounded-full bg-amber-oak/15 border border-amber-oak/30 text-amber-oak text-xs font-extrabold uppercase tracking-widest">
              404 • Page Not Found
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-charcoal tracking-tight">
              That page isn&apos;t in our stockroom.
            </h1>
            <p className="text-sm sm:text-base text-charcoal-light max-w-lg mx-auto leading-relaxed">
              The link may have moved or been simplified. Search our Safarian and Plywood catalog directly or return to the homepage.
            </p>
          </div>

          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="flex items-center gap-2 p-1.5 bg-white border border-cream-border rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-amber-oak focus-within:border-amber-oak transition-all">
              <Search className="w-5 h-5 text-charcoal-subtle ml-3 shrink-0" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Safarian, 18mm Plywood, 08mm..."
                className="w-full py-2.5 px-2 text-sm text-charcoal placeholder:text-charcoal-subtle bg-transparent focus:outline-none"
                aria-label="Search product catalog"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-forest text-white text-xs font-bold rounded-xl hover:bg-forest-dark transition-colors shrink-0 min-h-[40px]"
              >
                Search
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
              <span className="text-[11px] font-semibold text-charcoal-subtle mr-1">
                Quick links:
              </span>
              {popularQueries.map((item) => (
                <Link
                  key={item.label}
                  href={item.query ? `/products?search=${item.query}` : "/products"}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-cream-dark border border-cream-border hover:border-amber-oak hover:text-amber-oak transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-cream-border/60">
            <Button
              href="/"
              variant="primary"
              leftIcon={<Home className="w-4 h-4" />}
            >
              Return Homepage
            </Button>
            <Button
              href="/products"
              variant="outline"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Browse Catalog
            </Button>
            <Button
              href="/quote"
              variant="amber"
              leftIcon={<FileText className="w-4 h-4" />}
            >
              Request Quote
            </Button>
          </div>

          <div className="pt-2">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-forest hover:text-amber-oak transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Need help? Call {siteConfig.contact.phoneDisplay}</span>
            </a>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}