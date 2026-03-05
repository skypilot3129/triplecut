const API_KEY = import.meta.env.VITE_GEMINI_KEY;
const TEXT_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${API_KEY}`;
const IMAGE_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${API_KEY}`;

/**
 * Analyze a face photo and recommend hairstyles using Gemini Vision.
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
      "name": "Nama gaya rambut (dalam bahasa Inggris agar mudah dicari referensi)",
      "name_id": "Nama gaya rambut dalam Bahasa Indonesia",
      "description": "Deskripsi gaya rambut dan kenapa cocok untuk wajah ini (2-3 kalimat)",
      "difficulty": "Mudah/Sedang/Advance",
      "maintenance": "Rendah/Sedang/Tinggi",
      "best_for": "Situasi/gaya hidup yang cocok (misalnya: Formal, Kasual, Trendy)",
      "image_prompt": "Detailed English prompt to generate a reference photo of this hairstyle on an Indonesian male model, professional barbershop photography style, clean background"
    }
  ],
  "styling_tips": "2-3 tips styling untuk bentuk wajah ini",
  "avoid": "1-2 gaya rambut yang sebaiknya dihindari dan alasannya"
}

Berikan tepat 4 rekomendasi gaya rambut yang berbeda, dari yang paling klasik sampai paling trendi.
Untuk field "image_prompt", buat prompt detail dalam bahasa Inggris yang bisa digunakan untuk generate gambar referensi gaya rambut tersebut.`;

    const body = {
        contents: [{
            parts: [
                { text: prompt },
                { inline_data: { mime_type: mimeType, data: base64Image } },
            ],
        }],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
        },
    };

    const res = await fetch(TEXT_URL, {
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

/**
 * Generate a hairstyle reference image using Gemini image generation.
 * @param {string} imagePrompt — English prompt describing the hairstyle
 * @returns {Promise<string|null>} base64 data URI or null on failure
 */
export async function generateHairstyleImage(imagePrompt) {
    const body = {
        contents: [{
            parts: [{
                text: `Generate a professional barbershop reference photo: ${imagePrompt}. 
The image should show a male model from the front/side angle, well-lit studio lighting, clean simple background, high quality professional photography style. Focus on the hairstyle clearly visible.`,
            }],
        }],
        generationConfig: {
            responseModalities: ['TEXT', 'IMAGE'],
            temperature: 0.8,
        },
    };

    try {
        const res = await fetch(IMAGE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!res.ok) return null;

        const data = await res.json();
        const parts = data.candidates?.[0]?.content?.parts || [];

        for (const part of parts) {
            if (part.inlineData) {
                return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
        }
        return null;
    } catch {
        return null;
    }
}
