# Módulo 8. Orientación a Objetos: clases, herencia, dataclasses y typing

## Objetivos de aprendizaje

- Definir clases con atributos y métodos, aplicando encapsulamiento básico.
- Emplear herencia y composición para reutilizar comportamiento de forma controlada.
- Utilizar `@dataclass` para modelos de datos inmutables o mutables según necesidad.
- Anotar tipos en clases y métodos, incluyendo `Protocol` e interfaces ligeras.

## Temario

- Clases, instancias y métodos (`__init__`, `__repr__`).
- Propiedades y validaciones con `@property`.
- Herencia simple y uso de `super()`.
- `dataclasses`: campos por defecto, `field`, `frozen`.
- Protocolos con `typing.Protocol`.
- Tipos genéricos (`TypeVar`, `Generic`).
- Errores comunes: herencia excesiva, mutabilidad no controlada.

## Conceptos clave

- **Encapsulamiento:** Ocultar detalles internos ofreciendo una interfaz estable.
- **Composición:** Reutilizar comportamiento delegando a otras instancias en lugar de heredar.
- **`dataclass`:** Decorador que genera métodos boilerplate (`__init__`, `__repr__`).
- **Protocolos:** Contratos estructurales que definen métodos requeridos sin herencia explícita.
- **Inmutabilidad:** Garantiza que los objetos no cambien tras ser creados (`frozen=True`).

## Ejemplos de código

### Ejemplo 1. Clase con propiedades

```python
class Account:
    """Controla saldos asegurando invariantes."""

    def __init__(self, owner: str, balance: float = 0.0) -> None:
        self._owner = owner
        self._balance = balance

    @property
    def balance(self) -> float:
        return self._balance

    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("El depósito debe ser positivo.")
        self._balance += amount

    def __repr__(self) -> str:
        return f"Account(owner={self._owner!r}, balance={self._balance:.2f})"
```

### Ejemplo 2. `@dataclass` inmutable

```python
from dataclasses import dataclass
from datetime import date

@dataclass(frozen=True)
class Invoice:
    """Los objetos inmutables son seguros para usar como claves o en cachés."""
    number: str
    customer: str
    total: float
    issued_at: date
```

### Ejemplo 3. Protocolo para cumplimentar interfaces

```python
from typing import Protocol

class Notifier(Protocol):
    def send(self, message: str) -> None:
        ...

def process_event(message: str, notifier: Notifier) -> None:
    """Acepta cualquier objeto que implemente send sin requerir herencia."""
    notifier.send(message)
```

## Buenas prácticas y errores comunes

- ✅ Usar composición cuando la relación es “tiene un” en lugar de herencia forzada.
- ✅ Documentar invariantes en docstrings y validar en constructores.
- ✅ Emplear `dataclasses` para modelos de datos, evitando escribir código repetitivo.
- ❌ Exponer atributos internos sin validación; preferir propiedades o métodos.
- ❌ Abusar de la herencia múltiple sin un diagrama claro de responsabilidades.

## Ejercicio guiado

1. Crea un módulo `orders.py` con las clases:
   - `@dataclass` `OrderLine(sku: str, quantity: int, unit_price: float)`.
   - Clase `Order` que agregue líneas y calcule subtotales/impuestos.
2. Requisitos:
   - `Order` debe tener método `add_line(line: OrderLine) -> None`.
   - Método `total(tax_pct: float) -> float` que valide rangos.
   - Propiedad `status` que muestre `"pendiente"` o `"pagado"`; agregar método `mark_paid()`.
3. Datos de prueba: crear dos líneas y validar que el total cuadra con impuestos del 16%.

<details><summary>Solución</summary>

```python
from __future__ import annotations

from dataclasses import dataclass, field
from typing import List

@dataclass(frozen=True)
class OrderLine:
    sku: str
    quantity: int
    unit_price: float

    def subtotal(self) -> float:
        return self.quantity * self.unit_price

class Order:
    def __init__(self) -> None:
        self._lines: List[OrderLine] = []
        self._paid = False

    def add_line(self, line: OrderLine) -> None:
        self._lines.append(line)

    def total(self, tax_pct: float = 0.0) -> float:
        if tax_pct < 0:
            raise ValueError("El impuesto no puede ser negativo.")
        subtotal = sum(line.subtotal() for line in self._lines)
        return round(subtotal * (1 + tax_pct), 2)

    @property
    def status(self) -> str:
        return "pagado" if self._paid else "pendiente"

    def mark_paid(self) -> None:
        self._paid = True
```

</details>

## Desafío

Construye un mini framework de notificaciones:

- Clases concretas `EmailNotifier`, `SMSNotifier` que implementen el protocolo `Notifier`.
- Clase `NotificationService` que reciba una lista de notifiers y aplique políticas (reintentos, prioridad).
- Registra acciones usando `logging`.
- Criterios de aceptación:
  - Usa `abc.ABC` para definir clases abstractas si conviene.
  - Implementa pruebas que simulen fallos en un canal y verifiquen reintentos controlados.
  - Documenta extensibilidad (nuevos canales) en docstrings.

## Quiz rápido

1. ¿Qué genera automáticamente `@dataclass` por defecto?
   - a) `__init__`, `__repr__`, `__eq__`
   - b) `__str__`, `__hash__`, `__len__`
   - c) `__iter__`, `__next__`
   - d) `__call__`, `__getattr__`
2. ¿Qué ventaja ofrece `Protocol`?
   - a) Convierte funciones en clases.
   - b) Permite aplicar duck typing con verificación estática opcional.
   - c) Reemplaza a los generics.
   - d) Hace la clase más rápida en ejecución.
3. ¿Qué hace `super()`?
   - a) Invoca métodos de clases hijas.
   - b) Llama a la superclase más cercana en el MRO.
   - c) Duplica atributos automáticamente.
   - d) Optimiza la memoria.
4. ¿Qué significa `frozen=True` en una dataclass?
   - a) Hace la clase abstracta.
   - b) Impide crear instancias.
   - c) Vuelve inmutables los atributos después de inicializar.
   - d) Guarda los objetos en disco.
5. ¿Cuál es la mejor forma de representar un modelo de datos simple?
   - a) Clase con múltiples métodos privados.
   - b) `dataclass` con atributos declarados y validaciones mínimas.
   - c) Diccionarios sin ninguna función asociada.
   - d) Lista de listas.

<details><summary>Respuestas</summary>
1. a  
2. b  
3. b  
4. c  
5. b
</details>

## Recursos recomendados

- [Programación orientada a objetos en Python](https://docs.python.org/3/tutorial/classes.html)
- [`dataclasses` — documentación](https://docs.python.org/3/library/dataclasses.html)
- [`typing` y protocolos](https://docs.python.org/3/library/typing.html#typing.Protocol)
- [ABC — Clases abstractas](https://docs.python.org/3/library/abc.html)

## Checklist de final de módulo

- [ ] Definí clases con `__init__`, propiedades y métodos personalizados.
- [ ] Utilicé herencia y `super()` cuando aportó reutilización legítima.
- [ ] Modelé datos con `@dataclass` para evitar código repetitivo.
- [ ] Apliqué `typing` (Protocol, TypeVar) en interfaces entre clases.
- [ ] Documenté decisiones de diseño (herencia vs composición).

