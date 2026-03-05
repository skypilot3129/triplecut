const API_KEY = import.meta.env.VITE_GEMINI_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

/**
 * Analyze a face photo and recommend hairstyles using Gemini Vision.
 * @param {string} base64Image — base64-encoded image (without data:... prefix)
 * @param {string} mimeType — e.g. 'image/jpeg'
 * @returns {Promise<object>} parsed JSON with recommendations
 */
export async function analyzeHairstyle(base64Image, mimeType) {
    const prompt = `Kamu adalah seorang barber profesional dan hair stylist ahli di Indonesia.

Analisis foto wajah ini dan berikan rekomendasi gaya rambut pria yang paling cocok.

PENTING: Jawab dalam format JSON yang valid, tanpa markdown code block, langsung JSON object.
Gunakan Bahasa Indonesia.

Format JSON yang diharapkan:
{
  "face_shape": "nama bentuk wajah (misalnya: Oval, Bulat, Persegi, Oblong, Hati, Diamond)",
  "face_analysis": "analisis singkat bentuk wajah dan karakteristik fitur wajah (2-3 kalimat)",
  "recommendations": [
    {
      "name": "Nama gaya rambut",
      "description": "Deskripsi gaya rambut dan kenapa cocok untuk wajah ini (2-3 kalimat)",
      "difficulty": "Mudah/Sedang/Advance",
      "maintenance": "Rendah/Sedang/Tinggi",
      "best_for": "Situasi/gaya hidup yang cocok (misalnya: Formal, Kasual, Trendy)"
    }
  ],
  "styling_tips": "2-3 tips styling untuk bentuk wajah ini",
  "avoid": "1-2 gaya rambut yang sebaiknya dihindari dan alasannya"
}

Berikan tepat 4 rekomendasi gaya rambut yang berbeda, dari yang paling klasik sampai paling trendi.`;

    const body = {
        contents: [
            {
                parts: [
                    { text: prompt },
                    {
                        inline_data: {
                            mime_type: mimeType,
                            data: base64Image,
                        },
                    },
                ],
            },
        ],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
        },
    };

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(`Gemini API error (${res.status}): ${err}`);
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error('No response from Gemini API');

    // Parse JSON — handle possible markdown code block wrapping
    let cleaned = text.trim();
    if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }

    try {
        return JSON.parse(cleaned);
    } catch {
        throw new Error('Failed to parse Gemini response as JSON');
    }
}
