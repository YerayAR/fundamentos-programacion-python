# Módulo 2. Tipos de datos, variables y operadores

## Objetivos de aprendizaje

- Distinguir los tipos primitivos de Python y sus literales.
- Aplicar conversiones explícitas y manejo de precisión en operaciones numéricas.
- Utilizar operadores aritméticos, lógicos y de comparación en expresiones compuestas.
- Emplear anotaciones de tipo para documentar expectativas básicas en funciones.

## Temario

- Tipos numéricos (`int`, `float`, `complex`, `Decimal`).
- Cadenas, f-strings y operadores de concatenación.
- Booleanos y reglas de truthiness.
- Operadores aritméticos, lógicos, de comparación y asignaciones aumentadas.
- Conversión de tipos (`int()`, `float()`, `bool()`, `str()`).
- Introducción a `typing` y alias simples.
- Errores frecuentes: igualdades con floats y mutabilidad accidental.

## Conceptos clave

- **Tipado dinámico:** El tipo se determina en tiempo de ejecución y puede cambiar con una reasignación.
- **Inmutabilidad:** Propiedad de objetos como `int` o `str` que evita cambios en memoria tras su creación.
- **Truthiness:** Reglas que determinan si un valor es considerado verdadero o falso en evaluaciones booleanas.
- **Operador corto-circuito:** Operadores `and` y `or` que detienen la evaluación cuando la respuesta es conocida.
- **Decimal:** Tipo orientado a cálculos financieros con precisión decimal controlada.

## Ejemplos de código

### Ejemplo 1. Controlar precisión con `Decimal`

```python
from decimal import Decimal, getcontext

getcontext().prec = 4  # Reduce la precisión para evidenciar redondeos predecibles.
subtotal = Decimal("19.99")
iva = Decimal("0.16")
total = subtotal * (Decimal("1") + iva)

print(f"Total a pagar: {total}")  # Evita sorpresas de flotantes binarios.
```

### Ejemplo 2. Uso expresivo de f-strings

```python
from datetime import datetime

def build_invoice_name(user: str, idx: int) -> str:
    """Genera nombres reproducibles para archivos de salida."""
    timestamp = datetime.now().strftime("%Y%m%d")
    # Incluir ceros a la izquierda ayuda a ordenar cronológicamente.
    return f"{timestamp}_invoice_{idx:03d}_{user.lower()}.pdf"

print(build_invoice_name("Laura", 7))
```

### Ejemplo 3. Operadores lógicos con truthiness

```python
def pick_default(user_input: str | None, fallback: str = "sin-dato") -> str:
    """Explota el corto-circuito de or, considerando cadenas vacías como falsas."""
    return (user_input or fallback).strip()

print(pick_default(None))
print(pick_default("  Python  "))
```

## Buenas prácticas y errores comunes

- ✅ Nombrar variables de forma descriptiva (`total_bruto`, `descuento_aplicado`) para facilitar lectura.
- ✅ Preferir `Decimal` o enteros para cálculos financieros donde la precisión es crítica.
- ❌ Comparar flotantes directamente (`a == b`) tras operaciones; usar tolerancias con `math.isclose`.
- ❌ Confiar en conversiones implícitas: ser explícito con `int()`, `float()` o `str()` mejora claridad y evita errores.

## Ejercicio guiado

1. Implementa un módulo `conversor_medidas.py` que reciba una temperatura en Celsius, Kelvin o Fahrenheit y la normalice.
2. Define la función `convert_temperature(value: float, unit: str) -> dict[str, float]` que devuelva un diccionario con las tres escalas.
3. Reglas:
   - `unit` debe aceptarse en mayúsculas/minúsculas.
   - Si la unidad no se reconoce, lanza `ValueError`.
   - Usa `round` a 2 decimales para mantener coherencia visual.
4. Datos de prueba:
   - `convert_temperature(0, "C")` → `{"c": 0.0, "f": 32.0, "k": 273.15}`
   - `convert_temperature(32, "F")` → `{"c": 0.0, "f": 32.0, "k": 273.15}`
   - `convert_temperature(300, "K")` → `{"c": 26.85, "f": 80.33, "k": 300.0}`

<details><summary>Solución</summary>

```python
from __future__ import annotations

def convert_temperature(value: float, unit: str) -> dict[str, float]:
    normalized = unit.strip().lower()
    if normalized not in {"c", "f", "k"}:
        raise ValueError(f"Unidad no soportada: {unit!r}")

    if normalized == "c":
        celsius = value
    elif normalized == "f":
        celsius = (value - 32) * 5 / 9
    else:
        celsius = value - 273.15

    fahrenheit = celsius * 9 / 5 + 32
    kelvin = celsius + 273.15

    return {
        "c": round(celsius, 2),
        "f": round(fahrenheit, 2),
        "k": round(kelvin, 2),
    }
```

</details>

## Desafío

Elabora un analizador de expresiones simplificado:

- Recibe una cadena que representa una expresión aritmética (`"2 + 4 * 3"`) y devuelve el resultado numérico.
- Usa `ast.parse` para validar la expresión y permitir solo operaciones seguras (`BinOp`, `Add`, `Sub`, `Mult`, `Div`, `Pow`, `UnaryOp`).
- Implementa funciones separadas para validar nodos y evaluarlos recursivamente.
- Criterios de aceptación:
  - Rechaza expresiones con llamadas a funciones o acceso a atributos.
  - Documenta la función principal con un docstring describiendo los operadores permitidos.
  - Incluye una prueba unitaria con tres casos (positivo, división y expresión inválida).

## Quiz rápido

1. ¿Qué devuelve `type(3.0)`?
   - a) `<class 'int'>`
   - b) `<class 'float'>`
   - c) `<class 'Decimal'>`
   - d) `<class 'complex'>`
2. ¿Cuál es el resultado de `True and 0`?
   - a) `True`
   - b) `0`
   - c) `False`
   - d) `None`
3. ¿Qué diferencia principal existe entre `=` y `==`?
   - a) Ninguna, son equivalentes.
   - b) `=` asigna valores y `==` compara igualdad.
   - c) `=` compara identidad y `==` copia objetos.
   - d) `=` concatena cadenas y `==` resta números.
4. ¿Qué operador usarías para elevar un número a una potencia?
   - a) `^`
   - b) `**`
   - c) `pow`
   - d) `//`
5. ¿Cuál es la mejor forma de crear una cadena multilínea?
   - a) Usar comillas simples consecutivas.
   - b) Usar triple comilla (`"""texto"""`).
   - c) Concatenar con `+` en cada línea.
   - d) Incluir `\n` manualmente entre cada palabra.

<details><summary>Respuestas</summary>
1. b  
2. b  
3. b  
4. b  
5. b
</details>

## Recursos recomendados

- [Tipos integrados de Python](https://docs.python.org/3/library/stdtypes.html)
- [Módulo `decimal`](https://docs.python.org/3/library/decimal.html)
- [Guía de f-strings](https://docs.python.org/3/reference/lexical_analysis.html#f-strings)
- [PEP 484 – Type Hints](https://peps.python.org/pep-0484/)

## Checklist de final de módulo

- [ ] Identifiqué y utilicé los literales para números, cadenas y booleanos.
- [ ] Apliqué conversiones explícitas evitando comparaciones ambiguas.
- [ ] Practiqué operadores aritméticos, relacionales y lógicos con ejemplos propios.
- [ ] Documenté mis funciones con anotaciones de tipo básicas.
- [ ] Registré dudas sobre precisión numérica o conversiones para revisarlas en clase.

