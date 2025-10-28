---
title: "Módulo 7 — Archivos y E/S"
description: "Lectura/escritura con pathlib, JSON y CSV en la biblioteca estándar."
order: 7
keywords:
  - archivos
  - json
  - csv
  - pathlib
---

## Manipulación con `pathlib`

```python
from pathlib import Path

def guardar_reporte(contenido: str, nombre: str) -> Path:
    carpeta = Path("reportes")
    carpeta.mkdir(exist_ok=True)
    destino = carpeta / nombre
    destino.write_text(contenido, encoding="utf-8")
    return destino
```

## Trabajar con JSON

```python
import json

def leer_config(path: Path) -> dict:
    datos = json.loads(path.read_text(encoding="utf-8"))
    if "project" not in datos:
        raise KeyError("Falta clave 'project'.")
    return datos
```

### CSV a objetos

```python
import csv

with Path("usuarios.csv").open(encoding="utf-8") as fh:
    lector = csv.DictReader(fh)
    usuarios = [fila for fila in lector if fila.get("activo") == "sí"]
```
