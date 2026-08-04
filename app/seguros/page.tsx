import type { Metadata } from "next";
import ServicioCTA from "@/components/ServicioCTA";

export const metadata: Metadata = {
  title: "Pediatra que Acepta Seguros Médicos en Guatire | Unidad Pediátrica Buenaventura",
  description:
    "Seguros y convenios médicos aceptados en la Unidad Pediátrica Buenaventura: Fundación España Salud, Fundación Seguros Caracas, Seguros Universitas, Seguros Miranda y CIMECI.",
  alternates: { canonical: "/seguros" },
  openGraph: {
    title: "Seguros y Convenios Médicos Aceptados en Guatire",
    description:
      "Seguros y convenios médicos aceptados en la Unidad Pediátrica Buenaventura.",
    url: "/seguros",
  },
};

const seguros = [
  "Fundación España Salud",
  "Fundación Seguros Caracas",
  "Seguros Universitas",
  "Seguros Miranda",
  "CIMECI",
];

export default function SegurosPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            Seguros y Convenios
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-5">
            Seguros y Convenios Médicos Aceptados en Guatire
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Trabajamos con las siguientes aseguradoras y fundaciones de salud. Si tienes dudas
            sobre tu cobertura específica, te ayudamos a confirmarla antes de tu cita.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
          {seguros.map((s) => (
            <div
              key={s}
              className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl p-5"
            >
              <svg className="w-6 h-6 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
              <span className="font-semibold text-blue-900">{s}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">
            ¿Cómo funciona el reembolso?
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed text-center max-w-xl mx-auto mb-10">
            Te recomendamos confirmar con tu aseguradora la cobertura específica para consultas
            de Pediatría y Neuropediatría antes de tu cita. En la clínica podemos emitir la
            factura y el informe médico que necesites para tramitar tu reembolso.
          </p>
          <ServicioCTA
            titulo="¿No estás segura si tu seguro cubre la consulta?"
            mensajeWhatsapp="¡Hola! Vengo desde la página web y quisiera confirmar si mi seguro cubre la consulta."
          />
        </div>
      </section>
    </>
  );
}
