---
title: "Módulo 4 — Estructuras de datos"
description: "Listas, tuplas, conjuntos y diccionarios para organizar información."
order: 4
keywords:
  - listas
  - diccionarios
  - conjuntos
  - python
---

## Selección de estructuras

| Escenario | Estructura | Motivo |
| --- | --- | --- |
| Orden con mutaciones | Lista | Inserciones y slicing |
| Datos inmutables | Tupla | Seguridad y hashable |
| Unicidad | Conjunto | Operaciones de pertenencia O(1) |
| Clave-valor | Diccionario | Acceso directo por clave |

### Ejemplo práctico

```python
from collections import Counter

def inventario_total(*inventarios: dict[str, int]) -> dict[str, int]:
    acumulado = Counter()
    for inventario in inventarios:
        acumulado.update(inventario)
    return dict(acumulado.most_common())
```

## Comprensiones

```python
usuarios = {
    user["email"]: user
    for user in datos
    if user.get("activo")
}
```
