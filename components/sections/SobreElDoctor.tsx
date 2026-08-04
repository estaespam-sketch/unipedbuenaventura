import Image from "next/image";

export default function SobreElDoctor() {
  return (
    <section id="doctor" className="py-14 px-4 bg-blue-50">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-6 justify-center text-center sm:text-left">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md shrink-0 bg-blue-100">
          <Image
            src="/dr-belisario.png"
            alt="Ilustración del Dr. Herman Belisario"
            fill
            sizes="128px"
            className="object-cover"
            style={{ objectPosition: "50% 35%" }}
          />
        </div>
        <div>
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-2 uppercase tracking-widest">
            Sobre el Doctor
          </span>
          <h2 className="text-2xl font-bold text-blue-900">Dr. Herman Belisario</h2>
          <p className="text-slate-600 text-sm mt-1">Pediatra y Neurólogo Infantil</p>
        </div>
      </div>
    </section>
  );
}
