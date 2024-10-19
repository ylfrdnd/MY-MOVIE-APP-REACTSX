import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { login, logout } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const navigate = useNavigate();

  const SESSION_DURATION = 3600000;

  const saveUserToLocalStorage = (username: string, password: string) => {
    let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    registeredUsers.push({ username, password });
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  };

  const isUserRegistered = (username: string, password: string): boolean => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    return registeredUsers.some((user: { username: string, password: string }) => user.username === username && user.password === password);
  };

  const handleLogin = (user: string, password?: string) => {
    if (user === 'Guest') {
      login(user);
      setNotificationMessage(`Welcome, ${user}!`);
      setShowNotification(true);
      localStorage.setItem('user', user);
      localStorage.setItem('loginTime', Date.now().toString());
      navigate('/');
      return;
    }

    if (isUserRegistered(user, password || '')) {
      login(user);
      setNotificationMessage(`Welcome, ${user}!`);
      setShowNotification(true);
      localStorage.setItem('user', user);
      localStorage.setItem('loginTime', Date.now().toString());
      navigate('/');
    } else {
      setNotificationMessage('Username or password incorrect, or user not registered.');
      setShowNotification(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(username, password);
    setUsername('');
    setPassword('');
  };

  const handleContinueAsGuest = () => {
    handleLogin('Guest');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
          style={{ marginBottom: '10px' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          style={{ marginBottom: '20px' }}
        />
        <button type="submit" style={{ marginBottom: '15px' }}>Login</button>
      </form>
      <button onClick={handleContinueAsGuest} style={{ marginBottom: '10px' }}>Continue as Guest</button>
      <button onClick={handleRegister}>Sign Up</button>

      {showNotification && (
        <div className="notification">
          {notificationMessage}
        </div>
      )}
    </div>
  );
};

export default LoginPage;




