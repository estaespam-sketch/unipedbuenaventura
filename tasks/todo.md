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
