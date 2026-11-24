import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProductDetailSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function ProductDetailLoading() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Breadcrumb Skeleton */}
        <div className="bg-white border-b border-cream-border py-4">
          <Container size="wide">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16 rounded-md" />
              <span className="text-charcoal-subtle">/</span>
              <Skeleton className="h-4 w-24 rounded-md" />
              <span className="text-charcoal-subtle">/</span>
              <Skeleton className="h-4 w-40 rounded-md" />
            </div>
          </Container>
        </div>

        {/* Content Skeleton */}
        <Section variant="cream" woodgrain padded="default">
          <Container size="wide">
            <ProductDetailSkeleton />
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
