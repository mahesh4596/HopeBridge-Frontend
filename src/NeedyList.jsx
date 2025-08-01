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
    <div className={`min-h-screen w-full ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-indigo-50 via-blue-50 to-violet-50"} bg-fixed`}>
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800 shadow-lg sticky top-0 z-50 w-full">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <img src={logo} alt="NGO Logo" className="h-10 w-10 rounded-full" />
              <h1 className="text-2xl font-bold text-white">Needy People List</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleGoBack}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all hover:scale-105"
              >
                <FaArrowLeft />
                Back
              </button>
              <Link
                to="/needy/dashboard"
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
              >
                <FaHome />
                Dashboard
              </Link>
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
              >
                <FaHome />
                Home
              </Link>
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
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            <FaUsers className="inline-block mr-3 text-indigo-500" />
            Registered Needy People
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            View all registered needy individuals who are seeking assistance from our NGO.
          </p>
          <Link
            to="/needy/register"
            className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg transition-all hover:-translate-y-0.5"
          >
            <FaUser />
            Register New Person
          </Link>
        </div>

        {/* Statistics Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-500 mb-2">{needyList.length}</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">Total Registered</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">{filteredList.length}</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">Showing Results</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">
                {needyList.filter(person => person.contact).length}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">With Contact Info</div>
            </div>
          </div>
        </div>

        {/* Needy List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {searchTerm ? `Search Results for: "${searchTerm}"` : 'All Registered People'}
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Showing {filteredList.length} of {needyList.length} people
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-300 mt-4">Loading needy list...</p>
            </div>
          ) : filteredList.length === 0 ? (
            <div className="text-center py-12">
              <FaUsers className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                {searchTerm ? `No people found matching "${searchTerm}"` : 'No people registered yet'}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm ? 'Try a different search term' : 'Start by registering the first person'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredList.map((person, index) => (
                <div key={index} className="group bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                        {person.name || 'Unknown Name'}
                      </h3>
                      <div className="space-y-3 text-sm">
                        {person.email && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <FaUser className="text-gray-400 flex-shrink-0" />
                            <span className="truncate">{person.email}</span>
                          </div>
                        )}
                        {person.contact && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <FaPhone className="text-gray-400 flex-shrink-0" />
                            <span>{person.contact}</span>
                          </div>
                        )}
                        {person.address && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <FaMapMarkerAlt className="text-gray-400 flex-shrink-0" />
                            <span className="truncate max-w-xs">{person.address}</span>
                          </div>
                        )}
                        {person.aadhar && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <FaIdCard className="text-gray-400 flex-shrink-0" />
                            <span className="font-mono text-xs">****-****-{person.aadhar?.slice(-4)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                        <FaUser className="text-white text-xl" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        Registered Person
                      </span>
                      <span className="px-3 py-1 text-xs rounded-full font-semibold bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700">
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
