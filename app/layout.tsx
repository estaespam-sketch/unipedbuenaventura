import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFlotante from "@/components/WhatsAppFlotante";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://unidadpediatricabuenaventura.com"),
  title: "Unidad Pediátrica Buenaventura",
  description:
    "Especialistas en Pediatría General y Neuropediatría, con enfoque en Autismo (TEA). Agenda tu cita en Guatire.",
  keywords: [
    "pediatra Guatire",
    "neuropediatra Guatire",
    "pediatría Miranda",
    "neurólogo infantil",
    "autismo TEA Guatire",
    "Unidad Pediátrica Buenaventura",
    "neuropediatra Guarenas",
    "pediatra Guarenas Guatire",
    "evaluación TEA Miranda",
    "TDAH niños Guatire",
    "pediatra urgencias Guatire",
    "control niño sano Guatire",
    "vacunas pediátricas Guatire",
    "Dr. Herman Belisario pediatra",
  ],
  openGraph: {
    title: "Unidad Pediátrica Buenaventura",
    description:
      "Especialistas en Pediatría General y Neuropediatría, con enfoque en Autismo (TEA). Agenda tu cita en Guatire.",
    url: "https://unidadpediatricabuenaventura.com",
    siteName: "Unidad Pediátrica Buenaventura",
    locale: "es_VE",
    type: "website",
    images: [{ url: "/galeria/clinica1.jpg", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Neuropediatría Unidad Pediátrica Buenaventura",
  image: "https://unidadpediatricabuenaventura.com/galeria/clinica1.jpg",
  telephone: "+58-424-298-4023",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Piso 2, Consultorio 2-45, Edificio Centro Médico Buenaventura, Av. Intercomunal Guarenas-Guatire, C.C. Buenaventura",
    addressLocality: "Guatire",
    addressRegion: "Miranda",
    postalCode: "1221",
    addressCountry: "VE",
  },
  url: "https://unidadpediatricabuenaventura.com",
  medicalSpecialty: ["Pediatric", "Neurologic"],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday"], opens: "08:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "08:00", closes: "15:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Thursday", "Friday"], opens: "08:00", closes: "16:00" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "201",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={poppins.className}>
      <body className="min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFlotante />
      </body>
    </html>
  );
}
