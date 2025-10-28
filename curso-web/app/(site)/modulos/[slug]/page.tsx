import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MDXRenderer } from "@/components/MDXRenderer";
import { Toc } from "@/components/Toc";
import { getAdjacentModules, getModuleBySlug, getAllModules } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { REPO_URL } from "@/lib/constants";

type ModulePageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const modules = await getAllModules();
  return modules.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: ModulePageProps) {
  const currentModule = await getModuleBySlug(params.slug);
  if (!currentModule) {
    return {};
  }
  return buildPageMetadata({
    title: currentModule.title,
    description: currentModule.description,
    pathname: `/modulos/${currentModule.slug}`,
    keywords: currentModule.keywords
  });
}

export default async function ModulePage({ params }: ModulePageProps) {
  const currentModule = await getModuleBySlug(params.slug);

  if (!currentModule) {
    notFound();
  }

  const navigation = await getAdjacentModules(currentModule.slug);
  const fileName = `${String(currentModule.order).padStart(2, "0")}-${currentModule.slug}.md`;
  const githubLink = `${REPO_URL.replace(/\/$/, "")}/blob/main/content/modulos/${fileName}`;

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Modulos", href: "/#modulos" },
            { label: currentModule.title }
          ]}
        />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand dark:text-brand-dark">
            Modulo {String(currentModule.order).padStart(2, "0")}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
            {currentModule.title}
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            {currentModule.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-dark dark:hover:text-brand-dark"
            href={githubLink}
            target="_blank"
            rel="noreferrer"
          >
            Ver en GitHub
            <span aria-hidden>^</span>
          </Link>
        </div>
      </header>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="min-w-0 flex-1">
          <MDXRenderer content={currentModule.content} />
        </div>
        <Toc headings={currentModule.headings} />
      </div>

      <footer className="flex flex-col gap-4 border-t border-slate-200 pt-6 dark:border-slate-800 md:flex-row md:items-center md:justify-between">
        {navigation.previous ? (
          <Link
            href={navigation.previous.href}
            className="group inline-flex items-center gap-2 rounded-md border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-dark dark:hover:text-brand-dark"
            aria-label={`Ir al modulo anterior: ${navigation.previous.title}`}
          >
            <span aria-hidden>{"<"}</span>
            {navigation.previous.title}
          </Link>
        ) : (
          <span className="text-sm text-slate-400 dark:text-slate-500">
            Inicio del programa
          </span>
        )}

        {navigation.next ? (
          <Link
            href={navigation.next.href}
            className="group inline-flex items-center gap-2 rounded-md border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-dark dark:hover:text-brand-dark"
            aria-label={`Ir al siguiente modulo: ${navigation.next.title}`}
          >
            {navigation.next.title}
            <span aria-hidden>{">"}</span>
          </Link>
        ) : (
          <Link
            href="/proyecto-final"
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-4 py-3 text-sm font-medium text-brand transition hover:border-brand hover:text-brand-dark dark:border-slate-700 dark:text-brand-dark dark:hover:border-brand-dark dark:hover:text-brand"
          >
            Avanzar al proyecto final
            <span aria-hidden>{">"}</span>
          </Link>
        )}
      </footer>
    </article>
  );
}


