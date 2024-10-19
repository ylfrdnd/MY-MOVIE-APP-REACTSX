import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Impor AuthProvider
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/Profile';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext'; // Import context Auth

const App: React.FC = () => {
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const loginTime = localStorage.getItem('loginTime');

    // Jika ada status login dan waktu login tersimpan
    if (user && loginTime) {
      const currentTime = Date.now();
      const elapsedTime = currentTime - parseInt(loginTime, 10);

      // Jika sudah lebih dari 1 jam, logout otomatis
      if (elapsedTime > 3600000) {
        logout();
        localStorage.removeItem('user');
        localStorage.removeItem('loginTime');
        navigate('/login');
      } else {
        // Jika belum 1 jam, login kembali dan lanjutkan sesi
        login(user);
      }
    }
  }, [login, logout, navigate]);

  return (
    <>
      <Navbar /> {/* Pastikan Navbar dirender di sini */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
};

export default App;

