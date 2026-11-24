import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { galleryItems } from "@/data/seed-data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Project Sites & Structural Installations in Ethiopia",
  description: `Explore actual jobsite installations and commercial projects supplied by ${siteConfig.name}, including high-rise fair-faced concrete, architectural millwork, and infrastructure formwork across Addis Ababa.`,
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Page Hero Header */}
        <div className="bg-[#071711] text-white py-12 sm:py-16 lg:py-20 border-b border-white/15 relative">
          <Container size="wide">
            <div className="max-w-3xl space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/20 inline-block shadow-2xs">
                Installation Portfolio
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Project Gallery & Structural Installations
              </h1>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl">
                Visual documentation of actual project sites, civil concrete cores, and bespoke architectural millwork supplied by {siteConfig.name} in Ethiopia.
              </p>
            </div>
          </Container>
        </div>

        {/* Gallery Content Section */}
        <Section variant="cream" woodgrain padded="default" className="py-12 sm:py-16 lg:py-20">
          <Container size="wide">
            <GalleryGrid items={galleryItems} />
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
