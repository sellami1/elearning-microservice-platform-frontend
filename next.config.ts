import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  productionBrowserSourceMaps: false,
  experimental: {
    serverSourceMaps: false,
    preloadEntriesOnStart: false,
  },
};

export default nextConfig;
