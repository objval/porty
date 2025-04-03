import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trustHost: true,
  images: {
    remotePatterns: [
      { hostname: "sdmntprwestus.oaiusercontent.com" },
    ],
  },
};

export default nextConfig;
