import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";
import { useEffect } from "react";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const handleBackdrop = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
      document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);

  return (
    <>
      {createPortal(
        <div
          onClick={handleBackdrop}
          className={css.backdrop}
          role="dialog"
          aria-modal="true"
        >
          <div className={css.modal}>
            <button
              onClick={onClose}
              className={css.closeButton}
              aria-label="Close modal"
            >
              &times;
            </button>
            <img
              src={
                movie?.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                  : movie?.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "./img/placeholder.svg"
              }
              alt={movie?.title}
              className={css.image}
            />
            <div className={css.content}>
              <h2>{movie?.title}</h2>
              <p>{movie?.overview}</p>
              <p>
                <strong>Release Date:</strong> {movie?.release_date}
              </p>
              <p>
                <strong>Rating:</strong> {movie?.vote_average}/10
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
