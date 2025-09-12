import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2bltdgfhxagqj.cloudfront.net",
      },
    ],
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/credit-cards",
        permanent: true,
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
