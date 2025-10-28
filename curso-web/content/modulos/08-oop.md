---
title: "Módulo 8 — Orientación a objetos"
description: "Clases, herencia, dataclasses y typing aplicado."
order: 8
keywords:
  - oop
  - clases
  - dataclass
  - typing
---

## Clases con invariantes

```python
class Cuenta:
    def __init__(self, titular: str, saldo: float = 0.0) -> None:
        self.titular = titular
        self._saldo = saldo

    @property
    def saldo(self) -> float:
        return self._saldo

    def depositar(self, monto: float) -> None:
        if monto <= 0:
            raise ValueError("El depósito debe ser positivo.")
        self._saldo += monto
```

## Uso de `@dataclass`

```python
from dataclasses import dataclass
from datetime import date

@dataclass(frozen=True)
class Factura:
    numero: str
    cliente: str
    total: float
    emitida: date
```

### Protocolos

```python
from typing import Protocol

class Notificador(Protocol):
    def enviar(self, mensaje: str) -> None:
        ...
```
