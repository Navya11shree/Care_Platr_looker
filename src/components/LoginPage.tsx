//LoginPage.tsx

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

interface LoginPageProps {
  setIsAuthenticated: (value: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticatedLocal] = useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      setError('All fields are required');
      return;
    }

    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      setIsAuthenticatedLocal(true);
    } else {
      setError(
        username !== 'admin' 
          ? 'Entered wrong username' 
          : 'Entered wrong password'
      );
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl text-center font-bold mb-4">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button 
          type="button" // Changed to type="button"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={handleLogin} // Call handleLogin on button click
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default LoginPage;