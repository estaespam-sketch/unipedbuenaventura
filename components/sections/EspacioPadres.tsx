"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Topico = {
  icono: string;
  titulo: string;
  descripcion: string;
  color: string;
  paginaRelacionada?: string;
  contenido: {
    intro: string;
    puntos: { titulo: string; texto: string }[];
    consejo: string;
    imagen: string; // emoji visual grande
  };
};

const topicos: Topico[] = [
  {
    icono: "🍼",
    titulo: "Lactancia materna",
    descripcion: "Beneficios, técnicas y apoyo para madres que dan el pecho.",
    color: "bg-blue-100 border-blue-200",
    contenido: {
      intro: "La lactancia materna es la forma más completa de nutrición para los bebés durante los primeros meses de vida. La OMS recomienda lactancia exclusiva los primeros 6 meses.",
      puntos: [
        { titulo: "Beneficios para el bebé", texto: "Protege contra infecciones, refuerza el sistema inmune, reduce el riesgo de alergias y promueve el vínculo afectivo madre-hijo." },
        { titulo: "Beneficios para la mamá", texto: "Ayuda a recuperar el peso posparto, reduce el riesgo de cáncer de mama y ovario, y libera hormonas que favorecen el bienestar." },
        { titulo: "Posiciones recomendadas", texto: "Cuna clásica, cuna cruzada, posición de rugby y acostada de lado. Lo importante es que tanto mamá como bebé estén cómodos y el agarre sea correcto." },
        { titulo: "¿Cuándo consultar?", texto: "Si sientes dolor intenso, grietas en el pezón, el bebé no gana peso o muestra rechazo al pecho, consulta a tu pediatra." },
      ],
      consejo: "Recuerda: cada mamá y cada bebé son únicos. No dudes en pedir apoyo si lo necesitas.",
      imagen: "🤱",
    },
  },
  {
    icono: "💡",
    titulo: "Desarrollo neurológico",
    descripcion: "¿Cómo estimular el cerebro de tu hijo en cada etapa?",
    color: "bg-indigo-100 border-indigo-200",
    paginaRelacionada: "/neurologia",
    contenido: {
      intro: "Los primeros 3 años de vida son la etapa de mayor plasticidad cerebral. La estimulación adecuada en este periodo tiene un impacto duradero en el desarrollo cognitivo, emocional y social.",
      puntos: [
        { titulo: "0 a 6 meses", texto: "Habla con tu bebé constantemente, usa objetos de colores brillantes, establece contacto visual y ofrece diferentes texturas para explorar." },
        { titulo: "6 a 12 meses", texto: "Estimula el gateo, lee libros con imágenes, juega a las escondidas y nombra objetos del entorno. El gateo es clave para el desarrollo neurológico." },
        { titulo: "1 a 3 años", texto: "Fomenta el juego simbólico, la música, el dibujo y la interacción social. Establece rutinas claras: el cerebro aprende mejor en ambientes predecibles." },
        { titulo: "Señales de alerta", texto: "Consulta al neuropediatra si observas: ausencia de balbuceo al año, pérdida de habilidades adquiridas, falta de contacto visual o no responde a su nombre." },
      ],
      consejo: "El juego ES el trabajo del cerebro infantil. Un ambiente seguro, afectuoso y estimulante es el mejor regalo.",
      imagen: "🧠",
    },
  },
  {
    icono: "💙",
    titulo: "Autismo (TEA)",
    descripcion: "Señales de alerta, diagnóstico temprano y recursos para familias.",
    color: "bg-blue-100 border-blue-200",
    paginaRelacionada: "/neurologia",
    contenido: {
      intro: "El Trastorno del Espectro Autista (TEA) es una condición del neurodesarrollo que afecta la comunicación, la interacción social y los comportamientos. El diagnóstico temprano cambia vidas.",
      puntos: [
        { titulo: "Señales tempranas (6-18 meses)", texto: "No sonríe en respuesta a tu sonrisa, no sigue objetos con la mirada, no balbucea ni señala, y muestra poco interés en otras personas." },
        { titulo: "Señales en niños mayores", texto: "Dificultad para mantener conversaciones, intereses muy específicos e intensos, movimientos repetitivos, sensibilidad inusual a sonidos, texturas o luces." },
        { titulo: "El proceso de diagnóstico", texto: "Involucra observación clínica, evaluación del neurodesarrollo, cuestionarios a padres y pruebas estandarizadas. En nuestra clínica acompañamos a la familia en cada paso." },
        { titulo: "Después del diagnóstico", texto: "El TEA no tiene cura, pero con intervención temprana (terapia del habla, ocupacional, ABA) los niños pueden desarrollar habilidades y llevar una vida plena." },
      ],
      consejo: "Cada niño con TEA es único. No hay dos iguales. Con el apoyo correcto, las posibilidades son infinitas.",
      imagen: "💙",
    },
  },
  {
    icono: "🥗",
    titulo: "Alimentación infantil",
    descripcion: "Guías de nutrición desde la introducción de sólidos.",
    color: "bg-cyan-100 border-cyan-200",
    contenido: {
      intro: "Una alimentación balanceada desde los primeros años sienta las bases de la salud para toda la vida. La introducción de sólidos es un hito emocionante que requiere paciencia y guía.",
      puntos: [
        { titulo: "¿Cuándo empezar con sólidos?", texto: "Alrededor de los 6 meses, cuando el bebé puede sentarse con apoyo, muestra interés en la comida y ha desaparecido el reflejo de extrusión (empujar comida con la lengua)." },
        { titulo: "BLW vs papillas", texto: "El Baby-Led Weaning (BLW) permite que el bebé explore alimentos en trozos. Las papillas son la alternativa tradicional. Ambos métodos son válidos — lo importante es la variedad nutricional." },
        { titulo: "Alimentos a evitar", texto: "Antes del año: miel (riesgo de botulismo), sal y azúcar añadidas, leche de vaca como bebida principal, frutos secos enteros y alimentos muy procesados." },
        { titulo: "Nutrientes clave", texto: "Hierro (carnes, legumbres), calcio (lácteos, brócoli), zinc (carnes, semillas), vitamina D (exposición solar, alimentos enriquecidos) y ácidos grasos omega-3 (pescado azul)." },
      ],
      consejo: "Ofrecer un alimento nuevo puede requerir hasta 10-15 exposiciones antes de que el niño lo acepte. ¡La paciencia es la clave!",
      imagen: "🥦",
    },
  },
];

