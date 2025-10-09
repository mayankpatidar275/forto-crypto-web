import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";
const withMDX = createMDX();

const nextConfig: NextConfig = {
  /* config options here */
  /* YOU MUST ADD ENV HERE*/
  env: {
    DATABASE_URL: process.env.DATABASE_URL ?? "",
  },
  images: {
    domains: [
      "cdn.prod.website-files.com",
      "forto-assets.s3.ap-south-1.amazonaws.com",
      "randomuser.me",
      "ui-avatars.com",
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
};

export default withMDX(nextConfig);
