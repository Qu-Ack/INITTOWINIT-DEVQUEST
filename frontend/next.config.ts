import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["kanteentest.s3.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.vercel.com",
        port: "",
        pathname: "/image/upload/**",
      },
    ],
  },
};
