import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaMoon, FaSun, FaArrowLeft, FaUser } from 'react-icons/fa';
import logo from "./assets/logo1.png";
import { server_url } from './config/url';

export default function NeedyProfileRegistration() {
  const navigate = useNavigate();
  const location = useLocation();
  const editId = location.state?.editId;
  const editMode = !!editId; // Define editMode based on whether editId exists
  
 const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  const [formData, setFormData] = useState({
    email: '',
    contact: '',
    name: '',
    dob: '',
    gender: '',
    address: ''
  });

  const [aadhaarFront, setAadhaarFront] = useState(null);
  const [aadhaarBack, setAadhaarBack] = useState(null);
  const [previewFront, setPreviewFront] = useState(null);
  const [previewBack, setPreviewBack] = useState(null);

  const loadNeedyData = async (id) => {
    try {
      const response = await axios.get(server_url + `/needy/fetch/${id}`);
      if (response.data.status === true) {
        const data = response.data.obj;
        setFormData({
          email: data.email || '',
          contact: data.contact || '',
          name: data.name || '',
          dob: data.dob || '',
          gender: data.gender || '',
          address: data.address || ''
        });
        
        // Set preview images if they exist
        if (data.aadhaarFrontUrl) {
          setPreviewFront(data.aadhaarFrontUrl);
        }
        if (data.aadhaarBackUrl) {
          setPreviewBack(data.aadhaarBackUrl);
        }
      }
    } catch (error) {
      console.error("Error loading needy data:", error);
      alert("Error loading data for editing");
    }
  };

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  localStorage.setItem("darkMode", darkMode.toString());
}, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  function handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    setFormData({ ...formData, [name]: value });
  }

  async function handleAadhaarFrontUpload(event) {
    const file = event.target.files[0];
    setFormData({ ...formData, aadhaarFront: file });
    setAadhaarFront(file);
    setPreviewFront(URL.createObjectURL(file));

    // OCR extract name, dob, gender
    const fd = new FormData();
    fd.append("aadhaarFront", file);
    

    try {
      const res = await axios.post(server_url +"/needy/aadhaar", fd);
      if (res.data.status) {
        const extractedData = res.data.data; // Access the nested data object
        setFormData(prev => ({
          ...prev,
          name: extractedData.name || "",
          dob: extractedData.dob || "",
          gender: extractedData.gender || ""
        }));
        alert("Aadhaar data extracted successfully!");
      } else {
        alert("OCR failed to extract data: " + res.data.msg);
      }
    } catch (err) {
      console.error("OCR Error:", err);
      alert("Error during OCR: " + err.message);
    }
  }

  // Handle Aadhaar back upload and OCR extraction
