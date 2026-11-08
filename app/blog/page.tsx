import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Calendar, ArrowRight, User, BookOpen, Tag } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { blogPosts } from "@/data/seed-data";
import { formatDate } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Technical Timber Insights & News | Plywood Specifications",
  description: `Read technical guides, concrete formwork reuse tips, BS 1088 marine plywood standards, and materials comparisons written by the timber engineering team at ${siteConfig.name}.`,
};

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Page Hero Header */}
        <div className="bg-forest-dark text-cream py-16 lg:py-20 bg-dark-grain border-b border-forest-light/30 relative">
          <Container size="wide">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-light bg-forest-surface px-3.5 py-1 rounded-full border border-forest-light/60">
                Knowledge Base & Field Advisory
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                Technical Timber Insights & Industry News
              </h1>
              <p className="text-sm sm:text-base text-cream/80 leading-relaxed">
                Expert analysis on timber standards, glue chemistries, concrete formwork optimization, and architectural panel selection from <strong className="text-white font-semibold">{siteConfig.name}</strong> specialists.
              </p>
            </div>
          </Container>
        </div>

        {/* Featured Post Banner */}
        {featuredPost && (
          <Section variant="cream-surface" padded="default" className="border-b border-cream-border/70">
            <Container size="wide">
              <div className="bg-white rounded-3xl border border-cream-border p-8 lg:p-12 shadow-sm overflow-hidden group">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="amber" size="default">
                        Featured Analysis
                      </Badge>
                      <span className="text-xs text-charcoal-muted flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredPost.read_time}
                      </span>
                    </div>

                    <Link href={`/blog/${featuredPost.slug}`}>
                      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal group-hover:text-forest transition-colors leading-tight">
                        {featuredPost.title}
                      </h2>
                    </Link>

                    <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    <div className="pt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-forest text-amber-light font-display font-bold flex items-center justify-center text-sm shadow-xs">
                          {featuredPost.author[0]}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-charcoal">
                            {featuredPost.author}
                          </p>
                          <p className="text-[11px] text-charcoal-muted">
                            {featuredPost.author_role}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-forest group-hover:text-amber-oak transition-colors"
                      >
                        <span>Read Full Guide</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Graphic Illustration Box */}
                  <div className="lg:col-span-5 aspect-[4/3] rounded-2xl bg-forest-dark text-white p-8 flex flex-col justify-between relative overflow-hidden bg-dark-grain border border-forest-light/40">
                    <div className="w-12 h-12 rounded-xl bg-amber-oak/20 border border-amber-oak/40 flex items-center justify-center text-amber-light">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[11px] uppercase font-bold tracking-widest text-amber-light">
                        Standards Whitepaper
                      </span>
                      <h3 className="font-display text-xl font-bold text-white leading-snug">
                        BS 1088 Marine Quality Assurance Guide
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </Section>
        )}

        {/* Other Posts Grid */}
        <Section variant="cream" woodgrain padded="default">
          <Container size="wide">
            <div className="mb-10">
              <h3 className="font-display text-2xl font-bold text-charcoal">
                Recent Technical Guides
              </h3>
            </div>

            <StaggerContainer
              staggerDelay={0.1}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {otherPosts.map((post) => (
                <StaggerItem key={post.id}>
                  <div className="bg-white rounded-3xl border border-cream-border overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-oak/40 transition-all duration-300 flex flex-col h-full group">
                    <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-charcoal-muted">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-amber-oak" />
                            {formatDate(post.published_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.read_time}
                          </span>
                        </div>

                        <Link href={`/blog/${post.slug}`}>
                          <h4 className="font-display text-xl font-bold text-charcoal group-hover:text-forest transition-colors leading-snug line-clamp-2">
                            {post.title}
                          </h4>
                        </Link>

                        <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {post.tags.slice(0, 3).map((tag, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-semibold text-charcoal-muted bg-cream-surface px-2 py-0.5 rounded-md"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-cream-border/60 flex items-center justify-between">
                        <span className="text-xs font-medium text-charcoal">
                          {post.author}
                        </span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-xs font-bold text-forest group-hover:text-amber-oak transition-colors flex items-center gap-1"
                        >
                          <span>Read</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

