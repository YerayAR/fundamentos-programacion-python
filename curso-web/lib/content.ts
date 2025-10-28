import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import GithubSlugger from "github-slugger";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const MODULES_DIR = path.join(CONTENT_ROOT, "modulos");
const PROJECT_DIR = path.join(CONTENT_ROOT, "proyecto-final");
const ANNEXES_DIR = path.join(CONTENT_ROOT, "anexos");

export type ModuleFrontMatter = {
  title: string;
  description: string;
  order: number;
  keywords?: string[];
};

export type TocHeading = {
  id: string;
  text: string;
  level: number;
};

export type ModuleSummary = ModuleFrontMatter & {
  slug: string;
  href: string;
};

export type ModuleContent = ModuleSummary & {
  content: React.ReactElement;
  headings: TocHeading[];
};

export type ProjectContent = {
  frontmatter: ModuleFrontMatter;
  content: React.ReactElement;
  headings: TocHeading[];
};

export type AnnexContent = {
  slug: string;
  frontmatter: ModuleFrontMatter;
  content: React.ReactElement;
  headings: TocHeading[];
};

const mdxPlugins = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: "append",
        properties: {
          className: ["heading-anchor"],
          ariaHidden: "true",
          tabIndex: -1
        },
        content: {
          type: "text",
          value: "#"
        }
      }
    ],
    rehypePrism
  ]
};

async function readDirectoryFiles(dirPath: string) {
  const entries = await fs.readdir(dirPath);
  return entries
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .sort();
}

function slugFromFilename(fileName: string) {
  return fileName.replace(/\.mdx?$/, "").replace(/^\d+-/, "");
}

function moduleHref(slug: string) {
  return `/modulos/${slug}`;
}

function buildHeadings(body: string): TocHeading[] {
  const tree = unified().use(remarkParse).parse(body);
  const slugger = new GithubSlugger();
  const headings: TocHeading[] = [];

  visit(tree, "heading", (node: any) => {
    if (node.depth < 2 || node.depth > 4) {
      return;
    }
    const text = node.children
      .filter((child: any) => child.type === "text" || child.type === "inlineCode")
      .map((child: any) => child.value)
      .join(" ")
      .trim();

    if (!text) {
      return;
    }

    headings.push({
      id: slugger.slug(text),
      text,
      level: node.depth
    });
  });

  return headings;
}

async function compileContent(filePath: string) {
  const raw = await fs.readFile(filePath, "utf-8");
  const { content: body } = matter(raw);
  const { content, frontmatter } = await compileMDX<ModuleFrontMatter>({
    source: raw,
    options: {
      parseFrontmatter: true,
      mdxOptions: mdxPlugins as any
    }
  });

  const headings = buildHeadings(body);
  return { content, frontmatter, headings };
}

export async function getAllModules(): Promise<ModuleSummary[]> {
  const files = await readDirectoryFiles(MODULES_DIR);
  const modules = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(MODULES_DIR, file);
      const { frontmatter } = await compileContent(filePath);
      const slug = slugFromFilename(file);
      return {
        slug,
        href: moduleHref(slug),
        ...frontmatter
      };
    })
  );

  return modules.sort((a, b) => a.order - b.order);
}

export async function getModuleBySlug(slug: string): Promise<ModuleContent | null> {
  const files = await readDirectoryFiles(MODULES_DIR);
  const entry = files.find((file) => slugFromFilename(file) === slug);

  if (!entry) {
    return null;
  }

  const filePath = path.join(MODULES_DIR, entry);
  const { content, frontmatter, headings } = await compileContent(filePath);

  return {
    slug,
    href: moduleHref(slug),
    ...frontmatter,
    content,
    headings
  };
}

export async function getAdjacentModules(slug: string) {
  const modules = await getAllModules();
  const index = modules.findIndex((mod) => mod.slug === slug);

  return {
    previous: index > 0 ? modules[index - 1] : null,
    next: index >= 0 && index < modules.length - 1 ? modules[index + 1] : null
  };
}

export async function getProjectFinal(): Promise<ProjectContent> {
  const files = await readDirectoryFiles(PROJECT_DIR);
  const target = files.find((file) => file.startsWith("10-")) ?? files[0];
  const filePath = path.join(PROJECT_DIR, target);
  const { content, frontmatter, headings } = await compileContent(filePath);
  return {
    frontmatter,
    content,
    headings
  };
}

export async function getAnnexes(): Promise<AnnexContent[]> {
  const files = await readDirectoryFiles(ANNEXES_DIR);
  const annexes = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(ANNEXES_DIR, file);
      const slug = slugFromFilename(file);
      const { content, frontmatter, headings } = await compileContent(filePath);
      return {
        slug,
        frontmatter,
        content,
        headings
      };
    })
  );

  return annexes.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export async function getTocFromContent(slug: string): Promise<TocHeading[]> {
  const currentModule = await getModuleBySlug(slug);
  return currentModule?.headings ?? [];
}

export function collectHeadingsFromMarkdown(body: string): TocHeading[] {
  return buildHeadings(body);
}

