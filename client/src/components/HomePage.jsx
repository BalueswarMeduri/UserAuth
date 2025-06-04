import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../redux/user/user.slice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";

const HomePage = () => { 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handlelogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {
        method: 'get',
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        toast.error("Logout failed. Please check your credentials.");
        return;
      }
      dispatch(removeUser());
      toast.success("Logout successful! Redirecting...");
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <Navbar/>
    <div
      className="relative flex min-h-screen flex-col bg-[#fcfbf8] group/design-root overflow-x-hidden"
      style={{ fontFamily: "Inter, Noto Sans, sans-serif" }}
    >
      <div className="w-full flex flex-col items-center justify-center mt-32 px-4 text-center">
        <h1 className="text-[#1c180d] text-5xl font-black mb-4">
          Streamline Your Workflow with Innovate
        </h1>
        <h2 className="text-[#1c180d] text-base font-normal max-w-3xl mb-6">
          Innovate is a cutting-edge platform designed to enhance productivity and collaboration. 
          With its intuitive interface and powerful features, Innovate helps teams achieve more in less time.
        </h2>

        {user.isLoggedIn && (
          <p className="text-lg text-[#1c180d] font-bold mt-4">
            Hi, welcome back{user.user.name ? `, ${user.user.name}` : ""}!
          </p>
        )}
      </div>

      <ToastContainer position="top-center" autoClose={2000} theme="light" />
    </div>
    </div>
  );
};

export default HomePage;
