"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { href: "/", label: "Inicio" },
  { href: "/#modulos", label: "Modulos" },
  { href: "/proyecto-final", label: "Proyecto final" },
  { href: "/anexos", label: "Anexos" },
  { href: "/acerca", label: "Acerca" },
  { href: "/buscar", label: "Buscar" }
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href.startsWith("/#")) {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:hidden dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-dark dark:hover:text-brand-dark"
            aria-label={open ? "Cerrar navegacion" : "Abrir navegacion"}
            aria-expanded={open}
            onClick={toggle}
          >
            {open ? "Cerrar" : "Menu"}
          </button>
          <Link
            href="/"
            className="text-lg font-semibold text-slate-900 transition hover:text-brand dark:text-slate-100 dark:hover:text-brand-dark"
            onClick={close}
          >
            Fundamentos Python
          </Link>
        </div>

        <nav
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 top-full w-full flex-col border-b border-slate-200 bg-white px-4 pb-4 pt-2 text-base shadow md:static md:flex md:w-auto md:flex-row md:border-none md:bg-transparent md:p-0 md:shadow-none dark:border-slate-800 dark:bg-slate-950 md:dark:bg-transparent`}
          aria-label="Navegacion principal"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 transition md:ml-1 ${
                isActive(item.href)
                  ? "bg-brand/10 text-brand dark:bg-brand-dark/20 dark:text-brand-dark"
                  : "text-slate-700 hover:bg-slate-100 hover:text-brand dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-brand-dark"
              }`}
              onClick={close}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex items-center justify-start md:hidden">
            <ThemeToggle />
          </div>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
