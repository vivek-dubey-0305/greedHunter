// import React, { useState, useEffect, useRef } from "react";
// import { useUserContext } from "../context/UserContext";
// import toast, { Toaster } from "react-hot-toast";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { CheckCircle, Mail, KeyRound, ArrowLeft } from "lucide-react";

// const TverifyEmail = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     otp: "",
//   });

//   const [errorField, setErrorField] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isValidEmail, setIsValidEmail] = useState(false);
//   const [isValidOtp, setIsValidOtp] = useState(false);
//   const navigate = useNavigate();
//   const { verifyOtp } = useUserContext();
//   const canvasRef = useRef(null);
//   const otpInputRef = useRef(null);

//   // Validate email and OTP format
//   useEffect(() => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     setIsValidEmail(emailRegex.test(formData.email));
//     setIsValidOtp(formData.otp.length === 6 && !isNaN(formData.otp));
//   }, [formData.email, formData.otp]);

//   // Particle animation
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
    
//     const setCanvasSize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
    
//     window.addEventListener("resize", setCanvasSize);
//     setCanvasSize();
    
//     // Particle settings
//     const particleCount = 60;
//     const particles = [];
    
//     class Particle {
//       constructor() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.size = Math.random() * 3 + 1;
//         this.speedX = Math.random() * 1 - 0.5;
//         this.speedY = Math.random() * 1 - 0.5;
//         this.color = `yellow`;
//       }
      
//       update() {
//         this.x += this.speedX;
//         this.y += this.speedY;
        
//         if (this.x > canvas.width) this.x = 0;
//         if (this.x < 0) this.x = canvas.width;
//         if (this.y > canvas.height) this.y = 0;
//         if (this.y < 0) this.y = canvas.height;
//       }
      
//       draw() {
//         ctx.fillStyle = this.color;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fill();
//       }
//     }
    
//     const init = () => {
//       for (let i = 0; i < particleCount; i++) {
//         particles.push(new Particle());
//       }
//     };
    
//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
      
//       for (let i = 0; i < particles.length; i++) {
//         particles[i].update();
//         particles[i].draw();
//       }
      
//       requestAnimationFrame(animate);
//     };
    
//     init();
//     animate();
    
//     return () => {
//       window.removeEventListener("resize", setCanvasSize);
//     };
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrorField("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const submitResponse = await verifyOtp(formData);
//       toast.success(submitResponse.message || "Email verified successfully!");
      
//       // Success animation before navigation
//       setTimeout(() => {
//         navigate("/");
//       }, 1500);
//     } catch (err) {
//       toast.error(err.message || "Something Went Wrong!");
//       if (err?.duplicateField) setErrorField(err.duplicateField);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // OTP input focus handling
//   const focusOtpInput = () => {
//     if (isValidEmail && otpInputRef.current) {
//       otpInputRef.current.focus();
//     }
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         staggerChildren: 0.1,
//         delayChildren: 0.3
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1 }
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 overflow-hidden">
//       <Toaster position="top-right" reverseOrder={false} />
      
//       {/* Particle Background */}
//       <canvas
//         ref={canvasRef}
//         className="absolute top-0 left-0 w-full h-full z-0"
//       />
      
//       {/* Background Gradient Animation */}
//       <motion.div 
//         className="absolute inset-0 bg-black" 
//         animate={{
//           background: [
//             // "linear-gradient(to right, rgba(88, 28, 135, 0.4), rgba(0, 0, 0, 0.2), rgba(88, 28, 135, 0.4))",
//             "linear-gradient(to right, rgba(88, 28, 135, 0.2), rgba(0, 0, 0, 0.4), rgba(88, 28, 135, 0.2))",
//         //     "linear-gradient(to right, rgba(88, 28, 135, 0.4), rgba(0, 0, 0, 0.2), rgba(88, 28, 135, 0.4))"
//           ]
//         }}
//         transition={{ duration: 8, repeat: Infinity }}
//       />
      
