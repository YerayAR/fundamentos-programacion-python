---
title: "Módulo 3 — Control de flujo"
description: "Condicionales, bucles y pattern matching para decisiones expresivas."
order: 3
keywords:
  - condicionales
  - bucles
  - pattern matching
---

## Condicionales legibles

```python
def clasificar(score: int) -> str:
    if score < 0 or score > 100:
        raise ValueError("Puntaje inválido.")
    if score >= 90:
        return "Excelente"
    if score >= 75:
        return "Notable"
    return "En progreso"
```

## Bucles y comprensiones

```python
numeros = [1, 2, 3, 4, 5]
cuadrados_pares = [n * n for n in numeros if n % 2 == 0]
```

### Pattern matching en 3.12

```python
def manejar(evento: tuple[str, dict[str, str]]) -> str:
    match evento:
        case ("create", {"resource": recurso}):
            return f"Creando {recurso}"
        case ("delete", {"resource": recurso, "force": "yes"}):
            return f"Eliminando {recurso} forzado"
        case _:
            return "Acción no reconocida"
```
