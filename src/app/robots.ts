import type { MetadataRoute } from "next";

const BASE_URL = "https://tiraz-system-eu.apps.frk1.abrhapaas.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/profile",
          "/profile/",
          "/login",
          "/register",
          "/forgot-password",
          "/wishlist",
          "/compare",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
