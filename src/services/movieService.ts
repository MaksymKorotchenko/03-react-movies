import axios from "axios";
import type { Movie } from "../types/movie";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface getMoviesResponse {
  results: Movie[];
}

export const getMovies = async (title: string) => {
  const options = {
    params: { query: title },
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  const response = await axios.get<getMoviesResponse>(
    "https://api.themoviedb.org/3/search/movie",
    options
  );
  return response.data.results;
};
