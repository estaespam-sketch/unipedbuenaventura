import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { google } from "googleapis";

type DatosFormulario = {
  representante: string;
  paciente: string;
  fechaNacimiento: string;
  telefono: string;
  correo: string;
  tipoConsulta: string;
  formaPago: string;
  fechaCita: string;
  horaCita: string;
  redesSociales?: string;
};

const CAMPOS_REQUERIDOS: (keyof DatosFormulario)[] = [
  "representante",
  "paciente",
  "fechaNacimiento",
  "telefono",
  "correo",
  "tipoConsulta",
  "formaPago",
  "fechaCita",
  "horaCita",
];

function tituloEvento(tipoConsulta: string) {
  if (tipoConsulta === "Pediatría") return "Nuevos leads PED";
  if (tipoConsulta === "Neuropediatría") return "Nuevos leads NEURO";
  return "Nuevos leads";
}

function descripcion(datos: DatosFormulario) {
  return [
    `Nombre del representante: ${datos.representante}`,
    `Nombre del paciente: ${datos.paciente}`,
    `Fecha de nacimiento: ${datos.fechaNacimiento}`,
    `Teléfono: ${datos.telefono}`,
    `Correo: ${datos.correo}`,
    `Tipo de consulta: ${datos.tipoConsulta}`,
    `Forma de pago: ${datos.formaPago}`,
    `Fecha y hora deseada: ${datos.fechaCita} ${datos.horaCita}`,
    `Redes sociales: ${datos.redesSociales || "—"}`,
  ].join("\n");
}

function sumarMinutos(fecha: string, hora: string, minutos: number) {
  const [anio, mes, dia] = fecha.split("-").map(Number);
  const [hh, mm] = hora.split(":").map(Number);
  const base = new Date(Date.UTC(anio, mes - 1, dia, hh, mm));
  base.setUTCMinutes(base.getUTCMinutes() + minutos);

  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    fecha: `${base.getUTCFullYear()}-${pad(base.getUTCMonth() + 1)}-${pad(base.getUTCDate())}`,
    hora: `${pad(base.getUTCHours())}:${pad(base.getUTCMinutes())}`,
  };
}

async function enviarCorreo(datos: DatosFormulario) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "Unidad Pediátrica Buenaventura <onboarding@resend.dev>",
    to: process.env.NOTIFICATION_EMAIL!,
    replyTo: datos.correo,
    subject: `Nueva solicitud de cita - ${datos.tipoConsulta} - ${datos.paciente}`,
    text: descripcion(datos),
  });
  if (error) throw new Error(error.message);
}

async function confirmarCorreoPaciente(datos: DatosFormulario) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "Unidad Pediátrica Buenaventura <onboarding@resend.dev>",
    to: datos.correo,
    subject: "Recibimos tu solicitud de cita",
    text: [
      `Hola ${datos.representante},`,
      "",
      `Recibimos tu solicitud de cita para ${datos.paciente} (${datos.tipoConsulta}) el ${datos.fechaCita} a las ${datos.horaCita}.`,
      "En breve nos pondremos en contacto contigo para confirmar.",
      "",
      "Si tienes alguna urgencia, escríbenos por WhatsApp al 0424-298.4023.",
      "",
      "Unidad Pediátrica Buenaventura",
    ].join("\n"),
  });
  if (error) throw new Error(error.message);
}

async function crearEventoCalendario(datos: DatosFormulario) {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar.events"],
  });
  const calendar = google.calendar({ version: "v3", auth });

  const fin = sumarMinutos(datos.fechaCita, datos.horaCita, 30);

  await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    requestBody: {
      summary: tituloEvento(datos.tipoConsulta),
      description: descripcion(datos),
      start: { dateTime: `${datos.fechaCita}T${datos.horaCita}:00`, timeZone: "America/Caracas" },
      end: { dateTime: `${fin.fecha}T${fin.hora}:00`, timeZone: "America/Caracas" },
    },
  });
}

export async function POST(request: NextRequest) {
  const datos = (await request.json()) as Partial<DatosFormulario>;

  const faltante = CAMPOS_REQUERIDOS.find((campo) => !datos[campo]);
  if (faltante) {
    return NextResponse.json({ error: `Falta el campo ${faltante}` }, { status: 400 });
  }

  const completos = datos as DatosFormulario;
  const tareas = [
    { nombre: "Error enviando correo al consultorio:", promesa: enviarCorreo(completos) },
    { nombre: "Error creando evento en calendario:", promesa: crearEventoCalendario(completos) },
    { nombre: "Error enviando correo de confirmación al paciente:", promesa: confirmarCorreoPaciente(completos) },
  ];
  const resultados = await Promise.allSettled(tareas.map((t) => t.promesa));

  resultados.forEach((resultado, i) => {
    if (resultado.status === "rejected") {
      console.error(tareas[i].nombre, resultado.reason);
    }
  });

  const fallaronTodos = resultados.every((r) => r.status === "rejected");
  if (fallaronTodos) {
    return NextResponse.json({ error: "No se pudo procesar la solicitud" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
