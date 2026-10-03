import type { MetadataRoute } from "next";
import { contact } from "@/data/portfolio";

// One page plus the resume PDF; lastModified is the build time.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${contact.website}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${contact.website}/Preksha_Barjatya_Resume.pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
