---
title: "Anexo — Cheatsheets"
description: "Atajos de sintaxis y comandos recurrentes para el curso."
order: 2
keywords:
  - cheatsheet
  - referencia
  - sintaxis
---

## Sintaxis esencial

| Estructura | Ejemplo | Nota |
| --- | --- | --- |
| Función | `def hola(nombre: str) -> str:` | Documenta con docstring |
| Condicional | `if valor > 0:` | Usa indentación de 4 espacios |
| Bucle | `for item in items:` | Aprovecha `enumerate` |

## Comandos frecuentes

```bash
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
.\.venv\Scripts\Activate   # Windows
```

### Testing y calidad

```bash
pytest
ruff check src tests
```
