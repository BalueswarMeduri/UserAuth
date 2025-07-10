import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../redux/user/user.slice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";
import { useRef, useEffect, useState } from 'react';

const SimpleFooter = () => (
  <footer className="w-full border-t border-gray-200 py-6 bg-white text-center mt-16">
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-2">
      <div className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Innovate. All rights reserved.</div>
      <div className="flex gap-4 text-sm">
        <a href="#" className="hover:underline text-gray-600">Privacy Policy</a>
        <a href="#" className="hover:underline text-gray-600">Terms</a>
        <a href="#" className="hover:underline text-gray-600">Contact</a>
      </div>
    </div>
  </footer>
);

// Add helper for fade-in effect
function useFadeInOnScroll() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);
  return [ref, visible];
}

const HomePage = () => { 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  // Animation for hero section
  const heroRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => { if (heroRef.current) observer.unobserve(heroRef.current); };
  }, []);

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
        {/* Hero Section - Redesigned */}
        <section
          ref={heroRef}
          className={`transition-all duration-1000 ease-in-out transform ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} w-full flex flex-col items-center justify-center min-h-[60vh] pt-24 pb-16 px-4 text-center relative`}
        >
          {/* Subtle background gradient blob */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
            <div className="w-[500px] h-[500px] bg-gradient-to-tr from-yellow-200 via-yellow-300 to-blue-200 opacity-40 rounded-full blur-3xl"></div>
            {/* Animated floating shape */}
            <div className="absolute left-1/4 top-10 animate-bounce-slow">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-300 opacity-60 rounded-full blur-xl"></div>
            </div>
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-[#1c180d] text-5xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-sm">
              Empower Your Team<br/>
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">with Innovate</span>
            </h1>
            <h2 className="text-[#1c180d] text-lg md:text-xl font-normal max-w-2xl mb-8">
              The modern platform for productivity, collaboration, and growth. Organize, track, and achieve more—together.
            </h2>
            <a href="#features" className="inline-block bg-yellow-400 text-[#1c180d] px-8 py-3 rounded-md text-lg font-semibold shadow hover:bg-yellow-500 transition-colors border border-yellow-300 animate-fade-in-up">Get Started</a>
            {user.isLoggedIn && (
              <p className="text-lg text-[#1c180d] font-bold mt-6">
                Hi, welcome back{user.user.name ? `, ${user.user.name}` : ""}!
              </p>
            )}
          </div>
        </section>

        {/* Features Section - Full Width, subtle alt bg */}
        <section id="features" className="w-full py-20 px-2 bg-white">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-[#1c180d] text-center">Why Choose Innovate?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: '⚡', title: 'Fast & Modern', desc: 'Lightning-fast, intuitive interface for all your needs.' },
                { icon: '🤝', title: 'Collaboration', desc: 'Work together in real-time, wherever you are.' },
                { icon: '🔒', title: 'Secure', desc: 'Your data is protected with industry-leading security.' },
                { icon: '📱', title: 'Mobile Ready', desc: 'Access your workspace from any device, anytime.' },
              ].map((f, i) => {
                const [ref, visible] = useFadeInOnScroll();
                return (
                  <div
                    key={f.title}
                    ref={ref}
                    className={`flex flex-col items-center p-8 rounded-2xl shadow-lg bg-white border border-yellow-100 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  >
                    <div className="text-5xl mb-4">{f.icon}</div>
                    <div className="text-xl font-bold mb-2 text-[#1c180d]">{f.title}</div>
                    <div className="text-gray-600 text-center">{f.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section - subtle alt bg */}
        <section className="w-full py-20 px-2 bg-[#fcfbf8]">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-[#1c180d] text-center">What Our Users Say</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Aarav', text: 'Innovate transformed our workflow. The UI is so clean and easy to use!', color: 'from-yellow-200 to-yellow-100' },
                { name: 'Priya', text: 'Collaboration has never been easier. Our team loves it!', color: 'from-blue-200 to-blue-100' },
                { name: 'Rahul', text: 'Secure, fast, and reliable. Highly recommended for any team.', color: 'from-yellow-100 to-blue-50' },
              ].map((t, i) => {
                const [ref, visible] = useFadeInOnScroll();
                return (
                  <div
                    key={t.name}
                    ref={ref}
                    className={`rounded-2xl p-8 shadow-lg bg-gradient-to-br ${t.color} border border-gray-100 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  >
                    <div className="text-lg italic mb-4 text-gray-800">“{t.text}”</div>
                    <div className="font-bold text-[#1c180d]">- {t.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing Section - subtle alt bg */}
        <section id="pricing" className="w-full py-20 px-2 bg-white">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-[#1c180d] text-center">Simple Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { plan: 'Starter', price: 'Free', features: ['Basic features', 'Community support', 'Single user'], color: 'border-yellow-300' },
                { plan: 'Pro', price: '$9/mo', features: ['All Starter features', 'Team collaboration', 'Priority support'], color: 'border-blue-400' },
                { plan: 'Enterprise', price: 'Contact Us', features: ['Custom solutions', 'Dedicated manager', 'Advanced security'], color: 'border-yellow-500' },
              ].map((p, i) => {
                const [ref, visible] = useFadeInOnScroll();
                return (
                  <div
                    key={p.plan}
                    ref={ref}
                    className={`rounded-2xl p-8 shadow-xl bg-white border-2 ${p.color} transition-all duration-700 flex flex-col items-center ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  >
                    <div className="text-xl font-bold mb-2 text-[#1c180d]">{p.plan}</div>
                    <div className="text-3xl font-extrabold mb-4 text-yellow-600">{p.price}</div>
                    <ul className="mb-6 text-gray-700 text-center">
                      {p.features.map(f => <li key={f}>• {f}</li>)}
                    </ul>
                    <button className="bg-yellow-400 text-[#1c180d] px-6 py-2 rounded-md font-semibold shadow hover:bg-yellow-500 transition-colors border border-yellow-300">Choose</button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <ToastContainer position="top-center" autoClose={2000} theme="light" />
        <SimpleFooter />
      </div>
    </div>
  );
};

export default HomePage;
