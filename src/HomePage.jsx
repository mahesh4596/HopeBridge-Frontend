import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon, FaInstagram, FaLinkedin, FaHeart, FaHandsHelping, FaPills } from "react-icons/fa";
import logo from "./assets/logo1.png";

export default function NavbarWithCardsAndFooter() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    localStorage.setItem("darkMode", newDark.toString());
  };

  const cardItems = [
    {
      title: "Needy Registration",
      desc: "Quickly onboard the underprivileged using our Aadhaar-powered AI OCR.",
      gradient: "from-indigo-400 via-indigo-500 to-purple-500",
      icon: <FaHeart className="text-3xl mb-4 text-white opacity-90" />,
    },
    {
      title: "Become a Donor",
      desc: "Lend a helping hand by donating essential items to those who need them.",
      gradient: "from-pink-400 via-pink-500 to-red-500",
      icon: <FaHandsHelping className="text-3xl mb-4 text-white opacity-90" />,
    },
    {
      title: "Medicine Donations",
      desc: "Donate unused medicines securely and track their journey.",
      gradient: "from-green-400 via-green-500 to-emerald-500",
      icon: <FaPills className="text-3xl mb-4 text-white opacity-90" />,
    },
  ];

  return (
    <div className={`min-h-screen w-full ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100"} bg-fixed`}>
      {/* Navbar */}
      <nav className={`fixed w-full z-50 px-4 md:px-6 py-3 md:py-4 flex justify-between items-center backdrop-blur-md transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-gray-900/90 shadow-lg border-b border-gray-200 dark:border-gray-700"
            : "bg-transparent"
        }`}>
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer hover:scale-105 transition-transform">
          <img src={logo} alt="MediHope Logo" className="w-8 h-8 md:w-10 md:h-10 rounded-full shadow-md" />
          <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent tracking-wide">
            MediHope
          </h1>
        </div>

        <div className="hidden sm:flex items-center space-x-6 text-sm font-medium">
          <Link to="/signup" className="relative group text-neutral-800 dark:text-neutral-200 hover:text-indigo-600 transition">
            Sign Up
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Sign Up Button */}
          <Link to="/signup" className="sm:hidden px-3 py-1 text-xs bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
            Sign Up
          </Link>
          <button
            onClick={toggleDarkMode}
            className="p-1.5 md:p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-lg active:scale-90"
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? <FaSun className="text-sm md:text-base" /> : <FaMoon className="text-sm md:text-base" />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-400 dark:text-green-400 mb-4 md:mb-6 leading-tight">
          Bridging <span className="text-indigo-600 dark:text-indigo-400">Hope</span> to Those in Need
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-indigo-300 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
          A compassionate platform connecting donors with underprivileged communities to provide essential resources and medicines.
        </p>
      </div>

      {/* Cards Section */}
      <section className="py-12 md:py-16 px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-green-400 dark:text-green-400 mb-8 md:mb-12">
          How <span className="text-indigo-600 dark:text-indigo-400">MediHope</span> Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {cardItems.map((card, i) => (
            <div
              key={i}
              className={`p-6 md:p-8 rounded-2xl shadow-lg text-white bg-gradient-to-br ${card.gradient} hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                {card.icon}
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{card.title}</h3>
                <p className="text-sm leading-relaxed opacity-90">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-8 md:py-12 text-white ${darkMode ? "bg-gradient-to-r from-gray-800 to-gray-900" : "bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100"}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-neutral-900 dark:text-white mb-8 md:mb-12">
            Our <span className="text-indigo-600 dark:text-indigo-800">Impact</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            {[
              { number: "1.2K+", label: "Needy Registered" },
              { number: "850+", label: "Active Donors" },
              { number: "5.7K+", label: "Medicines Donated" },
              { number: "24", label: "Cities Covered" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4 md:p-6 bg-indigo-100 dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-2xl md:text-4xl font-bold text-indigo-700 dark:text-indigo-400 mb-1 md:mb-2">{stat.number}</div>
                <div className="text-neutral-800 dark:text-neutral-300 text-xs md:text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 md:py-12 text-white ${darkMode ? "bg-gradient-to-r from-gray-800 to-gray-900" : "bg-gradient-to-r from-indigo-400 to-pink-400"}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="MediHope Logo" className="w-8 h-8 md:w-10 md:h-10 rounded-full" />
                <h2 className="text-lg md:text-xl font-bold">MediHope</h2>
              </div>
              <p className="text-sm opacity-90 max-w-md">
                Connecting compassion with need to build a better tomorrow.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-sm hover:underline opacity-90 hover:opacity-100">Home</Link></li>
                <li><Link to="/signup" className="text-sm hover:underline opacity-90 hover:opacity-100">Sign Up</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/i_.am._mahesh/" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition hover:-translate-y-1"
                  title="Instagram">
                  <span className="text-xs">I</span>
                </a>
                <a href="https://www.linkedin.com/in/mahesh-singla-999292324/" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition hover:-translate-y-1"
                  title="LinkedIn">
                  <span className="text-xs">L</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm opacity-90">
            <p>
              © {new Date().getFullYear()} <strong>MediHope</strong> — Made with <span className="text-pink-200">♥</span> by Mahesh
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
