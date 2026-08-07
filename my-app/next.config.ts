import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],

    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [48, 64, 96, 128, 256, 384],
    qualities: [55, 60, 65, 70, 75, 80],
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 60 * 24,
  },
};

export default nextConfig;
