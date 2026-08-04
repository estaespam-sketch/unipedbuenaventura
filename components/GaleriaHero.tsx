"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const items = [
  { tipo: "imagen", src: "/galeria/clinica1.jpg", alt: "Consultorio pediátrico" },
  { tipo: "imagen", src: "/galeria/clinica2.jpg", alt: "Sala de consulta" },
  { tipo: "imagen", src: "/galeria/clinica3.jpg", alt: "Niños en el consultorio" },
  { tipo: "video",  src: "/galeria/video1.mp4" },
  { tipo: "video",  src: "/galeria/video2.mp4" },
];

function marcarMostrado(set: Set<number>, i: number) {
  return set.has(i) ? set : new Set(set).add(i);
}

export default function GaleriaHero() {
  const [actual, setActual] = useState(0);
  // Índices que ya fueron activos alguna vez: evita precargar los videos desde el inicio,
  // solo se "montan" de verdad cuando les toca aparecer por primera vez en el carrusel.
  const [mostrados, setMostrados] = useState<Set<number>>(() => new Set([0]));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const siguiente = (actual + 1) % items.length;
      setActual(siguiente);
      setMostrados((prev) => marcarMostrado(prev, siguiente));
    }, 2000);
    return () => clearTimeout(timer);
  }, [actual]);

  useEffect(() => {
    // Asegura que el video activo se reproduzca desde el inicio
    const v = videoRefs.current[actual];
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  }, [actual]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-3xl bg-blue-100">
      {items.map((item, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === actual ? "opacity-100" : "opacity-0"
          }`}
        >
          {item.tipo === "imagen" ? (
            <Image
              src={item.src}
              alt={item.alt ?? ""}
              fill
              className="object-cover saturate-50 brightness-90"
              priority={i === 0}
            />
          ) : mostrados.has(i) ? (
            <video
              ref={(el) => { videoRefs.current[i] = el; }}
              src={item.src}
              muted
              playsInline
              loop
              preload={i === actual ? "auto" : "none"}
              className="w-full h-full object-cover saturate-50 brightness-90"
            />
          ) : (
            <div className="w-full h-full bg-blue-200" />
          )}
          {/* Overlay azul que integra las fotos con el diseño */}
          <div className="absolute inset-0 bg-blue-700/40 rounded-3xl mix-blend-multiply" />
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setActual(i);
              setMostrados((prev) => marcarMostrado(prev, i));
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              i === actual ? "bg-white scale-110" : "bg-white/50"
            }`}
            aria-label={`Ir a imagen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
