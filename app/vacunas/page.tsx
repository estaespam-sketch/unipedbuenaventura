import type { Metadata } from "next";
import Link from "next/link";
import ServicioCTA from "@/components/ServicioCTA";

export const metadata: Metadata = {
  title: "Vacunas para Niños en Guatire | Unidad Pediátrica Buenaventura",
  description:
    "Esquema de vacunación infantil en Guatire, con seguimiento personalizado en cada consulta. Revisamos el carnet de vacunación y te acompañamos en cada dosis.",
  alternates: { canonical: "/vacunas" },
  openGraph: {
    title: "Vacunas para Niños en Guatire",
    description:
      "Esquema de vacunación infantil en Guatire, con seguimiento personalizado en cada consulta.",
    url: "/vacunas",
  },
};

const puntos = [
  {
    titulo: "Revisión del carnet de vacunación",
    texto: "En cada visita revisamos el carnet para confirmar qué dosis corresponden según la edad de tu hijo/a.",
  },
  {
    titulo: "Aplicación en consulta",
    texto: "Las vacunas se aplican en un ambiente tranquilo, pensado para reducir el estrés de los más pequeños (y de sus papás).",
  },
  {
    titulo: "Seguimiento post-vacunación",
    texto: "Te orientamos sobre las reacciones esperadas y cuándo consultar si algo te preocupa.",
  },
  {
    titulo: "Vacunación al día para el colegio",
    texto: "Te ayudamos a mantener la documentación de vacunación que suelen pedir colegios y guarderías.",
  },
];

export default function VacunasPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            Vacunación Infantil
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-5">
            Vacunas para Niños en Guatire
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
            La vacunación es una de las herramientas más efectivas para proteger la salud de tu
            hijo/a desde los primeros meses de vida. Te acompañamos en el cumplimiento de su
            esquema de vacunación, con seguimiento personalizado en cada consulta.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">
            ¿Cómo es la consulta de vacunación?
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
            titulo="Trae el carnet de vacunación de tu hijo/a a la próxima consulta"
            mensajeWhatsapp="¡Hola! Vengo desde la página web y quisiera información sobre el esquema de vacunación."
          />
          <p className="text-center text-sm text-slate-500">
            ¿Ya tienes cita programada? Revisa nuestra página de{" "}
            <Link href="/pediatria" className="text-blue-600 font-medium underline underline-offset-2">
              Pediatría General
            </Link>{" "}
            o consulta los{" "}
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
