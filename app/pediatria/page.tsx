import type { Metadata } from "next";
import Link from "next/link";
import ServicioCTA from "@/components/ServicioCTA";

export const metadata: Metadata = {
  title: "Pediatra General en Guatire, Miranda | Unidad Pediátrica Buenaventura",
  description:
    "Atención pediátrica integral en Guatire: control de crecimiento y desarrollo, vacunación, enfermedades agudas, orientación nutricional y consulta de urgencia. Agenda tu cita.",
  alternates: { canonical: "/pediatria" },
  openGraph: {
    title: "Pediatra General en Guatire, Miranda",
    description:
      "Atención pediátrica integral en Guatire: control de crecimiento, vacunación, enfermedades agudas y orientación nutricional.",
    url: "/pediatria",
  },
};

const puntos = [
  {
    titulo: "Control de crecimiento y desarrollo",
    texto:
      "Seguimos la curva de peso, talla y desarrollo psicomotor de tu hijo/a en cada etapa, para detectar a tiempo cualquier señal que necesite atención especializada.",
  },
  {
    titulo: "Esquema de vacunación",
    texto:
      "Te acompañamos en el cumplimiento del esquema de vacunación según la edad, revisando el carnet en cada consulta.",
  },
  {
    titulo: "Atención de enfermedades agudas",
    texto:
      "Diagnóstico y tratamiento oportuno de fiebre, infecciones respiratorias, gastrointestinales y demás enfermedades comunes de la infancia.",
  },
  {
    titulo: "Orientación nutricional",
    texto:
      "Acompañamiento en la alimentación desde la lactancia hasta la introducción de sólidos y la dieta familiar, adaptado a cada etapa del crecimiento.",
  },
  {
    titulo: "Consulta de urgencia",
    texto:
      "Atención prioritaria cuando tu hijo/a lo necesita, sin tener que esperar a la próxima cita programada.",
  },
];

export default function PediatriaPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            Pediatría General
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-5">
            Pediatra General en Guatire, Miranda
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Atención integral del niño desde el nacimiento hasta la adolescencia, con el
            seguimiento, la calidez y la dedicación que tu familia merece.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">
            ¿Qué incluye la consulta de Pediatría General?
          </h2>
          <div className="grid gap-5">
            {puntos.map((p) => (
              <div
                key={p.titulo}
                className="flex gap-4 bg-blue-50 border border-blue-100 rounded-2xl p-6"
              >
                <svg
                  className="w-6 h-6 text-blue-500 shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-bold text-blue-900 mb-1">{p.titulo}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{p.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
          <ServicioCTA
            titulo="Agenda la consulta pediátrica de tu hijo/a"
            mensajeWhatsapp="¡Hola! Vengo desde la página web y quisiera agendar una cita de Pediatría General."
          />
          <p className="text-center text-sm text-slate-500">
            ¿Buscas información sobre el esquema de vacunación? Visita nuestra página de{" "}
            <Link href="/vacunas" className="text-blue-600 font-medium underline underline-offset-2">
              Vacunas
            </Link>
            , o revisa los{" "}
            <Link href="/seguros" className="text-blue-600 font-medium underline underline-offset-2">
              seguros y convenios
            </Link>{" "}
            que aceptamos.
          </p>
        </div>
      </section>
    </>
  );
}
