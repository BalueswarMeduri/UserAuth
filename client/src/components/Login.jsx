import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUser } from '../redux/user/user.slice';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
      
      if (!response.ok) {
        toast.error("Login failed. Please check your credentials.");
        return;
      }
      dispatch(setUser(data.user))
      toast.success("Login successful! Redirecting...");
      setTimeout(() => navigate('/'), 2000); // Wait 2 seconds before redirecting
    } catch (error) {
      console.error('Error during login:', error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className='ml-144 mt-24'>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 border-2 w-96">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to='/'>
            <h2 className=' text-center text-3xl font-bold'>AddWise</h2>
          </Link>
          <h2 className="mt-10 text-center text-2xl  tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder='enter you email'
                  value={email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                   placeholder='enter you password'
                  type="password"
                  value={password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white outline outline-1 px-3 py-1.5 text-base text-gray-900"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#fac638] px-3 py-1.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            I don't have an account{' '}
            <Link to="/signup" className="font-semibold text-[#fac638]">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Toast notification container */}
      <ToastContainer position="top-center" autoClose={2000} theme="light" />
    </div>
  );
};

export default Login;
