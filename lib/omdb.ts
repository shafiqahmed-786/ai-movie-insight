export async function fetchMovieFromOMDB(imdbId: string) {
  const res = await fetch(
    `http://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.OMDB_API_KEY}`
  );

  const data = await res.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return {
    title: data.Title,
    year: data.Year,
    rating: data.imdbRating,
    plot: data.Plot,
    cast: data.Actors.split(", "),
    poster: data.Poster,
  };
}