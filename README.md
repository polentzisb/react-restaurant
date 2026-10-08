# Wasabi · Sushi & Bento

Sitio de restaurante con React, React Router y Vite. Incluye inicio, carta con búsqueda y filtros, presentación del restaurante y formulario de consultas conectado a Cloud Firestore.

## Ejecutar localmente

Necesitas **Node.js 24** (también compatible con Node 22.13 o superior de la rama 22).

```sh
npm ci
npm run dev
```

Abre la dirección que muestra Vite, normalmente `http://127.0.0.1:5173`. `npm start` funciona como alias. La web se puede explorar sin Firebase; en ese caso el formulario avisa que el envío no está disponible.

```sh
npm run lint       # Revisión estática
npm test           # Pruebas automáticas, sin modo de espera
npm run test:watch # Pruebas durante el desarrollo
npm run build      # Compilación en dist/
npm run preview    # Vista previa de la compilación
```

## Configurar el formulario

1. Copia `.env.example` a `.env.local`.
2. Completa las variables `VITE_FIREBASE_*` con la configuración web de tu proyecto en Firebase Console → Project settings.
3. Activa Cloud Firestore y configura sus reglas para la colección `messages`. Se incluye `firestore.rules` como punto de partida: permite crear mensajes válidos y deniega su lectura, modificación y eliminación desde clientes. Revisa e integra estas reglas con las de tu proyecto antes de aplicarlas; no se despliegan automáticamente.
4. Reinicia Vite. En producción, define las mismas variables antes de compilar.

El documento enviado contiene `name`, `email`, `message` y `createdAt` (fecha del servidor). El formulario valida campos obligatorios y correo, limita longitudes, bloquea envíos simultáneos, conserva los datos si ocurre un error y se limpia al confirmar el guardado. Las claves web de Firebase son configuración pública; la protección de los datos depende de las reglas de Firestore. No uses una cuenta de servicio en estas variables. Para un formulario público en producción, configura Firebase App Check y una estrategia de protección contra abuso apropiada.

Las pruebas simulan el servicio de mensajes. La entrega real y las reglas deben verificarse contra tu proyecto Firebase o el emulador antes de publicar; este repositorio no incluye credenciales ni se ha conectado a una base de datos durante la mejora.

## Despliegue

`netlify.toml` configura Node 24, `npm run build`, publicación de `dist/` y redirecciones para React Router. Si actualizas el sitio existente en Netlify, comprueba que no conserve una configuración manual de publicación en `build/`. En otros proveedores, configura todas las rutas del sitio para servir `index.html`.

Sitio original: [Wasabi Sushi & Bento](https://wasabi-sushi-bento.netlify.app/). Los cambios locales no actualizan automáticamente ese sitio.

## Contenido y estructura

- `src/data/menulist.jsx`: catálogo, identificadores, categorías, imágenes y precios.
- `src/components/`: páginas y componentes compartidos.
- `src/services/messages.js`: configuración y envío a Firestore; Firebase Firestore Lite se carga cuando se envía un mensaje.
- `src/styles/` y `src/App.css`: estilos adaptables y sistema visual.
- `src/test/` y `*.test.jsx`: pruebas con Vitest y Testing Library.

Se conservaron los platos, precios y fotografías originales. Los importes del catálogo se muestran explícitamente en USD; confirma moneda, precios y disponibilidad antes de usarlo comercialmente. La consulta de un plato precarga el formulario; no hay checkout, cobro ni confirmación de pedidos. No se inventaron direcciones, horarios o cuentas sociales.

## Revisión y mejoras

La versión inicial tenía alturas y anchos fijos que desbordaban el contenido, un botón de pedido sin acción, enlaces sin estado activo, texto de relleno y un formulario que podía quedar bloqueado después de un fallo. Además, dependía de bibliotecas sin uso y versionaba una compilación que duplicaba el código y las imágenes.

La actualización incorpora:

- Diseño coherente en español, adaptable a móvil y escritorio, manteniendo la marca y las imágenes.
- Navegación móvil, enlaces activos, foco visible, salto al contenido, imágenes con texto alternativo y estados accesibles.
- Búsqueda combinada con filtros de sushi y bento, contador y recuperación desde resultados vacíos.
- Consultas por plato, validación y recuperación de errores del formulario.
- Página 404, títulos por ruta y carga diferida de páginas y Firebase Firestore Lite.
- Fotografías WebP: 10,15 MB → 0,63 MB, aproximadamente un 94 % menos de descarga.
- Migración de Create React App a Vite y eliminación de Bootstrap, MUI, librerías de mapas y otras dependencias sin uso.
- Compilación fuera del control de versiones, variables documentadas y validación en GitHub Actions.

Las fotografías originales de alta resolución siguen disponibles en `src/assets/*.jpg`; la web utiliza copias WebP optimizadas y carga diferida en la carta. Ejecuta `npm run optimize:images` después de reemplazar las fotografías originales. Las copias WebP se versionan, por lo que no hace falta regenerarlas para ejecutar o compilar.

Se fijaron versiones compatibles de `@firebase/app` y `@firebase/app-compat` para Node 24.11, y una versión corregida de `@grpc/grpc-js` mediante `overrides`. Revisa estas restricciones al actualizar Firebase.

Referencias de implementación: [Vite](https://vite.dev/guide/) y [escrituras en Firestore](https://firebase.google.com/docs/firestore/manage-data/add-data).
