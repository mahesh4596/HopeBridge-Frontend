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

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    loadDonations();
  }, [darkMode]);

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
        setDonations(response.data.data || []);
        console.log('Donations loaded:', response.data.data); // Debug log
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

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <div className={`min-h-screen w-full ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-indigo-50 via-blue-50 to-violet-50"} bg-fixed`}>
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-black-500 to-gray-600 dark:from-black-700 dark:to-gray-800 shadow-lg sticky top-0 z-50 w-full">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <img src={logo} alt="NGO Logo" className="h-10 w-10 rounded-full" />
              <h1 className="text-2xl font-bold text-white">Donor Dash</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
              >
                <FaHome />
                Home
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
              >
                <FaSignOutAlt />
                Logout
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
                title={darkMode ? "Light Mode" : "Dark Mode"}
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full px-6 py-8">
        <div className="max-w-7xl mx-auto">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <Link to="/donor/signup" className="group">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600  rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaUser className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Profile</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Manage your profile</p>
              </div>
            </div>
          </Link>

          {/* Avail Med Card */}
          <Link to="/donate/medicine" className="group">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaPills className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Avail Med</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Donate medicines</p>
              </div>
            </div>
          </Link>

          {/* Med Manager Card */}
          <Link to="/listed-medicines" className="group">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaBox className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Med Manager</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">View all available medicines</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Donations Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Your Recent Donations</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-300 mt-4">Loading donations...</p>
            </div>
          ) : donations.length === 0 ? (
            <div className="text-center py-8">
              <FaPills className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">No donations yet</p>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Start by donating your first medicine</p>
              <Link
                to="/donate/medicine"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg transition-all hover:-translate-y-0.5"
              >
                <FaPills />
                Donate Now
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donations.slice(0, 6).map((donation, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                        {donation.medicine}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                        <strong>Company:</strong> {donation.company}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                        <strong>Expires:</strong> {donation.expdate}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>Quantity:</strong> {donation.qty}
                      </p>
                    </div>
                    <div className="ml-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <FaPills className="text-white text-lg" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Donated by: {donation.emailid}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {donations.length > 6 && (
            <div className="text-center mt-6">
              <Link
                to="/listed-medicines"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg transition-all hover:-translate-y-0.5"
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