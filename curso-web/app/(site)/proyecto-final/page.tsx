import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MDXRenderer } from "@/components/MDXRenderer";
import { Toc } from "@/components/Toc";
import { getProjectFinal } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { REPO_URL } from "@/lib/constants";

export const metadata = buildPageMetadata({
  title: "Proyecto final integrador",
  description:
    "Define y entrega PyTrack, una CLI para registrar habitos que consolida todos los aprendizajes del curso.",
  pathname: "/proyecto-final"
});

export default async function ProyectoFinalPage() {
  const project = await getProjectFinal();
  // GitHub link points to curso/modulo10-proyecto-final.md
  const githubLink = `${REPO_URL.replace(/\/$/, "")}/blob/master/curso/modulo10-proyecto-final.md`;

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Proyecto final" }
          ]}
        />
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            {project.frontmatter.title}
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            {project.frontmatter.description}
          </p>
        </div>
        <Link
          className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-dark dark:hover:text-brand-dark"
          href={githubLink}
          target="_blank"
          rel="noreferrer"
        >
          Ver en GitHub
          <span aria-hidden>^</span>
        </Link>
      </header>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="min-w-0 flex-1">
          <MDXRenderer content={project.content} />
        </div>
        <Toc headings={project.headings} />
      </div>
    </article>
  );
}