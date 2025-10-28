# Módulo 5. Funciones, ámbito, documentación y manejo de errores (try/except)

## Objetivos de aprendizaje

- Definir funciones con parámetros posicionales, nombrados y valores por defecto.
- Comprender el ámbito (`scope`) de variables y la diferencia entre local, global y nonlocal.
- Documentar funciones con docstrings claros y anotaciones de tipo.
- Gestionar errores con bloques `try/except/else/finally`, lanzando excepciones descriptivas.

## Temario

- Definición de funciones y parámetros (`*args`, `**kwargs`).
- Ámbito de variables y cierres (`closures`).
- Documentación mediante docstrings estilo Google o reStructuredText.
- Uso de anotaciones de tipo en funciones.
- Manejo de excepciones: captura específica, re-raise y limpieza con `finally`.
- Creación de excepciones personalizadas.
- Errores frecuentes: capturas genéricas, parámetros mutables por defecto.

## Conceptos clave

- **Ámbito (scope):** Determina dónde es accesible una variable en el código.
- **Docstring:** Cadena triple comillas que describe propósito, parámetros y retorno de una función.
- **Excepción:** Evento que interrumpe el flujo normal del programa ante una condición inesperada.
- **Clausura (closure):** Función interna que recuerda el entorno donde fue creada.
- **Parámetros mutables por defecto:** Fuente de efectos colaterales no deseados.

## Ejemplos de código

### Ejemplo 1. Docstring y anotaciones

```python
def compute_discounted_total(amount: float, discount_pct: float) -> float:
    """Calcula el total con descuento validando rangos."""
    if not 0 <= discount_pct <= 1:
        raise ValueError("El descuento debe expresarse entre 0 y 1.")
    return amount * (1 - discount_pct)
```

### Ejemplo 2. Cierre con estado privado

```python
from collections.abc import Callable

def counter(start: int = 0) -> Callable[[], int]:
    """Genera un contador que conserva estado sin usar variables globales."""
    current = start

    def _next() -> int:
        nonlocal current
        current += 1
        return current

    return _next

next_id = counter(100)
print(next_id())
print(next_id())
```

### Ejemplo 3. Manejo de excepciones con limpieza

```python
def read_first_line(path: str) -> str:
    """Garantiza el cierre del archivo incluso si ocurre un error."""
    try:
        with open(path, "r", encoding="utf-8") as fh:
            return fh.readline().strip()
    except FileNotFoundError as exc:
        raise FileNotFoundError(f"No se encontró el archivo requerido: {path}") from exc
```

## Buenas prácticas y errores comunes

- ✅ Usar nombres descriptivos y docstrings que expliquen el propósito, no la implementación.
- ✅ Capturar excepciones específicas y re-lanzar con contexto cuando aporte claridad.
- ✅ Retornar valores consistentes o lanzar excepciones; evita mezclar ambos enfoques.
- ❌ Definir parámetros por defecto mutables (`def foo(data=[])`); usar `None` y crear dentro de la función.
- ❌ Silenciar errores con `except Exception:` sin registrar ni manejar la causa raíz.

## Ejercicio guiado

1. Implementa `pricing.py` con la función `calculate_final_price`.
2. Requisitos:
   - Firma: `def calculate_final_price(base: float, *, tax_pct: float, discounts: list[float] | None = None) -> float:`
   - Valida que `tax_pct` esté entre `0` y `0.3`.
   - Aplica descuentos secuencialmente (multiplicando).
   - Maneja errores con mensajes descriptivos (`ValueError`).
3. Código inicial:

```python
from __future__ import annotations

def calculate_final_price(base: float, *, tax_pct: float, discounts: list[float] | None = None) -> float:
    """Calcula el precio final con impuestos y descuentos acumulados."""
    # TODO: validar argumentos y aplicar reglas
    raise NotImplementedError
```

4. Datos de prueba:
   - `calculate_final_price(100, tax_pct=0.16)` → `116.0`
   - `calculate_final_price(200, tax_pct=0.08, discounts=[0.1, 0.05])` → `199.92`

<details><summary>Solución</summary>

```python
from __future__ import annotations

def calculate_final_price(
    base: float,
    *,
    tax_pct: float,
    discounts: list[float] | None = None,
) -> float:
    if base < 0:
        raise ValueError("El precio base no puede ser negativo.")
    if not 0 <= tax_pct <= 0.3:
        raise ValueError("El impuesto debe estar entre 0% y 30%.")

    amount = base
    for discount in discounts or []:
        if not 0 <= discount <= 0.5:
            raise ValueError(f"Descuento inválido: {discount}")
        amount *= 1 - discount

    amount *= 1 + tax_pct
    return round(amount, 2)
```

</details>

## Desafío

Desarrolla un registrador de operaciones financieras:

- Función `process_operations(operations: list[dict[str, float]]) -> tuple[float, list[str]]`.
- Cada operación debe incluir `tipo` (`"deposito"` o `"retiro"`) y `monto`.
- Aplica reglas con `try/except`:
  - Rechaza retiros que excedan el balance acumulado y registra el incidente.
  - Lanza `ValueError` si falta información o el tipo es inválido.
- Devuelve balance final y un registro de eventos.
- Criterios de aceptación:
  - Docstring que explique la política de errores.
  - Pruebas unitarias que cubran exceso de retiro y tipo inválido.

## Quiz rápido

1. ¿Qué palabra clave permite modificar una variable externa en un closure?
   - a) `global`
   - b) `nonlocal`
   - c) `extern`
   - d) `static`
2. ¿Cuál es el propósito principal de un docstring?
   - a) Acelerar la ejecución.
   - b) Documentar cómo usar la función.
   - c) Evitar errores de tipado.
   - d) Generar automáticamente tests.
3. ¿Qué excepción es más apropiada para entradas numéricas inválidas?
   - a) `KeyError`
   - b) `ValueError`
   - c) `ImportError`
   - d) `IOError`
4. ¿Qué hace el bloque `finally`?
   - a) Captura todas las excepciones no manejadas.
   - b) Se ejecuta solo si no hay excepciones.
   - c) Se ejecuta siempre, ocurra o no una excepción.
   - d) Finaliza el programa.
5. ¿Qué ocurre con parámetros mutables por defecto?
   - a) Se crean en cada llamada.
   - b) Se comparten entre llamadas, provocando efectos inesperados.
   - c) Se convierten automáticamente en inmutables.
   - d) Son más rápidos que usar `None`.

<details><summary>Respuestas</summary>
1. b  
2. b  
3. b  
4. c  
5. b
</details>

## Recursos recomendados

- [Funciones en la documentación oficial](https://docs.python.org/3/tutorial/controlflow.html#defining-functions)
- [Guía de docstrings](https://peps.python.org/pep-0257/)
- [Manejo de excepciones](https://docs.python.org/3/tutorial/errors.html)
- [Typing — introducción](https://docs.python.org/3/library/typing.html)

## Checklist de final de módulo

- [ ] Documenté funciones con docstrings y anotaciones de tipo.
- [ ] Apliqué parámetros posicionales, nombrados y por defecto adecuadamente.
- [ ] Practiqué clausuras y comprendí `global` vs `nonlocal`.
- [ ] Gestioné errores con bloques `try/except/else/finally`.
- [ ] Identifiqué y evité el uso de parámetros mutables por defecto.

