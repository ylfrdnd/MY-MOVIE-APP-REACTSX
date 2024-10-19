import React, { useState } from 'react';

// Fungsi untuk menyimpan pengguna baru ke localStorage
const saveUserToLocalStorage = (username: string, name: string, email: string, password: string) => {
  let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  registeredUsers.push({ username, name, email, password });
  localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
};

// Fungsi untuk mengecek apakah username sudah terdaftar
const isUsernameTaken = (username: string): boolean => {
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  return registeredUsers.some((user: { username: string }) => user.username === username);
};

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi data
    if (password !== confirmPassword) {
      setNotificationMessage('Password and confirmation do not match!');
      setShowNotification(true);
      return;
    }

    // Cek apakah username sudah terdaftar
    if (isUsernameTaken(username)) {
      setNotificationMessage('Username is already taken. Please choose another.');
      setShowNotification(true);
      return;
    }

    // Simpan data pengguna baru ke localStorage
    saveUserToLocalStorage(username, name, email, password);

    // Jika pendaftaran berhasil
    setNotificationMessage('Account created successfully! You can now log in.');
    setShowNotification(true);

    // Kosongkan form
    setUsername('');
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    // Menghilangkan notifikasi setelah beberapa detik
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Enter your username" 
          required 
          style={{ marginBottom: '10px' }} 
        />
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter your name" 
          required 
          style={{ marginBottom: '10px' }} 
        />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter your email" 
          required 
          style={{ marginBottom: '10px' }} 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Enter your password" 
          required 
          style={{ marginBottom: '10px' }} 
        />
        <input 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          placeholder="Confirm your password" 
          required 
          style={{ marginBottom: '20px' }} 
        />
        <button type="submit" style={{ marginBottom: '15px' }}>Sign Up</button>
      </form>

      {/* Pemberitahuan */}
      {showNotification && (
        <div className="notification">
          {notificationMessage}
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
