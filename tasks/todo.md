# Formulario de contacto: email + Google Calendar

Ver plan completo en la conversación. Resumen ejecutable:

## Código (lo hago yo)
- [x] Arreglar formato de `.env.local` (variables válidas, reutilizando la Service Account que ya existe)
- [x] Agregar dependencias `resend` y `googleapis`
- [x] Agregar campo "Tipo de consulta" (Pediatría/Neuropediatría) en `Contacto.tsx`
- [x] Conectar el formulario a `/api/contacto` con `fetch`, manejar éxito y error
- [x] Crear `app/api/contacto/route.ts`: valida datos, envía email por Resend, crea evento en Google Calendar
- [x] `npm run build` y `npm run lint` sin errores; confirmada autenticación de la Service Account contra Google (token OK)

## Manual (lo hace la usuaria)
- [x] Confirmar Google Calendar API habilitada en el proyecto `unipedguatire-503402`
- [x] Compartir un calendario con `calendar-bot@unipedguatire-503402.iam.gserviceaccount.com` (permiso máximo otorgado)
- [x] Crear cuenta en Resend con secretariadr.belisario@gmail.com y generar API Key
- [x] Pegar el API Key de Resend en `.env.local` (`RESEND_API_KEY`)
- [ ] **Pendiente de confirmar por la usuaria**: revisar su bandeja de entrada y su Google Calendar para ver los eventos/correos de prueba

## Lessons
- Resend en modo de prueba (sin dominio verificado) exige que el "to" coincida EXACTAMENTE (mayúsculas incluidas) con el correo de registro de la cuenta. Guardar los correos en `.env.local` siempre en minúsculas tal cual se registraron.
- Al pedirle a alguien no técnico que "comparta su calendario", puede compartir sin querer un calendario secundario (ID tipo `...@group.calendar.google.com`) en vez del principal (ID = su email). Conviene pedir que confirme el "ID de calendario" en la sección "Integrar calendario" antes de asumir cuál calendario quedó compartido.
- Los scripts de Node ejecutados desde fuera del directorio del proyecto (ej. carpeta scratchpad) no encuentran `node_modules` del proyecto vía `require()`. Usar `node -e` con cwd en el proyecto, o `NODE_PATH=<proyecto>/node_modules node script.js`.

## Sesión 2026-07-24: fecha/hora de cita + fix deploy

