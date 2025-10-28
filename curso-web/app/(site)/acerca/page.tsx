import { buildPageMetadata } from "@/lib/seo";
import { Prose } from "@/components/Prose";

export const metadata = buildPageMetadata({
  title: "Acerca del curso",
  description:
    "Conoce los objetivos, la metodologia y la pila tecnologica de la version web del curso de Fundamentos de Python.",
  pathname: "/acerca"
});

export default function AcercaPage() {
  return (
    <Prose>
      <h1>Acerca del curso</h1>
      <p>
        Esta plataforma esta disenada para ofrecer una experiencia de aprendizaje accesible y
        moderna sobre los fundamentos de programacion en Python. Cada modulo se encuentra en un
        archivo Markdown independiente y se transforma a contenido estatico optimizado con Next.js.
      </p>
      <h2>Metodologia</h2>
      <ul>
        <li>Aprendizaje progresivo en 10 modulos mas un proyecto final integrador.</li>
        <li>Ejemplos minimalistas y ejecutables con Python 3.12.</li>
        <li>Ejercicios guiados, desafios y quizzes para reforzar conceptos.</li>
        <li>Anexos de referencia rapida para repasar sintaxis y comandos clave.</li>
      </ul>
      <h2>Pila tecnologica</h2>
      <ul>
        <li>Next.js (App Router) y TypeScript para generacion estatica.</li>
        <li>Tailwind CSS + tipografia optimizada para lectura.</li>
        <li>remark/rehype para procesar Markdown y anadir tabla de contenidos.</li>
        <li>Busqueda con MiniSearch generada en el build.</li>
      </ul>
      <h2>Licencia y contribuciones</h2>
      <p>
        El contenido esta disponible bajo licencia Creative Commons BY-SA. Se incentiva a la
        comunidad a abrir issues y pull requests con mejoras, nuevas actividades o correcciones.
      </p>
    </Prose>
  );
}