import OpenAI from "openai";

const MAX_CHARS = 4000; // cost guard
const MAX_REVIEWS = 15; // limit number of reviews
const TIMEOUT_MS = 15000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type SentimentResult = {
  summary: string;
  classification: "Positive" | "Mixed" | "Negative";
  keyThemes: string[];
};

export async function analyzeSentiment(
  reviews: string[]
): Promise<SentimentResult> {
  try {
    if (!reviews || reviews.length === 0) {
      return {
        summary: "Not enough reviews available for analysis.",
        classification: "Mixed",
        keyThemes: [],
      };
    }

    // 🔒 Limit number of reviews
    const limitedReviews = reviews.slice(0, MAX_REVIEWS);

    // 🔒 Combine and trim to max characters
    let combinedReviews = limitedReviews.join("\n\n");
    if (combinedReviews.length > MAX_CHARS) {
      combinedReviews = combinedReviews.slice(0, MAX_CHARS);
    }

    const prompt = `
You are an AI movie analyst.

Analyze the audience reviews below and:

1. Summarize overall audience sentiment in 3–4 sentences.
2. Classify sentiment strictly as one of: Positive, Mixed, Negative.
3. Extract exactly 3 concise key themes (1–2 words each).

Respond ONLY in valid JSON format like this:
{
  "summary": "...",
  "classification": "Positive",
  "keyThemes": ["Acting", "Story", "Cinematography"]
}

Reviews:
${combinedReviews}
`;

    // ⏳ Timeout protection
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await openai.chat.completions.create(
      {
        model: "gpt-4o-mini",
        temperature: 0.3, // more consistent output
        messages: [
          {
            role: "system",
            content:
              "You are a precise assistant that always returns valid JSON.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      { signal: controller.signal }
    );

    clearTimeout(timeout);

    const raw = response.choices?.[0]?.message?.content;

    if (!raw) {
      throw new Error("Empty response from OpenAI");
    }

    // 🧠 Safe JSON parse
    try {
      const parsed = JSON.parse(raw);

      return {
        summary: parsed.summary || "No summary available.",
        classification:
          parsed.classification === "Positive" ||
          parsed.classification === "Negative"
            ? parsed.classification
            : "Mixed",
        keyThemes: Array.isArray(parsed.keyThemes)
          ? parsed.keyThemes.slice(0, 3)
          : [],
      };
    } catch {
      // Fallback if model returns invalid JSON
      return {
        summary: raw.slice(0, 300),
        classification: "Mixed",
        keyThemes: [],
      };
    }
  } catch (error: any) {
    if (error.name === "AbortError") {
      return {
        summary: "AI analysis timed out.",
        classification: "Mixed",
        keyThemes: [],
      };
    }

    return {
      summary: "AI analysis failed.",
      classification: "Mixed",
      keyThemes: [],
    };
  }
}