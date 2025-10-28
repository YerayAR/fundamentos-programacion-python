import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between md:px-6">
        <p>
          {new Date().getFullYear()} Fundamentos de Programacion en Python. Todo el contenido se
          distribuye bajo licencia Creative Commons BY-SA.
        </p>
        <nav aria-label="Enlaces secundarios" className="flex flex-wrap gap-4">
          <Link className="hover:text-brand dark:hover:text-brand-dark" href="/acerca">
            Acerca
          </Link>
          <Link className="hover:text-brand dark:hover:text-brand-dark" href="/anexos">
            Anexos
          </Link>
          <Link className="hover:text-brand dark:hover:text-brand-dark" href="/buscar">
            Buscar
          </Link>
        </nav>
      </div>
    </footer>
  );
}