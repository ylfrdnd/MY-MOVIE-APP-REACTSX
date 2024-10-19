import React from 'react';
import MovieCard from './MovieCard';
import { useFavorites } from '../context/FavoriteContext'; // Asumsikan context ini sudah ada

interface MovieListProps {
  movies: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
  }[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const { favorites } = useFavorites(); // Mengambil daftar favorit dari context

  return (
    <div className="movie-list">
      {movies.map(movie => {
        // Cek apakah film ini ada di daftar favorit
        const isFavorite = favorites.some(favMovie => favMovie.id === movie.id);

        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={isFavorite} // Berikan prop isFavorite
          />
        );
      })}
    </div>
  );
};

export default MovieList;

