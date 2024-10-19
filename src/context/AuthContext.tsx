import React, { createContext, useContext, useState } from 'react';

// Definisi tipe untuk konteks autentikasi
interface AuthContextType {
  user: string | null; // Username yang terautentikasi, atau null jika tidak ada
  login: (username: string) => void; // Fungsi untuk login
  logout: () => void; // Fungsi untuk logout
}

// Membuat konteks untuk autentikasi
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider untuk AuthContext
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null); // State untuk menyimpan user yang terautentikasi

  // Fungsi untuk login
  const login = (username: string) => {
    setUser(username); // Simpan username saat login
  };

  // Fungsi untuk logout
  const logout = () => {
    setUser(null); // Reset user saat logout
  };

  // Mengembalikan provider dengan nilai yang diberikan
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook untuk menggunakan AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext); // Ambil konteks
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider'); // Error jika hook digunakan di luar provider
  }
  return context; // Kembalikan konteks
};

