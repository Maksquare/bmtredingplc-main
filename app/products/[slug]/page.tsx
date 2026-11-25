import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Layers,
  CheckCircle2,
  MapPin,
  Factory,
  Phone,
  FileText,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { products } from "@/data/seed-data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGalleryRail } from "@/components/products/ProductGalleryRail";
import { ProductVariantSelector } from "@/components/products/ProductVariantSelector";

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
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} (${product.specs.thickness})`,
    description: product.short_description,
    alternates: {
      canonical: `${siteConfig.url}/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | ${siteConfig.name}`,
      description: product.short_description,
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

const specLabels: Record<string, string> = {
  thickness: "Available Thicknesses",
  standard_size: "Standard Sheet Size",
  grade: "Panel Grade",
  glue_type: "Bonding System",
  core_species: "Wood Core",
  surface_finish: "Surface Finish",
  moisture_content: "Moisture Content",
  origin: "Manufacturing Facility",
};

export default async function ProductDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ thickness?: string }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter((p) => p.id !== product.id);
  const hasSpecialVariant = product.variants?.some((v) => v.is_special);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${siteConfig.name} ${product.name}`,
    description: product.short_description,
    image: product.images,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: siteConfig.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.contact.factory.city,
        addressRegion: siteConfig.contact.factory.region,
        addressCountry: "ET",
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

      <main id="main-content" className="flex-1 bg-cream">
        {/* Top Breadcrumb Bar */}
        <div className="bg-white border-b border-cream-border py-4">
          <Container size="wide">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-charcoal-subtle">
                <Link href="/" className="hover:text-forest transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link href="/products" className="hover:text-forest transition-colors">
                  Products
                </Link>
                <span>/</span>
                <span className="font-semibold text-charcoal">{product.name}</span>
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-amber-oak transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Catalog</span>
              </Link>
            </div>
          </Container>
        </div>

        {/* Main Product Section */}
        <Section className="py-10 lg:py-16">
          <Container size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left: Product Gallery */}
              <div className="lg:col-span-6 space-y-6">
                <ProductGalleryRail product={product} />

                {/* Origin & Availability Summary */}
                <div className="p-5 rounded-2xl bg-white border border-cream-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-oak/10 text-amber-oak flex items-center justify-center shrink-0">
                      <Factory className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-charcoal">Werabe Factory Production</div>
                      <div className="text-charcoal-subtle">{siteConfig.contact.factory.full}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-forest/10 text-forest flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-charcoal">Addis Ababa Office</div>
                      <div className="text-charcoal-subtle">{siteConfig.contact.address.full}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Overview & Variant Selector */}
              <div className="lg:col-span-6 space-y-7">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="amber" size="default">
                      {product.category_name || product.name}
                    </Badge>
                    {hasSpecialVariant && (
                      <Badge
                        variant="forest"
                        size="default"
                        className="bg-amber-oak text-white border-amber-oak"
                      >
                        <Sparkles className="w-3.5 h-3.5 mr-1 inline" />
                        Includes 18mm Special Product
                      </Badge>
                    )}
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-charcoal tracking-tight">
                    {product.name}
                  </h1>

                  <p className="text-base text-charcoal-light leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Thickness Selector (No Pricing) */}
                <ProductVariantSelector
                  product={product}
                  initialThickness={resolvedSearchParams?.thickness}
                />

                {/* Direct Contact Box */}
                <div className="p-5 rounded-2xl bg-forest-dark text-cream border border-forest-light/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-light">
                      Direct Order &amp; Dispatch Inquiry
                    </div>
                    <div className="text-sm text-cream/85">
                      Call {siteConfig.contact.phoneDisplay} (Call / WhatsApp / Telegram) for volume allocation.
                    </div>
                  </div>
                  <Button
                    href={`tel:${siteConfig.contact.phone}`}
                    variant="amber"
                    size="sm"
                    leftIcon={<Phone className="w-4 h-4" />}
                    className="shrink-0"
                  >
                    Call Office
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Technical Specs & Applications */}
        <Section className="bg-white border-y border-cream-border py-14 lg:py-20">
          <Container size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Specifications Table */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2.5">
                  <Layers className="w-5 h-5 text-amber-oak" />
                  <h2 className="text-2xl font-display font-extrabold text-charcoal">
                    Panel Specifications
                  </h2>
                </div>

                <div className="rounded-2xl border border-cream-border overflow-hidden bg-cream/30">
                  <dl className="divide-y divide-cream-border">
                    {Object.entries(product.specs).map(([key, value]) => {
                      if (!value) return null;
                      const label =
                        specLabels[key] ||
                        key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
                      return (
                        <div
                          key={key}
                          className="grid grid-cols-1 sm:grid-cols-5 px-5 py-3.5 text-sm hover:bg-white transition-colors"
                        >
                          <dt className="sm:col-span-2 font-semibold text-charcoal-subtle">
                            {label}
                          </dt>
                          <dd className="sm:col-span-3 font-medium text-charcoal mt-0.5 sm:mt-0">
                            {value}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              </div>

              {/* Practical Applications */}
              <div className="lg:col-span-5 space-y-5">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-amber-oak" />
                  <h2 className="text-2xl font-display font-extrabold text-charcoal">
                    Recommended Uses
                  </h2>
                </div>

                <div className="p-6 rounded-2xl bg-cream/60 border border-cream-border space-y-4">
                  <ul className="space-y-3.5">
                    {product.applications.map((app) => (
                      <li key={app} className="flex items-start gap-3 text-sm text-charcoal">
                        <CheckCircle2 className="w-4 h-4 text-amber-oak shrink-0 mt-1" />
                        <span className="leading-relaxed">{app}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-cream-border">
                    <Button
                      href={`/quote?product=${encodeURIComponent(product.name)}`}
                      variant="primary"
                      className="w-full"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Request Quote for {product.name}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Companion Product */}
        {relatedProducts.length > 0 && (
          <Section className="bg-cream py-14 lg:py-20">
            <Container size="wide">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display font-extrabold text-charcoal">
                  Other Product in Our Lineup
                </h2>
                <Link
                  href="/products"
                  className="text-xs font-bold text-amber-oak hover:underline inline-flex items-center gap-1"
                >
                  <span>Full Lineup</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                {relatedProducts.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
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