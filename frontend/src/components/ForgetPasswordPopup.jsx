import React, { useRef, useState } from "react";
import { X } from "lucide-react";
import { useUserContext } from "../context/UserContext";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const ForgetPasswordPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({ email: "" });
  const { sendLink } = useUserContext();
  const [errorField, setErrorField] = useState("");
  const popupRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const closePopup = (e) => {
    if (popupRef.current === e.target) {
      onClose();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorField("");
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const submitResponse = await sendLink(formData);
      toast.success(submitResponse.message || "OTP Sent, Check your mail");
    } catch (err) {
      toast.error(err.message || "Something Went Wrong!");
      if (err?.duplicateField) setErrorField(err.duplicateField);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      onClose()
    }
  };

  return (
    <div
      ref={popupRef}
      onClick={closePopup}
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md px-4"
    >
      <Toaster position="top-right" reverseOrder={false} />

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-tr from-gray-700 to-gray-950 text-white p-6 rounded-lg shadow-2xl w-full max-w-md border border-yellow-500 relative"
      >
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-all"
        >
          <X size={24} />
        </button>

        <h1 className="text-xl font-bold text-center mb-4">Forgot Password?</h1>
        <p className="text-gray-400 text-center mb-4">
          Enter your email below and we'll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              className={`w-full p-3 bg-gradient-to-br from-gray-700 to-gray-950 text-white border-b-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${
                errorField === "email" ? "border-red-600" : "border-yellow-500"
              }`}
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
            />
            {/* <label className="absolute left-3 top-3 text-gray-400 transition-all focus-within:top-[-10px] focus-within:text-yellow-300">
              Email Address
            </label> */}
          </div>

          {isLoading ? (
            <div className="items-center justify-items-center cursor-none w-full bg-yellow-500 p-3 rounded-md text-white font-bold hover:bg-yellow-600 transition-all">
              <Loader2 className="animate-spin font-bold" size={24} />
            </div>
          ) : (
            <button
              type="submit"
              className="cursor-pointer w-full bg-yellow-500 p-3 rounded-md text-black font-bold hover:bg-yellow-600 transition-all"
            >
              Send Reset Link
            </button>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default ForgetPasswordPopup;
