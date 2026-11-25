import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { products } from "@/data/seed-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/products",
    "/contact",
    "/quote",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" || route === "/products" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/products" || route === "/quote" ? 0.9 : 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.created_at || new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...productRoutes];
}
