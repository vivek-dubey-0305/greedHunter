

import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TverifyEmail = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const [errorField, setErrorField] = useState("");
  const navigate = useNavigate();
  const { verifyOtp } = useUserContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorField("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitResponse = await verifyOtp(formData);
      toast.success(submitResponse.message);
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Something Went Wrong!");
      if (err?.duplicateField) setErrorField(err.duplicateField);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <Toaster position="top-right" reverseOrder={false} />
      
      <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-black to-purple-900 animate-pulse" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} />
      
      <motion.div className="relative z-10 p-8 bg-gray-900 text-white rounded-lg shadow-xl w-96 border border-purple-500" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
        <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-purple-500" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-purple-500" type="number" name="otp" placeholder="OTP" value={formData.otp} onChange={handleChange} />
          
          <button type="submit" className="w-full bg-purple-700 hover:bg-purple-900 py-2 rounded-lg font-bold uppercase">
            Verify
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default TverifyEmail;
