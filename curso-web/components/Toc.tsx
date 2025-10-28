"use client";

import { useState } from "react";
import type { TocHeading } from "@/lib/content";
import Link from "next/link";

type TocProps = {
  headings: TocHeading[];
};

export function Toc({ headings }: TocProps) {
  const [open, setOpen] = useState(false);

  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <aside className="md:w-64">
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="mb-4 inline-flex w-full items-center justify-between rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-dark dark:hover:text-brand-dark"
          aria-expanded={open}
          aria-controls="toc"
        >
          Tabla de contenidos
          <span aria-hidden>{open ? "^" : "v"}</span>
        </button>
      </div>
      <nav
        id="toc"
        aria-label="Tabla de contenidos"
        className={`rounded-lg border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900 md:sticky md:top-24 ${
          open ? "block" : "hidden md:block"
        }`}
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          En esta pagina
        </p>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.id} className={heading.level === 3 ? "ml-3" : undefined}>
              <Link
                href={`#${heading.id}`}
                className="text-slate-600 hover:text-brand dark:text-slate-300 dark:hover:text-brand-dark"
              >
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}