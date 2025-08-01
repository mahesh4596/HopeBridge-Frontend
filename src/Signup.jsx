import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun, FaArrowLeft, FaHeart, FaHandsHelping } from 'react-icons/fa';
import logo from "./assets/logo1.png";

export default function Signup() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  const handleUserTypeSelection = (userType) => {
    if (userType === 'recipient') {
      navigate('/needy/register');
    } else if (userType === 'donor') {
      navigate('/donor/signup');
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-indigo-50 via-blue-50 to-violet-50"}`}>
      {/* Navbar */}
      <nav className="fixed w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-white/90 dark:bg-gray-900/90 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
            <img src={logo} alt="MediHope Logo" className="w-10 h-10 rounded-full shadow-md" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              MediHope
            </h1>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-indigo-500 transition">
            <FaArrowLeft className="text-sm" />
            <span className="text-sm">Back to Home</span>
          </Link>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-yellow-400 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 shadow-lg"
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6 flex flex-col items-center">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-green-400 dark:text-green-400 mb-6">
            Join Our Community
          </h1>
          <p className="text-xl text-gray-600 dark:text-indigo-300 max-w-2xl mx-auto">
            Choose your role and become part of our mission to connect donors with those in need.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
          {/* Needy Registration Card */}
          <div 
            onClick={() => handleUserTypeSelection('recipient')}
            className="group cursor-pointer bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl"
          >
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaHeart className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                I Need Help
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Register as someone in need of assistance. Get connected with donors who can provide essential items, medicines, and support.
              </p>
              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <span>AI-powered Aadhaar verification</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <span>Quick profile setup</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <span>Access to donations</span>
                </div>
              </div>
              <button className="mt-6 w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg transition-all group-hover:shadow-xl">
                Register as Needy
              </button>
            </div>
          </div>

          {/* Donor Registration Card */}
          <div 
            onClick={() => handleUserTypeSelection('donor')}
            className="group cursor-pointer bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl"
          >
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaHandsHelping className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                I Want to Help
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Become a donor and make a difference. Donate essential items, medicines, and resources to help those in need in your community.
              </p>
              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span>Easy donation tracking</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span>Impact monitoring</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span>Community connection</span>
                </div>
              </div>
              <button className="mt-6 w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg transition-all group-hover:shadow-xl">
                Become a Donor
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center max-w-3xl">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              How MediHope Works
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Sign Up</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Choose your role and create your profile</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
                  <span className="text-pink-600 dark:text-pink-400 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Connect</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Get matched with donors or recipients</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Impact</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Make a difference in your community</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
