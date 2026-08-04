import type { Metadata } from "next";
import ServicioCTA from "@/components/ServicioCTA";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | Unidad Pediátrica Buenaventura",
  description:
    "Respuestas a las preguntas más frecuentes sobre citas, horario, ubicación, seguros aceptados y señales de alerta de Autismo (TEA) en la Unidad Pediátrica Buenaventura, Guatire.",
  alternates: { canonical: "/preguntas-frecuentes" },
  openGraph: {
    title: "Preguntas Frecuentes | Unidad Pediátrica Buenaventura",
    description: "Respuestas a las preguntas más frecuentes sobre citas, horario, ubicación y seguros aceptados.",
    url: "/preguntas-frecuentes",
  },
};

const faqs = [
  {
    pregunta: "¿Cómo agendo una cita?",
    respuesta:
      "Puedes escribirnos por WhatsApp al 0424-298.4023 o completar el formulario de contacto en nuestra página. Te respondemos a la brevedad para coordinar fecha y hora.",
  },
  {
    pregunta: "¿Cuál es el horario de atención?",
    respuesta:
      "Lunes y martes de 8:00am a 5:00pm, miércoles de 8:00am a 3:00pm, y jueves y viernes de 8:00am a 4:00pm. Sábados y domingos permanecemos cerrados.",
  },
  {
    pregunta: "¿Dónde están ubicados?",
    respuesta:
      "En el Piso 2, Consultorio 2-45 del Edificio Centro Médico Buenaventura, C.C. Buenaventura, Av. Intercomunal Guarenas-Guatire, Guatire, Miranda.",
  },
  {
    pregunta: "¿Qué seguros y convenios aceptan?",
    respuesta:
      "Trabajamos con Fundación España Salud, Fundación Seguros Caracas, Seguros Universitas, Seguros Miranda y CIMECI.",
  },
  {
    pregunta: "¿Qué especialidades atienden?",
    respuesta:
      "Pediatría General y Neuropediatría, con especial sensibilidad hacia el Autismo (TEA).",
  },
  {
    pregunta: "¿Cómo sé si debo consultar por posible Autismo (TEA)?",
    respuesta:
      "Algunas señales tempranas (6 a 18 meses) son: no sonreír en respuesta a tu sonrisa, no seguir objetos con la mirada, no balbucear ni señalar, y mostrar poco interés en otras personas. Si notas alguna de estas señales, te recomendamos agendar una evaluación de Neuropediatría.",
  },
  {
    pregunta: "¿Atienden consultas de urgencia?",
    respuesta:
      "Sí, ofrecemos atención prioritaria cuando tu hijo/a lo necesita, sin tener que esperar a la próxima cita programada.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.pregunta,
    acceptedAnswer: { "@type": "Answer", text: f.respuesta },
  })),
};

export default function PreguntasFrecuentesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            Preguntas Frecuentes
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-5">
            Preguntas Frecuentes
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Si tienes alguna otra duda, escríbenos por WhatsApp y te respondemos directamente.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((f) => (
            <div key={f.pregunta} className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <h2 className="font-bold text-blue-900 mb-2">{f.pregunta}</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{f.respuesta}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-2xl mx-auto">
          <ServicioCTA
            titulo="¿Tienes otra pregunta?"
            mensajeWhatsapp="¡Hola! Vengo desde la página web y tengo una pregunta."
          />
        </div>
      </section>
    </>
  );
}
