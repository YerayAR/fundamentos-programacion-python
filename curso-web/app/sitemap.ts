import type { MetadataRoute } from "next";
import { getAllModules } from "@/lib/content";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://fundamentos-python.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const modules = await getAllModules();
  const now = new Date();

  const moduleEntries = modules.map((module) => ({
    url: `${BASE_URL}${module.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${BASE_URL}/proyecto-final`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${BASE_URL}/acerca`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4
    },
    {
      url: `${BASE_URL}/anexos`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${BASE_URL}/buscar`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5
    },
    ...moduleEntries
  ];
}
