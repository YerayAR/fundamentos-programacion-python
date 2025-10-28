"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import MiniSearch, { type SearchResult } from "minisearch";
import type { SearchDocument } from "@/lib/search";

type SearchPayload = {
  documents: SearchDocument[];
  index: ReturnType<MiniSearch["toJSON"]>;
  config: {
    fields: readonly string[];
    storeFields: readonly string[];
    searchOptions: {
      prefix: boolean;
      fuzzy: number;
      boost: Record<string, number>;
    };
  };
};

type StatefulMiniSearch = MiniSearch<SearchDocument>; 

type SearchProps = {
  autoFocus?: boolean;
};

export function Search({ autoFocus = false }: SearchProps) {
  const [query, setQuery] = useState("");
  const [documents, setDocuments] = useState<SearchDocument[]>([]);
  const [miniSearch, setMiniSearch] = useState<StatefulMiniSearch | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loadIndex = async () => {
      try {
        const response = await fetch("/search-index.json");
        if (!response.ok) {
          throw new Error(`Indice no disponible (${response.status})`);
        }
        const payload = (await response.json()) as SearchPayload;
        if (cancelled) {
          return;
        }
        const instance = new MiniSearch<SearchDocument>({
          fields: Array.from(payload.config.fields),
          storeFields: Array.from(payload.config.storeFields),
          searchOptions: payload.config.searchOptions
        });
        instance.addAll(payload.documents);
        setMiniSearch(instance);
        setDocuments(payload.documents);
      } catch (error) {
        console.error(error);
        if (!cancelled) {
          setError("Indice de busqueda no generado. Ejecuta npm run build.");
        }
      }
    };

    loadIndex();
    return () => {
      cancelled = true;
    };
  }, []);

  const results = useMemo(() => {
    if (!miniSearch || !query.trim()) {
      return [] as SearchResult[];
    }
    return miniSearch.search(query, { boost: { title: 4, keywords: 2 } });
  }, [miniSearch, query]);

  return (
    <div className="w-full max-w-3xl">
      <div className="flex flex-col gap-2">
        <label htmlFor="search" className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Busca por titulo, palabra clave o encabezado
        </label>
        <input
          id="search"
          type="search"
          autoFocus={autoFocus}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ejemplo: entornos virtuales, pytest, JSON..."
          className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-base shadow-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-brand-dark dark:focus:ring-brand-dark"
        />
      </div>

      {error && (
        <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-500/40 dark:bg-amber-900/20 dark:text-amber-200">
          {error}
        </p>
      )}

      {query && results.length === 0 && !error && (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          No se encontraron resultados para &quot;{query}&quot;.
        </p>
      )}

      {results.length > 0 && (
        <ul className="mt-6 space-y-4">
          {results.slice(0, 20).map((result) => {
            const doc = documents.find((item) => item.id === result.id);
            if (!doc) {
              return null;
            }
            return (
              <li
                key={result.id}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
              >
                <Link
                  href={doc.href}
                  className="text-base font-semibold text-brand transition hover:text-brand-dark dark:text-brand-dark dark:hover:text-brand"
                >
                  {doc.title}
                </Link>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{doc.description}</p>
                <p className="mt-2 text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  {doc.section === "modulo" ? "Modulo" : doc.section === "proyecto" ? "Proyecto final" : "Anexo"}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

