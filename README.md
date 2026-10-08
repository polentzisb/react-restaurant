# Wasabi · Sushi & Bento

Sitio de restaurante con React, React Router y Vite. Incluye inicio, carta con búsqueda y filtros, presentación del restaurante y formulario de consultas conectado a Cloud Firestore.

https://wasabi-sushi-bento.netlify.app/

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

