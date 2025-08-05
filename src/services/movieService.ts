import axios from "axios";
import type { Movie } from "../types/movie";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface GetMoviesResponse {
  results: Movie[];
}

export const getMovies = async (searchQuery: string): Promise<Movie[]> => {
  const options = {
    params: { query: searchQuery },
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  const response = await axios.get<GetMoviesResponse>(
    "https://api.themoviedb.org/3/search/movie",
    options
  );
  return response.data.results;
};
