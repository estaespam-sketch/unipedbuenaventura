const resenas = [
  {
    nombre: "Jonathan Colina",
    fecha: "Hace 1 semana",
    estrellas: 5,
    texto: "Bueno la atención del Dr. Belisario espectacular excelente, son muy atentos desde el trato con su asistente hasta la atención del Doctor ha sido excepcional.",
    inicial: "J",
  },
  {
    nombre: "Ariana Berroteran",
    fecha: "Hace 3 meses",
    estrellas: 5,
    texto: "El doctor Belisario atiende a mi hija desde los 4 meses y ya tiene 6 años. Su atención siempre ha sido excelente, siempre nos explica todo y nos ayuda con las emergencias que se puedan presentar.",
    inicial: "A",
  },
];

function Estrellas({ cantidad }: { cantidad: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < cantidad ? "text-blue-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Resenas() {
  return (
    <section id="resenas" className="py-20 px-4 bg-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Reseñas
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Lo que dicen nuestras familias
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Estrellas cantidad={5} />
            <span className="text-slate-600 font-semibold text-sm">5.0</span>
            <span className="text-slate-400 text-sm">· 201 opiniones en Google</span>
          </div>
        </div>

        {/* Galería horizontal scrollable */}
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 scrollbar-hide">
          {resenas.map((r) => (
            <div
              key={r.nombre}
              className="min-w-[300px] max-w-[300px] snap-start bg-white rounded-2xl border border-blue-100 p-6 flex flex-col gap-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
                  {r.inicial}
                </div>
                <div>
                  <p className="font-semibold text-sm text-blue-900">{r.nombre}</p>
                  <p className="text-xs text-slate-400">{r.fecha}</p>
                </div>
                {/* Logo Google */}
                <svg className="w-5 h-5 ml-auto shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              </div>
              <Estrellas cantidad={r.estrellas} />
              <p className="text-sm text-slate-600 leading-relaxed">{r.texto}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://maps.app.goo.gl/BK55N9wQpXw2YLwE9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-blue-200 hover:border-blue-400 text-blue-700 font-semibold text-sm px-6 py-3 rounded-full transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Ver todas las reseñas en Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
