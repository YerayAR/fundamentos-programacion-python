import { Search } from "@/components/Search";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Buscar en el curso",
  description: "Encuentra modulos, secciones y anexos del curso de Python.",
  pathname: "/buscar"
});

export default function SearchPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Buscar contenidos</h1>
      <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
        El indice se genera durante el build y permite filtrar por titulos de modulos, encabezados
        internos y palabras clave definidas en el front-matter.
      </p>
      <Search autoFocus />
    </section>
  );
}