# Módulo 4. Estructuras de datos: listas, tuplas, conjuntos y diccionarios

## Objetivos de aprendizaje

- Seleccionar la estructura adecuada (lista, tupla, conjunto o diccionario) según la necesidad.
- Manipular colecciones con métodos nativos (`append`, `update`, `setdefault`, etc.).
- Comprender la mutabilidad e implicaciones en funciones y aliasing.
- Emplear operaciones de conjunto y comprensión de diccionarios para transformar datos.

## Temario

- Listas y slicing avanzado.
- Tuplas inmutables y desempaquetado.
- Conjuntos (`set`, `frozenset`): operaciones y uso para deduplicar.
- Diccionarios: creación, actualización, vistas y métodos (`items`, `get`, `setdefault`).
- Comprensiones y generadores de colecciones.
- Copias superficiales vs profundas (`copy`, `deepcopy`).
- Errores comunes: aliasing, mutaciones inesperadas, claves no hashables.

## Conceptos clave

- **Mutabilidad:** Capacidad de un objeto para cambiar su estado tras la creación.
- **Alias:** Dos variables que referencian el mismo objeto en memoria.
- **Slicing:** Operación que extrae subcolecciones (`seq[inicio:fin:paso]`).
- **Comprensión de diccionarios:** Forma concisa de construir diccionarios a partir de iterables.
- **Conjunto inmutable (`frozenset`):** Útil como clave en diccionarios o miembro de otros conjuntos.

## Ejemplos de código

### Ejemplo 1. Evitar aliasing con copias

```python
from copy import deepcopy

def safe_append(config: dict[str, list[str]], key: str, value: str) -> dict[str, list[str]]:
    """Clona la configuración para evitar mutar la entrada original."""
    cloned = deepcopy(config)
    cloned.setdefault(key, []).append(value)
    return cloned

original = {"features": ["auth"]}
updated = safe_append(original, "features", "payments")
print(original, updated)  # La lista inmutable original permanece intacta.
```

### Ejemplo 2. Operaciones de conjuntos

```python
def check_permissions(user_roles: set[str], required: set[str]) -> bool:
    """Comparar conjuntos aclara intersecciones y permisos faltantes."""
    missing = required - user_roles
    if missing:
        print(f"Permisos faltantes: {missing}")
        return False
    return True

check_permissions({"lectura", "edición"}, {"lectura", "publicación"})
```

### Ejemplo 3. Comprensión de diccionarios

```python
def normalize_scores(raw: list[tuple[str, int]]) -> dict[str, float]:
    """Construye un diccionario con puntuaciones normalizadas de 0 a 1."""
    max_value = max(score for _, score in raw)
    return {name: score / max_value for name, score in raw}

print(normalize_scores([("Ana", 80), ("Luis", 70), ("Mia", 90)]))
```

## Buenas prácticas y errores comunes

- ✅ Usar tuplas para colecciones inmutables (coordenadas, claves) y listas para secuencias mutables.
- ✅ Iterar sobre `dict.items()` cuando se necesitan clave y valor simultáneamente.
- ✅ Convertir a `set` para deduplicar antes de ejecutar operaciones costosas.
- ❌ Mutar listas o diccionarios que se reciben como parámetros sin documentarlo; preferir copias.
- ❌ Utilizar listas para búsquedas que requieren unicidad; un conjunto es más eficiente.

## Ejercicio guiado

1. Crea `inventory.py` con la función `merge_inventories(*inventories: dict[str, int]) -> dict[str, int]`.
2. La función debe:
   - Sumar cantidades por producto.
   - Ignorar claves con valores negativos (alertar con `print`).
   - Ordenar el diccionario final de mayor a menor cantidad.
3. Código inicial:

```python
from __future__ import annotations

from collections import Counter

def merge_inventories(*inventories: dict[str, int]) -> dict[str, int]:
    """Combina inventarios múltiples priorizando consistencia."""
    # TODO: Implementar con Counter o sumatorios manuales
    raise NotImplementedError
```

4. Datos de prueba:
   - `{"lapices": 10, "cuadernos": 5}` y `{"lapices": 3, "borradores": 4}`
   - Un inventario con valores negativos para validar el filtrado.

<details><summary>Solución</summary>

```python
from __future__ import annotations

from collections import Counter

def merge_inventories(*inventories: dict[str, int]) -> dict[str, int]:
    counter = Counter()
    for inventory in inventories:
        for product, qty in inventory.items():
            if qty < 0:
                print(f"Ignorando cantidad negativa: {product} -> {qty}")
                continue
            counter[product] += qty
    merged = dict(counter.most_common())
    return merged
```

</details>

## Desafío

Construye un sistema de recomendaciones de cursos:

- Entrada: lista de diccionarios con cursos (`nombre`, `categorias`, `horas`).
- Salida: diccionario donde cada categoría mapea a una lista ordenada por horas descendentes.
- Usa conjuntos para deduplicar categorías y comprensiones para estructurar los datos.
- Criterios de aceptación:
  - Función principal `build_catalog(courses: list[dict[str, object]]) -> dict[str, list[str]]`.
  - Maneja cursos sin categorías declaradas.
  - Incluye prueba con categorías compartidas y cursos repetidos (mismo nombre, diferentes horas).

## Quiz rápido

1. ¿Qué estructura mantiene el orden de inserción y permite claves?
   - a) `set`
   - b) `dict`
   - c) `tuple`
   - d) `frozenset`
2. ¿Qué operación elimina duplicados mientras preserva elementos únicos?
   - a) `list.count`
   - b) `set(...)`
   - c) `dict(...)`
   - d) `tuple(...)`
3. ¿Cuál es el resultado de `["a", "b", "c"][::-1]`?
   - a) `["c", "b", "a"]`
   - b) `["a", "b", "c"]`
   - c) `["a", "c", "b"]`
   - d) `["c"]`
4. ¿Para qué sirve `dict.setdefault`?
   - a) Eliminar claves inexistentes.
   - b) Establecer un valor por defecto si la clave no existe.
   - c) Reemplazar todos los valores del diccionario.
   - d) Convertir listas en diccionarios.
5. ¿Qué estructura usarías como clave de un diccionario?
   - a) Lista
   - b) Conjunto mutable
   - c) Tupla con elementos hashables
   - d) Diccionario

<details><summary>Respuestas</summary>
1. b  
2. b  
3. a  
4. b  
5. c
</details>

## Recursos recomendados

- [Tipos de secuencia](https://docs.python.org/3/library/stdtypes.html#sequence-types-list-tuple-range)
- [Documentación de `set` y operaciones de conjunto](https://docs.python.org/3/library/stdtypes.html#set)
- [Diccionarios en profundidad](https://docs.python.org/3/tutorial/datastructures.html#dictionaries)
- [Módulo `collections`](https://docs.python.org/3/library/collections.html)

## Checklist de final de módulo

- [ ] Seleccioné estructuras adecuadas según mutabilidad y acceso requerido.
- [ ] Practiqué slicing y desempaquetado en ejercicios concretos.
- [ ] Implementé operaciones de conjunto para deduplicar o comparar elementos.
- [ ] Utilicé comprensiones para transformar colecciones con claridad.
- [ ] Documenté precauciones sobre aliasing y copias profundas/superficiales.

