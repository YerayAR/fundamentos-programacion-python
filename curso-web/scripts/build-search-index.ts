#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { createSearchIndex, getSearchDocuments, getSearchIndexConfig } from "../lib/search";

async function main() {
  const documents = await getSearchDocuments();
  const mini = createSearchIndex(documents);
  const outputPath = path.join(process.cwd(), "public", "search-index.json");

  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const payload = {
    documents,
    index: mini.toJSON(),
    config: getSearchIndexConfig()
  };

  await fs.writeFile(outputPath, JSON.stringify(payload, null, 2), "utf-8");
  console.log(`search-index.json generado con ${documents.length} documentos.`);
}

main().catch((error) => {
  console.error("Error generando el indice de busqueda:", error);
  process.exit(1);
});
