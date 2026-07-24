"use client";
import { useState } from "react";
import Image from "next/image";

const formasPago = ["Efectivo", "Transferencia", "Zelle", "PayPal", "Pago móvil", "Dólares en efectivo"];
const tiposConsulta = ["Pediatría", "Neuropediatría"];
const hoy = new Date().toISOString().slice(0, 10);

const IgIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

type Post = { src: string; caption: string };

function InstagramCard({ username, nombre, posts }: { username: string; nombre: string; posts: Post[] }) {
  const profileUrl = `https://www.instagram.com/${username}`;
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
      {/* Header */}
      <a href={profileUrl} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-3 mb-3 hover:opacity-80 transition-opacity">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shrink-0">
          <IgIcon />
        </div>
        <div>
          <p className="font-semibold text-sm text-blue-900">@{username}</p>
          <p className="text-xs text-slate-400">{nombre}</p>
        </div>
        <svg className="w-4 h-4 text-blue-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
      </a>

      {/* Posts con imagen real */}
      <div className="grid grid-cols-3 gap-1.5">
        {posts.map((post, i) => (
          <a key={i} href={profileUrl} target="_blank" rel="noopener noreferrer"
            className="aspect-square rounded-xl overflow-hidden relative group hover:opacity-90 transition-opacity">
            <Image
              src={post.src}
              alt={post.caption}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end">
              <span className="text-white text-[9px] font-medium px-1.5 pb-1 leading-tight opacity-0 group-hover:opacity-100 transition-opacity">
                {post.caption}
              </span>
            </div>
          </a>
        ))}
      </div>
      <a href={profileUrl} target="_blank" rel="noopener noreferrer"
        className="block text-center text-xs text-blue-500 hover:text-blue-700 mt-2.5 font-medium transition-colors">
        Ver perfil en Instagram →
      </a>
    </div>
  );
}

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCargando(true);
    setError(false);

    const formData = new FormData(e.currentTarget);
    const datos = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      if (!res.ok) throw new Error("Error al enviar");
      setEnviado(true);
    } catch {
      setError(true);
    } finally {
      setCargando(false);
    }
  }

  return (
    <section id="contacto" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Contacto
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Agenda tu cita
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Escríbenos por WhatsApp o completa el formulario y te contactamos a la brevedad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info de contacto */}
          <div className="flex flex-col gap-6">
            <a
              href="https://wa.me/584242984023?text=Hola,%20quisiera%20solicitar%20una%20cita"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-green-50 border border-green-200 rounded-2xl p-5 hover:border-green-400 transition-colors group"
            >
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white shrink-0">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-green-800">WhatsApp</p>
                <p className="text-sm text-green-600">0424-298.4023</p>
                <p className="text-xs text-green-500 mt-0.5">Clic para abrir conversación</p>
              </div>
              <svg className="w-5 h-5 text-green-400 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex flex-col gap-3">
              <p className="font-semibold text-blue-900 text-sm">Teléfonos del consultorio</p>
              <div className="flex flex-col gap-1.5 text-sm text-slate-600">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  0212-750.0500
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  0212-750.0501
                </span>
              </div>
            </div>

            {/* Instagram @unipedguatire */}
            <InstagramCard
              username="unipedguatire"
              nombre="Unidad Pediátrica Buenaventura"
              posts={[
                { src: "/posts/post1.png", caption: "Quedan pocos cupos" },
                { src: "/posts/post2.png", caption: "Vacúnalos" },
                { src: "/posts/post3.png", caption: "Nuevos seguros disponibles" },
              ]}
            />

            {/* Instagram @elneurologoinfantil */}
            <InstagramCard
              username="elneurologoinfantil"
              nombre="El Neurólogo Infantil"
              posts={[
                { src: "/posts/post4.png", caption: "Info y citas" },
                { src: "/posts/post5.png", caption: "#lucyinforma" },
                { src: "/posts/post6.png", caption: "Seguros disponibles" },
              ]}
            />
          </div>

          {/* Formulario */}
          <div>
            {enviado ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 bg-green-50 border border-green-200 rounded-2xl p-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-green-800">¡Solicitud recibida!</h3>
                <p className="text-sm text-green-600">Te contactaremos a la brevedad para confirmar tu cita.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-blue-900 uppercase tracking-wide">Fecha deseada para la cita *</label>
                    <input name="fechaCita" required type="date" min={hoy} className="bg-white border border-blue-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-blue-900 uppercase tracking-wide">Hora deseada *</label>
                    <input name="horaCita" required type="time" className="bg-white border border-blue-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-blue-900 uppercase tracking-wide">Nombre del representante *</label>
                    <input name="representante" required className="bg-white border border-blue-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Tu nombre completo" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-blue-900 uppercase tracking-wide">Nombre del paciente *</label>
                    <input name="paciente" required className="bg-white border border-blue-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Nombre del niño/niña" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-blue-900 uppercase tracking-wide">Fecha de nacimiento *</label>
                    <input name="fechaNacimiento" required type="date" className="bg-white border border-blue-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-blue-900 uppercase tracking-wide">Teléfono *</label>
                    <input name="telefono" required type="tel" className="bg-white border border-blue-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="0424-000.0000" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-blue-900 uppercase tracking-wide">Correo electrónico *</label>
                    <input name="correo" required type="email" className="bg-white border border-blue-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="correo@ejemplo.com" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-blue-900 uppercase tracking-wide">Tipo de consulta *</label>
                    <select name="tipoConsulta" required className="bg-white border border-blue-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                      <option value="">Seleccionar...</option>
                      {tiposConsulta.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-blue-900 uppercase tracking-wide">Forma de pago *</label>
                    <select name="formaPago" required className="bg-white border border-blue-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                      <option value="">Seleccionar...</option>
                      {formasPago.map((f) => <option key={f}>{f}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-blue-900 uppercase tracking-wide">
                      Redes sociales <span className="text-slate-400 font-normal">(opcional)</span>
                    </label>
                    <input name="redesSociales" className="bg-white border border-blue-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="@usuario (Instagram, Facebook, etc.)" />
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                    Hubo un problema al enviar tu solicitud. Por favor escríbenos directo por WhatsApp.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={cargando}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                >
                  {cargando ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    "Solicitar Cita"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
