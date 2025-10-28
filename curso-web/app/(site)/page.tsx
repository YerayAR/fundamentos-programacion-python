import Link from "next/link";
import { ModuleCard } from "@/components/ModuleCard";
import { Badge } from "@/components/Badge";
import { getAllModules } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Fundamentos de Programacion en Python - Curso en 10 modulos",
  description:
    "Avanza desde la instalacion de Python hasta la entrega de un proyecto final integrador con pruebas, calidad y despliegue."
});

export default async function HomePage() {
  const modules = await getAllModules();

  return (
    <div className="space-y-12 pb-16">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-10 shadow dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          Fundamentos de Programacion en Python - Curso en 10 modulos
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-700 dark:text-slate-300">
          Aprende Python desde cero con un programa profesional que combina teoria, ejemplos
          ejecutables, ejercicios guiados y un proyecto final listo para produccion.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={modules[0]?.href ?? "/modulos/introduccion"}
            className="inline-flex items-center rounded-full bg-brand px-6 py-3 font-semibold text-white shadow transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white dark:hover:bg-brand"
          >
            Empezar ahora
          </Link>
          <Link
            href="/proyecto-final"
            className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-dark dark:hover:text-brand-dark"
          >
            Ver proyecto final
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          <Badge>Python 3.12+</Badge>
          <Badge>App Router</Badge>
          <Badge>Tailwind CSS</Badge>
        </div>
      </section>

      <section aria-labelledby="resultados">
        <h2 id="resultados" className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Resultados de aprendizaje
        </h2>
        <ul className="mt-4 grid gap-4 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-2">
          <li className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            Dominar la sintaxis base de Python, estructuras de datos y control de flujo.
          </li>
          <li className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            Disenar funciones, modulos y paquetes con documentacion y tipado opcional.
          </li>
          <li className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            Manipular archivos, JSON y CSV usando la biblioteca estandar y buenas practicas.
          </li>
          <li className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            Implementar pruebas automatizadas, logging y estandares de calidad profesional.
          </li>
        </ul>
      </section>

      <section aria-labelledby="modulos">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="modulos" className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Plan de estudio
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Diez modulos progresivos con ejemplos ejecutables, ejercicios y quizzes rapidos.
            </p>
          </div>
          <Link
            href="/buscar"
            className="text-sm font-medium text-brand hover:text-brand-dark dark:text-brand-dark dark:hover:text-brand"
          >
            Buscar contenidos -&gt;
          </Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {modules.map((module) => (
            <ModuleCard key={module.slug} module={module} />
          ))}
        </div>
      </section>
    </div>
  );
}
