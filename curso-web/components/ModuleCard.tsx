import Link from "next/link";
import type { ModuleSummary } from "@/lib/content";
import { Badge } from "./Badge";

type ModuleCardProps = {
  module: ModuleSummary;
};

export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <article className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand dark:text-brand-dark">
          Modulo {String(module.order).padStart(2, "0")}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
          {module.title}
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {module.description}
        </p>
      </div>
      {module.keywords && module.keywords.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {module.keywords.slice(0, 3).map((keyword) => (
            <Badge key={keyword}>{keyword}</Badge>
          ))}
        </div>
      )}
      <Link
        href={module.href}
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand transition hover:text-brand-dark dark:text-brand-dark dark:hover:text-brand"
        aria-label={`Abrir ${module.title}`}
      >
        Explorar modulo
        <span aria-hidden>-&gt;</span>
      </Link>
    </article>
  );
}
