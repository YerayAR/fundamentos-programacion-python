# Anexos

## Glosario

- **API:** Interfaz de programación que permite a distintas aplicaciones comunicarse.
- **Argumento:** Valor que se pasa a una función cuando se llama.
- **Booleano:** Tipo de dato que representa verdadero (`True`) o falso (`False`).
- **CLI (Command-Line Interface):** Interfaz basada en texto para interactuar con programas.
- **Compilación:** Proceso de traducir código fuente a código ejecutable; Python usa bytecode.
- **Dataclass:** Decorador que genera código repetitivo para clases que almacenan datos.
- **Depuración:** Proceso de identificar y corregir errores en el código.
- **Dependencia:** Paquete externo que un proyecto necesita para funcionar.
- **Docstring:** Cadena de documentación asociada a módulos, clases o funciones.
- **Entorno virtual:** Aislamiento de dependencias para un proyecto específico.
- **Excepción:** Evento que altera el flujo normal del programa debido a un error.
- **Fixture:** Elemento de `pytest` que prepara datos o contexto reutilizable.
- **Función pura:** Función que depende solo de sus argumentos y no produce efectos secundarios.
- **Generador:** Función que produce una secuencia de valores usando `yield`.
- **Hashable:** Objeto que tiene un hash inmutable y puede usarse como clave en un diccionario.
- **Inmutabilidad:** Propiedad de un objeto que impide cambios después de su creación.
- **Iterador:** Objeto que produce elementos de una colección de manera secuencial.
- **Linting:** Análisis estático para detectar errores y problemas de estilo.
- **Logging:** Registro estructurado de eventos durante la ejecución.
- **Módulo:** Archivo de Python que agrupa funciones, clases o variables relacionadas.
- **Mutabilidad:** Capacidad de un objeto para cambiar su estado interno.
- **Package (paquete):** Carpeta con `__init__.py` que agrupa módulos.
- **PEP:** Python Enhancement Proposal; documento que define estándares y mejoras.
- **Protocol:** Interfaz estructural definida con `typing` que describe métodos esperados.
- **REPL:** Intérprete interactivo de Python (Read-Eval-Print Loop).
- **Serialización:** Conversión de estructuras en un formato para almacenarlas o transmitirlas.
- **Test unitario:** Verificación automatizada de una pieza pequeña de código.
- **Tipado estático opcional:** Sistema de anotaciones de tipo que ayuda a documentar y validar.
- **Truthiness:** Reglas que determinan si un valor se considera verdadero o falso.

## Cheatsheets

### Sintaxis básica

| Concepto | Ejemplo | Nota |
| --- | --- | --- |
| Definir variable | `mensaje = "Hola"` | Python infiere tipos automáticamente. |
| Condicional | `if x > 0: ...` | Usa indentación de 4 espacios. |
| Función | `def saludo(nombre: str) -> str:` | Documenta con docstrings y tipos. |
| Bucles | `for item in items:` | Puede usarse `else` opcional. |
| Comprensión | `[n**2 for n in range(5)]` | Útil para transformaciones simples. |

### Colecciones

| Estructura | Literal | Operaciones clave |
| --- | --- | --- |
| Lista | `[1, 2, 3]` | `append`, `extend`, `sort` |
| Tupla | `(1, 2, 3)` | Desempaquetado, inmutable |
| Conjunto | `{"a", "b"}` | `union`, `intersection`, `difference` |
| Diccionario | `{"k": "v"}` | `get`, `items`, `setdefault` |

### Slicing

| Ejemplo | Resultado | Descripción |
| --- | --- | --- |
| `items[1:4]` | Elementos 1 a 3 | Intervalo abierto en el extremo derecho. |
| `items[:3]` | Primeros tres | Omite inicio. |
| `items[::2]` | Cada dos elementos | Usa paso (`step`). |
| `items[::-1]` | Invertido | Paso negativo revierte la secuencia. |

### Formateo de cadenas

| Técnica | Ejemplo | Ventaja |
| --- | --- | --- |
| f-string | `f"{valor:.2f}"` | Interpolación expresiva y segura. |
| `str.format` | `"{} {}".format(a, b)` | Compatible con versiones antiguas. |
| `%` formato | `"%.2f" % numero` | Legado; evita en código nuevo. |

## Guía rápida de depuración

- **`print` vs `logging`:** Usa `logging` para mensajes persistentes y filtrables; reserva `print` para comprobaciones puntuales.
- **`pdb` (Python Debugger):**
  1. Inserta `import pdb; pdb.set_trace()` donde quieras pausar.
  2. Comandos útiles: `n` (next), `s` (step into), `c` (continue), `l` (listar código), `p variable`.
- **Depuración en VS Code:**
  - Configura una configuración en `.vscode/launch.json` (botón “Run and Debug”).
  - Coloca breakpoints en el margen izquierdo.
  - Usa la paleta para ejecutar “Python: Current File”.
- **Buenas prácticas:**
  - Reproducir primero el error con un caso mínimo.
  - Revisar trazas (`traceback`) de abajo hacia arriba para identificar el origen.
  - Añadir pruebas que capture el fallo antes de corregirlo.

## Plantillas

### Estructura de carpetas recomendada

```
project/
  src/
    paquete/
      __init__.py
      main.py
      utils.py
  tests/
    __init__.py
    test_main.py
  pyproject.toml
  README.md
```

### `pyproject.toml` mínimo comentado

```toml
[project]
name = "mi-paquete"
version = "0.1.0"
description = "Descripción breve"
requires-python = ">=3.12"
dependencies = [
  "typer>=0.12,<0.13",
]

[tool.pytest.ini_options]
addopts = "-q"

[tool.ruff]
line-length = 100  # Ajusta el ancho de línea según el equipo.
target-version = "py312"
```

### `pytest.ini` ejemplo

```ini
[pytest]
addopts = -ra
testpaths =
    tests
filterwarnings =
    error::DeprecationWarning
```

### Plantilla de script de automatización (`scripts/quality.sh`)

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Ejecutando linting..."
ruff check src tests

echo "Ejecutando pruebas..."
pytest

echo "Listo."
```

