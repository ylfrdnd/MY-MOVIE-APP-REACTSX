import React, { useEffect, useState } from 'react';
import { fetchNowPlaying, fetchPopularMovies } from '../services/api';
import MovieList from '../components/MovieList';

const HomePage: React.FC = () => {
  const [nowPlaying, setNowPlaying] = useState<any[]>([]);
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchNowPlaying().then(setNowPlaying);
    fetchPopularMovies(page).then(setPopularMovies);
  }, [page]);

  const loadMoreMovies = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <h1>Now Playing</h1>
      <MovieList movies={nowPlaying} />
      
      <h1>Popular Movies</h1>
      <MovieList movies={popularMovies} />
      <button onClick={loadMoreMovies}>Load More</button>
    </div>
  );
};

export default HomePage;
