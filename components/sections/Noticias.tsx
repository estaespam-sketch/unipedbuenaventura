import Parser from "rss-parser";

const feeds = [
  {
    url: "https://www.who.int/feeds/entity/mediacentre/news/en/rss.xml",
    fuente: "OMS",
    color: "bg-blue-100 text-blue-700",
  },
  {
    url: "https://publications.aap.org/pediatrics/issue/rss",
    fuente: "AAP",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    url: "https://www.medscape.com/rss/pediatrics",
    fuente: "Medscape",
    color: "bg-cyan-100 text-cyan-700",
  },
];

type NewsItem = {
  titulo: string;
  link: string;
  fecha: string;
  fuente: string;
  color: string;
};

async function obtenerNoticias(): Promise<NewsItem[]> {
  const parser = new Parser({ timeout: 5000 });
  const noticias: NewsItem[] = [];

  await Promise.allSettled(
    feeds.map(async (feed) => {
      try {
        const resultado = await parser.parseURL(feed.url);
        const items = resultado.items.slice(0, 3);
        items.forEach((item) => {
          noticias.push({
            titulo: item.title ?? "Sin título",
            link: item.link ?? "#",
            fecha: item.pubDate
              ? new Date(item.pubDate).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "",
            fuente: feed.fuente,
            color: feed.color,
          });
        });
      } catch {
        // Feed no disponible — se omite silenciosamente
      }
    })
  );

  return noticias;
}

export default async function Noticias() {
  const noticias = await obtenerNoticias();

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
            Información actualizada de las principales fuentes médicas internacionales.
          </p>
        </div>

        {noticias.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p className="text-sm">No se pudieron cargar las noticias en este momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticias.map((n, i) => (
              <a
                key={i}
                href={n.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-6 border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all flex flex-col gap-3 group"
              >
                <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full ${n.color}`}>
                  {n.fuente}
                </span>
                <h3 className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-blue-700 transition-colors line-clamp-3">
                  {n.titulo}
                </h3>
                <div className="mt-auto flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
                  <span>{n.fecha}</span>
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        )}

        <p className="text-center text-xs text-slate-400 mt-8">
          Fuentes: OMS · AAP (American Academy of Pediatrics) · Medscape
        </p>
      </div>
    </section>
  );
}
