import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.238.1"],
  turbopack: {
    root: __dirname,
  },
  experimental: {
    cpus: 1,
  },
};

export default nextConfig;
