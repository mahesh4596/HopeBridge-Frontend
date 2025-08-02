import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun, FaHome, FaArrowLeft, FaUser, FaPhone, FaMapMarkerAlt, FaIdCard, FaUsers } from 'react-icons/fa';
import axios from 'axios';
import logo from "./assets/logo1.png";
import { server_url } from './config/url';

function NeedyList() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [needyList, setNeedyList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    loadNeedyList();
  }, [darkMode]);

  useEffect(() => {
    filterList();
  }, [needyList, searchTerm]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  const loadNeedyList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(server_url + '/needy/getall');
      if (response.data.status === true) {
        setNeedyList(response.data.obj || []);
      } else {
        console.error("Failed to fetch needy list:", response.data.msg);
        setNeedyList([]);
      }
    } catch (error) {
      console.error("Error loading needy list:", error);
      setNeedyList([]);
    } finally {
      setLoading(false);
    }
  };

  const filterList = () => {
    let filtered = needyList;

    if (searchTerm.trim()) {
      filtered = filtered.filter(person =>
        (person.name && person.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (person.email && person.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (person.contact && person.contact.includes(searchTerm)) ||
        (person.aadhar && person.aadhar.includes(searchTerm))
      );
    }

    setFilteredList(filtered);
  };

  return (
    <div className={`min-h-screen w-full overflow-x-hidden ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-indigo-50 via-blue-50 to-violet-50"} bg-fixed`}>
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800 shadow-lg sticky top-0 z-50 w-full">
        <div className="w-full px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2 md:gap-3">
              <img src={logo} alt="NGO Logo" className="h-8 w-8 md:h-10 md:w-10 rounded-full" />
              <h1 className="text-lg md:text-2xl font-bold text-white">
                <span className="hidden sm:inline">Needy People </span>List
              </h1>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={handleGoBack}
                className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all hover:scale-105 text-sm md:text-base min-h-[44px]"
              >
                <FaArrowLeft className="text-xs md:text-sm" />
                <span className="hidden sm:inline">Back</span>
              </button>
              <Link
                to="/needy/dashboard"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
              >
                <FaHome />
                Dashboard
              </Link>
              <Link
                to="/"
                className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all text-sm md:text-base min-h-[44px]"
              >
                <FaHome className="text-xs md:text-sm" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <button
                onClick={toggleDarkMode}
                className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all min-h-[44px] min-w-[44px]"
                title={darkMode ? "Light Mode" : "Dark Mode"}
              >
                {darkMode ? <FaSun className="text-sm md:text-base" /> : <FaMoon className="text-sm md:text-base" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full px-4 md:px-6 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3 md:mb-4">
            <FaUsers className="inline-block mr-2 md:mr-3 text-indigo-500" />
            Registered Needy People
          </h1>
          <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4">
            View all registered needy individuals who are seeking assistance from our NGO.
          </p>
          <Link
            to="/needy/register"
            className="inline-flex items-center gap-1 md:gap-2 mt-2 md:mt-4 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg transition-all hover:-translate-y-0.5 text-sm md:text-base"
          >
            <FaUser className="text-sm md:text-base" />
            <span className="hidden sm:inline">Register New </span>Person
          </Link>
        </div>

        {/* Search Section */}
        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6 md:mb-8">
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search People
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search by name, email, contact, or Aadhar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
              />
            </div>
          </div>
        </div>

        {/* Statistics Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-indigo-500 mb-1 md:mb-2">{needyList.length}</div>
              <div className="text-gray-600 dark:text-gray-300 text-xs md:text-sm font-medium">Total Registered</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-500 mb-1 md:mb-2">{filteredList.length}</div>
              <div className="text-gray-600 dark:text-gray-300 text-xs md:text-sm font-medium">Showing Results</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-500 mb-1 md:mb-2">
                {needyList.filter(person => person.contact).length}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-xs md:text-sm font-medium">With Contact Info</div>
            </div>
          </div>
        </div>

        {/* Needy List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-2">
            <h2 className="text-lg md:text-2xl font-bold text-gray-800 dark:text-white">
              {searchTerm ? `Search Results for: "${searchTerm}"` : 'All Registered People'}
            </h2>
            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
              Showing {filteredList.length} of {needyList.length} people
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8 md:py-12">
              <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-b-2 border-indigo-500 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm md:text-base">Loading needy list...</p>
            </div>
          ) : filteredList.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <FaUsers className="text-4xl md:text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4">
                {searchTerm ? `No people found matching "${searchTerm}"` : 'No people registered yet'}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
                {searchTerm ? 'Try a different search term' : 'Start by registering the first person'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredList.map((person, index) => (
                <div key={index} className="group bg-gray-50 dark:bg-gray-700 p-4 md:p-6 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <div className="flex-1 min-w-0 pr-2">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-2 md:mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 break-words">
                        {person.name || 'Unknown Name'}
                      </h3>
                      <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                        {person.email && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <FaUser className="text-gray-400 flex-shrink-0 text-xs" />
                            <span className="truncate">{person.email}</span>
                          </div>
                        )}
                        {person.contact && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <FaPhone className="text-gray-400 flex-shrink-0 text-xs" />
                            <span className="truncate">{person.contact}</span>
                          </div>
                        )}
                        {person.address && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <FaMapMarkerAlt className="text-gray-400 flex-shrink-0 text-xs" />
                            <span className="truncate">{person.address}</span>
                          </div>
                        )}
                        {person.aadhar && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <FaIdCard className="text-gray-400 flex-shrink-0 text-xs" />
                            <span className="font-mono text-xs">****-****-{person.aadhar?.slice(-4)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="ml-2 md:ml-4 flex-shrink-0">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                        <FaUser className="text-white text-sm md:text-xl" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-3 md:pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        Registered Person
                      </span>
                      <span className="px-2 md:px-3 py-1 text-xs rounded-full font-semibold bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default NeedyList;
