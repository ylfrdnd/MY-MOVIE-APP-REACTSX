import React, { useState } from 'react';
import { useFavorites } from '../context/FavoriteContext';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
  };
  isFavorite: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite }) => {
  const { toggleFavorite } = useFavorites();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleToggleFavorite = () => {
    toggleFavorite(movie);
    setNotificationMessage(`${movie.title} berhasil ditambahkan ke favorit!`);
    setShowNotification(true);
    
    // Sembunyikan pemberitahuan setelah 3 detik
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="movie-card">
      {/* Gambar Poster */}
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />

      {/* Judul Film */}
      <h3>{movie.title}</h3>

      {/* Tanggal Rilis */}
      <div className="release-date" style={{ textAlign: 'center' }}>{movie.release_date}</div>

      {/* Tombol Toggle Favorites */}
      <button onClick={handleToggleFavorite}>
        Add to Favorites
      </button>

      {/* Pemberitahuan */}
      {showNotification && (
        <div className="notification">
          {notificationMessage}
        </div>
      )}
    </div>
  );
};

export default MovieCard;

