import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  FileText,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { blogPosts } from "@/data/seed-data";
import { formatDate } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.published_at,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Breadcrumb Navigation */}
        <div className="bg-forest-dark text-cream py-6 bg-dark-grain border-b border-forest-light/30">
          <Container size="wide">
            <div className="flex items-center gap-2 text-xs text-cream/70 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-amber-light/70" />
              <Link href="/blog" className="hover:text-white transition-colors">
                Technical Insights
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-amber-light/70" />
              <span className="text-amber-light font-medium truncate max-w-sm">
                {post.title}
              </span>
            </div>
          </Container>
        </div>

        {/* Article Header & Main Content */}
        <Section variant="cream" woodgrain padded="default">
          <Container size="default">
            <div className="max-w-3xl mx-auto space-y-8">
              {/* Post Meta */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs text-charcoal-muted">
                  <span className="flex items-center gap-1.5 font-medium text-amber-oak">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.published_at)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-4 h-4" />
                    {post.read_time}
                  </span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight leading-tight">
                  {post.title}
                </h1>

                {/* Author Card */}
                <div className="flex items-center gap-3 pt-3 border-t border-cream-border">
                  <div className="w-12 h-12 rounded-full bg-forest text-amber-light font-display font-bold flex items-center justify-center text-base shadow-sm">
                    {post.author[0]}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-charcoal">
                      {post.author}
                    </h4>
                    <p className="text-xs text-charcoal-muted">
                      {post.author_role} at {siteConfig.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lead Excerpt Callout */}
              <div className="bg-cream-surface rounded-2xl border-l-4 border-amber-oak p-6 text-base text-charcoal font-medium leading-relaxed italic">
                {post.excerpt}
              </div>

              {/* Main Rich Content */}
              <div className="prose prose-stone max-w-none text-charcoal-muted leading-relaxed space-y-6 text-sm sm:text-base">
                <div
                  className="whitespace-pre-line space-y-4"
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .replace(/### (.*?)\n/g, '<h3 class="font-display text-xl sm:text-2xl font-bold text-charcoal mt-8 mb-4">$1</h3>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-charcoal">$1</strong>')
                      .replace(/\* (.*?)\n/g, '<li class="ml-4 list-disc text-charcoal-muted mb-2">$1</li>'),
                  }}
                />
              </div>

              {/* Tags */}
              <div className="pt-6 border-t border-cream-border flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-charcoal-muted uppercase tracking-wider mr-2">
                  Keywords:
                </span>
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold text-charcoal bg-white border border-cream-border px-3 py-1 rounded-lg"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Call to Action Box for Contractors */}
              <div className="bg-forest-dark text-cream rounded-3xl p-8 sm:p-10 border border-forest-light/60 space-y-4 bg-dark-grain relative overflow-hidden shadow-xl">
                <div className="space-y-2 relative z-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-light">
                    Direct Timber Sourcing
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Need Certified Plywood for Your Site?
                  </h3>
                  <p className="text-xs sm:text-sm text-cream/80 max-w-xl leading-relaxed">
                    Contact <strong className="text-white font-semibold">{siteConfig.name}</strong> for wholesale container pricing, BS 1088 marine test certificates, or same-day yard dispatch.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap gap-3 relative z-10">
                  <Button href="/quote" variant="amber" size="default">
                    Request a Custom Quote
                  </Button>
                  <Button
                    href="/contact"
                    variant="outline"
                    size="default"
                    className="border-cream/30 text-cream hover:bg-cream hover:text-forest"
                  >
                    Contact Timber Engineers
                  </Button>
                </div>
              </div>

              {/* Back to Blog */}
              <div className="pt-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-xs font-bold text-forest hover:text-amber-oak transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to all technical insights</span>
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

