# Módulo 1. Introducción a Python, instalación y flujo de trabajo (CLI/IDE/virtualenv)

## Objetivos de aprendizaje

- Verificar la instalación de Python 3.12+ y configurar la línea de comandos para ejecutar scripts.
- Diferenciar el uso del REPL, los scripts y los notebooks según el caso de uso.
- Crear y activar entornos virtuales con `venv` o `uv`, manteniendo dependencias aisladas.
- Integrar un editor/IDE y configurar herramientas básicas de productividad (formatters y linters).

## Temario

- Panorama de Python y aplicaciones típicas.
- Instalación en Windows, macOS y Linux; verificación de versión.
- Uso del intérprete interactivo (REPL) y ejecución de scripts `.py`.
- Estructura mínima de un proyecto y creación de entornos virtuales.
- Primer script en Python y lectura de argumentos con `sys.argv`.
- Configuración inicial de Visual Studio Code o PyCharm.
- Gestión de paquetes con `pip`/`uv` y actualización controlada.

## Conceptos clave

- **REPL (Read-Eval-Print Loop):** Intérprete interactivo para validar ideas rápidamente.
- **Entorno virtual:** Carpeta que contiene un intérprete y dependencias aisladas del sistema.
- **PATH:** Variable de entorno que determina qué ejecutables encuentra el sistema.
- **Script:** Archivo `.py` ejecutado por el intérprete que orquesta lógica reutilizable.
- **Editor/IDE:** Herramienta que facilita resaltado, linting, depuración y refactorizaciones.

## Ejemplos de código

### Ejemplo 1. Verificar versión y ruta del intérprete

```python
import sys
from pathlib import Path

def show_runtime_info() -> None:
    """Muestra detalles clave para detectar instalaciones incorrectas."""
    executable = Path(sys.executable).resolve()
    print(f"Versión de Python: {sys.version.split()[0]}")
    print(f"Ejecutable en uso: {executable}")
    print(f"Directorio actual: {Path.cwd()}")

if __name__ == "__main__":
    show_runtime_info()
```

### Ejemplo 2. Leer argumentos y variables de entorno

```python
import os
import sys

def greet_user(default: str = "Pythonista") -> None:
    """Prioriza argumentos CLI y permite personalizar el saludo vía variable de entorno."""
    name = os.getenv("COURSE_USER", default)
    if len(sys.argv) > 1:
        # Los argumentos explícitos deben ganar a las configuraciones implícitas.
        name = sys.argv[1]
    print(f"Bienvenido/a, {name}. ¡Tu entorno está listo!")

if __name__ == "__main__":
    greet_user()
```

### Ejemplo 3. Crear un entorno virtual desde Python

```python
import subprocess
import sys

def ensure_venv(venv_path: str = ".venv") -> None:
    """Automatiza la creación del entorno para evitar instalaciones globales accidentales."""
    subprocess.run([sys.executable, "-m", "venv", venv_path], check=True)
    print(f"Entorno virtual creado en {venv_path}. Actívalo antes de instalar dependencias.")

if __name__ == "__main__":
    ensure_venv()
```

## Buenas prácticas y errores comunes

- ✅ Documentar la versión de Python y dependencias en cada proyecto para garantizar reproducibilidad.
- ✅ Activar siempre el entorno virtual antes de instalar paquetes (`source .venv/bin/activate` o `.\.venv\Scripts\Activate`).
- ❌ Instalar paquetes globalmente con privilegios de administrador; dificulta mantener versiones y puede romper otros proyectos.
- ❌ Omitir la actualización periódica de `pip`, lo que genera incompatibilidades con paquetes recientes.

## Ejercicio guiado

1. Crea un script `bootstrap.py` que valide la instalación ejecutando `python bootstrap.py`.
2. El script debe:
   - Verificar la versión (`>= 3.12`).
   - Crear un entorno virtual `.venv` si no existe.
   - Imprimir instrucciones de activación específicas según el sistema operativo.
3. Parte del siguiente código y completa las funciones marcadas.

```python
from __future__ import annotations

import platform
import sys
from pathlib import Path

def python_version_ok(minor_required: tuple[int, int]) -> bool:
    """Devuelve True si la versión actual es igual o superior a la requerida."""
    # TODO: comparar sys.version_info con minor_required
    raise NotImplementedError

def create_venv(target: Path) -> None:
    """Crea el entorno virtual solo si la carpeta no existe."""
    # TODO: invocar el módulo venv mediante subprocess
    raise NotImplementedError

def activation_hint(system: str, venv_dir: Path) -> str:
    """Devuelve el comando de activación recomendado según el sistema."""
    # TODO: devolver comandos para Windows, Linux/macOS
    raise NotImplementedError

def main() -> None:
    required = (3, 12)
    if not python_version_ok(required):
        print("Actualiza Python a la versión 3.12 o superior antes de continuar.")
        sys.exit(1)

    target = Path(".venv")
    create_venv(target)
    os_name = platform.system()
    hint = activation_hint(os_name, target)
    print(f"Activa el entorno con: {hint}")

if __name__ == "__main__":
    main()
```

