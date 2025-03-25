import React, { useState } from "react";
import { motion } from "framer-motion";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import GreedLight from "./GreedLight";

const PasswordInput = ({ formData, handleChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <motion.input
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full p-2 pr-10 bg-gradient-to-br from-gray-700 to-gray-950 text-white border-b-4 border-yellow-500 rounded-md focus:outline-none"
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <div
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        <motion.div
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.8 }}
          animate={{ rotate: showPassword ? 0 : 180 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          {showPassword ? (
            <>
              <EyeIcon className="h-5 w-5 text-yellow-400" />
              {/* <div className="flex left-70"> */}

              <GreedLight top={"-top-54.5"} left={"right-47"} rotate={"rotate-0"} />
              {/* </div> */}
            </>
          ) : (
            <>
              <EyeOffIcon className="h-5 w-5 text-yellow-400" />
              {/* <GreedLight /> */}
            </>
          )}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }

        .eye-pulse:hover {
          animation: pulse 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default PasswordInput;
