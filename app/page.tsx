import Hero from "@/components/sections/Hero";
import Servicios from "@/components/sections/Servicios";
import Resenas from "@/components/sections/Resenas";
import SobreElDoctor from "@/components/sections/SobreElDoctor";
import Contacto from "@/components/sections/Contacto";
import EspacioPadres from "@/components/sections/EspacioPadres";
import Noticias from "@/components/sections/Noticias";

export default function Home() {
  return (
    <>
      <Hero />
      <Servicios />
      <Resenas />
      <SobreElDoctor />
      <Contacto />
      <EspacioPadres />
      <Noticias />
    </>
  );
}
