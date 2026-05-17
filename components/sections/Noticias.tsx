"use client";
import { useEffect, useState } from "react";

type Noticia = {
  titulo: string;
  resumen: string;
  categoria: string;
  fuente: string;
};

const coloresCat: Record<string, string> = {
  "Pediatría":      "bg-blue-100 text-blue-700",
  "Neuropediatría": "bg-indigo-100 text-indigo-700",
  "TEA/Autismo":    "bg-purple-100 text-purple-700",
  "Nutrición":      "bg-green-100 text-green-700",
  "Desarrollo":     "bg-cyan-100 text-cyan-700",
  "Padres":         "bg-orange-100 text-orange-700",
};

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-blue-100 flex flex-col gap-3 animate-pulse">
      <div className="h-5 w-20 bg-blue-100 rounded-full" />
      <div className="space-y-2">
        <div className="h-4 bg-slate-100 rounded w-full" />
        <div className="h-4 bg-slate-100 rounded w-4/5" />
      </div>
      <div className="h-12 bg-slate-50 rounded mt-1" />
      <div className="h-3 w-24 bg-slate-100 rounded mt-auto" />
    </div>
  );
}

export default function Noticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/noticias")
      .then((r) => r.json())
      .then((data) => {
        if (data.noticias?.length) {
          setNoticias(data.noticias);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setCargando(false));
  }, []);

  return (
    <section id="noticias" className="py-20 px-4 bg-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Actualidad
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Noticias en Pediatría
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Tópicos actuales en medicina pediátrica, neuropediatría y crianza, curados con inteligencia artificial.
          </p>
        </div>

        {cargando && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {error && !cargando && (
          <div className="text-center py-12 text-slate-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm">No se pudieron cargar las noticias.<br />Verifica que la API key de Groq esté configurada.</p>
          </div>
        )}

        {!cargando && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticias.map((n, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all flex flex-col gap-3"
              >
                <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full ${coloresCat[n.categoria] ?? "bg-slate-100 text-slate-600"}`}>
                  {n.categoria}
                </span>
                <h3 className="text-sm font-semibold text-slate-800 leading-snug">
                  {n.titulo}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed flex-1">
                  {n.resumen}
                </p>
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-400">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
                  </svg>
                  {n.fuente}
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-xs text-slate-400 mt-8 flex items-center justify-center gap-1.5">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
          Contenido generado con IA · Groq · LLaMA 3.3
        </p>
      </div>
    </section>
  );
}