async function handleAadhaarBackUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Immediate preview
  setAadhaarBack(file);
  setPreviewBack(URL.createObjectURL(file));

  const fd = new FormData();
  fd.append("aadhaarBack", file);

  try {
    setFormData(prev => ({ ...prev, address: "Reading address..." }));

    const res = await axios.post(server_url + "/needy/aadhaarback", fd);

    if (res.data.status) {
      setFormData(prev => ({
        ...prev,
        address: res.data.address,
        aadhaarBack: file
      }));
    } else {
      console.error("Address extraction failed:", res.data.msg);
      console.log("Debug info:", res.data.debug);
      
      setFormData(prev => ({ ...prev, address: "" }));
      alert(`Address extraction failed. Please check console for details and enter manually.`);
    }
  } catch (err) {
    console.error("Upload error:", err);
    alert("Error processing image. Please try again or enter manually.");
    setFormData(prev => ({ ...prev, address: "" }));
  }
}

  async function handleFetch() {
    try {
      const res = await axios.get(server_url + `/needy/fetch/${formData.email}`);
      if (res.data.status == true) {
        const data = res.data.obj;
        setFormData({ 
          email: data.email,
          contact: data.contact,
          name: data.name,
          dob: data.dob,
          gender: data.gender,
          address: data.address
        });
        setPreviewFront(res.data.obj.aadhaarFrontUrl);
        setPreviewBack(res.data.obj.aadhaarBackUrl);
      } else {
        alert("Needy not found");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

// Handle form submission for save/update
async function doSave() {

  let url = server_url + "/needy/save";

  let fd = new FormData();
  for (let prop in formData) {
    fd.append(prop, formData[prop]);
  }

  let resp = await axios.post(url, fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  if (resp.data.status == true) {
    alert(resp.data.msg);
    navigate('/needy/dashboard'); // Navigate to dashboard on success
  }
  else {
    alert(resp.data.msg);
  }
}

// Handle form submission for save/update
async function doUpdate() {

  let url = server_url + "/needy/update";

  let fd = new FormData();
  for (let prop in formData) {
    fd.append(prop, formData[prop]);
  }

  let resp = await axios.post(url, fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  if (resp.data.status == true) {
    alert(resp.data.msg);
    navigate('/needy/dashboard'); // Navigate to dashboard on success
  }
  else {
    alert(resp.data.msg);
  }
}

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-indigo-50 via-blue-50 to-violet-50"}`}>
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
              className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
              title={darkMode ? "Light Mode" : "Dark Mode"}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-10 px-4 flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 mb-4 flex items-center justify-center gap-3">
            <span className="text-3xl">🧍</span> 
            {editMode ? 'Update Needy Profile' : 'Needy Profile Registration'}
          </h1>
          <p className="text-indigo-600 max-w-2xl">
            {editMode ? 
              'Update the profile information using our AI-powered Aadhaar recognition system for quick and accurate data extraction.' :
              'Register someone in need using our AI-powered Aadhaar recognition system for quick and accurate data extraction.'
            }
          </p>
        </div>

        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl space-y-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">{/* Test Google AI Button */}
        <div className="flex justify-center mb-6">
        </div>

        <div className="flex flex-col md:flex-row gap-4">{/* Email Input */}
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full md:flex-grow border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors"
          />
          <button
            onClick={handleFetch}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-md transition-all hover:-translate-y-0.5"
          >
            Fetch
          </button>
        </div>

        <input
          type="text"
          placeholder="Enter Contact Number"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors"
        />

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl border-2 border-indigo-300 dark:border-indigo-500 shadow-md transition-colors">
            <h3 className="font-bold text-indigo-700 dark:text-indigo-300 text-lg mb-3">📄 Aadhaar Front</h3>
            <input 
              type="file" 
              accept='image/*' 
              onChange={handleAadhaarFrontUpload} 
              className="mb-4 text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 dark:file:bg-indigo-900 file:text-indigo-700 dark:file:text-indigo-300 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-800 transition-colors" 
            />
            {previewFront && (
              <div className="mb-4">
                <img src={previewFront} alt="Aadhaar Front Preview" className="w-32 h-32 rounded-md object-cover border dark:border-gray-600 mb-2" />
              </div>
            )}

            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white rounded-md p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors"
            />
            <input
              type="text"
              placeholder="DOB (dd-mm-yyyy)"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white rounded-md p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl border-2 border-pink-300 dark:border-pink-500 shadow-md transition-colors">
            <h3 className="font-bold text-pink-700 dark:text-pink-300 text-lg mb-3">🏡 Aadhaar Back</h3>
            <input 
              type="file" 
              onChange={handleAadhaarBackUpload} 
              className="mb-4 text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-pink-50 dark:file:bg-pink-900 file:text-pink-700 dark:file:text-pink-300 hover:file:bg-pink-100 dark:hover:file:bg-pink-800 transition-colors" 
              accept="image/*"
            />
            {previewBack && (
              <div className="mb-4">
                <img 
                  src={previewBack} 
                  alt="Aadhaar Back Preview" 
                  className="w-64 h-auto rounded-md object-contain border dark:border-gray-600"
                />
              </div>
            )}
            <textarea
              placeholder="Address will be auto-filled from Aadhaar back"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 transition-colors"
              rows="4"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <button 
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-8 rounded-lg font-semibold shadow-lg transition-all hover:-translate-y-0.5" 
            onClick={doSave}
          >
            💾 Save Profile
          </button>
          <button 
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-8 rounded-lg font-semibold shadow-lg transition-all hover:-translate-y-0.5" 
            onClick={doUpdate}
          >
            ✏️ Update Profile
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
