import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Turbopack due to compatibility issues
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
