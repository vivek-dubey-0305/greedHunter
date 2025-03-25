import {
  AlertCircle,
  ArrowRight,
  ListRestart,
  ScanFace,
  SquarePower,
} from "lucide-react";
import React from "react";
import { randomUniqueCode } from "../../utils/securedRoutes";
import { useNavigate } from "react-router-dom";

const SessionExpired = () => {
  const animate = true
  const navigate = useNavigate()
  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-800 to-gray-950 text-white relative overflow-hidden">
        {/* Floating animated background elements */}
        <div className="absolute w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-pink-500 opacity-20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

        <div
          className={`relative z-10 p-10 text-center bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-2xl shadow-2xl transform transition-all duration-700 ${
            animate ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          <AlertCircle
            size={48}
            className="text-red-400 mx-auto mb-4 animate-bounce"
          />

          <h1 className="text-2xl font-semibold mb-4">
            You Session has expired!,{" "}
            <SquarePower className="text-red-400 inline-block" /> <br /> ...try
            refresh <ListRestart className="text-yellow-5 00 inline-block" /> or
            log-in again <ScanFace className="text-green-400 inline-block" />
          </h1>

          {/* <p className="text-gray-300">Please register to play the quiz.</p> */}
          <button
            className="cursor-pointer mt-6 px-6 py-3 flex items-center justify-center gap-2 bg-purple-600 text-white font-medium text-lg rounded-full transition-all duration-300 hover:bg-purple-700 hover:shadow-lg active:scale-95"
            onClick={() =>
              navigate(`/greed userform/hunter creation/${randomUniqueCode}`)
            }
          >
            Login Here <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpired;
