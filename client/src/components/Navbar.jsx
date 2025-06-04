import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/user/user.slice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log(user);

  const handlelogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
        {
          method: "get",
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        toast.error("Logout failed. Please check your credentials.");
        return;
      }
      dispatch(removeUser());
      toast.success("Logout successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f4f0e6] px-10 py-3 bg-[#fcfbf8]">
        <div className="flex items-center gap-4 text-[#1c180d]">
          <div className="size-4"></div>
          <h2 className="text-[#1c180d] text-2xl font-bold leading-tight tracking-[-0.015em]">
            AddWise
          </h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <Link
              to="/"
              className="text-[#1c180d] text-sm font-medium leading-normal"
            >
              Home
            </Link>
            <a
              href="#"
              className="text-[#1c180d] text-sm font-medium leading-normal"
            >
              Features
            </a>
            <a
              href="#"
              className="text-[#1c180d] text-sm font-medium leading-normal"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-[#1c180d] text-sm font-medium leading-normal"
            >
              Support
            </a>
          </div>
          {!user.isLoggedIn ? (
            <div className="flex gap-2">
              <Link to="/login">
                <button className="flex p-4 rounded-lg bg-[#fac638] text-[#1c180d] text-sm font-bold">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="flex p-4 rounded-lg bg-[#f4f0e6] text-[#1c180d] text-sm font-bold">
                  Sign Up
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to={user.user.role === "admin" ? "/admin" : "/user"}>
                <button className="flex p-4 rounded-lg bg-[#f4f0e6] text-[#1c180d] text-sm font-bold">
                  page
                </button>
              </Link>

              <button
                onClick={handlelogout}
                className="flex p-3 rounded-lg bg-[#fac638] text-[#1c180d] text-sm font-bold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      <ToastContainer position="top-center" autoClose={2000} theme="light" />
    </>
  );
};

export default Navbar;
