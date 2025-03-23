import React, { useState, useEffect, useRef } from "react";
import { useUserContext } from "../context/UserContext";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  MailCheck,
  CheckCircle,
  KeyRound,
  Mail,
  RefreshCw,
  Send as SendIcon,
} from "lucide-react";

const VerifyOtpCode = () => {
  const { user, sendOtp, verifyOtp } = useUserContext();

  const [formData, setFormData] = useState({
    email: user?.email,
    otp: "",
  });

  const [errorField, setErrorField] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidOtp, setIsValidOtp] = useState(false);

  const [isFlipped, setIsFlipped] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const otpInputRef = useRef(null);
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(formData.email));
    setIsValidOtp(formData.otp.length === 6 && !isNaN(formData.otp));
  }, [formData.email, formData.otp]);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log("USerMaeil", user.email);
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
  const focusOtpInput = () => {
    if (isValidEmail && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  };
  const handleResendOTP = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    setIsResending(true);
    try {
      const submitResponse = await sendOtp();
      toast.success(submitResponse.message || "Code Sent, Check your mail");
      // navigate("/votp");
    } catch (err) {
      toast.error(err.message || "Something Went Wrong!");
      if (err?.duplicateField) setErrorField(err.duplicateField);
    } finally {
      setIsResending(false);
      setIsFlipped(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const submitResponse = await verifyOtp(formData);
      toast.success(submitResponse.message || "Email verified successfully!");

      // Success animation before navigation
      setTimeout(() => {
        navigate("/");
      }, 1500);
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

      {/* Flip Container */}
      <motion.div
        className="relative w-96 h-[520px] perspective-distant"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6 }}

        // transition={{
        //   duration: 2,
        //   repeat: Infinity,
        //   repeatType: "reverse",
        // }}
      >
        {/* <MailCheck size={700} className="text-yellow-500" /> */}

        {/* OTP Form */}

        <motion.div
          className="absolute inset-0 p-8 bg-gradient-to-b from-gray-700/10 to-gray-950 backdrop-blur-md text-white rounded-lg shadow-2xl w-full border-l-4 border-yellow-500 backface-hidden"
          // initial={{ scale: 0.9, opacity: 0 }}
          // animate={{ scale: 1, opacity: 1 }}
          style={{ transform: "rotateY(0deg)" }}
          // transition={{ duration: 0.5 }}
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
              Enter the 6-digit code sent to your email
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
                  className={`w-full cursor-no-drop px-4 py-3 pl-12 border-2 rounded-lg bg-gray-800/80 text-white focus:outline-none transition-colors duration-300 ${
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
                  disabled
                  onChange={handleChange}
                  onBlur={focusOtpInput}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail
                    size={20}
                    className={`${
                      formData.email
                        ? isValidEmail
                          ? "text-green-500"
                          : "text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </div>
              </div>
              {formData.email && !isValidEmail && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-red-500 text-sm mt-1"
                >
                  Please enter a valid Email Id
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <div className="relative">
                <input
                  ref={otpInputRef}
                  className={`w-full px-4 py-3 pl-12 border-2 rounded-lg bg-gray-800/80 text-white focus:outline-none transition-colors duration-300 tracking-widest text-center font-mono ${
                    formData.otp
                      ? isValidOtp
                        ? "border-green-500"
                        : "border-red-500"
                      : "border-gray-700"
                  }`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="6"
                  name="otp"
                  placeholder="6-digit code"
                  value={formData.otp}
                  onChange={handleChange}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <KeyRound
                    size={20}
                    className={`${
                      formData.otp
                        ? isValidOtp
                          ? "text-green-500"
                          : "text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
              </div> */}
              </div>
              {formData.otp && !isValidOtp && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-red-500 text-sm mt-1"
                >
                  Please enter a valid Otp number
                </motion.p>
              )}
            </motion.div>

            <motion.button
              type="submit"
              className={`w-full text-xl py-3 rounded-lg font-bold uppercase flex items-center justify-center gap-2 transition-all duration-300 ${
                isValidOtp
                  ? "bg-yellow-500 hover:bg-yellow-600 text-gray-900"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
              disabled={isLoading || !isValidOtp}
              whileHover={isValidOtp ? { scale: 1.03 } : {}}
              whileTap={isValidOtp ? { scale: 0.97 } : {}}
            >
              {isLoading ? (
                <span className="animate-spin border-4 border-gray-900 border-t-transparent rounded-full w-6 h-6"></span>
              ) : (
                <>
                  <CheckCircle size={20} />
                  <span>Verify Code</span>
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
              Didn't recieve Code?{" "}
              <span
                className="text-yellow-500 hover:text-yellow-400 cursor-pointer font-medium"
                onClick={() => setIsFlipped(true)}
              >
                Resend Code
              </span>
            </p>
          </motion.div>
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="absolute inset-0 p-8 bg-gradient-to-b from-gray-700/10 to-gray-950 backdrop-blur-md text-white rounded-lg shadow-2xl w-full border-l-4 border-yellow-500 backface-hidden"
          style={{ transform: "rotateY(180deg)" }}
          //  initial={{ scale: 0.9, opacity: 0 }}
          //  animate={{ scale: 1, opacity: 1 }}
          //  transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex flex-col items-center justify-center h-full"
            //  initial={{ opacity: 0 }}
            //  animate={{ opacity: 1 }}
            //  transition={{ delay: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <RefreshCw size={50} className="text-yellow-500 mb-6" />
            </motion.div>

            <h2 className="text-2xl font-bold mb-4">
              Resend Verification Code
            </h2>

            <p className="text-gray-300 text-center mb-8">
              We'll send a new verification code to your email address
            </p>

            <motion.button
              onClick={handleResendOTP}
              className="w-full py-3 px-6 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-lg font-bold text-xl flex items-center justify-center gap-2 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={isResending}
            >
              {isResending ? (
                <span className="animate-spin border-4 border-gray-900 border-t-transparent rounded-full w-6 h-6"></span>
              ) : (
                <>
                  <SendIcon size={20} />
                  <span>Resend Code</span>
                </>
              )}
            </motion.button>

            <motion.p
              className="mt-6 text-gray-400 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span
                className="text-yellow-500 hover:text-yellow-400 cursor-pointer font-medium"
                onClick={() => setIsFlipped(false)}
              >
                Go back
              </span>
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VerifyOtpCode;
