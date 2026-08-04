import Link from "next/link";

const servicios = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    titulo: "Pediatría General",
    descripcion:
      "Atención integral del niño desde el nacimiento hasta la adolescencia. Seguimiento del crecimiento, desarrollo, vacunación y prevención de enfermedades.",
    puntos: [
      "Control de crecimiento y desarrollo",
      "Esquema de vacunación",
      "Consulta de urgencia",
    ],
    color: "bg-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    pagina: "/pediatria",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    titulo: "Neuropediatría & TEA",
    descripcion:
      "Diagnóstico y seguimiento de trastornos neurológicos en niños. Evaluación especializada del Autismo (TEA) con enfoque sensible, empático y centrado en la familia.",
    puntos: [
      "Evaluación del neurodesarrollo",
      "Diagnóstico de Autismo / TEA",
      "TDAH y dificultades de atención",
    ],
    color: "bg-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    pagina: "/neurologia",
  },
];

const seguros = [
  "Fundación España Salud",
  "Fundación Seguros Caracas",
  "Seguros Universitas",
  "Seguros Miranda",
  "CIMECI",
];

export default function Servicios() {
  return (
    <section id="servicios" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Especialidades que ofrecemos
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Atención médica de calidad, con el cuidado y la calidez que tu familia merece.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicios.map((s) => (
            <div
              key={s.titulo}
              className={`rounded-2xl border ${s.border} ${s.bg} p-8 flex flex-col gap-5`}
            >
              <div className={`${s.color} w-14 h-14 rounded-xl flex items-center justify-center text-white`}>
                {s.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">{s.titulo}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{s.descripcion}</p>
                <ul className="space-y-2">
                  {s.puntos.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-4">
                <Link
                  href="/#contacto"
                  className={`inline-flex items-center gap-2 ${s.color} hover:opacity-90 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-opacity w-fit`}
                >
                  Solicitar cita
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href={s.pagina}
                  className="text-sm font-semibold text-blue-700 hover:text-blue-900 underline underline-offset-2"
                >
                  Ver más sobre {s.titulo} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-xs font-semibold text-blue-900 uppercase tracking-widest mb-4">
            Seguros y convenios aceptados
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {seguros.map((s) => (
              <span
                key={s}
                className="bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
