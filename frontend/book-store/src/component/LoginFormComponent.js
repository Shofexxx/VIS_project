import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../config/apiConfig";

const LoginFormComponent = () => {
  const { login, setUserRole, isAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(`${BASE_URL}/login`, loginData);

      if (response.status === 200) {
        login(username, password);
        setUserRole('admin');
        console.log('Successfully logged in as admin.');
        navigate('/admin');
      } else {
        console.log('Not logged in.');
      }
    } catch (error) {
      toast.error('Špatné údaje. Zkuste to znova.');
    }
  };

  if (isAuthenticated) {
    return <div>You are already logged in as an admin.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20">
      <ToastContainer position="top-center"/>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border border-gray-300 rounded-md py-2 px-4 mb-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-300 rounded-md py-2 px-4 mb-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Login
      </button>
    </form>
  );
};

export default LoginFormComponent;
