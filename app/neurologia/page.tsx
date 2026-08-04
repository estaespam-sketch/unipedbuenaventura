import type { Metadata } from "next";
import ServicioCTA from "@/components/ServicioCTA";

export const metadata: Metadata = {
  title: "Neuropediatra en Guatire — Autismo (TEA), TDAH y Neurodesarrollo",
  description:
    "Diagnóstico y seguimiento de trastornos neurológicos en niños en Guatire: Autismo (TEA), TDAH, trastornos del lenguaje y aprendizaje, con enfoque sensible y centrado en la familia.",
  alternates: { canonical: "/neurologia" },
  openGraph: {
    title: "Neuropediatra en Guatire — Autismo (TEA), TDAH y Neurodesarrollo",
    description:
      "Diagnóstico y seguimiento de trastornos neurológicos en niños en Guatire, con enfoque sensible y centrado en la familia.",
    url: "/neurologia",
  },
};

const serviciosNeuro = [
  "Evaluación del neurodesarrollo",
  "Diagnóstico de Autismo / TEA",
  "Trastornos del lenguaje y aprendizaje",
  "TDAH y dificultades de atención",
  "Acompañamiento familiar integral",
];

const etapasDesarrollo = [
  { titulo: "0 a 6 meses", texto: "Habla con tu bebé constantemente, usa objetos de colores brillantes, establece contacto visual y ofrece diferentes texturas para explorar." },
  { titulo: "6 a 12 meses", texto: "Estimula el gateo, lee libros con imágenes, juega a las escondidas y nombra objetos del entorno. El gateo es clave para el desarrollo neurológico." },
  { titulo: "1 a 3 años", texto: "Fomenta el juego simbólico, la música, el dibujo y la interacción social. Establece rutinas claras: el cerebro aprende mejor en ambientes predecibles." },
  { titulo: "Señales de alerta", texto: "Consulta al neuropediatra si observas: ausencia de balbuceo al año, pérdida de habilidades adquiridas, falta de contacto visual o no responde a su nombre." },
];

const seniasTEA = [
  { titulo: "Señales tempranas (6-18 meses)", texto: "No sonríe en respuesta a tu sonrisa, no sigue objetos con la mirada, no balbucea ni señala, y muestra poco interés en otras personas." },
  { titulo: "Señales en niños mayores", texto: "Dificultad para mantener conversaciones, intereses muy específicos e intensos, movimientos repetitivos, sensibilidad inusual a sonidos, texturas o luces." },
  { titulo: "El proceso de diagnóstico", texto: "Involucra observación clínica, evaluación del neurodesarrollo, cuestionarios a padres y pruebas estandarizadas. En nuestra clínica acompañamos a la familia en cada paso." },
  { titulo: "Después del diagnóstico", texto: "El TEA no tiene cura, pero con intervención temprana (terapia del habla, ocupacional, ABA) los niños pueden desarrollar habilidades y llevar una vida plena." },
];

export default function NeurologiaPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            Neuropediatría &amp; TEA
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-5">
            Neuropediatra en Guatire
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Diagnóstico y seguimiento de trastornos neurológicos en niños. Evaluación
            especializada del Autismo (TEA) con enfoque sensible, empático y centrado en la familia.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">
            ¿Qué evaluamos en la consulta de Neuropediatría?
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {serviciosNeuro.map((s) => (
              <span
                key={s}
                className="bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-medium px-4 py-2 rounded-full"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-900 mb-3 text-center">
            Desarrollo neurológico por etapas
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto text-center mb-8">
            Los primeros 3 años de vida son la etapa de mayor plasticidad cerebral. La
            estimulación adecuada en este periodo tiene un impacto duradero en el desarrollo
            cognitivo, emocional y social.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {etapasDesarrollo.map((e) => (
              <div key={e.titulo} className="bg-white border border-blue-100 rounded-xl p-5">
                <h3 className="font-semibold text-blue-900 text-sm mb-1">{e.titulo}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{e.texto}</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-600 text-white rounded-xl p-4 max-w-2xl mx-auto text-center">
            <p className="text-sm font-medium leading-relaxed">
              💙 El juego ES el trabajo del cerebro infantil. Un ambiente seguro, afectuoso y
              estimulante es el mejor regalo.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-900 mb-3 text-center">
            Autismo (TEA): señales y diagnóstico
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto text-center mb-8">
            El Trastorno del Espectro Autista (TEA) es una condición del neurodesarrollo que
            afecta la comunicación, la interacción social y los comportamientos. El diagnóstico
            temprano cambia vidas.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {seniasTEA.map((s) => (
              <div key={s.titulo} className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <h3 className="font-semibold text-blue-900 text-sm mb-1">{s.titulo}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.texto}</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-600 text-white rounded-xl p-4 max-w-2xl mx-auto text-center">
            <p className="text-sm font-medium leading-relaxed">
              💙 Cada niño con TEA es único. No hay dos iguales. Con el apoyo correcto, las
              posibilidades son infinitas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-2xl mx-auto">
          <ServicioCTA
            titulo="Agenda una evaluación de Neuropediatría"
            mensajeWhatsapp="¡Hola! Vengo desde la página web y quisiera una consulta de neuropediatría."
          />
        </div>
      </section>
    </>
  );
}
