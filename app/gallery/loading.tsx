import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { GallerySkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function GalleryLoading() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <div className="bg-forest-dark text-cream py-14 lg:py-20 bg-dark-grain border-b border-forest-light/30">
          <Container size="wide">
            <div className="max-w-3xl space-y-4">
              <Skeleton className="h-6 w-32 rounded-full bg-forest-surface" />
              <Skeleton className="h-10 w-3/4 rounded-xl bg-forest-surface" />
              <Skeleton className="h-4 w-full bg-forest-surface" />
            </div>
          </Container>
        </div>

        <Section variant="cream" woodgrain padded="default">
          <Container size="wide">
            <GallerySkeleton count={8} />
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
