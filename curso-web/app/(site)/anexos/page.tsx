import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MDXRenderer } from "@/components/MDXRenderer";
import { getAnnexes } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { REPO_URL } from "@/lib/constants";

export const metadata = buildPageMetadata({
  title: "Anexos y referencias",
  description: "Glosario y hojas de referencia rapidas para el curso.",
  pathname: "/anexos"
});

export default async function AnexosPage() {
  const annexes = await getAnnexes();

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Anexos" }
          ]}
        />
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Anexos y material de referencia
        </h1>
        <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
          Consulta el glosario, hojas de referencia y comandos frecuentes para reforzar conceptos
          sin abandonar la plataforma.
        </p>
      </header>

      <nav aria-label="Accesos rapidos" className="flex flex-wrap gap-3 text-sm">
        {annexes.map((annex) => (
          <a
            key={annex.slug}
            href={`#${annex.slug}`}
            className="rounded-full border border-slate-300 px-4 py-2 text-slate-700 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-dark dark:hover:text-brand-dark"
          >
            {annex.frontmatter.title}
          </a>
        ))}
      </nav>

      {annexes.map((annex) => {
        // GitHub link points to curso/anexos.md
        const githubLink = `${REPO_URL.replace(/\/$/, "")}/blob/master/curso/anexos.md`;

        return (
          <section key={annex.slug} id={annex.slug} className="space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {annex.frontmatter.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {annex.frontmatter.description}
                </p>
              </div>
              <Link
                href={githubLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-dark dark:hover:text-brand-dark"
              >
                Ver en GitHub
                <span aria-hidden>^</span>
              </Link>
            </div>
            <MDXRenderer content={annex.content} />
          </section>
        );
      })}
    </div>
  );
}