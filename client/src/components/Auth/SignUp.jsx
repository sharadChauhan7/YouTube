import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/signup', {
        name,
        email,
        password,
      });
      const { token,user } = response.data;

      localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    toast.success('Sign-up successful!');
      navigate('/');
    } catch (error) {
      console.error('Sign-up failed:', error.response?.data || error.message);
      alert('Error during sign-up. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-black border border-gray-700 rounded-lg p-8 w-96">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 text-gray-900 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-gray-900 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Submit
          </button>
        </form>
        <p className="text-center text-white mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-red-500 hover:underline">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;