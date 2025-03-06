import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react"; // Importing cross icon from lucide-react

const ProfilePopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Close Button (X Icon) */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white">
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>
        <p className="text-gray-300">
          Please fill some basic details in order to play this event.
        </p>

        {/* Continue Button */}
        <Link to="/completeProfile">
          <button className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePopup;
