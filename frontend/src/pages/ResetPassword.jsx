import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { randomCode, randomUniqueCode } from "../utils/securedRoutes";
import Footer from "../components/Footer";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

    // Extract token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/reset-password",
        {
            password,
            token
        }
      );
      toast.success("HURRAY");
      setSuccess(res.data.message);
      setTimeout(() =>  navigate(`/greed userform/hunter creation/${randomUniqueCode}`), 1500); // Redirect after success
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <form
          className="bg-gray-800 p-6 rounded-lg shadow-md w-96"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-bold mb-4">Reset Password</h2>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <div className="mb-4">
            <label className="block mb-1">New Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-700 rounded bg-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-700 rounded bg-gray-700"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Reset Password
          </button>
        </form>
      </div>
      <Footer />
  
    </>
  );
};

export default ResetPassword;
