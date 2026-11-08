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
  title: "Project Sites & Material Gallery | High-Rise & Marine",
  description: `Explore actual jobsite installations and fabrication projects supplied by ${siteConfig.name}, including high-rise fair-faced concrete, luxury marine catamarans, and curved auditorium architecture.`,
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Page Hero Header */}
        <div className="bg-forest-dark text-cream py-16 lg:py-20 bg-dark-grain border-b border-forest-light/30 relative">
          <Container size="wide">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-light bg-forest-surface px-3.5 py-1 rounded-full border border-forest-light/60">
                Installation Portfolio
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                Project Gallery & Structural Showcases
              </h1>
              <p className="text-sm sm:text-base text-cream/80 leading-relaxed">
                Take a visual tour through actual project sites, civil formwork cores, marine shipyards, and bespoke architectural millwork built using {siteConfig.name} timber panels.
              </p>
            </div>
          </Container>
        </div>

        {/* Gallery Content Section */}
        <Section variant="cream" woodgrain padded="default">
          <Container size="wide">
            <GalleryGrid items={galleryItems} />
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

