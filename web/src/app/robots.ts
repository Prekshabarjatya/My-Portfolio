import type { MetadataRoute } from "next";
import { contact } from "@/data/portfolio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${contact.website}/sitemap.xml`,
    host: contact.website,
  };
}
