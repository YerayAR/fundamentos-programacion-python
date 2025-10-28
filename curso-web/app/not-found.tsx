import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center dark:bg-slate-950">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Pagina no encontrada</h1>
      <p className="mt-3 max-w-md text-sm text-slate-600 dark:text-slate-400">
        El recurso que buscas no existe o fue movido. Regresa al inicio para explorar el contenido
        completo del curso.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
      >
        Volver al inicio
      </Link>
    </div>
  );
}