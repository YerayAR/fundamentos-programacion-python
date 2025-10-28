---
title: "Módulo 5 — Funciones y manejo de errores"
description: "Funciones bien documentadas, ámbito de variables y try/except robusto."
order: 5
keywords:
  - funciones
  - excepciones
  - scope
---

## Definición con tipos

```python
def aplicar_descuentos(base: float, descuentos: list[float]) -> float:
    total = base
    for descuento in descuentos:
        if not 0 <= descuento <= 0.5:
            raise ValueError("Descuento fuera de rango.")
        total *= 1 - descuento
    return round(total, 2)
```

## Docstrings y ámbito

```python
def construir_prefijo(prefijo_global: str) -> callable:
    """Crea un closure que reutiliza el prefijo en múltiples llamadas."""
    def _aplicar(valor: str) -> str:
        return f"{prefijo_global}-{valor}"
    return _aplicar
```

### Manejo de errores

```python
import json
from pathlib import Path

def cargar_config(ruta: Path) -> dict:
    try:
        return json.loads(ruta.read_text(encoding="utf-8"))
    except FileNotFoundError as error:
        raise FileNotFoundError(f"No se encontró {ruta}") from error
```
