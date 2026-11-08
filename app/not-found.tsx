import React from "react";
import Link from "next/link";
import { Layers, ArrowLeft, Home, FileText } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20 lg:py-32 bg-cream bg-timber-grain">
        <Container size="default">
          <div className="max-w-xl mx-auto text-center space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-cream-border shadow-xl">
            <div className="w-20 h-20 rounded-3xl bg-forest/5 text-amber-oak flex items-center justify-center mx-auto shadow-inner">
              <Layers className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-oak bg-amber-pale px-3 py-1 rounded-full border border-amber-light/30">
                404 Specification Not Located
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-charcoal">
                Page Not Found
              </h1>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                The timber specification or page you requested does not exist or may have been relocated within the <strong className="text-charcoal font-semibold">{siteConfig.name}</strong> catalog.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button href="/" variant="primary" leftIcon={<Home className="w-4 h-4" />}>
                Return to Homepage
              </Button>
              <Button
                href="/products"
                variant="outline"
                leftIcon={<Layers className="w-4 h-4" />}
              >
                Browse Products
              </Button>
              <Button
                href="/quote"
                variant="amber"
                leftIcon={<FileText className="w-4 h-4" />}
              >
                Request Quote
              </Button>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

