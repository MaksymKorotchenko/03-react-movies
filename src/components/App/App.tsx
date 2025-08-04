import styles from "./App.module.css";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [title, setTitle] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSelect = (movie: Movie) => {
    setIsOpen(true);
    setSelectedMovie(movie);
    console.log(selectedMovie);
  };

  const handleSearch = async (newTitle: string) => {
    try {
      setTitle([]);
      setIsLoading(true);
      setIsError(false);
      const data = await getMovies(newTitle);
      setTitle(data);

      if (data.length === 0) {
        toast.error("No movies found for your request.");
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.app}>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      <MovieGrid movies={title} onSelect={handleSelect} />
      {isError && <ErrorMessage />}
      {isOpen && (
        <MovieModal onClose={() => setIsOpen(false)} movie={selectedMovie} />
      )}
    </div>
  );
}
