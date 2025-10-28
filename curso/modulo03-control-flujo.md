# Módulo 3. Control de flujo: condicionales y bucles

## Objetivos de aprendizaje

- Aplicar condicionales (`if/elif/else`) con condiciones compuestas y anidadas claras.
- Emplear bucles `for` y `while` de forma segura, evitando iteraciones infinitas.
- Usar comprensiones y generadores cuando aporten legibilidad y eficiencia.
- Implementar `match/case` (pattern matching) para flujos basados en patrones en Python 3.12.

## Temario

- Evaluación booleana y operadores de comparación.
- Estructuras condicionales anidadas y guard clauses.
- Bucles `for`, `while`, iterables y control con `break`, `continue`, `else`.
- Comprensiones de listas y diccionarios.
- Introducción a `enumerate`, `zip` y funciones auxiliares.
- Pattern matching con `match/case` y patrones estructurales.
- Errores frecuentes: bucles infinitos, condiciones redundantes.

## Conceptos clave

- **Guard clause:** Condición temprana que permite salir de una función, mejorando legibilidad.
- **Iterable:** Objeto que puede devolver elementos uno a uno (`list`, `tuple`, `range`, generadores).
- **Comprensión:** Sintaxis compacta para construir colecciones a partir de un iterable.
- **Pattern matching:** Mecanismo que compara estructuras contra patrones declarativos.
- **Sentencia `else` en bucles:** Se ejecuta si el bucle finaliza sin ejecutar `break`.

## Ejemplos de código

### Ejemplo 1. Uso de guard clauses

```python
from typing import Iterable

def average(values: Iterable[float]) -> float:
    """Valida inputs antes de operar para evitar divisiones por cero."""
    values = list(values)
    if not values:
        raise ValueError("No se puede calcular el promedio de una colección vacía.")
    return sum(values) / len(values)
```

### Ejemplo 2. Pattern matching para comandos

```python
def handle_command(command: tuple[str, dict[str, str]]) -> str:
    """Expresa la lógica según el tipo de comando recibio."""
    match command:
        case ("create", {"resource": resource, "name": name}):
            return f"Creando {resource} con nombre {name}"
        case ("delete", {"resource": resource, "force": "yes"}):
            return f"Eliminación forzada de {resource}"
        case ("delete", {"resource": resource}):
            return f"Solicita confirmación para eliminar {resource}"
        case _:
            return "Comando no reconocido"
```

### Ejemplo 3. Comprensión con condición

```python
def squared_evens(limit: int) -> list[int]:
    """Evita bucles explícitos cuando se trata de transformaciones simples."""
    return [n * n for n in range(limit + 1) if n % 2 == 0]

print(squared_evens(6))
```

## Buenas prácticas y errores comunes

- ✅ Preferir condicionales planos con retornos tempranos sobre estructuras profundamente anidadas.
- ✅ Usar `enumerate` en vez de gestionar índices manuales con `range(len(...))`.
- ✅ Documentar casos no previstos en `match` y proporcionar un `case _` seguro.
- ❌ Modificar colecciones mientras se iteran; producir copias o recopilar cambios.
- ❌ Usar `while True` sin condiciones de salida claras, lo que provoca bucles infinitos.

## Ejercicio guiado

1. Diseña un módulo `router.py` que enrute peticiones simuladas.
2. La función `route(payload: dict[str, str]) -> str` debe:
   - Validar que `payload` contenga claves `method` y `path`.
   - Usar pattern matching para manejar rutas:
     - `{"method": "GET", "path": "/status"}` → `"Servicio operativo"`.
     - `{"method": "POST", "path": "/users"}` → `"Crear usuario"`.
     - En otros casos, pedir confirmación.
   - Rechazar métodos no permitidos (`DELETE`, `PATCH`) con `ValueError`.
3. Datos de prueba sugeridos: tres diccionarios representando casos válidos e inválidos.

<details><summary>Solución</summary>

```python
from __future__ import annotations

def route(payload: dict[str, str]) -> str:
    required_keys = {"method", "path"}
    if missing := required_keys - payload.keys():
        raise ValueError(f"Faltan claves requeridas: {missing}")

    method = payload["method"].upper()
    path = payload["path"]
    if method in {"DELETE", "PATCH"}:
        raise ValueError(f"Método no permitido: {method}")

    match (method, path):
        case ("GET", "/status"):
            return "Servicio operativo"
        case ("POST", "/users"):
            return "Crear usuario"
        case _:
            return f"Confirma acción para {method} {path}"
```

</details>

## Desafío

Implementa una pequeña máquina de estados para pedidos en línea:

- Estados permitidos: `PENDIENTE`, `PAGADO`, `ENVIADO`, `ENTREGADO`, `CANCELADO`.
- Recibe eventos (`pagar`, `enviar`, `entregar`, `cancelar`) y aplica transiciones válidas mediante `match/case`.
- Guarda un historial de transiciones en una lista para auditar.
- Criterios de aceptación:
  - Levanta `RuntimeError` cuando la transición no es válida.
  - Incluye una función `apply_events(initial_state, events)` que retorne estado final e historial.
  - Prueba al menos tres escenarios (flujo feliz, cancelación y transición inválida).

## Quiz rápido

1. ¿Qué hace `break` en un bucle?
   - a) Repite la última iteración.
   - b) Detiene el bucle de inmediato.
   - c) Salta la iteración actual.
   - d) Reinicia el bucle desde el principio.
2. ¿Qué imprimirá el siguiente código?
   ```python
   for n in range(3):
       if n == 1:
           continue
       print(n)
   ```
   - a) `0 1 2`
   - b) `0 2`
   - c) `1 2`
   - d) `0 1`
3. ¿Cuál es la ventaja de `enumerate`?
   - a) Ejecuta el bucle más rápido.
   - b) Proporciona índice y valor de forma legible sin preparar contadores manuales.
   - c) Permite modificar el iterable durante la iteración.
   - d) Reemplaza la necesidad de condicionales.
4. ¿Qué patrón captura listas con al menos dos elementos en `match/case`?
   - a) `[a, b, *rest]`
   - b) `(a, b)`
   - c) `list(a, b)`
   - d) `{a, b}`
5. ¿Cuándo se ejecuta el `else` en un bucle `for`?
   - a) Siempre al final del bucle.
   - b) Solo si se usa `continue`.
   - c) Solo si no se ejecutó `break`.
   - d) Cuando el iterable está vacío.

<details><summary>Respuestas</summary>
1. b  
2. b  
3. b  
4. a  
5. c
</details>

## Recursos recomendados

- [Sentencias `if` y control de flujo](https://docs.python.org/3/tutorial/controlflow.html)
- [Pattern matching en Python 3.12](https://docs.python.org/3/reference/compound_stmts.html#the-match-statement)
- [Guía de comprensiones](https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions)
- [Funciones built-in `enumerate` y `zip`](https://docs.python.org/3/library/functions.html)

## Checklist de final de módulo

- [ ] Implementé condicionales con guard clauses para simplificar funciones.
- [ ] Practiqué `for`, `while` y `for` con `else` en ejercicios propios.
- [ ] Usé comprensiones y entendí cuándo mejoran la legibilidad.
- [ ] Apliqué `match/case` para escenarios basados en patrones.
- [ ] Documenté errores comunes (bucles infinitos, condiciones redundantes) y cómo evitarlos.