4. Datos de prueba: ejecuta el script en tu máquina limpia; si `.venv` ya existe, reintenta tras eliminarla.
5. Salida esperada: mensajes que confirmen versión válida, creación de `.venv` (solo la primera vez) y comando de activación.

<details><summary>Solución</summary>

```python
from __future__ import annotations

import platform
import subprocess
import sys
from pathlib import Path

def python_version_ok(minor_required: tuple[int, int]) -> bool:
    major, minor = sys.version_info[:2]
    return (major, minor) >= minor_required

def create_venv(target: Path) -> None:
    if target.exists():
        print(f"El entorno {target} ya existe. Reutilízalo.")
        return
    subprocess.run([sys.executable, "-m", "venv", str(target)], check=True)
    print(f"Creado entorno virtual en {target}")

def activation_hint(system: str, venv_dir: Path) -> str:
    if system == "Windows":
        return fr"{venv_dir}\Scripts\Activate.ps1"
    return f"source {venv_dir}/bin/activate"

def main() -> None:
    required = (3, 12)
    if not python_version_ok(required):
        print("Actualiza Python a la versión 3.12 o superior antes de continuar.")
        sys.exit(1)

    target = Path(".venv")
    create_venv(target)
    os_name = platform.system()
    hint = activation_hint(os_name, target)
    print(f"Activa el entorno con: {hint}")

if __name__ == "__main__":
    main()
```

</details>

## Desafío

Construye una guía CLI llamada `setup-course.py` que:

- Detecte el sistema operativo y ofrezca instalar herramientas opcionales (VS Code, `uv`, `pipx`) mostrando enlaces oficiales.
- Cree un archivo `environment-report.txt` con la salida de `python -m site` y las rutas relevantes del intérprete.
- Criterios de aceptación:
  - Usa solo biblioteca estándar.
  - El script falla con código de salida distinto de cero si la versión de Python es inferior a 3.12.
  - El archivo de reporte incluye fecha, rutas críticas y recomendaciones de actualización.

## Quiz rápido

1. ¿Qué ventaja principal ofrece un entorno virtual?
   - a) Ejecutar scripts más rápido.
   - b) Aislar dependencias por proyecto.
   - c) Compilar código a binarios.
   - d) Ejecutar Python sin instalarlo.
2. ¿Qué comando muestra la versión actual de Python?
   - a) `python --where`
   - b) `python --version`
   - c) `pip show python`
   - d) `python -m pip version`
3. ¿Cuándo es recomendable usar el REPL?
   - a) Para procesar grandes volúmenes de datos en producción.
   - b) Para experimentar con fragmentos de código pequeños.
   - c) Para compilar programas en C.
   - d) Para administrar paquetes del sistema operativo.
4. ¿Cuál es la responsabilidad principal de `pip`?
   - a) Administrar versiones del núcleo de Python.
   - b) Ejecutar scripts automáticamente al iniciar sesión.
   - c) Instalar y gestionar paquetes Python.
   - d) Convertir scripts a ejecutables.
5. ¿Por qué es preferible configurar un IDE con linting desde el primer módulo?
   - a) El IDE reemplaza al intérprete de Python.
   - b) Para que el IDE escriba el código automáticamente.
   - c) El linting detecta errores y estilo, facilitando buenas prácticas desde el inicio.
   - d) Porque sin IDE no se pueden ejecutar scripts.

<details><summary>Respuestas</summary>
1. b  
2. b  
3. b  
4. c  
5. c
</details>

## Recursos recomendados

- [Documentación oficial de instalación de Python](https://docs.python.org/3/using/index.html)
- [Guía de entornos virtuales venv](https://docs.python.org/3/library/venv.html)
- [Introducción al uso de VS Code con Python](https://code.visualstudio.com/docs/python/python-tutorial)
- [Gestión de paquetes con pip](https://pip.pypa.io/en/stable/user_guide/)

## Checklist de final de módulo

- [ ] Python 3.12+ instalado y verificado con `python --version`.
- [ ] Primer script ejecutado desde la terminal y el REPL utilizado para probar fragmentos.
- [ ] Entorno virtual creado y activado correctamente.
- [ ] Editor/IDE configurado con extensión de Python y linting básico.
- [ ] Documentada la configuración inicial en un archivo `SETUP.md` o similar.

