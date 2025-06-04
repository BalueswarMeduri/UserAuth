import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';

const AdminPage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen bg-[#fcfbf8]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1c180d] mb-6">Admin Dashboard</h1>
        <div className="bg-white p-6">
          <h2 className="text-xl font-semibold text-[#1c180d] mb-4">Welcome, {user.user.name}!</h2>
          <p className="text-gray-600">This is the admin dashboard. You have access to administrative features.</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminPage; 