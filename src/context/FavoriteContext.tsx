import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoriteContextType {
  favorites: any[];
  toggleFavorite: (movie: any) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<any[]>(() => {
    // Mengambil data dari localStorage saat inisialisasi state
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const toggleFavorite = (movie: any) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.some((fav) => fav.id === movie.id)
        ? prevFavorites.filter((fav) => fav.id !== movie.id) // Hapus dari favorit
        : [...prevFavorites, movie]; // Tambah ke favorit

      // Simpan updatedFavorites ke localStorage
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  // Simpan favorites ke localStorage setiap kali favorites berubah
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
};
