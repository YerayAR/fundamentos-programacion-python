---
title: "Módulo 9 — Testing y calidad"
description: "Pruebas con pytest, logging estructurado y guías de estilo."
order: 9
keywords:
  - pytest
  - testing
  - logging
  - pep8
---

## Pruebas esenciales

```python
# tests/test_promedios.py
import pytest

from app.metricas import promedio

def test_promedio_valido() -> None:
    assert promedio([10, 20, 30]) == 20

def test_promedio_lista_vacia() -> None:
    with pytest.raises(ValueError):
        promedio([])
```

## Logging con contexto

```python
import logging

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
logger = logging.getLogger("metricas")
logger.info("Inicio del procesamiento")
```

### Automatización

```bash
ruff check .
pytest
```
