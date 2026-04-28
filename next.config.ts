import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    // Bundle framer-motion once across all client boundaries instead of per-file
    optimizePackageImports: ["framer-motion"],
  },
  turbopack: {
    // Fix: stray package-lock.json in home dir confuses workspace root detection
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
