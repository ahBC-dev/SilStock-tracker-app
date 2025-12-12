import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Allow deployments even if TypeScript reports build errors
  // Use with caution: this will skip failing the build on TS errors
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
  }
};

export default nextConfig;
