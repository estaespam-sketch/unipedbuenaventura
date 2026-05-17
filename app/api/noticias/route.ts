import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export const revalidate = 3600; // cachea 1 hora

const PROMPT = `Eres un asistente médico especializado en pediatría. Genera exactamente 6 noticias o tópicos de actualidad médica relevantes para pediatras, neuropediatras, y padres de familia.

Para cada ítem devuelve un JSON con esta estructura exacta:
{
  "titulo": "Título claro y conciso (máximo 12 palabras)",
  "resumen": "Resumen en español de 2-3 oraciones informativas",
  "categoria": "una de: Pediatría | Neuropediatría | TEA/Autismo | Nutrición | Desarrollo | Padres",
  "fuente": "nombre de una fuente médica reconocida (AAP, OMS, Medscape, NEJM, Lancet, etc.)"
}

Devuelve SOLO un array JSON válido con los 6 ítems. Sin texto adicional, sin markdown, sin comillas extras.`;

export async function GET() {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "GROQ_API_KEY no configurada" }, { status: 500 });
  }

  try {
    const groq = new Groq({ apiKey });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: PROMPT }],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const texto = completion.choices[0]?.message?.content ?? "[]";
    const noticias = JSON.parse(texto);

    return NextResponse.json({ noticias });
  } catch (err) {
    console.error("Error Groq:", err);
    return NextResponse.json({ error: "No se pudo generar las noticias" }, { status: 500 });
  }
}
