# Módulo 10. Proyecto Final Integrador

## Resumen del reto

Desarrollarás un sistema CLI modular llamado **PyTrack** para registrar, clasificar y analizar hábitos diarios (tiempo invertido, actividades completadas, notas). El proyecto consolida conceptos desde la configuración del entorno hasta pruebas automatizadas y calidad de código, entregando una solución reproducible y escalable.

## Especificación funcional

### Historias de usuario

- **HU1. Registro rápido:** Como persona usuaria quiero agregar actividades con duración, categoría y nota para documentar mi progreso diario.
- **HU2. Consultas filtradas:** Como persona usuaria quiero listar actividades por rango de fechas y categoría para revisar mis hábitos específicos.
- **HU3. Resumen analítico:** Como persona usuaria quiero generar un resumen (total de tiempo, promedio diario, top categorías) para evaluar tendencias.
- **HU4. Exportación:** Como persona usuaria quiero exportar mis datos a CSV o JSON para compartirlos o analizarlos externamente.

### Criterios de aceptación

- Todos los comandos muestran mensajes de ayuda (`--help`) claros.
- Los datos se almacenan en un archivo local controlado (`data/pytrack.json`) sin perder registros tras reinicios.
- Los listados aceptan filtros opcionales (fecha inicial/final, categoría, mínimo de duración).
- El resumen incluye al menos: total de entradas, minutos acumulados, promedio por día y categoría con mayor uso.
- La exportación crea archivos en una carpeta `exports/` con nombre timestamp.
- Comandos fallidos devuelven código de salida distinto de cero y mensajes descriptivos.

## Requisitos técnicos mínimos

- Implementación en Python 3.12+, sin dependencias externas salvo `typer` (CLI) y `rich` opcional para salidas enriquecidas.
- Organización bajo estructura `src/pytrack/` y `tests/`.
- Gestión de dependencias con `uv` o `pip`, documentadas en `pyproject.toml`.
- Uso de `pathlib` para rutas y `json` para almacenamiento.
- Pruebas automatizadas con `pytest` cubriendo casos felices y errores.

## Datos de ejemplo

- **Formato de almacenamiento (`data/pytrack.json`):**

```json
{
  "entries": [
    {
      "id": "2025-10-01T08:30:00",
      "activity": "Lectura técnica",
      "category": "aprendizaje",
      "minutes": 45,
      "notes": "Libro de patrones de diseño"
    }
  ]
}
```

- **Exportación CSV (`exports/pytrack_20251001.csv`):**

```csv
id,activity,category,minutes,notes
2025-10-01T08:30:00,Lectura técnica,aprendizaje,45,Libro de patrones de diseño
```

## Entregables

- Código fuente completo en `src/pytrack/`.
- Pruebas automatizadas en `tests/` con cobertura de registro, filtrado y errores.
- `README.md` del proyecto con instrucciones de instalación, uso y ejemplos.
- `pyproject.toml` o `requirements.txt` con dependencias y scripts útiles.
- Scripts o comandos para ejecutar pruebas y verificar calidad (`make quality`, `python -m tasker`, etc.).

## Rúbrica de evaluación

| Criterio | Porcentaje | Descripción |
| --- | --- | --- |
| Funcionalidad y cobertura de historias | 30% | Cumplimiento de HU y criterios de aceptación. |
| Calidad del código y estructura | 20% | Organización modular, estilo consistente y documentación. |
| Persistencia y manejo de datos | 15% | Correcto almacenamiento, exportación y validaciones. |
| Pruebas y automatización | 20% | Calidad y alcance de pruebas, scripts de automatización. |
| Experiencia de uso (CLI/UX) | 10% | Ayudas, mensajes claros, feedback adecuado. |
| Presentación y README | 5% | Claridad del README, instrucciones reproducibles. |

## Hitos y cronograma sugerido

| Semana | Hito | Entregables parciales |
| --- | --- | --- |
| 1 | Diseño y set-up | Estructura `src/`, definición de modelos, configuración de entorno. |
| 2 | Implementación núcleo | Comandos de registro y almacenamiento persistente. |
| 3 | Consultas y resúmenes | Filtros, estadísticas, exportación CSV/JSON. |
| 4 | Calidad y entrega | Pruebas, logging, documentación final y presentación. |

## Extensiones opcionales

- Integración con bases de datos SQLite mediante `sqlite3`.
- Generación de reportes en PDF/Markdown usando plantillas.
- Integración con API externas (calendarios, trackers de hábito).
- Interfaz web ligera con `FastAPI` o `Flask`.
- Sincronización con almacenamiento en la nube (Google Drive, Dropbox API).

## Plantilla de README del proyecto

```markdown
# PyTrack — Rastreador de hábitos en CLI

## Requisitos
- Python 3.12+
- uv (recomendado) o pip

## Instalación
    uv venv
    uv pip install -r requirements.txt

## Uso
    # Registrar una actividad
    python -m pytrack add "Lectura técnica" --category aprendizaje --minutes 45 --notes "Patrones de diseño"

    # Listar actividades filtradas por categoría
    python -m pytrack list --category aprendizaje

    # Generar resumen
    python -m pytrack summary

    # Exportar a CSV
    python -m pytrack export --format csv

## Pruebas y calidad
    pytest
    ruff check src tests

## Estructura del proyecto
    src/
      pytrack/
        __init__.py
        cli.py
        models.py
        storage.py
    tests/
      test_cli.py
      test_storage.py

## Licencia
MIT (o especificar)
```
