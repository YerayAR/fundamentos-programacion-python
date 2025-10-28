# Módulo 7. Archivos y E/S, JSON/CSV; introducción a `pathlib`

## Objetivos de aprendizaje

- Manipular rutas y archivos usando `pathlib` de forma multiplataforma.
- Leer y escribir archivos de texto, JSON y CSV con encoding controlado.
- Manejar errores comunes de E/S y asegurar el cierre correcto de recursos.
- Serializar y deserializar datos respetando contratos de formato.

## Temario

- Rutas relativas vs absolutas con `Path`.
- Lectura y escritura de archivos de texto (`read_text`, `write_text`).
- Manejo de JSON con el módulo `json`.
- Procesamiento de CSV con `csv.DictReader`/`DictWriter`.
- Validación de existencia y creación de directorios (`Path.exists`, `mkdir`).
- Errores frecuentes: encoding, rutas no resolubles, falta de permisos.

## Conceptos clave

- **`pathlib.Path`:** Representación orientada a objetos de rutas de archivos.
- **Context manager:** Estructura (`with`) que asegura liberación de recursos.
- **Serialización:** Transformar estructuras en formato persistible (JSON/CSV).
- **Encoding UTF-8:** Estándar recomendado para interoperabilidad.
- **Idempotencia:** Capacidad de ejecutar repetidamente sin efectos adversos (creación condicional de carpetas).

## Ejemplos de código

### Ejemplo 1. Escritura segura de texto

```python
from pathlib import Path

def save_report(content: str, filename: str = "report.txt") -> Path:
    """Centraliza la escritura para reutilizar lógica de codificación y rutas."""
    reports_dir = Path("reports")
    reports_dir.mkdir(exist_ok=True)
    target = reports_dir / filename
    target.write_text(content, encoding="utf-8")
    return target

save_report("Informe generado exitosamente.")
```

### Ejemplo 2. JSON con validación básica

```python
from pathlib import Path
import json

def load_config(path: Path) -> dict[str, str]:
    """Valida la existencia y el formato JSON antes de usar la configuración."""
    if not path.exists():
        raise FileNotFoundError(f"No se encontró el archivo de configuración: {path}")
    data = json.loads(path.read_text(encoding="utf-8"))
    if "project" not in data:
        raise KeyError("La configuración debe incluir la clave 'project'.")
    return data

config = load_config(Path("config.json"))
```

### Ejemplo 3. Lectura de CSV con `DictReader`

```python
import csv
from pathlib import Path

def read_users(path: Path) -> list[dict[str, str]]:
    """Utiliza DictReader para mapear encabezados a valores automáticamente."""
    with path.open(encoding="utf-8", newline="") as csvfile:
        reader = csv.DictReader(csvfile)
        return [row for row in reader if row.get("activo") == "sí"]

usuarios_activos = read_users(Path("usuarios.csv"))
print(usuarios_activos)
```

## Buenas prácticas y errores comunes

- ✅ Usar `pathlib.Path` en lugar de `os.path` para código más expresivo.
- ✅ Emplear `with` al abrir archivos para cerrar recursos automáticamente.
- ✅ Validar existencia y permisos antes de escribir para evitar sobrescrituras accidentales.
- ❌ Asumir encoding sin especificarlo; siempre declarar `encoding="utf-8"`.
- ❌ Concatenar rutas con cadenas (`"carpeta/" + archivo`); usar operadores de `Path`.

## Ejercicio guiado

1. Crea `etl_contacts.py` que transforme un CSV de contactos a JSON.
2. Función objetivo: `convert_contacts_csv_to_json(csv_path: Path, json_path: Path) -> None`.
3. Requisitos:
   - Usar `DictReader` para leer contactos con campos `nombre`, `email`, `etiquetas`.
   - Convertir `etiquetas` (separadas por `;`) en una lista.
   - Guardar el resultado con indentación 2 en JSON.
   - Validar que el CSV existe y manejar errores con mensajes claros.
4. Datos de prueba: crea un CSV ficticio con dos registros y verifica el JSON resultante.

<details><summary>Solución</summary>

```python
from __future__ import annotations

import csv
import json
from pathlib import Path

def convert_contacts_csv_to_json(csv_path: Path, json_path: Path) -> None:
    if not csv_path.exists():
        raise FileNotFoundError(f"No se encontró el archivo CSV: {csv_path}")

    contacts: list[dict[str, object]] = []
    with csv_path.open(encoding="utf-8", newline="") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            tags = [tag.strip() for tag in row.get("etiquetas", "").split(";") if tag.strip()]
            contacts.append(
                {
                    "nombre": row.get("nombre", "").strip(),
                    "email": row.get("email", "").strip(),
                    "etiquetas": tags,
                }
            )

    json_path.write_text(json.dumps(contacts, indent=2, ensure_ascii=False), encoding="utf-8")
```

</details>

## Desafío

Implementa un recolector de métricas:

- Escanea una carpeta y calcula estadísticas (cantidad de archivos, peso total, extensiones).
- Genera un reporte en CSV con columnas `extension`, `conteo`, `tamaño_total`.
- Guarda un archivo JSON adicional con metadatos (fecha de generación, ruta escaneada).
- Criterios de aceptación:
  - Función `collect_metrics(base_path: Path, output_dir: Path) -> None`.
  - Usa `pathlib` y `os.scandir` de ser necesario para rendimiento.
  - Maneja errores de permisos registrando avisos sin detener la ejecución completa.

## Quiz rápido

1. ¿Cuál es la ventaja principal de `pathlib.Path`?
   - a) Es más lento pero compatible.
   - b) Ofrece API orientada a objetos y multiplataforma.
   - c) Solo funciona en Windows.
   - d) Requiere dependencias externas.
2. ¿Qué hace `json.dumps`?
   - a) Lee un archivo JSON.
   - b) Convierte objetos Python en cadenas JSON.
   - c) Crea archivos CSV.
   - d) Valida esquemas JSON.
3. ¿Qué parámetro se recomienda al abrir archivos de texto?
   - a) `encoding`
   - b) `buffer`
   - c) `length`
   - d) `thread`
4. ¿Cómo evitas sobrescribir un archivo existente?
   - a) Usar `Path.touch(exist_ok=True)`.
   - b) Comprobar `Path.exists()` antes de escribir.
   - c) Abrir en modo `w+`.
   - d) No es posible controlarlo.
5. ¿Qué módulo facilita el manejo de CSV?
   - a) `csv`
   - b) `json`
   - c) `pickle`
   - d) `gzip`

<details><summary>Respuestas</summary>
1. b  
2. b  
3. a  
4. b  
5. a
</details>

## Recursos recomendados

- [`pathlib` — documentación oficial](https://docs.python.org/3/library/pathlib.html)
- [Módulo `json`](https://docs.python.org/3/library/json.html)
- [Módulo `csv`](https://docs.python.org/3/library/csv.html)
- [Guía de archivos y context managers](https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files)

## Checklist de final de módulo

- [ ] Manipulé rutas con `pathlib` evitando concatenaciones manuales.
- [ ] Escribí y leí archivos de texto, JSON y CSV con encoding explícito.
- [ ] Implementé validaciones y manejo de errores de E/S.
- [ ] Generé scripts de transformación de datos idempotentes.
- [ ] Documenté rutas usadas y convenciones de almacenamiento en el proyecto.

