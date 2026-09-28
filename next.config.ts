import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  devIndicators: false,

  images: {
    unoptimized: true,
    formats: ["image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  webpack: (config, { dev }) => {
    if (dev) {
      // کش در حافظه (بدون warning)
      config.cache = { type: "memory" };
      // فقط پوشه پروژه رو بپای (رفع EACCES)
      config.watchOptions = {
        ignored: [
          "**/node_modules/**",
          "**/.next/**",
          "**/.git/**",
          "/data/**",
          "/system/**",
          "/proc/**",
          "/sys/**",
        ],
      };
    }
    return config;
  },

  async headers() {
    return [
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/products/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
