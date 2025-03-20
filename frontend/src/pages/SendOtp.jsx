import React, { useState, useEffect, useRef } from "react";
import { useUserContext } from "../context/UserContext";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MailCheck, Send, CheckCircle } from "lucide-react";

const TsendVerifyOtp = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [errorField, setErrorField] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const navigate = useNavigate();
  const { sendOtp } = useUserContext();
  const canvasRef = useRef(null);

  // Validate email format
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(formData.email));
  }, [formData.email]);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", setCanvasSize);
    setCanvasSize();

    // Particle settings
    const particleCount = 100;
    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `purple`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorField("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const submitResponse = await sendOtp(formData);
      toast.success(submitResponse.message || "OTP Sent, Check your mail");
      navigate("/votp");
    } catch (err) {
      toast.error(err.message || "Something Went Wrong!");
      if (err?.duplicateField) setErrorField(err.duplicateField);
    } finally {
      setIsLoading(false);
    }
  };

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const title = "Verify Your Email";

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Particle Background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Animated Mail Icon */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {/* <MailCheck size={700} className="text-yellow-500" /> */}
      </motion.div>

      {/* OTP Form */}
      <motion.div
        className="relative z-10 p-8 bg-gradient-to-b from-gray-700/10 to-gray-950 backdrop-blur-md text-white rounded-lg shadow-2xl w-96 border-l-4 border-yellow-500"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 text-center"
        >
          <div className="flex justify-center mb-2">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <CheckCircle size={40} className="text-yellow-500" />
            </motion.div>
          </div>

          <div className="flex justify-center">
            {title.split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="text-3xl font-bold"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1 }}
            className="text-gray-300 mt-2"
          >
            Enter your email to receive a verification code
          </motion.p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <div className="relative">
              <input
                className={`w-full text-xl px-4 py-3 pl-12 border-2 rounded-lg bg-gray-800/80 text-white focus:outline-none transition-colors duration-300 ${
                  formData.email
                    ? isValidEmail
                      ? "border-green-500"
                      : "border-red-500"
                    : "border-gray-700"
                }`}
                type="email"
                name="email"
                placeholder="Your email address"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <motion.div
                  animate={{ y: [0, 2, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <MailCheck
                    size={24}
                    className={`${
                      formData.email
                        ? isValidEmail
                          ? "text-green-500"
                          : "text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </motion.div>
              </div>
            </div>
            {formData.email && !isValidEmail && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-red-500 text-sm mt-1"
              >
                Please enter a valid email address
              </motion.p>
            )}
          </motion.div>

          <motion.button
            type="submit"
            className={`w-full text-xl py-3 rounded-lg font-bold uppercase flex items-center justify-center gap-2 transition-all duration-300 ${
              isValidEmail
                ? "bg-yellow-500 hover:bg-yellow-600 text-gray-900"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
            disabled={isLoading || !isValidEmail}
            whileHover={isValidEmail ? { scale: 1.03 } : {}}
            whileTap={isValidEmail ? { scale: 0.97 } : {}}
          >
            {isLoading ? (
              <span className="animate-spin border-4 border-gray-900 border-t-transparent rounded-full w-6 h-6"></span>
            ) : (
              <>
                <Send size={20} />
                <span>Send Code</span>
              </>
            )}
          </motion.button>
        </form>

        <motion.div
          className="mt-6 text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>
            Already have a code?{" "}
            <span
              className="text-yellow-500 hover:text-yellow-400 cursor-pointer font-medium"
              onClick={() => navigate("/votp")}
            >
              Enter it here
            </span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TsendVerifyOtp;
