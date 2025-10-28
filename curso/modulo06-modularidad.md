# Módulo 6. Programación modular y paquetes; entorno virtual y dependencias (pip/uv)

## Objetivos de aprendizaje

- Organizar proyectos en módulos y paquetes reutilizables.
- Gestionar dependencias con `pip` y `uv`, registrándolas en archivos declarativos.
- Comprender el rol de `__init__.py`, `__main__.py` y el paquete raíz.
- Configurar scripts ejecutables y puntos de entrada.

## Temario

- Estructura de carpetas para proyectos modulares.
- Importaciones relativas y absolutas.
- Creación de paquetes (`__init__.py`) y módulos utilitarios.
- Archivos de dependencias: `requirements.txt`, `pyproject.toml`, `uv pip compile`.
- Scripts como paquetes ejecutables (`python -m paquete`).
- Buenas prácticas de versionado semántico.
- Errores comunes: importaciones circulares, dependencias no fijadas.

## Conceptos clave

- **Módulo:** Archivo `.py` que contiene código reutilizable.
- **Paquete:** Carpeta con `__init__.py` que agrupa módulos relacionados.
- **Punto de entrada (`entry point`):** Ubicación desde donde inicia el programa (`if __name__ == "__main__":`).
- **Especificador de versión (`>=`, `~=`):** Regla que define rangos al instalar dependencias.
- **Lockfile:** Archivo que fija versiones exactas para despliegues reproducibles.

## Ejemplos de código

### Ejemplo 1. Paquete con inicialización explícita

```python
# archivo: analytics/__init__.py
"""Funciones analíticas de alto nivel."""

from .core import summarize  # reexporta para simplificar imports desde clientes.
from .version import __version__

__all__ = ["summarize", "__version__"]
```

### Ejemplo 2. Script ejecutable como módulo

```python
# archivo: analytics/__main__.py
from .core import summarize

def main() -> None:
    """Permite ejecutar `python -m analytics` como comando."""
    summary = summarize([1, 2, 3, 4])
    print(summary)

if __name__ == "__main__":
    main()
```

### Ejemplo 3. Uso de `uv` para gestionar dependencias

```bash
uv pip install --upgrade pip
uv pip install pandas==2.2.3 typer~=0.12
uv pip freeze > requirements.lock
```

## Buenas prácticas y errores comunes

- ✅ Mantener una estructura `src/` para código productivo y `tests/` para pruebas.
- ✅ Documentar dependencias mínimas y opcionales (extras) en `pyproject.toml`.
- ✅ Usar importaciones absolutas para mayor claridad y evitar ciclos.
- ❌ Instalar dependencias sin fijar versiones mínimas razonables.
- ❌ Mezclar responsabilidades en un mismo módulo; dividir por dominio.

## Ejercicio guiado

1. Organiza un paquete `calculator` con la siguiente estructura:
   ```
   calculator/
     __init__.py
     operations.py
     cli.py
   ```
2. Requisitos:
   - `operations.py` define funciones `add`, `subtract`, `multiply`, `divide`.
   - `cli.py` expone un `main()` que usa `argparse` para invocar operaciones.
   - `__init__.py` reexporta las funciones principales y define `__all__`.
3. Datos de prueba: `python -m calculator add 2 3` → `5`.

<details><summary>Solución</summary>

```python
# calculator/operations.py
from __future__ import annotations

def add(a: float, b: float) -> float:
    return a + b

def subtract(a: float, b: float) -> float:
    return a - b

def multiply(a: float, b: float) -> float:
    return a * b

def divide(a: float, b: float) -> float:
    if b == 0:
        raise ZeroDivisionError("No se puede dividir entre cero.")
    return a / b
```

```python
# calculator/__init__.py
from .operations import add, subtract, multiply, divide

__all__ = ["add", "subtract", "multiply", "divide"]
```

```python
# calculator/cli.py
from __future__ import annotations

import argparse
from typing import Callable

from . import add, divide, multiply, subtract

OPERATIONS: dict[str, Callable[[float, float], float]] = {
    "add": add,
    "subtract": subtract,
    "multiply": multiply,
    "divide": divide,
}

def main() -> None:
    parser = argparse.ArgumentParser(description="Calculadora modular.")
    parser.add_argument("operation", choices=OPERATIONS.keys())
    parser.add_argument("a", type=float)
    parser.add_argument("b", type=float)
    args = parser.parse_args()

    result = OPERATIONS[args.operation](args.a, args.b)
    print(result)

if __name__ == "__main__":
    main()
```

</details>

## Desafío

Construye un paquete `tasker` que:

- Permita registrar tareas en un archivo JSON con comandos `add`, `list`, `complete`.
- Use `pathlib.Path` y maneje la ruta de datos desde una variable de entorno.
- Exponga un punto de entrada en `pyproject.toml` para ejecutar `tasker` desde la línea de comandos.
- Criterios de aceptación:
  - Implementa `TaskRepository` en `tasker/storage.py` con manejo seguro de archivos.
  - Documenta las dependencias en `requirements.txt` o `pyproject.toml`.
  - Agrega pruebas que simulen las operaciones principales en un directorio temporal.

## Quiz rápido

1. ¿Qué archivo señala que un directorio es un paquete?
   - a) `main.py`
   - b) `setup.cfg`
   - c) `__init__.py`
   - d) `pyproject.toml`
2. ¿Qué comando instala dependencias listadas en `requirements.txt`?
   - a) `pip list`
   - b) `pip install -r requirements.txt`
   - c) `pip build requirements.txt`
   - d) `pip update`
3. ¿Qué ventaja aporta `python -m paquete`?
   - a) Compila el paquete.
   - b) Ejecuta el módulo `__main__.py` del paquete.
   - c) Instala automáticamente el paquete.
   - d) Abre el paquete en un editor.
4. ¿Qué problema provoca una importación circular?
   - a) El código se ejecuta más rápido.
   - b) El intérprete lanza errores al no completar la carga de módulos.
   - c) Las funciones se duplican.
   - d) Los paquetes pierden su `__name__`.
5. ¿Qué herramienta facilita gestionar dependencias con caché y compilación rápida?
   - a) `pip`
   - b) `pipenv`
   - c) `uv`
   - d) `easy_install`

<details><summary>Respuestas</summary>
1. c  
2. b  
3. b  
4. b  
5. c
</details>

## Recursos recomendados

- [Módulos y paquetes](https://docs.python.org/3/tutorial/modules.html)
- [Gestión de dependencias con pip](https://pip.pypa.io/en/stable/user_guide/)
- [Documentación de uv](https://docs.astral.sh/uv/)
- [PEP 621 — metadatos en `pyproject.toml`](https://peps.python.org/pep-0621/)

## Checklist de final de módulo

- [ ] Organicé código en módulos y paquetes con `__init__.py`.
- [ ] Ejecuté paquetes con `python -m` y comprendí puntos de entrada.
- [ ] Gestioné dependencias con `pip` o `uv`, documentándolas correctamente.
- [ ] Evité importaciones circulares mediante diseño modular.
- [ ] Preparé estructura de proyecto con carpetas `src/` y `tests/`.

