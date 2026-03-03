export interface MovieData {
  title: string;
  year: string;
  rating: string;
  plot: string;
  cast: string[];
  poster: string;
}

export interface SentimentData {
  summary: string;
  classification: "Positive" | "Mixed" | "Negative";
  keyThemes: string[];
}