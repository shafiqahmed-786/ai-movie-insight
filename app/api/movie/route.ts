import { NextResponse } from "next/server";
import { cache } from "@/lib/cache";

const CACHE_TTL = 10 * 60 * 1000; // 10 minutes
const TIMEOUT_MS = 8000;

type MovieResponse = {
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

function isValidImdbId(id: string) {
  return /^tt\d{7,8}$/.test(id);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const imdbId = searchParams.get("id");

  // 🔎 Validation FIRST
  if (!imdbId) {
    return NextResponse.json(
      { error: "IMDb ID is required" },
      { status: 400 }
    );
  }

  if (!isValidImdbId(imdbId)) {
    return NextResponse.json(
      { error: "Invalid IMDb ID format (e.g., tt0133093)" },
      { status: 400 }
    );
  }

  // ⚡ Check cache (clean abstraction)
  const cached = cache.get<MovieResponse>(imdbId);
  if (cached) {
    return NextResponse.json(cached, {
      headers: {
        "Cache-Control": "public, max-age=600",
        "X-Cache": "HIT",
      },
    });
  }

  try {
    // ⏳ Timeout protection
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const res = await fetch(
      `http://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.OMDB_API_KEY}`,
      {
        signal: controller.signal,
        next: { revalidate: 600 },
      }
    );

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error("External API request failed");
    }

    const data = await res.json();

    if (data.Response === "False") {
      return NextResponse.json(
        { error: data.Error || "Movie not found" },
        { status: 404 }
      );
    }

    // 🎯 Clean structured response
    const formattedData: MovieResponse = {
      title: data.Title,
      year: data.Year,
      rated: data.Rated,
      released: data.Released,
      runtime: data.Runtime,
      genre: data.Genre,
      director: data.Director,
      cast: data.Actors?.split(", ") || [],
      plot: data.Plot,
      poster: data.Poster !== "N/A" ? data.Poster : null,
      imdbRating: data.imdbRating,
      imdbVotes: data.imdbVotes,
    };

    // 💾 Store in cache abstraction
    cache.set(imdbId, formattedData, CACHE_TTL);

    return NextResponse.json(formattedData, {
      headers: {
        "Cache-Control": "public, max-age=600",
        "X-Cache": "MISS",
      },
    });
  } catch (error: any) {
    if (error.name === "AbortError") {
      return NextResponse.json(
        { error: "Request timed out" },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to fetch movie data" },
      { status: 500 }
    );
  }
}