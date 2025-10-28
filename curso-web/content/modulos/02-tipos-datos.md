---
title: "Módulo 2 — Tipos de datos y operadores"
description: "Tipos nativos, conversiones explícitas y operadores aritméticos/lógicos."
order: 2
keywords:
  - tipos
  - operadores
  - python
  - conversiones
---

## Tipos fundamentales

- `int`, `float`, `complex`
- `str` y f-strings
- `bool` y truthiness

### Conversión explícita

```python
from decimal import Decimal

subtotal = Decimal("19.99")
iva = Decimal("0.16")
total = subtotal * (Decimal("1") + iva)
print(f"Total: {total:.2f}")
```

## Operadores frecuentes

| Símbolo | Uso | Ejemplo |
| --- | --- | --- |
| `==` | Igualdad | `3 == 3` |
| `and` | Lógica booleana | `True and False` |
| `**` | Potencia | `2 ** 3` |

### Validaciones útiles

```python
from math import isclose

def safe_equals(a: float, b: float, tol: float = 1e-9) -> bool:
    return isclose(a, b, rel_tol=tol, abs_tol=tol)
```
