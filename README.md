# TecnoParts Chinandega

Sistema de control de inventario para un comercio de celulares, repuestos y accesorios de la ciudad de Chinandega, Nicaragua. Este repositorio contiene el **prototipo navegable** de la interfaz, hecho con HTML, CSS y JavaScript. Funciona por completo en el navegador, sin servidor ni base de datos, y trabaja con datos de ejemplo.

Proyecto de la asignatura **Tecnología de la Información** (Universidad Tecnológica La Salle, ULSA), práctica "Aplicación para la transformación digital de un proceso real". Docente: M.Sc. Valeria Medina Rodríguez.

**Autores:** Isaac Gabriel Montoya Donaire y Roberto José Quintana Mayorga.

## Problema que resuelve

El negocio lleva su inventario en un cuaderno y en una hoja de Excel. Eso produce faltantes de productos de mucha rotación, errores de registro y compras decididas tarde, solo por experiencia. El sistema convierte cada venta y cada recepción de mercancía en datos, los procesa y muestra al administrador qué productos están en riesgo para que decida qué comprar y cuándo.

El recorrido que muestra la aplicación es: **dato, información, conocimiento, decisión, acción y retroalimentación**.

| Etapa | En la aplicación |
|---|---|
| Dato | Una venta, una entrada o un ajuste, con usuario y fecha |
| Información | Stock actual y ventas de los últimos 30 días |
| Conocimiento | Consumo diario, punto de reorden, cobertura en días y estado del producto |
| Decisión | El administrador revisa la alerta y el detalle del producto y decide cuánto pedir |
| Acción | Se hace el pedido al proveedor y se registra la entrada al recibir la mercancía |
| Retroalimentación | La entrada sube el stock y la alerta se cierra |

## Cómo ejecutarlo

No necesita instalación.

1. Descarga o clona el repositorio.
2. Abre `index.html` en un navegador moderno (Chrome, Edge o Firefox).

Opcionalmente puedes servir la carpeta con un servidor estático:

```bash
git clone https://github.com/isaxevol/TecnoParts-Chinandega.git
cd TecnoParts-Chinandega
python3 -m http.server 8000
```

Luego abre `http://localhost:8000`.

> Las tipografías (Space Grotesk y DM Sans) se cargan desde Google Fonts. Sin Internet la aplicación funciona igual, pero con la tipografía del sistema.

## Usuarios de ejemplo

| Rol | Usuario | Contraseña |
|---|---|---|
| Administrador | `admin1` | `Admin123` |
| Vendedor | `vendedor1` | `Vend123` |

En la pantalla de inicio también hay dos accesos rápidos de demostración.

## Roles y pantallas

**Vendedor (usuario común)**

- Inicio: resumen de su turno.
- Existencias: búsqueda por SKU o nombre, filtros por categoría y estado, y detalle del producto.
- Registrar venta: escribe o escanea el SKU, valida el stock y registra la salida.
- Alertas: productos en estado AGOTADO, CRÍTICO o BAJO (solo lectura).
- Mi historial: sus propias ventas.

**Administrador**

Hace todo lo anterior, además de:

- Tablero: indicadores, productos más vendidos, clasificación ABC, cobertura, productos en exceso y valor del inventario (a costo o a precio de venta).
- Productos y proveedores: crear, editar y desactivar.
- Entradas: registrar la recepción de mercancía.
- Ajustes: corregir el stock con motivo obligatorio.
- Usuarios: crear, desactivar, restablecer contraseña y desbloquear cuentas.
- Reportes: existencias y movimientos, con exportación a CSV e impresión.

Los permisos se aplican por rol. Si un vendedor intenta abrir una pantalla de administrador, el sistema muestra "Acceso denegado".

## Regla de negocio

Para cada producto el sistema calcula:

- **Consumo diario (CD)** = ventas de los últimos 30 días ÷ 30, redondeado hacia arriba.
- **Stock de seguridad (SS)** = CD × 2 días.
- **Punto de reorden (PR)** = CD × días de entrega del proveedor + SS.
- **Cobertura** = stock actual ÷ CD.

| Estado | Condición |
|---|---|
| AGOTADO | Stock igual a 0 |
| CRÍTICO | Stock menor o igual que SS |
| BAJO | Stock menor o igual que PR |
| EXCESO | Cobertura mayor a 90 días |
| NORMAL | Ninguna de las anteriores |

**Ejemplo.** El cargador `CAR-20W` vendió 120 unidades en 30 días, así que CD = 4 u/día. Su proveedor entrega en 5 días, por lo que SS = 8 y PR = 4 × 5 + 8 = 28. Con 25 unidades queda en estado **BAJO** y con unos 6 días de cobertura.

El sistema solo alerta. Nunca compra por su cuenta: la decisión de cuánto y cuándo comprar la toma el administrador.

**Límites de la regla:** no considera temporadas (Día de la Madre, Navidad) ni promociones, y un pico reciente de ventas puede inflar el consumo.

## Datos de ejemplo

- 30 productos en 8 categorías (celulares, pantallas, baterías, cargadores, cables, fundas, audífonos y memorias).
- 3 proveedores con 3, 5 y 7 días de entrega.
- Mezcla de estados para poder probar las alertas.
- Precios en córdobas (C$).
- No hay datos personales de clientes.

Los datos se guardan en el `localStorage` del navegador, así que los cambios sobreviven a recargar la página. Para volver a los datos iniciales usa **Restablecer datos de ejemplo** en el menú del usuario.

## Seguridad en el prototipo

- Bloqueo de la cuenta tras 5 intentos fallidos. El administrador la desbloquea desde Usuarios.
- Validación de formularios (SKU único, cantidades enteras mayores que cero, motivo obligatorio en ajustes).
- Los movimientos guardan usuario, fecha, tipo, cantidad y motivo, y no se editan.

> Las contraseñas de ejemplo están a la vista porque es un prototipo de demostración. En un sistema real se guardan con hash y la verificación ocurre en el servidor.

## Estructura del repositorio

```
index.html   Estructura de la aplicación y pantalla de inicio de sesión
styles.css   Estilos (diseño bento, tema claro y oscuro, adaptable a celular)
app.js       Datos de ejemplo, reglas de negocio, pantallas y eventos
logo.png     Logotipo
README.md    Este archivo
```

## Alcance y limitaciones

Este repositorio es un **prototipo de interfaz**, no la versión de producción.

- No tiene servidor ni base de datos. El diseño completo (Flask, SQLite en modo local, PostgreSQL y respaldo en la nube) está descrito en los documentos de la práctica, pero no está implementado aquí.
- La autenticación y los permisos se simulan en el navegador.
- Los datos son de ejemplo y las mediciones de mejora se obtendrán al probar el prototipo.
- No incluye facturación, cobros, contabilidad ni varias sucursales.

## Documentación de la práctica

- Propuesta técnica (Entregable 1)
- Diseño de la solución (Entregable 2)
- Evidencia de pruebas (Entregable 4)
- Informe final (Entregable 5)

## Uso de IA

La interfaz del prototipo se elaboró con apoyo de Claude (Anthropic). El equipo revisó el resultado y es responsable de todo el contenido.

## Licencia

MIT (propuesta, por confirmar con el equipo).
