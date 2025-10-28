---
title: "Módulo 6 — Módulos, paquetes y dependencias"
description: "Estructura de proyectos, imports y gestión de dependencias con pip/uv."
order: 6
keywords:
  - paquetes
  - dependencias
  - pip
  - uv
---

## Estructura recomendada

```
project/
  src/
    app/
      __init__.py
      core.py
  tests/
```

### Punto de entrada

```python
# src/app/__main__.py
from .core import ejecutar

if __name__ == "__main__":
    ejecutar()
```

## Gestión de dependencias

```bash
uv venv
uv pip install typer~=0.12 rich==13.7.0
uv pip freeze > requirements.lock
```
