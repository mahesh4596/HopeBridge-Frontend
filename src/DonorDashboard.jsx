import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun, FaHome, FaSignOutAlt, FaUser, FaPills, FaCog, FaBox } from 'react-icons/fa';
import axios from 'axios';
import logo from "./assets/logo1.png";
import { server_url } from './config/url';

function DonorDashboard() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('donorEmail') || '');
  const [showEmailInput, setShowEmailInput] = useState(!localStorage.getItem('donorEmail'));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    if (userEmail) {
      loadDonations();
    }
  }, [darkMode, userEmail]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  const loadDonations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(server_url + '/medicine/fetch');
      console.log('API Response:', response.data); // Debug log
      if (response.data.status === true) {
        const allMedicines = response.data.data || [];
        // Filter medicines by user email if email is set
        const userDonations = userEmail 
          ? allMedicines.filter(medicine => medicine.emailid === userEmail)
          : [];
        setDonations(userDonations);
        console.log('User donations loaded:', userDonations); // Debug log
      } else {
        console.error('API returned false status:', response.data.msg);
        setDonations([]);
      }
    } catch (error) {
      console.error("Error loading donations:", error);
      setDonations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (userEmail.trim()) {
      localStorage.setItem('donorEmail', userEmail);
      setShowEmailInput(false);
      loadDonations();
    }
  };

  const handleChangeEmail = () => {
    setShowEmailInput(true);
    setDonations([]);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('donorEmail');
    navigate('/');
  };

  return (
    <div className={`min-h-screen w-full overflow-x-hidden ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-indigo-50 via-blue-50 to-violet-50"} bg-fixed`}>
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-black-500 to-gray-600 dark:from-black-700 dark:to-gray-800 shadow-lg sticky top-0 z-50 w-full">
        <div className="w-full px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2 md:gap-3">
              <img src={logo} alt="NGO Logo" className="h-8 w-8 md:h-10 md:w-10 rounded-full" />
              <h1 className="text-lg md:text-2xl font-bold text-white">Donor Dash</h1>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <Link
                to="/"
                className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all text-sm md:text-base"
              >
                <FaHome className="text-sm" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all text-sm md:text-base"
              >
                <FaSignOutAlt className="text-sm" />
                <span className="hidden sm:inline">Logout</span>
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-1 md:p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
                title={darkMode ? "Light Mode" : "Dark Mode"}
              >
                {darkMode ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full px-4 md:px-6 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Profile Card */}
          <Link to="/donor/signup" className="group">
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <FaUser className="text-white text-lg md:text-2xl" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-1 md:mb-2">Profile</h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">Manage your profile</p>
              </div>
            </div>
          </Link>

          {/* Avail Med Card */}
          <Link to="/donate/medicine" className="group">
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <FaPills className="text-white text-lg md:text-2xl" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-1 md:mb-2">Avail Med</h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">Donate medicines</p>
              </div>
            </div>
          </Link>

          {/* Med Manager Card */}
          <Link to="/listed-medicines" className="group md:col-span-2 lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <FaBox className="text-white text-lg md:text-2xl" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-1 md:mb-2">Med Manager</h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">View all available medicines</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Email Input Section */}
        {showEmailInput && (
          <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700 mt-6 md:mt-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6">Enter Your Email</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm md:text-base">
              Please enter your email address to view your personal donations
            </p>
            <form onSubmit={handleEmailSubmit} className="space-y-3 md:space-y-0">
              <div className="flex flex-col md:flex-row gap-2 md:gap-2 md:max-w-md md:mx-auto">
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 px-3 md:px-4 py-2 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  required
                />
                <button
                  type="submit"
                  className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all text-sm md:text-base whitespace-nowrap"
                >
                  <span className="md:hidden">View Donations</span>
                  <span className="hidden md:inline">View My Donations</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Recent Donations Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700 mt-6 md:mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">Your Recent Donations</h2>
            {userEmail && !showEmailInput && (
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-2 sm:mt-0">
                <span className="mr-2">Viewing donations for: <strong>{userEmail}</strong></span>
                <button
                  onClick={handleChangeEmail}
                  className="text-blue-500 hover:text-blue-600 underline"
                >
                  Change Email
                </button>
              </div>
            )}
          </div>
          
          {!userEmail || showEmailInput ? (
            <div className="text-center py-6 md:py-8">
              <FaPills className="text-4xl md:text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4">Enter your email to view donations</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">Please enter your email address above to see your personal donations</p>
            </div>
          ) : loading ? (
            <div className="text-center py-6 md:py-8">
              <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm md:text-base">Loading your donations...</p>
            </div>
          ) : donations.length === 0 ? (
            <div className="text-center py-6 md:py-8">
              <FaPills className="text-4xl md:text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4">No donations found for {userEmail}</p>
              <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm md:text-base">Start by donating your first medicine or check if you used a different email</p>
              <Link
                to="/donate/medicine"
                className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg md:rounded-xl font-semibold shadow-lg transition-all hover:-translate-y-0.5 text-sm md:text-base"
              >
                <FaPills />
                Donate Now
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {donations.slice(0, 6).map((donation, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 md:p-6 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <div className="flex-1 pr-2">
                      <h3 className="text-base md:text-lg font-bold text-gray-800 dark:text-white mb-2">
                        {donation.medicine}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-1">
                        <strong>Company:</strong> {donation.company}
                      </p>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-1">
                        <strong>Expires:</strong> {donation.expdate}
                      </p>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                        <strong>Quantity:</strong> {donation.qty}
                      </p>
                    </div>
                    <div className="ml-2">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <FaPills className="text-white text-sm md:text-lg" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {donations.length > 6 && (
            <div className="text-center mt-4 md:mt-6">
              <Link
                to="/listed-medicines"
                className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg md:rounded-xl font-semibold shadow-lg transition-all hover:-translate-y-0.5 text-sm md:text-base"
              >
                <FaBox />
                View All Medicines
              </Link>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default DonorDashboard;