# Fundamentos de Programación en Python — Sitio estático

Sitio web estático generado con **Next.js (App Router)** y **Tailwind CSS** que publica el curso “Fundamentos de Programación en Python — Curso en 10 módulos”. Todo el contenido se origina en archivos Markdown independientes y se renderiza como páginas estáticas optimizadas para Vercel.

## Características principales

- **Markdown → MDX** con front-matter YAML, tabla de contenidos automática y resaltado de código (Prism).
- **Generación estática completa (SSG)** con navegación siguiente/anterior, breadcrumbs y botón “Ver en GitHub”.
- **Búsqueda instantánea** sin backend usando MiniSearch; el índice se genera durante el build.
- **Tema claro/oscuro** con persistencia y detección del modo del sistema.
- **SEO integrado** (Open Graph, Twitter Cards, sitemap.xml, robots.txt) y endpoint dinámico `/api/og`.
- **PWA ligera**: `manifest.webmanifest`, iconos optimizados y registro del service worker.

## Requisitos

- Node.js 18.18+ (recomendado 20.x)
- npm (se usa `npm ci` para instalaciones reproducibles)

## Estructura relevante

```
content/
  modulos/                # Módulos 01-09
  proyecto-final/         # Proyecto integrador
  anexos/                 # Glosario y cheatsheets
app/
  (site)/                 # Rutas públicas (home, módulos, etc.)
  api/og/route.ts         # OG image dinámica
  sitemap.ts, robots.ts   # SEO
components/               # UI reutilizable (Header, Sidebar, Toc, Search, etc.)
lib/                      # Capa de datos (content, search, SEO helpers)
scripts/build-search-index.ts
styles/                   # globals.css y ajustes de tipografía
public/                   # favicon, manifiesto, icons, sw.js, search-index.json (generado)
```

## Instalación y uso

```bash
npm ci
npm run dev
```

La ruta `http://localhost:3000` sirve el sitio en modo desarrollo. El buscador necesita `public/search-index.json`; en desarrollo puedes generarlo manualmente:

```bash
npm run build   # Ejecuta scripts/build-search-index.ts y next build
```

> Nota: el script `npm run build` utiliza `ts-node` mediante loader ESM para compilar `scripts/build-search-index.ts` antes de `next build`.

### Scripts disponibles

| Script | Descripción |
| --- | --- |
| `npm run dev` | Next.js en modo desarrollo. |
| `npm run build` | Genera índice de búsqueda y compila el sitio. |
| `npm start` | Sirve la versión compilada (producción). |
| `npm run lint` | Ejecuta `next lint`. |
| `npm run typecheck` | Verifica tipos con `tsc --noEmit`. |

## Variables de entorno

- `REPO_URL` (opcional): URL base del repositorio que contiene los archivos Markdown. Se usa en los botones “Ver en GitHub”. Por defecto apunta a `https://github.com/tu-org/fundamentos-programacion-python`.
- `NEXT_PUBLIC_SITE_URL` (opcional): URL canónica del despliegue, utilizada en metadatos y sitemap (`https://fundamentos-python.vercel.app` por defecto).

## Flujo editorial

1. Añade o modifica archivos `.md` en `content/` manteniendo el front-matter:
   ```yaml
   ---
   title: "Módulo 1 — Introducción"
   description: "Resumen corto."
   order: 1
   keywords: ["python", "instalación"]
   ---
   ```
2. Ejecuta `npm run build` para regenerar el índice de búsqueda y validar el sitio.
3. Confirma que las nuevas secciones aparecen en la tabla de contenidos, navegación y búsqueda.

## Despliegue en Vercel

### Opción A — CLI

```bash
npm i -g vercel
vercel login
vercel        # primera importación interactiva
vercel --prod # despliegues posteriores a producción
```

### Opción B — Dashboard

1. Importa el repositorio desde GitHub en [vercel.com/new](https://vercel.com/new).
2. Framework: **Next.js**. Usa los comandos por defecto (`npm ci`, `npm run build`).
3. Configura variables (`REPO_URL`, `NEXT_PUBLIC_SITE_URL`) si aplica.
4. Confirma el deploy; Vercel detectará `.next` como salida.

## Buenas prácticas y comprobaciones

- `npm run lint && npm run typecheck` antes de abrir PRs.
- Ejecuta `npm run build` para generar `search-index.json` y asegurarte de que el contenido compila correctamente.
- Usa Lighthouse en el preview (Chrome) para validar ≥90 en Performance/Accessibility/SEO.
- El service worker (`public/sw.js`) es mínimo; amplíalo si necesitas caché offline avanzada.

## Licencia

El sitio y su contenido se distribuyen bajo **Creative Commons BY-SA**, salvo que se indique lo contrario en los archivos individuales.
