export type MovieData = {
  title: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  cast: string[];
  plot: string;
  poster: string | null;
  imdbRating: string;
  imdbVotes: string;
};

export interface SentimentData {
  summary: string;
  classification: "Positive" | "Mixed" | "Negative";
  keyThemes: string[];
}