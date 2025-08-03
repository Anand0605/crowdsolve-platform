import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../../utils/api';

function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <motion.form
      onSubmit={handleLogin}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 text-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>

      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-300">Email</label>
        <input
          type="email"
          required
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="you@example.com"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-sm text-gray-300">Password</label>
        <input
          type="password"
          required
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white font-semibold py-2 rounded-lg shadow-lg"
      >
        Login
      </button>

      <div className="text-center mt-4">
        <span className="text-sm text-gray-400">Don’t have an account? </span>
        <Link to="/signup" className="text-blue-500 hover:underline font-medium">
          Sign Up
        </Link>
      </div>
    </motion.form>
  );
}

export default LoginForm;
