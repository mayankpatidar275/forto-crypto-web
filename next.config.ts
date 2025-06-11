import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /* YOU MUST ADD ENV HERE*/
  env: {
    DATABASE_URL: process.env.DATABASE_URL ?? "",
  },
  images: {
    domains: ["cdn.prod.website-files.com"],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
