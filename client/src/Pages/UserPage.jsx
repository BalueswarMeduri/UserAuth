import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';

const UserPage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen bg-[#fcfbf8] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1c180d] mb-6">User Dashboard</h1>
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[#1c180d] mb-4">Welcome, {user.user.name}!</h2>
          <p className="text-gray-600">This is your user dashboard. You can access your personal features here.</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserPage; 