import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://fundamentos-python.vercel.app";
const SITE_NAME = "Fundamentos de Programacion en Python";
const SITE_DESCRIPTION =
  "Curso completo en 10 modulos sobre los fundamentos de programacion con Python, optimizado para estudio autodidacta y despliegue estatico en la web.";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Curso completo`,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icons/icon-192.svg"
  },
  keywords: [
    "python",
    "curso",
    "programacion",
    "fundamentos",
    "aprendizaje"
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} - Curso completo`,
    description: SITE_DESCRIPTION
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Curso completo`,
    description: SITE_DESCRIPTION
  },
  alternates: {
    canonical: "/"
  }
};

export type PageSEO = {
  title: string;
  description: string;
  pathname?: string;
  keywords?: string[];
};

export function buildPageMetadata({
  title,
  description,
  pathname = "/",
  keywords = []
}: PageSEO): Metadata {
  const url = new URL(pathname, SITE_URL);
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url.toString()
    },
    openGraph: {
      title,
      description,
      url: url.toString()
    },
    twitter: {
      title,
      description
    }
  };
}