import axios from 'axios';

const API_KEY = '8b838ae017be2434389869445c6d54ef'; // Ganti dengan API Key Anda
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchNowPlaying = async () => {
  const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1
    }
  });
  return response.data.results.slice(0, 6);
};

export const fetchPopularMovies = async (page: number = 1) => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page
    }
  });
  return response.data.results;
};
