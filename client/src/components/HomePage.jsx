import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/user/user.slice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const dispatch = useDispatch()
    const navigate = useNavigate();
  const user = useSelector((state) => state.user)
  
  const handlelogout = async()=>{
    try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {
            method: 'get',
            credentials: 'include',
          });
          const data = await response.json();
          console.log(data);
          
          if (!response.ok) {
            toast.error("logout failed. Please check your credentials.");
            return;
          }
          dispatch(removeUser())
          toast.success("Logout successful! Redirecting...");
          setTimeout(() => navigate('/login'), 2000); // Wait 2 seconds before redirecting
        } catch (error) {
          console.error('Error during logout:', error);
          toast.error("Something went wrong. Please try again later.");
        }
  }

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#fcfbf8] group/design-root overflow-x-hidden"
      style={{ fontFamily: "Inter, Noto Sans, sans-serif" }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f4f0e6] px-10 py-3">
          <div className="flex items-center gap-4 text-[#1c180d]">
            <div className="size-4">
            </div>
            <h2 className="text-[#1c180d] text-2xl font-bold leading-tight tracking-[-0.015em]">
              AddWise
            </h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              {["Home", "Features", "Pricing", "Support"].map((link) => (
                <a key={link} href="#" className="text-[#1c180d] text-sm font-medium leading-normal">
                  {link}
                </a>
              ))}
            </div>
            {!user.isLoggedIn ?

            <div className="flex gap-2">
                <Link to='/login'>
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#fac638] text-[#1c180d] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Login</span>
              </button>
                </Link>

                <Link to="/signup">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f4f0e6] text-[#1c180d] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Sign Up</span>
              </button>
                </Link>
            </div>
              :
              <>
  
              <button onClick={handlelogout}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#fac638] text-[#1c180d] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Logout</span>
              </button>
              </>
            }
          </div>
        </header>

        {/* Hero Section */}
        
          <div className="w-192 text ml-96 mt-40">
              <h1
                      class="text-[#1c180d] text-5xl text-center font-black">
                      Streamline Your Workflow with Innovate
                    </h1>
                    <h2 class="text-[#1c180d] text-center text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      Innovate is a cutting-edge platform designed to enhance productivity and collaboration. With its intuitive interface and powerful features, Innovate helps
                      teams achieve more in less time.
                    </h2>
          </div>
        
      </div>
       <ToastContainer position="top-center" autoClose={2000} theme="light" />
    </div>
  );
};

export default HomePage;
