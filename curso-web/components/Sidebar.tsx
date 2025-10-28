"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ModuleSummary } from "@/lib/content";

type SidebarProps = {
  modules: ModuleSummary[];
};

export function Sidebar({ modules }: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  return (
    <aside className="md:w-64">
      <div className="md:hidden">
        <button
          type="button"
          onClick={toggle}
          className="mb-4 inline-flex w-full items-center justify-between rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-dark dark:hover:text-brand-dark"
          aria-expanded={open}
          aria-controls="sidebar-modulos"
        >
          Plan de estudio
          <span aria-hidden>{open ? "^" : "v"}</span>
        </button>
      </div>
      <nav
        id="sidebar-modulos"
        aria-label="Listado de modulos"
        className={`rounded-lg border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900 md:sticky md:top-24 ${
          open ? "block" : "hidden md:block"
        }`}
      >
        <ol className="space-y-2">
          {modules.map((module) => {
            const active = pathname === module.href;
            return (
              <li key={module.slug}>
                <Link
                  href={module.href}
                  className={`flex items-start gap-2 rounded-md px-3 py-2 transition ${
                    active
                      ? "bg-brand/10 text-brand dark:bg-brand-dark/20 dark:text-brand-dark"
                      : "text-slate-700 hover:bg-slate-100 hover:text-brand dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-brand-dark"
                  }`}
                  onClick={close}
                >
                  <span className="font-semibold text-xs text-slate-500 dark:text-slate-400">
                    {String(module.order).padStart(2, "0")}
                  </span>
                  <span className="flex-1">{module.title}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}
