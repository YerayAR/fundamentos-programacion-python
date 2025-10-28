# Fundamentos de Programación en Python — Curso en 10 módulos

**Subtítulo:** De los fundamentos a la práctica profesional  
**Autor:** _Por definir_  
**Versión:** 1.0.0 (28 de octubre de 2025)  
**Prerrequisitos:** Lógica básica, familiaridad mínima con la línea de comandos, interés por la automatización.  
**Público objetivo:** Personas sin experiencia previa en programación o profesionales de otras áreas que desean adoptar Python para análisis, automatización o desarrollo de software.

---

## Resultados de aprendizaje generales

- Aplicar los principios fundamentales de Python para resolver problemas reales de forma estructurada.
- Diseñar scripts modulares, documentados y testeables que sigan las guías de estilo oficiales.
- Manipular datos en formatos comunes (texto, JSON, CSV) y automatizar flujos de E/S.
- Construir programas orientados a objetos que usen clases, herencia, dataclasses y anotaciones de tipo.
- Gestionar entornos, dependencias y paquetes, entregando código reproducible.
- Implementar pruebas automatizadas y prácticas de observabilidad (logging) para asegurar la calidad.
- Integrar todo lo aprendido en un proyecto final que abarque desde la especificación hasta la entrega.

## Requisitos técnicos

| Recurso | Recomendación |
| --- | --- |
| Python | Python 3.12 o superior instalado desde [python.org](https://www.python.org/downloads/) o gestor de paquetes oficial del sistema operativo. |
| Gestor de entornos | `venv` (incluido en la biblioteca estándar) o [uv](https://github.com/astral-sh/uv) para aislar dependencias. |
| Editor/IDE | Visual Studio Code (extensión Python), PyCharm Community o cualquier editor con soporte para linting y depuración. |
| Consola | Terminal con soporte UTF-8 (PowerShell 7+, bash, zsh). |

### Ejecución de scripts y notebooks

- Crear un entorno virtual por proyecto (`python -m venv .venv`) y activarlo antes de instalar dependencias.
- Ejecutar scripts con `python ruta/al/script.py` desde la terminal del entorno activado.
- Para notebooks, instalar `pip install jupyterlab` dentro del entorno y ejecutar `jupyter lab`.
- Usar `python -m pip install --upgrade pip` antes de instalar paquetes para evitar conflictos.
- Validar versiones de dependencias con `pip list` o `uv pip list` y documentarlas en `requirements.txt` o `pyproject.toml`.

## Tabla de Contenidos

- [Fundamentos de Programación en Python — Curso en 10 módulos](#fundamentos-de-programación-en-python--curso-en-10-módulos)
- [Resultados de aprendizaje generales](#resultados-de-aprendizaje-generales)
- [Requisitos técnicos](#requisitos-técnicos)
- [Módulo 1. Introducción a Python, instalación y flujo de trabajo (CLI/IDE/virtualenv)](modulo01-introduccion.md)
- [Módulo 2. Tipos de datos, variables y operadores](modulo02-tipos.md)
- [Módulo 3. Control de flujo: condicionales y bucles](modulo03-control-flujo.md)
- [Módulo 4. Estructuras de datos: listas, tuplas, conjuntos y diccionarios](modulo04-estructuras-datos.md)
- [Módulo 5. Funciones, ámbito, documentación y manejo de errores (try/except)](modulo05-funciones.md)
- [Módulo 6. Programación modular y paquetes; entorno virtual y dependencias (pip/uv)](modulo06-modularidad.md)
- [Módulo 7. Archivos y E/S, JSON/CSV; introducción a `pathlib`](modulo07-archivos.md)
- [Módulo 8. Orientación a Objetos: clases, herencia, dataclasses y typing](modulo08-oop.md)
- [Módulo 9. Testing básico con pytest, logging y calidad de código (PEP 8, linters)](modulo09-testing.md)
- [Módulo 10. Proyecto Final Integrador](modulo10-proyecto-final.md)
- [Anexos](anexos.md)

---

Cada módulo se entrega en un archivo `.md` independiente y contiene objetivos, actividades prácticas, ejercicios guiados, desafíos y un quiz rápido. Se recomienda avanzar en orden, dedicar tiempo a los ejercicios y registrar dudas para discusión en sesiones síncronas o foros.

