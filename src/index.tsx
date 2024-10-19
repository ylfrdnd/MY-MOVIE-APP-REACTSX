import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { FavoriteProvider } from './context/FavoriteContext'; // Impor FavoriteProvider
import { AuthProvider } from './context/AuthContext'; // Impor AuthProvider
import './styles.css';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* Bungkus App dengan AuthProvider */}
        <FavoriteProvider> {/* Bungkus App dengan FavoriteProvider */}
          <App />
        </FavoriteProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
