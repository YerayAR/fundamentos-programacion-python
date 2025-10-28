# Módulo 9. Testing básico con pytest, logging y calidad de código (PEP 8, linters)

## Objetivos de aprendizaje

- Escribir pruebas unitarias simples con `pytest`.
- Configurar `logging` para instrumentar aplicaciones y depurar comportamientos.
- Aplicar estándares de estilo (PEP 8) y analizar código con linters (p. ej., `ruff`, `flake8`).
- Automatizar verificaciones básicas mediante scripts o `tox`/`nox`.

## Temario

- Instalación y estructura mínima de `pytest`.
- Asserts expresivos y fixtures básicas.
- Configuración de `logging` con handlers y niveles apropiados.
- PEP 8 y herramientas de formateo (`black`, `ruff`, `isort`).
- Integración de pruebas y linters en tareas de CI.
- Errores comunes: pruebas frágiles, logs excesivos, mezcla de responsabilidades.

## Conceptos clave

- **Prueba unitaria:** Evalúa un componente pequeño y aislado del sistema.
- **Fixture:** Función de `pytest` que prepara contexto reutilizable.
- **Nivel de log:** Prioridad de mensajes (`DEBUG`, `INFO`, `WARNING`, etc.).
- **PEP 8:** Guía oficial de estilo de código en Python.
- **CI (Integración Continua):** Automatización de pruebas y revisiones en cada cambio.

## Ejemplos de código

### Ejemplo 1. Prueba con `pytest`

```python
# tests/test_math_utils.py
from math_utils import average

def test_average_returns_mean() -> None:
    """Valida un caso nominal para evitar regresiones básicas."""
    assert average([2, 4, 6]) == 4
```

### Ejemplo 2. Fixture sencilla

```python
# tests/conftest.py
import pytest

@pytest.fixture
def sample_data() -> list[int]:
    """Proporciona datos consistentes a múltiples pruebas."""
    return [1, 2, 3, 4]
```

### Ejemplo 3. Configuración de logging

```python
import logging

def configure_logging(level: int = logging.INFO) -> None:
    """Centraliza la configuración de logs para evitar duplicación."""
    logging.basicConfig(
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        level=level,
    )
    logging.getLogger("urllib3").setLevel(logging.WARNING)  # Reduce ruido de dependencias.
```

## Buenas prácticas y errores comunes

- ✅ Escribir pruebas pequeñas, independientes y legibles.
- ✅ Configurar niveles de log apropiados según el entorno (debug vs producción).
- ✅ Ejecutar linters y formateadores antes de enviar cambios.
- ❌ Usar `print` para depurar en lugar de logging; dificulta filtrar y persistir información.
- ❌ Escribir pruebas que dependan de datos externos no controlados (API, hora real) sin aislarlos.

## Ejercicio guiado

1. Crea el módulo `math_utils.py` con la función `average`.
2. Escribe pruebas en `tests/test_math_utils.py` cubriendo:
   - Caso normal (`[10, 20, 30]` → `20`).
   - Lista vacía (lanza `ValueError`).
3. Configura `pytest.ini` para establecer `addopts = -q`.
4. Agrega un script `scripts/run_quality.sh` (o `.ps1`) que ejecute `ruff check` y `pytest`.

<details><summary>Solución</summary>

```python
# math_utils.py
from __future__ import annotations

def average(values: list[float]) -> float:
    if not values:
        raise ValueError("La lista de valores no puede estar vacía.")
    return sum(values) / len(values)
```

```python
# tests/test_math_utils.py
import pytest

from math_utils import average

def test_average_nominal() -> None:
    assert average([10, 20, 30]) == 20

def test_average_raises_for_empty_list() -> None:
    with pytest.raises(ValueError):
        average([])
```

```ini
# pytest.ini
[pytest]
addopts = -q
```

</details>

## Desafío

Implementa una canalización de calidad:

- Script `quality.py` que ejecute `ruff`, `pytest` y opcionalmente `mypy`.
- El script debe registrar con `logging` el inicio y fin de cada etapa.
- Añade un archivo `pyproject.toml` mínimo con configuraciones para `ruff` y `pytest`.
- Criterios de aceptación:
  - Salida con código de error si cualquiera de las herramientas falla.
  - Reporte de duración aproximada por etapa.
  - Prueba que simule un fallo (por ejemplo, marcar un módulo con lint incorrecto).

## Quiz rápido

1. ¿Qué comando ejecuta todas las pruebas con `pytest`?
   - a) `pytest`
   - b) `python pytest`
   - c) `py.test run`
   - d) `pytest run all`
2. ¿Qué nivel de logging se recomienda por defecto en producción?
   - a) `DEBUG`
   - b) `INFO`
   - c) `WARNING`
   - d) `CRITICAL`
3. ¿Cuál es el propósito principal de un linter?
   - a) Ejecutar pruebas unitarias.
   - b) Formatear automáticamente el código.
   - c) Detectar problemas de estilo y errores potenciales.
   - d) Compilar el código a binarios.
4. ¿Qué archivo se utiliza para configurar múltiples herramientas modernas?
   - a) `setup.py`
   - b) `pyproject.toml`
   - c) `requirements-dev.txt`
   - d) `MANIFEST.in`
5. ¿Cuál es la ventaja de los fixtures en `pytest`?
   - a) Reemplazan completamente a las funciones de prueba.
   - b) Permiten compartir preparación de datos entre pruebas sin duplicación.
   - c) Aceleran la ejecución compilando código.
   - d) Solo sirven para pruebas parametrizadas.

<details><summary>Respuestas</summary>
1. a  
2. c  
3. c  
4. b  
5. b
</details>

## Recursos recomendados

- [Documentación oficial de pytest](https://docs.pytest.org/en/stable/)
- [Introducción a logging](https://docs.python.org/3/howto/logging.html)
- [PEP 8 — Style Guide for Python Code](https://peps.python.org/pep-0008/)
- [Ruff — linter rápido](https://docs.astral.sh/ruff/)

## Checklist de final de módulo

- [ ] Implementé pruebas unitarias básicas con `pytest`.
- [ ] Configuré logging con formateadores y niveles adecuados.
- [ ] Apliqué PEP 8 y ejecuté linters antes de entregar código.
- [ ] Automatizé calidad mediante scripts o herramientas de CI.
- [ ] Identifiqué pruebas frágiles y mejoré su robustez.

