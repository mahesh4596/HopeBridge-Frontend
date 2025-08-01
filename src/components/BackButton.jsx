import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = ({ 
  className = "",
  variant = "default", // "default", "navbar", "button"
  showText = true,
  customText = "Back"
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  // Different styling variants
  const getVariantClasses = () => {
    switch (variant) {
      case "navbar":
        return "flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all hover:scale-105";
      case "button":
        return "flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all hover:scale-105 shadow-md";
      default:
        return "flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-indigo-500 transition hover:scale-105";
    }
  };

  return (
    <button
      onClick={handleGoBack}
      className={`${getVariantClasses()} ${className}`}
      title="Go back to previous page"
    >
      <FaArrowLeft className="text-sm" />
      {showText && <span className="text-sm">{customText}</span>}
    </button>
  );
};

export default BackButton;
