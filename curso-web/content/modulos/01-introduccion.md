---
title: "Módulo 1 — Introducción a Python"
description: "Instalación, CLI, IDE y flujo de trabajo profesional con entornos virtuales."
order: 1
keywords:
  - python
  - instalación
  - virtualenv
  - cli
---

## Objetivos del módulo

- Reconocer los componentes clave del entorno de desarrollo Python 3.12.
- Crear y activar entornos virtuales para aislar dependencias.
- Ejecutar scripts y notebooks desde la línea de comandos o el IDE.

## Configuración base

```bash
python --version
python -m venv .venv
```

> Consejo: documenta la activación de tu entorno en un archivo `SETUP.md` para el resto del equipo.

### Verificación rápida

```python
import sys

if __name__ == "__main__":
    print(f"Bienvenido a Python {sys.version.split()[0]}")
```

## Recursos recomendados

- [Documentación oficial de instalación](https://docs.python.org/3/using/index.html)
- [Guía de VS Code + Python](https://code.visualstudio.com/docs/python/python-tutorial)