function ModalTopico({ topico, open, onClose }: { topico: Topico; open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-blue-900 text-xl">
            <span className="text-3xl">{topico.icono}</span>
            {topico.titulo}
          </DialogTitle>
        </DialogHeader>

        {/* Imagen visual grande */}
        <div className="flex items-center justify-center bg-blue-50 rounded-2xl py-8 text-8xl my-2">
          {topico.contenido.imagen}
        </div>

        {/* Intro */}
        <p className="text-slate-600 text-sm leading-relaxed">{topico.contenido.intro}</p>

        {/* Puntos */}
        <div className="flex flex-col gap-4 mt-2">
          {topico.contenido.puntos.map((p) => (
            <div key={p.titulo} className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <h4 className="font-semibold text-blue-900 text-sm mb-1">{p.titulo}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{p.texto}</p>
            </div>
          ))}
        </div>

        {/* Consejo destacado */}
        <div className="bg-blue-600 text-white rounded-xl p-4 mt-2">
          <p className="text-sm font-medium leading-relaxed">
            💙 {topico.contenido.consejo}
          </p>
        </div>

        {/* CTA */}
        <div className="flex gap-3 mt-2">
          <a
            href="https://wa.me/584242984023?text=%C2%A1Hola!%20Vengo%20desde%20la%20p%C3%A1gina%20web%20y%20tengo%20una%20consulta."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2.5 px-4 rounded-xl text-center transition-colors"
          >
            Consultar por WhatsApp
          </a>
          <Link
            href="/#contacto"
            onClick={onClose}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-4 rounded-xl text-center transition-colors"
          >
            Solicitar cita
          </Link>
        </div>
        {topico.paginaRelacionada && (
          <Link
            href={topico.paginaRelacionada}
            onClick={onClose}
            className="block text-center text-sm font-semibold text-blue-700 hover:text-blue-900 underline underline-offset-2 mt-1"
          >
            Ver más en Neurología →
          </Link>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function EspacioPadres() {
  const [topicoAbierto, setTopicoAbierto] = useState<number | null>(null);

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

        {/* Tópicos con botón */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {topicos.map((t, i) => (
            <div
              key={t.titulo}
              className={`border ${t.color} rounded-2xl p-5 text-center flex flex-col items-center gap-3`}
            >
              <span className="text-3xl">{t.icono}</span>
              <h4 className="font-semibold text-blue-900 text-sm">{t.titulo}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{t.descripcion}</p>
              <button
                onClick={() => setTopicoAbierto(i)}
                className="mt-auto bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors w-full"
              >
                Leer más →
              </button>
            </div>
          ))}
        </div>

        {/* Modales */}
        {topicos.map((t, i) => (
          <ModalTopico
            key={t.titulo}
            topico={t}
            open={topicoAbierto === i}
            onClose={() => setTopicoAbierto(null)}
          />
        ))}

        <div className="text-center">
          <p className="text-sm text-slate-400 mb-4">¿Tienes dudas sobre alguno de estos temas?</p>
          <a
            href="https://wa.me/584242984023?text=%C2%A1Hola!%20Vengo%20desde%20la%20p%C3%A1gina%20web%20y%20tengo%20una%20consulta%20sobre%20uno%20de%20los%20temas%20del%20Espacio%20para%20Familias."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
          >
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
