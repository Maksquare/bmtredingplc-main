import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { PartnerSlider } from "@/components/sections/PartnerSlider";
import { ProductCategories } from "@/components/sections/ProductCategories";
import { StatsCounters } from "@/components/sections/StatsCounters";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { FAQSection } from "@/components/sections/FAQSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTABanner } from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-grow">
        {/* 1. Radiant Hero with Tilted Spec Previews & Rising Interactive Centerpiece */}
        <Hero />

        {/* 2. Client Organizations Logo Showcase */}
        <PartnerSlider />

        {/* 3. 2x2 Architectural Bento Grid (Safarian, 18mm Special Plywood, Locations, Scale) */}
        <ProductCategories />

        {/* 4. Central Spotlight & 4 Flank Feature Cards */}
        <StatsCounters />

        {/* 5. Detailed Interactive Board Cards */}
        <FeaturedProducts />

        {/* 6. Clean Interactive FAQ Accordion */}
        <FAQSection />

        {/* 7. Client Testimonials with Official Company Logos */}
        <Testimonials />

        {/* 8. Asymmetric Split Inquiry & Contact CTA */}
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}