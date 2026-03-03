export async function fetchReviewsFromTMDB(imdbId: string) {
  // Step 1: Convert IMDb ID to TMDb ID
  const findRes = await fetch(
    `https://api.themoviedb.org/3/find/${imdbId}?api_key=${process.env.TMDB_API_KEY}&external_source=imdb_id`
  );

  const findData = await findRes.json();

  if (!findData.movie_results.length) {
    return [];
  }

  const tmdbId = findData.movie_results[0].id;

  // Step 2: Fetch reviews
  const reviewRes = await fetch(
    `https://api.themoviedb.org/3/movie/${tmdbId}/reviews?api_key=${process.env.TMDB_API_KEY}`
  );

  const reviewData = await reviewRes.json();

  return reviewData.results.map((r: any) => r.content).slice(0, 20);
}