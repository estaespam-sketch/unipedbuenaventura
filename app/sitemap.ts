import type { MetadataRoute } from "next";

const BASE_URL = "https://unidadpediatricabuenaventura.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/pediatria", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/neurologia", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/vacunas", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/seguros", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/preguntas-frecuentes", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  return rutas.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
