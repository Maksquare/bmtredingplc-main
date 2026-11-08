import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  Download,
  FileText,
  Phone,
  CheckCircle2,
  ChevronRight,
  Layers,
  ArrowRight,
  Share2,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { products, categories } from "@/data/seed-data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/products/ProductCard";

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | Technical Specs & Supply`,
    description: product.short_description,
    openGraph: {
      title: `${product.name} | ${siteConfig.name}`,
      description: product.short_description,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const category = categories.find((c) => c.id === product.category_id);
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category_id === product.category_id)
    .concat(products.filter((p) => p.id !== product.id && p.category_id !== product.category_id))
    .slice(0, 3);

  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    category: product.category_name,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Navbar />
      <main className="flex-grow">
        {/* Breadcrumb Header */}
        <div className="bg-forest-dark text-cream py-6 bg-dark-grain border-b border-forest-light/30">
          <Container size="wide">
            <div className="flex items-center gap-2 text-xs text-cream/70 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-amber-light/70" />
              <Link href="/products" className="hover:text-white transition-colors">
                Products
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-amber-light/70" />
              {category && (
                <>
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-light/70" />
                </>
              )}
              <span className="text-amber-light font-medium truncate max-w-xs">
                {product.name}
              </span>
            </div>
          </Container>
        </div>

        {/* Main Product Showcase Section */}
        <Section variant="cream" woodgrain padded="default">
          <Container size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Visual Architectural Showcase & Gallery */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative aspect-[4/3] rounded-3xl bg-charcoal border-2 border-cream-border overflow-hidden shadow-xl group">
                  <Image
                    src={product.images[0] || "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1000&auto=format&fit=crop"}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Corner Badges */}
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    <Badge variant="amber" size="sm" className="font-bold shadow-md">
                      Calibrated
                    </Badge>
                    <Badge variant="forest" size="sm" className="bg-forest/90 text-white border-white/20">
                      {product.specs.grade}
                    </Badge>
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                      {product.specs.surface_finish.split("(")[0]}
                    </span>
                    <span className="text-xs font-bold text-white bg-forest/90 px-2.5 py-1 rounded-lg border border-white/20">
                      {product.specs.standard_size}
                    </span>
                  </div>
                </div>

                {/* Sub-gallery thumbnail indicators */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-2 gap-3">
                    {product.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-[16/10] rounded-xl overflow-hidden border border-cream-border shadow-xs group"
                      >
                        <Image
                          src={img}
                          alt={`${product.name} angle ${idx + 1}`}
                          fill
                          sizes="200px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        <span className="absolute bottom-1.5 left-1.5 text-[10px] font-bold text-white bg-black/70 px-2 py-0.5 rounded">
                          Angle {idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Direct Spec Sheet Download Card */}
                <div className="bg-white rounded-2xl border border-cream-border p-5 flex items-center justify-between gap-4 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-forest/5 text-forest flex items-center justify-center shrink-0">
                      <Download className="w-5 h-5 text-amber-oak" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-charcoal">
                        Technical Spec Sheet (PDF)
                      </h4>
                      <p className="text-[11px] text-charcoal-muted">
                        Official laboratory & test data
                      </p>
                    </div>
                  </div>
                  <Button
                    href={`/quote?product=${encodeURIComponent(product.name)}`}
                    variant="secondary"
                    size="sm"
                    className="text-xs font-bold"
                  >
                    Request PDF
                  </Button>
                </div>
              </div>

              {/* Right Column: Title, Specs Table, Applications */}
              <div className="lg:col-span-7 space-y-8">
                {/* Product Header */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="forest" size="default">
                      {product.category_name}
                    </Badge>
                    <span className="text-xs text-charcoal-muted">
                      Standard Size: {product.specs.standard_size}
                    </span>
                  </div>

                  <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
                    {product.name}
                  </h1>

                  <p className="text-base text-charcoal-muted leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* CTA Action Bar */}
                <div className="p-6 rounded-2xl bg-white border border-cream-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-oak block">
                      Wholesale Supply Available
                    </span>
                    <span className="text-sm font-semibold text-charcoal">
                      Container loads & jobsite flatbed dispatch
                    </span>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button
                      href={`/quote?product=${encodeURIComponent(product.name)}`}
                      variant="amber"
                      size="default"
                      leftIcon={<FileText className="w-4 h-4" />}
                      className="w-full sm:w-auto font-bold"
                    >
                      Request a Quote
                    </Button>
                  </div>
                </div>

                {/* Technical Specifications Table */}
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-bold text-charcoal">
                    Technical Specifications
                  </h3>

                  <div className="bg-white rounded-2xl border border-cream-border overflow-hidden shadow-xs divide-y divide-cream-border/70 text-xs sm:text-sm">
                    <div className="grid grid-cols-3 p-4">
                      <span className="font-semibold text-charcoal-muted">
                        Standard Thicknesses
                      </span>
                      <span className="col-span-2 font-medium text-charcoal">
                        {product.specs.thickness}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 p-4 bg-cream-surface/30">
                      <span className="font-semibold text-charcoal-muted">
                        Panel Dimensions
                      </span>
                      <span className="col-span-2 font-medium text-charcoal">
                        {product.specs.standard_size}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 p-4">
                      <span className="font-semibold text-charcoal-muted">
                        Grading Standard
                      </span>
                      <span className="col-span-2 font-medium text-charcoal">
                        {product.specs.grade}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 p-4 bg-cream-surface/30">
                      <span className="font-semibold text-charcoal-muted">
                        Glue & Adhesive Bond
                      </span>
                      <span className="col-span-2 font-medium text-charcoal">
                        {product.specs.glue_type}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 p-4">
                      <span className="font-semibold text-charcoal-muted">
                        Core Veneer Species
                      </span>
                      <span className="col-span-2 font-medium text-charcoal">
                        {product.specs.core_species}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 p-4 bg-cream-surface/30">
                      <span className="font-semibold text-charcoal-muted">
                        Surface Finish & Texture
                      </span>
                      <span className="col-span-2 font-medium text-charcoal">
                        {product.specs.surface_finish}
                      </span>
                    </div>

                    {product.specs.density && (
                      <div className="grid grid-cols-3 p-4">
                        <span className="font-semibold text-charcoal-muted">
                          Nominal Density
                        </span>
                        <span className="col-span-2 font-medium text-charcoal">
                          {product.specs.density}
                        </span>
                      </div>
                    )}

                    {product.specs.moisture_content && (
                      <div className="grid grid-cols-3 p-4 bg-cream-surface/30">
                        <span className="font-semibold text-charcoal-muted">
                          Moisture Content
                        </span>
                        <span className="col-span-2 font-medium text-charcoal">
                          {product.specs.moisture_content}
                        </span>
                      </div>
                    )}

                    {product.specs.formaldehyde_emission && (
                      <div className="grid grid-cols-3 p-4">
                        <span className="font-semibold text-charcoal-muted">
                          Emission Standard
                        </span>
                        <span className="col-span-2 font-medium text-charcoal">
                          {product.specs.formaldehyde_emission}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Primary Industry Applications */}
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-bold text-charcoal">
                    Recommended Applications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.applications.map((app, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-cream-border shadow-xs text-xs font-semibold text-charcoal"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <Section variant="cream-surface" padded="default" className="border-t border-cream-border/70">
            <Container size="wide">
              <div className="flex items-end justify-between mb-10">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-oak">
                    Alternative Specifications
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-charcoal">
                    Related Timber Panels
                  </h2>
                </div>
                <Link
                  href="/products"
                  className="text-xs font-bold text-forest hover:text-amber-oak transition-colors flex items-center gap-1"
                >
                  <span>All Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </Container>
          </Section>
        )}
      </main>
      <Footer />
    </>
  );
}

