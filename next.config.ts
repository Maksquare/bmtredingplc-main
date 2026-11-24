import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.bmtradingplc.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "bmtradingplc.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blog/:path*",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/products",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
