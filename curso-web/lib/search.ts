import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import MiniSearch from "minisearch";
import { collectHeadingsFromMarkdown } from "./content";

export type SearchDocument = {
  id: string;
  title: string;
  description: string;
  href: string;
  order: number;
  section: "modulo" | "proyecto" | "anexo";
  keywords: string[];
  headings: string[];
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

const searchFields = ["title", "description", "keywords", "headings"] as const;
const storeFields = ["title", "description", "href", "section", "order"] as const;
const searchOptions = {
  prefix: true,
  fuzzy: 0.2,
  boost: { title: 3, keywords: 2, headings: 2 }
} as const;

function slugFromFilename(fileName: string) {
  return fileName.replace(/\.mdx?$/, "").replace(/^\d+-/, "");
}

type DirectoryConfig = {
  dir: string;
  section: SearchDocument["section"];
  href: (slug: string) => string;
};

const DIRECTORY_MAP: DirectoryConfig[] = [
  {
    dir: path.join(CONTENT_ROOT, "modulos"),
    section: "modulo",
    href: (slug) => `/modulos/${slug}`
  },
  {
    dir: path.join(CONTENT_ROOT, "proyecto-final"),
    section: "proyecto",
    href: () => "/proyecto-final"
  },
  {
    dir: path.join(CONTENT_ROOT, "anexos"),
    section: "anexo",
    href: (slug) => `/anexos#${slug}`
  }
];

async function loadDirectoryDocuments(config: DirectoryConfig): Promise<SearchDocument[]> {
  const files = await fs.readdir(config.dir);
  const markdownFiles = files
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .sort();

  const documents: SearchDocument[] = [];

  for (const file of markdownFiles) {
    const filePath = path.join(config.dir, file);
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    const slug = slugFromFilename(file);
    const keywords = Array.isArray(data.keywords) ? data.keywords.map(String) : [];
    const order = typeof data.order === "number" ? data.order : 0;
    const headings = collectHeadingsFromMarkdown(content).map((heading) => heading.text);

    documents.push({
      id: `${config.section}-${slug || file}`,
      title: data.title ?? slug,
      description: data.description ?? "",
      href: config.href(slug || "index"),
      order,
      section: config.section,
      keywords,
      headings
    });
  }

  return documents;
}

export async function getSearchDocuments(): Promise<SearchDocument[]> {
  const documentsNested = await Promise.all(
    DIRECTORY_MAP.map((config) => loadDirectoryDocuments(config))
  );
  const documents = documentsNested.flat();
  return documents.sort((a, b) => a.order - b.order);
}

export function createSearchIndex(documents: SearchDocument[]) {
  const mini = new MiniSearch({
    fields: Array.from(searchFields),
    storeFields: Array.from(storeFields),
    searchOptions: { ...searchOptions }
  });

  mini.addAll(documents);
  return mini;
}

export function getSearchIndexConfig() {
  return {
    fields: Array.from(searchFields),
    storeFields: Array.from(storeFields),
    searchOptions
  };
}
