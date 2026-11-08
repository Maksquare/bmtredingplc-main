import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { PartnerSlider } from "@/components/sections/PartnerSlider";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProductCategories } from "@/components/sections/ProductCategories";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { StatsCounters } from "@/components/sections/StatsCounters";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTABanner } from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* 1. Hero with High-Resolution Architectural Plywood Visual & Editorial Spec Callout */}
        <Hero />

        {/* 2. Smooth Infinite Marquee of Ethiopian Partner Contractors & Developers */}
        <PartnerSlider />

        {/* 3. Trust Bar with Material Standards Compliance */}
        <TrustBar />

        {/* 4. Featured Product Categories with hover lift */}
        <ProductCategories />

        {/* 5. Why Choose Us (Zero Core Voids, Direct Importer Reliability, Wholesale Pricing, Fast Dispatch) */}
        <WhyChooseUs />

        {/* 6. High-Contrast Animated Number Counters */}
        <StatsCounters />

        {/* 7. Contractor Process Steps (Inquiry -> Quote -> Jobsite Delivery) */}
        <ProcessSteps />

        {/* 8. Flagship Products Grid with Specs Snapshots */}
        <FeaturedProducts />

        {/* 9. Verified Testimonials from Commercial Builders & Joiners */}
        <Testimonials />

        {/* 10. High-Impact Final Conversion Banner */}
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
