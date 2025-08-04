import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  const url = "https://image.tmdb.org/t/p/w500/";

  return (
    <ul className={css.grid}>
      {movies.map((item) => (
        <li onClick={() => onSelect(item)} key={item.id}>
          <div className={css.card}>
            <img
              className={css.image}
              src={
                item.poster_path
                  ? `${url}${item.poster_path}`
                  : "/src/img/placeholder.svg"
              }
              alt={item.title}
              loading="lazy"
            />
            <h2 className={css.title}>{item.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
