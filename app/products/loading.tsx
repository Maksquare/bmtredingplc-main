import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProductGridSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function ProductsLoading() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Header Banner Skeleton */}
        <div className="bg-forest-dark text-cream py-14 lg:py-20 bg-dark-grain border-b border-forest-light/30">
          <Container size="wide">
            <div className="max-w-3xl space-y-4">
              <Skeleton className="h-6 w-36 rounded-full bg-forest-surface" />
              <Skeleton className="h-12 w-4/5 rounded-2xl bg-forest-surface" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-forest-surface" />
                <Skeleton className="h-4 w-3/4 bg-forest-surface" />
              </div>
            </div>
          </Container>
        </div>

        {/* Filter Rail & Grid Skeleton */}
        <Section variant="cream" woodgrain padded="default">
          <Container size="wide">
            <div className="space-y-8">
              {/* Filter pills skeleton */}
              <div className="flex gap-2.5 overflow-hidden py-2">
                <Skeleton className="h-10 w-24 rounded-full" />
                <Skeleton className="h-10 w-36 rounded-full" />
                <Skeleton className="h-10 w-44 rounded-full" />
                <Skeleton className="h-10 w-36 rounded-full" />
                <Skeleton className="h-10 w-40 rounded-full" />
              </div>

              {/* Product Cards Grid Skeleton */}
              <ProductGridSkeleton count={6} />
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
