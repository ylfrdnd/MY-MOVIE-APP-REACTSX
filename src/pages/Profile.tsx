import React, { useState } from 'react';
import { useFavorites } from '../context/FavoriteContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Impor useNavigate untuk navigasi

const ProfilePage: React.FC = () => {
  const { favorites, toggleFavorite } = useFavorites(); // Menggunakan context untuk mendapatkan film favorit dan fungsi toggle
  const { user, logout } = useAuth(); // Menggunakan context untuk mendapatkan pengguna dan fungsi logout
  const navigate = useNavigate(); // Inisialisasi navigate

  const [showNotification, setShowNotification] = useState(false); // State untuk kontrol pemberitahuan
  const [notificationMessage, setNotificationMessage] = useState(''); // Menyimpan pesan pemberitahuan

  const handleToggleFavorite = (movie: any) => {
    toggleFavorite(movie); // Memanggil fungsi untuk menambah atau menghapus film dari daftar favorit

    // Setel pesan pemberitahuan saat film dihapus dari favorit
    setNotificationMessage(`${movie.title} berhasil dihapus dari favorit!`);
    setShowNotification(true); // Tampilkan pemberitahuan

    // Sembunyikan pemberitahuan setelah 3 detik
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleLogout = () => {
    const confirmed = window.confirm('Apakah Anda ingin logout?'); // Tampilkan dialog konfirmasi
    if (confirmed) {
      logout(); // Panggil fungsi logout
      setNotificationMessage('Logout berhasil!'); // Set pesan pemberitahuan
      setShowNotification(true); // Tampilkan pemberitahuan

      // Arahkan ke halaman login setelah 2 detik
      setTimeout(() => {
        navigate('/login'); // Arahkan ke halaman login
      }, 2000);
    }
  };

  return (
    <div>
      <h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Your Profile
        <button 
          onClick={handleLogout} // Menangani logout saat tombol diklik
          style={{ 
            backgroundColor: '#ff4c4c', // Warna merah untuk tombol logout
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Logout
        </button>
      </h1>
      {user ? <h2>Welcome, {user}!</h2> : <h2>Welcome, Guest!</h2>}
      <h1>Your Favorite Movies</h1>
      {favorites.length === 0 ? (
        <p>You have no favorite movies.</p>
      ) : (
        <ul>
          {favorites.map((movie) => (
            <li key={movie.id} style={{ marginBottom: '20px' }}>
              <h3>{movie.title}</h3>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <button 
                style={{ marginTop: '10px' }} 
                onClick={() => handleToggleFavorite(movie)}
              >
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Pemberitahuan */}
      {showNotification && (
        <div className="notification">
          {notificationMessage}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
