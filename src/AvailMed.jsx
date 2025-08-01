import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun, FaArrowLeft } from 'react-icons/fa';
import logo from "./assets/logo1.png";
import { server_url } from "./config/url";

function AvailMed() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const [formData, setFormData] = useState({
    emailid: "",
    contactno: "",
    medicine: "",
    company: "",
    expdate: "",
    packing: "",
    qty: "",
    info: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function doSave() {
    let url = server_url + "/medicine/save";

    let fd = new FormData();
    for (let prop in formData) {
      fd.append(prop, formData[prop]);
    }

    // ✅ Validate all fields
    const { emailid, contactno, medicine, company, expdate, packing, qty } = formData;

    if (!emailid || !contactno || !medicine || !company || !expdate || !packing || !qty) {
      alert("Please fill all the required fields including contact number");
      return;
    }

    if (qty <= 0) {
      alert("Quantity must be greater than 0");
      return;
    }

    // ✅ Save
    const resp = await axios.post(url, fd, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    if (resp.data.status === true) {
      alert(resp.data.msg);
      // Navigate to donor dashboard to show the donated medicine
      navigate('/donor/dashboard');
    } else {
      alert(resp.data.msg);
    }
  }

  async function doUpdate() {
    const url = server_url + "/medicine/update";

    let fd = new FormData();
    for (let prop in formData) {
      fd.append(prop, formData[prop]);
    }

    const resp = await axios.post(url, fd, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    alert(resp.data.msg);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500 bg-fixed">
      {/* Navbar */}
      <nav className="fixed w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-white/90 dark:bg-gray-900/90 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
            <img src={logo} alt="HopeBridge Logo" className="w-10 h-10 rounded-full shadow-md" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              HopeBridge
            </h1>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-indigo-500 transition hover:scale-105"
          >
            <FaArrowLeft className="text-sm" />
            <span className="text-sm">Back</span>
          </button>
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
      <div className="pt-24 pb-10 px-6 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-xl shadow-2xl p-10 rounded-3xl border border-white/20 dark:border-gray-700/50 transition-all duration-300">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
              💊 Donate Medicine
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Share unused medicines with those in need. Your generous donation can save lives and provide relief to families.
            </p>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Email ID" name="emailid" value={formData.emailid} onChange={handleChange} />
          <InputField label="Contact Number" name="contactno" type="tel" value={formData.contactno} onChange={handleChange} placeholder="Enter your phone number" />
          <InputField label="Medicine Name" name="medicine" value={formData.medicine} onChange={handleChange} /> {/* ✅ fixed */}
          <InputField label="Company" name="company" value={formData.company} onChange={handleChange} />
          <InputField label="Expiry Date" name="expdate" type="date" value={formData.expdate} onChange={handleChange} />
          <InputField label="Quantity" name="qty" type="number" value={formData.qty} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-1 gap-6 mt-6">
          <InputField label="Packing" name="packing" value={formData.packing} onChange={handleChange} />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Other Info</label>
          <textarea
            name="info"
            value={formData.info}
            onChange={handleChange}
            rows="3"
            placeholder="Add any special instructions or medicine condition..."
            className="w-full p-3 rounded-xl bg-white/20 dark:bg-gray-700/50 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 transition-all"
          ></textarea>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-8 justify-between">
          <input
            type="button"
            value="💊 Avail To Public"
            onClick={doSave}
            className="w-full md:w-1/2 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer"
          />
          <input
            type="button"
            value="✏️ Update"
            onClick={doUpdate}
            className="w-full md:w-1/2 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer"
          />
        </div>

        {/* Navigation to Listed Medicines */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Want to see all available medicines in our repository?
          </p>
          <Link
            to="/listed-medicines"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            🔍 Browse All Medicines
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, name, type = "text", value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        className="w-full p-3 rounded-xl bg-white/20 dark:bg-gray-700/50 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 transition-all"
      />
    </div>
  );
}

export default AvailMed;