import Hero from "@/components/sections/Hero";
import Contacto from "@/components/sections/Contacto";
import Resenas from "@/components/sections/Resenas";
import SobreElDoctor from "@/components/sections/SobreElDoctor";
import Servicios from "@/components/sections/Servicios";
import EspacioPadres from "@/components/sections/EspacioPadres";
import Noticias from "@/components/sections/Noticias";

export default function Home() {
  return (
    <>
      <Hero />
      <Contacto />
      <Resenas />
      <SobreElDoctor />
      <Servicios />
      <EspacioPadres />
      <Noticias />
    </>
  );
}
