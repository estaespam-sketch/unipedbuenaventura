"use client";
import { useEffect, useState } from "react";

type Noticia = {
  titulo: string;
  resumen: string;
  categoria: string;
  fuente: string;
  url: string;
};

const coloresCat: Record<string, string> = {
  "Pediatría":      "bg-blue-100 text-blue-700",
  "Neuropediatría": "bg-indigo-100 text-indigo-700",
  "TEA/Autismo":    "bg-purple-100 text-purple-700",
  "Nutrición":      "bg-green-100 text-green-700",
  "Desarrollo":     "bg-cyan-100 text-cyan-700",
  "Padres":         "bg-teal-100 text-teal-700",
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

function PreviewPopover({ url, fuente }: { url: string; fuente: string }) {
  const screenshotUrl = `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=580&h=340`;

  return (
    <div className="absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 z-50 w-72 pointer-events-none">
      <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
        {/* Screenshot del sitio */}
        <div className="relative h-36 bg-slate-100 overflow-hidden">
          <img
            src={screenshotUrl}
            alt={`Preview de ${fuente}`}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
        </div>
        {/* Info */}
        <div className="px-4 py-3">
          <p className="text-xs font-semibold text-slate-700 truncate">{fuente}</p>
          <p className="text-xs text-blue-500 truncate mt-0.5">{url}</p>
        </div>
      </div>
      {/* Flecha */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-blue-100 rotate-45 -translate-y-2" />
    </div>
  );
}

function NoticiaCard({ n }: { n: Noticia }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && <PreviewPopover url={n.url} fuente={n.fuente} />}

      <a
        href={n.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white rounded-2xl p-6 border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all flex flex-col gap-3 h-full"
      >
        <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full ${coloresCat[n.categoria] ?? "bg-slate-100 text-slate-600"}`}>
          {n.categoria}
        </span>
        <h3 className="text-sm font-semibold text-slate-800 leading-snug hover:text-blue-700 transition-colors">
          {n.titulo}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed flex-1">
          {n.resumen}
        </p>
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
            </svg>
            {n.fuente}
          </span>
          <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </a>
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
        if (data.noticias?.length) setNoticias(data.noticias);
        else setError(true);
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
            Tópicos actuales curados con IA · Pasa el cursor sobre cada tarjeta para previsualizar la fuente
          </p>
        </div>

        {cargando && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {error && !cargando && (
          <div className="text-center py-12 text-slate-400">
            <p className="text-sm">No se pudieron cargar las noticias.<br />Verifica que la API key de Groq esté configurada.</p>
          </div>
        )}

        {!cargando && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticias.map((n, i) => (
              <NoticiaCard key={i} n={n} />
            ))}
          </div>
        )}

        <p className="text-center text-xs text-slate-400 mt-8 flex items-center justify-center gap-1.5">
          Contenido generado con IA · Groq · LLaMA 3.3
        </p>
      </div>
    </section>
  );
}