- [x] Diagnóstico: el formulario nunca se había subido a producción (código sin commitear) + faltaban las env vars de Resend/Google en Vercel (solo estaba GROQ_API_KEY)
- [x] Agregado campo "Fecha deseada para la cita" y "Hora deseada" en Contacto.tsx
- [x] `crearEventoCalendario` ahora usa la fecha/hora del formulario (antes usaba "ahora mismo")
- [x] Agregadas las 5 env vars faltantes a Vercel Production (RESEND_API_KEY, NOTIFICATION_EMAIL, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_CALENDAR_ID)
- [x] Deploy a producción — probado con POST real: correo y evento de calendario funcionan
- [x] Fix adicional (bug reportado): Noticias a veces no cargaba porque Groq a veces envuelve el JSON en \`\`\`json y como la ruta se cachea 1h el error se quedaba pegado. Se agregó limpieza del texto antes de parsear.

## Lessons (nueva)
- Este proyecto NO tiene integración Git→Vercel automática: hay que correr `vercel --prod` explícitamente después de cada `git push` para que los cambios lleguen al sitio real (confirmado revisando `list_deployments`: todos los deploys anteriores tienen `actor: claude-code_*_agent`, o sea CLI manual, no webhook).
- Las rutas GET de `app/api/*/route.ts` con `export const revalidate = N` quedan cacheadas como contenido estático (se ve como "○ Static" en el build) — si la generación falla una vez, el error queda servido hasta la siguiente revalidación. Con llamadas a LLMs conviene limpiar/validar la respuesta antes de cachearla.

## Sesión 2026-07-24 (parte 2): mejoras de confianza/SEO

- [x] Horario real + ubicación con mapa embebido (iframe sin API key) en Contacto.tsx y Footer.tsx, con datos sacados del Google Business Profile real (capturas que mandó Pam)
- [x] Reseñas falsas (Andrea M., Roberto S., etc.) reemplazadas por 2 reseñas reales de Google (Jonathan Colina, Ariana Berroteran) + conteo real (201 opiniones) + link correcto a Maps
- [x] Correo de confirmación automático al padre/representante (además del correo al consultorio)
- [x] Botón de WhatsApp flotante en todo el scroll
- [x] Sección "Sobre el Doctor" con ilustración de marca (Dr. Herman Belisario NO permite fotos/videos reales, solo la ilustración de @elneurologoinfantil)
- [x] Franja de seguros aceptados (Fundación España Salud, Fundación Seguros Caracas, Seguros Universitas, Seguros Miranda, CIMECI)
- [x] SEO: Open Graph + JSON-LD (MedicalClinic) con datos reales
- [x] Fix next/image en preview de Noticias
- [x] Deploy a producción, probado con POST real sin errores

## Pendiente / limitación conocida
- **El correo de confirmación al padre NO le va a llegar a un padre real todavía.** Resend está en modo de prueba (sin dominio propio verificado) y por eso solo permite mandar correos a la casilla con la que se registró la cuenta (secretariadr.belisario@gmail.com). El código ya está listo y no rompe nada (si falla, solo se loguea, el consultorio igual recibe su notificación) — pero para que el padre reciba su confirmación de verdad, hay que verificar un dominio propio en resend.com/domains (Pam necesita tener un dominio, ej. comprarlo en Vercel, y agregar los registros DNS que pida Resend).
- Quedaron fuera de esta ronda (necesitan más info de Pam): sección de Preguntas Frecuentes.

## Sesión 2026-07-28: conectar dominio propio (unidadpediatricabuenaventura.com)

Dominio registrado en HostGator (plan de negocio, con correo activo). Decisión: **opción mixta** — el dominio se queda registrado en HostGator, solo se apunta la web a Vercel vía registros A (no se transfiere el registrador, no se tocan los nameservers, para no romper el correo).

- [x] Confirmado: proyecto ya vinculado a Vercel (`unipedbuenaventura`, `.vercel/project.json`)
- [x] `vercel domains add unidadpediatricabuenaventura.com` → agregado al proyecto
- [x] `vercel domains add www.unidadpediatricabuenaventura.com` → agregado al proyecto
- [x] Registros DNS requeridos (dados por Vercel):
  - `A  unidadpediatricabuenaventura.com  →  76.76.21.21`
  - `A  www.unidadpediatricabuenaventura.com  →  76.76.21.21`
- [x] Pam editó en HostGator (Zona avanzada de DNS): registro A de `unidadpediatricabuenaventura.com` cambiado de `162.241.61.243` a `76.76.21.21`
- [x] `www.unidadpediatricabuenaventura.com` ya era CNAME → apunta al dominio raíz, no requirió cambio (sigue automáticamente al nuevo A)
- [x] DNS propagado y confirmado (`dig` + `curl`): `http://unidadpediatricabuenaventura.com` ya sirve el sitio real desde Vercel (200 OK, `Server: Vercel`)
- [x] HTTPS: certificado SSL (Let's Encrypt) finalmente emitido ~11h después de verificado el dominio (tardó mucho más de lo normal, se había escalado a soporte de Vercel vía ticket) — confirmado con `curl`: `unidadpediatricabuenaventura.com` y `www` responden 200 OK con cert válido
- [x] Correo (MX) verificado intacto en HostGator, sin cambios

## Dominio conectado — resumen final
`unidadpediatricabuenaventura.com` y `www.unidadpediatricabuenaventura.com` funcionando en producción sobre Vercel, con HTTPS activo, dominio sigue registrado en HostGator, correo sin afectación.
- [ ] Pendiente relacionado de la sesión anterior: una vez el dominio esté verificado, verificar el dominio también en resend.com/domains para que el correo de confirmación a los padres funcione en real (hoy solo llega a la casilla de prueba)

## Lessons (nueva, parte 2)
- El optimizador de imágenes de `next dev` (`/_next/image`) cachea en memoria del proceso; si se reemplaza un archivo en `/public` sin reiniciar el servidor **de verdad** (matar el proceso, no solo el puerto — `npm run dev &` a veces deja un proceso zombie que sigue respondiendo en el mismo puerto), se sigue sirviendo la versión vieja aunque el archivo en disco ya cambió. Solución: `pkill -f "next dev"` + `lsof -ti:3000 | xargs kill -9` + borrar `.next/` antes de reiniciar.
- Para verificar el crop de una imagen antes de escribir código, usar `sips -c H W --cropOffset Y X` (orden Y luego X) sobre una copia de prueba y mirar el resultado — más confiable que adivinar `object-position` a ciegas.
- Resend sandbox (sin dominio verificado) SOLO permite mandar a la casilla del dueño de la cuenta — así que cualquier función que le mande correo a un tercero (ej. confirmación al paciente) no va a funcionar en real hasta verificar un dominio propio.

## Sesión 2026-08-04: investigación de keywords + arquitectura multi-página

Con el dominio y HTTPS ya funcionando (sesión anterior), esta sesión fue de SEO/arquitectura:
- [x] Investigación de ~20 búsquedas reales de la zona (Guatire/Guarenas/Miranda) cruzando categorías de directorios médicos venezolanos (Infoguia, Mi Guía Médica, Guía Miranda) con el nicho del doctor
- [x] Auditoría de arquitectura completa: mismatch entre el menú y el orden real de las secciones, "Sobre el Doctor" sin `id` (no enlazable), `metadataBase`/OG/JSON-LD apuntando todavía al dominio viejo de Vercel, sin `sitemap.xml`/`robots.txt`, video del Hero de 18.7MB precargándose completo desde el inicio
- [x] Mensaje de WhatsApp actualizado en los 7 botones con CTA (`¡Hola! Vengo desde la página web y...`) para identificar el origen del contacto — no se tocó el link del Footer (solo muestra el número, sin texto)
- [x] Creadas 5 páginas nuevas con metadata propia apuntando al dominio real: `/pediatria`, `/neurologia`, `/vacunas`, `/seguros`, `/preguntas-frecuentes` (con JSON-LD `FAQPage`)
- [x] Contenido de `/neurologia` reutiliza texto ya aprobado de los modales "Desarrollo neurológico" y "Autismo (TEA)" de `EspacioPadres.tsx` — nada clínico nuevo inventado
- [x] `Navbar.tsx` reestructurado: dropdown "Servicios" (Pediatría/Neurología/Vacunas/Seguros) + resto de links en su orden real; los anchors pasan de `#seccion` a `/#seccion` para funcionar también desde las páginas nuevas
- [x] `Servicios.tsx` acortado (2-3 puntos en vez de 5) + botón "Ver más" a la página dedicada, para no duplicar contenido (mejor para SEO)
- [x] `SobreElDoctor.tsx` ahora tiene `id="doctor"`
- [x] `app/layout.tsx`: `metadataBase`, `openGraph.url` y URLs del JSON-LD corregidas a `unidadpediatricabuenaventura.com`
- [x] `ffmpeg` instalado vía Homebrew y video del Hero comprimido: `video1.mov` 19.6MB → `video1.mp4` 1.9MB, `video2.mov` 1.5MB → `video2.mp4` 0.7MB (misma duración, confirmada con `ffprobe`). Los `.mov` viejos se borraron (recuperables en el historial de git)
- [x] `GaleriaHero.tsx`: los videos ya no se montan en el HTML inicial — confirmado con `curl` que la carga inicial de `/` tiene 0 tags `<video>`, solo se montan cuando el carrusel llega a esa diapositiva
- [x] `npm run build` y `npm run lint` sin errores; las 8 rutas (`/`, 5 páginas nuevas, `/sitemap.xml`, `/robots.txt`) devuelven 200

## Pendiente / limitación conocida (nueva)
- **`/vacunas` no tiene un esquema de vacunas específico (edades/dosis)** — no está verificado por Pam, así que la página describe el servicio en general. Falta que Pam mande la lista/cronograma real para agregarlo como tabla.
- **`/preguntas-frecuentes` es un borrador inicial**, armado solo con datos ya verificados en otras partes del sitio (horario, dirección, seguros). Falta que Pam revise y agregue preguntas reales que le hacen los papás.
- [x] Deploy a producción (`vercel --prod`) hecho el 2026-08-11, verificado con `curl` (200 en las 8 rutas vía alias `unipedbuenaventura.vercel.app`; no se pudo probar el dominio propio directamente por DNS del sandbox, pero apunta al mismo deploy)

## Lessons (nueva, parte 3)
- Este proyecto tiene activadas las reglas nuevas de `eslint-plugin-react-hooks` (React Compiler): `react-hooks/set-state-in-effect` prohíbe llamar a un setState directamente en el cuerpo de un `useEffect` (sí está permitido si el setState queda anidado dentro de un callback async como `setInterval`/`setTimeout` dentro del efecto). `react-hooks/refs` prohíbe leer/mutar un `ref.current` durante el render (solo en efectos o event handlers) — nada de "leer un ref para derivar el JSX" aunque parezca inofensivo.
- Cuando un video ya está en el DOM (aunque sea con `opacity-0`), el navegador intenta precargarlo igual. La forma correcta de diferir la carga es no renderizar el `<video>` (ni su `src`) hasta que el slide se vuelve activo por primera vez, guardando en estado qué índices ya fueron mostrados.

## Sesión 2026-08-18: cumplimiento normativo (FMV) + SEO H1/H2/keywords + tarjeta Vacunación

- [x] Detectado y corregido: la tarjeta de Instagram @unipedguatire mostraba una captura (`post1.png`) con el texto "QUEDAN POCOS CUPOS" diseñado dentro de la imagen — lenguaje de urgencia/escasez del tipo que la Federación Médica de Venezuela ha sancionado. Como el texto está en los píxeles (no editable por código), se quitó esa captura del carrusel en `Contacto.tsx` y se ajustó el grid a 2 columnas para esa tarjeta.
- [x] SEO: `keywords` en `app/layout.tsx` ampliado de 6 a 14 términos (variantes de Guarenas, TDAH, urgencias, control niño sano, etc.)
- [x] SEO: H1 del Hero ahora incluye "Pediatra y Neuropediatra en Guatire" como línea superior dentro de la misma etiqueta `<h1>`, sin cambiar el diseño visual
- [x] SEO: H2 de Servicios cambiado a "Especialidades en Pediatría y Neuropediatría en Guatire"
- [x] Agregada 5ta tarjeta "Vacunación" en `EspacioPadres.tsx`, enlazando a `/vacunas` (ya existía) y reusando el contenido ya aprobado de esa página para el modal — nada clínico nuevo inventado
- [x] Bug encontrado y arreglado de paso: el link "Ver más" del modal de `EspacioPadres.tsx` decía siempre "Ver más en Neurología →" sin importar la página destino (afectaba a la nueva tarjeta de Vacunación); ahora es genérico "Ver más →"
- [x] Grid de "Para papás y mamás" ajustado a 5 columnas en desktop para que las 5 tarjetas queden parejas en una fila
- [x] Verificado con Playwright (screenshots desktop + mobile) que no rompió nada visualmente; `npm run build` y `npm run lint` sin errores

## Pendiente
- **Typo de NAP en Google Business Profile** ("Centro Medico Buenventura" → "Centro Médico Buenaventura"): es manual, se corrige directamente en la ficha de Google, no en el código.
- La imagen original con "Quedan pocos cupos" podría seguir en el Instagram real de @unipedguatire (si la historia sigue activa) — esto solo la quitó de la web.
