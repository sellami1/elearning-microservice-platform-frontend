import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: process.cwd(),
  productionBrowserSourceMaps: false,
  experimental: {
    serverSourceMaps: false,
    preloadEntriesOnStart: false,
  },
};

export default nextConfig;
