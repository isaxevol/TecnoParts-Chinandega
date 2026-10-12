# TecnoParts Chinandega

Prototipo navegable de control de inventario, completamente local y sin backend.

## Uso

Abre `index.html` en un navegador. Para una sesión local con recarga automática puedes servir la carpeta con cualquier servidor estático.

### Accesos de demostración
- `admin1` / `1234`: tablero, catálogo, entradas, ajustes, reposición, usuarios, bitácora y reportes.
- `vendedor1` / `1234`: existencias, registrar venta, alertas e historial.

## Flujo principal

Venta → stock actual → estado/alerta → reposición → aprobación → entrada recibida → alerta cerrada. Todo se mantiene en memoria y se reinicia al recargar.

## Diseño

Interfaz de dashboard sobria y utilitaria: verde propio de TecnoParts, fondos claros, tarjetas de lectura rápida, estados con texto y color, tipografía Space Grotesk + DM Sans, sidebar responsive y mensajes de confirmación/error.
