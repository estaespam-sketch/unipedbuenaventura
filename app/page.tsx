import Hero from "@/components/sections/Hero";
import Servicios from "@/components/sections/Servicios";
import Noticias from "@/components/sections/Noticias";
import EspacioPadres from "@/components/sections/EspacioPadres";
import Resenas from "@/components/sections/Resenas";
import Contacto from "@/components/sections/Contacto";

export default function Home() {
  return (
    <>
      <Hero />
      <Servicios />
      <Noticias />
      <EspacioPadres />
      <Resenas />
      <Contacto />
    </>
  );
}
