jest.mock("next/server", () => ({
  NextResponse: {
    json: (data: any, init?: any) => {
      return {
        status: init?.status || 200,
        json: async () => data,
      };
    },
  },
}));

import { GET } from "./route";
import { cache } from "@/lib/cache";

global.fetch = jest.fn();

describe("Movie API Route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cache.clear();
  });

  test("returns 400 if no IMDb ID", async () => {
    const req = new Request("http://localhost/api/movie");

    const res = await GET(req as any);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBeDefined();
  });

  test("returns 400 for invalid IMDb format", async () => {
    const req = new Request(
      "http://localhost/api/movie?id=invalid123"
    );

    const res = await GET(req as any);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toMatch(/Invalid/);
  });

  test("returns cached result when available", async () => {
    cache.set("tt9999999", { cached: true }, 10000);

    const req = new Request(
      "http://localhost/api/movie?id=tt9999999"
    );

    const res = await GET(req as any);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.cached).toBe(true);
  });

  test("returns movie data successfully", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        Response: "True",
        Title: "Test Movie",
        Year: "2024",
        Rated: "PG",
        Released: "01 Jan 2024",
        Runtime: "120 min",
        Genre: "Drama",
        Director: "John Doe",
        Actors: "Actor 1, Actor 2",
        Plot: "Test plot",
        Poster: "poster.jpg",
        imdbRating: "8.0",
        imdbVotes: "1000",
      }),
    });

    const req = new Request(
      "http://localhost/api/movie?id=tt1234567"
    );

    const res = await GET(req as any);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.title).toBe("Test Movie");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("handles external API failure", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    const req = new Request(
      "http://localhost/api/movie?id=tt1234567"
    );

    const res = await GET(req as any);

    expect(res.status).toBe(500);
  });

  test("handles timeout (AbortError)", async () => {
    (fetch as jest.Mock).mockRejectedValue(
      Object.assign(new Error("timeout"), {
        name: "AbortError",
      })
    );

    const req = new Request(
      "http://localhost/api/movie?id=tt1234567"
    );

    const res = await GET(req as any);
    const json = await res.json();

    expect(res.status).toBe(504);
    expect(json.error).toMatch(/timed out/i);
  });
});