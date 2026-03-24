import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesHTTPResponse {
  results: Movie[];
}

async function fetchMovies(searchQuery: string) {
  const apiToken = import.meta.env.VITE_TMDB_TOKEN;
  const response = await axios.get<MoviesHTTPResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query: searchQuery,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    },
  );
  return response;
}

export default fetchMovies;
