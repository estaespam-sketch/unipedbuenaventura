const testimonios = [
  {
    nombre: "María G.",
    texto:
      "Gracias a la Unidad Pediátrica Buenaventura pudimos entender mucho mejor el diagnóstico de autismo de nuestro hijo. El trato fue extraordinario: con paciencia, claridad y mucho respeto.",
    rol: "Mamá de Alejandro, 5 años",
    inicial: "M",
  },
  {
    nombre: "Carlos R.",
    texto:
      "Llevamos a nuestra hija por retrasos del lenguaje y el seguimiento fue impecable. Nos explicaron cada paso del proceso y siempre nos hicieron sentir acompañados.",
    rol: "Papá de Valentina, 3 años",
    inicial: "C",
  },
  {
    nombre: "Luisa P.",
    texto:
      "Como mamá primeriza tenía mil dudas. Aquí siempre me recibieron con calma y resolvieron cada pregunta. El control de crecimiento de mi bebé ha sido perfecto.",
    rol: "Mamá de Sebastián, 8 meses",
    inicial: "L",
  },
];

const topicos = [
  {
    icono: "🤱",
    titulo: "Lactancia materna",
    descripcion: "Beneficios, técnicas y apoyo para madres que dan el pecho.",
  },
  {
    icono: "🧠",
    titulo: "Desarrollo neurológico",
    descripcion: "¿Cómo estimular el cerebro de tu hijo en cada etapa?",
  },
  {
    icono: "💬",
    titulo: "Autismo y TEA",
    descripcion: "Señales de alerta, diagnóstico temprano y recursos para familias.",
  },
  {
    icono: "🍎",
    titulo: "Alimentación infantil",
    descripcion: "Guías de nutrición desde la introducción de sólidos.",
  },
];

export default function EspacioPadres() {
  return (
    <section id="padres" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Espacio para Familias
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Para papás y mamás
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Un espacio dedicado a acompañarte en cada etapa del crecimiento de tu hijo.
          </p>
        </div>

        {/* Tópicos de interés */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {topicos.map((t) => (
            <div
              key={t.titulo}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-center flex flex-col items-center gap-3"
            >
              <span className="text-3xl">{t.icono}</span>
              <h4 className="font-semibold text-blue-900 text-sm">{t.titulo}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{t.descripcion}</p>
            </div>
          ))}
        </div>

        {/* Testimonios */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-blue-900 text-center mb-8">
            Experiencias de nuestras familias
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonios.map((t) => (
              <div
                key={t.nombre}
                className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col gap-4"
              >
                <svg className="w-8 h-8 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-sm text-slate-600 leading-relaxed italic">{t.texto}</p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-blue-100">
                  <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.inicial}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-blue-900">{t.nombre}</p>
                    <p className="text-xs text-slate-400">{t.rol}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-slate-400 mb-4">
            ¿Quieres compartir tu experiencia?
          </p>
          <a
            href="https://wa.me/584242984023?text=Hola,%20quisiera%20compartir%20mi%20experiencia%20en%20la%20clínica"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-blue-300 text-blue-600 hover:bg-blue-50 text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
          >
            Enviar mi testimonio
          </a>
        </div>
      </div>
    </section>
  );
}