//       {/* Animated Icon */}
//       <motion.div
//         className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none"
//         initial={{ opacity: 0, rotateY: 0 }}
//         animate={{ 
//           opacity: 0.2, 
//           rotateY: 360,
//           scale: [1, 1.05, 1]
//         }}
//         transition={{ 
//           rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
//           scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
//         }}
//       >
//         {/* <CheckCircle size={600} className="text-purple-500" /> */}
//       </motion.div>
      
//       {/* OTP Verification Form */}
//       <motion.div
//         className="relative z-10 p-8 bg-gray-900/80 backdrop-blur-md text-white rounded-lg shadow-2xl w-96 border-l-4 border-yellow-500"
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="mb-6"
//         >
//           <div className="flex items-center mb-6">
//             <motion.div
//               onClick={() => navigate("/sotp")}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               className="cursor-pointer"
//             >
//               <ArrowLeft size={20} className="text-green-400 hover:text-purple-300" />
//             </motion.div>
            
//             <motion.h2 
//               variants={itemVariants}
//               className="text-3xl font-bold text-center flex-1"
//             >
//               Verify OTP
//             </motion.h2>
//           </div>
          
//           <motion.p
//             variants={itemVariants}
//             className="text-gray-300 text-center mb-4"
//           >
//             Enter the 6-digit code sent to your email
//           </motion.p>
//         </motion.div>
        
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <motion.div
//             variants={itemVariants}
//             className="relative"
//           >
//             <input 
//               className={`w-full px-4 py-3 pl-12 border-2 rounded-lg bg-gray-800/80 text-white focus:outline-none transition-colors duration-300 ${
//                 formData.email ? (isValidEmail ? 'border-green-500' : 'border-red-500') : 'border-gray-700'
//               }`}
//               type="email" 
//               name="email" 
//               placeholder="Your email address" 
//               value={formData.email} 
//               onChange={handleChange}
//               onBlur={focusOtpInput}
//             />
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <Mail size={20} className={`${
//                 formData.email ? (isValidEmail ? 'text-green-500' : 'text-red-500') : 'text-gray-400'
//               }`} />
//             </div>
//           </motion.div>
          
//           <motion.div
//             variants={itemVariants}
//             className="relative"
//           >
//             <input 
//               ref={otpInputRef}
//               className={`w-full px-4 py-3 pl-12 border-2 rounded-lg bg-gray-800/80 text-white focus:outline-none transition-colors duration-300 tracking-widest text-center font-mono ${
//                 formData.otp ? (isValidOtp ? 'border-green-500' : 'border-red-500') : 'border-gray-700'
//               }`}
//               type="text"
//               inputMode="numeric" 
//               pattern="[0-9]*"
//               maxLength="6"
//               name="otp" 
//               placeholder="6-digit code" 
//               value={formData.otp} 
//               onChange={handleChange}
//             />
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <KeyRound size={20} className={`${
//                 formData.otp ? (isValidOtp ? 'text-green-500' : 'text-red-500') : 'text-gray-400'
//               }`} />
//             </div>
//           </motion.div>
          
//           <motion.button
//             variants={itemVariants}
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//             type="submit"
//             disabled={isLoading || !isValidEmail || !isValidOtp}
//             className={`w-full py-3 rounded-lg font-bold uppercase flex items-center justify-center gap-2 transition-all duration-300 ${
//               isValidEmail && isValidOtp 
//                 ? 'bg-purple-600 hover:bg-purple-700 text-white' 
//                 : 'bg-gray-700 text-gray-400 cursor-not-allowed'
//             }`}
//           >
//             {isLoading ? (
//               <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-6 h-6"></span>
//             ) : (
//               <>
//                 <CheckCircle size={20} />
//                 <span>Verify</span>
//               </>
//             )}
//           </motion.button>
//         </form>
        
//         <motion.div
//           variants={itemVariants}
//           className="mt-6 text-center text-sm text-gray-400"
//         >
//           <p>Didn't receive the code? <span 
//             className="text-yellow-400 hover:text-yellow-300 cursor-pointer font-medium"
//             onClick={() => navigate("/sotp")}
//           >Resend code</span></p>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default TverifyEmail;