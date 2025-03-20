import React, { useState, useEffect, useRef } from "react";
import { useUserContext } from "../context/UserContext";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ForgetPasswordPopup from "../components/ForgetPasswordPopup";

const UserForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [errorField, setErrorField] = useState("");
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const navigate = useNavigate();
  const { registerUser, loginUser } = useUserContext();
  const canvasRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    usernameORemail: "",
  });

  // Particle Web Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // Set canvas to full window size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", setCanvasSize);
    setCanvasSize();
    
    // Particle settings
    const particleCount =500;
    const particles = [];
    const connectionDistance = 150;
    const mouseRadius = 150;
    
    // Mouse position
    let mouse = {
      x: null,
      y: null,
      radius: mouseRadius
    };
    
    window.addEventListener("mousemove", (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });
    
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
      }
      
      update() {
        // Move particles
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
        
        // Move away from mouse
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const pushX = -Math.cos(angle);
            const pushY = -Math.sin(angle);
            
            this.speedX += pushX * 0.2;
            this.speedY += pushY * 0.2;
          }
        }
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();
      }
    }
    
    // Initialize particles
    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    
    // Connect particles with lines
    const connect = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(128, 0, 255, ${opacity * 0.4})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      connect();
      requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", () => {});
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorField("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitResponse = isLogin
        ? await loginUser({
            usernameORemail: formData.usernameORemail,
            password: formData.password,
          })
        : await registerUser({
            username: formData.username,
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          });

      toast.success(submitResponse.message);
      isLogin ? navigate("/dashboard") : navigate("/sotp");
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
      if (err?.duplicateField) setErrorField(err.duplicateField);
    }
  };

  // bg-gradient-to-r from-purple-900 via-black to-purple-900 bg-[length:400%_400%]
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative bg-black">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
      <Toaster position="top-right" reverseOrder={false} />

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-transparent text-white p-6 rounded-lg shadow-lg w-full max-w-md relative z-10"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <motion.input
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`w-full p-2 bg-gradient-to-br from-gray-700 to-gray-950 text-white border-b-4 ${
                  errorField === "username"
                    ? "border-red-600"
                    : "border-yellow-500"
                } rounded-md focus:outline-none`}
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              <motion.input
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full p-2 bg-gradient-to-br from-gray-700 to-gray-950 text-white border-b-4 border-yellow-500 rounded-md focus:outline-none"
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
              <motion.input
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`w-full p-2 bg-gradient-to-br from-gray-700 to-gray-950 text-white border-b-4 ${
                  errorField === "email" ? "border-red-600" : "border-yellow-500"
                } rounded-md focus:outline-none`}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <motion.input
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`w-full p-2 bg-gradient-to-br from-gray-700 to-gray-950 text-white border-b-4 ${
                  errorField === "phone" ? "border-red-600" : "border-yellow-500"
                } rounded-md focus:outline-none`}
                type="number"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </>
          )}

          {isLogin && (
            <>
              <motion.input
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full p-2 bg-gradient-to-br from-gray-700 to-gray-950 text-white border-b-4 border-yellow-500 rounded-md focus:outline-none"
                type="text"
                name="usernameORemail"
                placeholder="Username or Email"
                value={formData.usernameORemail}
                onChange={handleChange}
              />
            </>
          )}

          <motion.input
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full p-2 bg-gradient-to-br from-gray-700 to-gray-950 text-white border-b-4 border-yellow-500 rounded-md focus:outline-none"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          {isLogin && (
            <div className="ml-1 fixed w-98">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-bold text-sm text-blue-500 hover:text-blue-700 cursor-pointer relative -right-70"
                onClick={() => setShowPopup(!showPopup)}
              >
                Forgot password?
              </motion.span>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="mt-8 cursor-pointer w-full bg-blue-600 p-2 rounded-md text-white font-bold hover:bg-blue-700 transition-all"
          >
            {isLogin ? "Login" : "Sign Up"}
          </motion.button>
        </form>

        {showPopup && <ForgetPasswordPopup onClose={() => setShowPopup(false)} />}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-4"
        >
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            className="text-blue-500 cursor-pointer ml-1"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default UserForm;



// import React, { useState } from "react";
// import { useUserContext } from "../context/UserContext";
// import toast, { Toaster } from "react-hot-toast";
// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";

// const UserForm = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const navigate = useNavigate();
//   const { registerUser, loginUser } = useUserContext();

//   const [formData, setFormData] = useState({
//     username: "",
//     fullName: "",
//     email: "",
//     phone: "",
//     password: "",
//     usernameORemail: "",
//   });
//   const [errorField, setErrorField] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrorField("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = isLogin
//         ? await loginUser({
//             usernameORemail: formData.usernameORemail,
//             password: formData.password,
//           })
//         : await registerUser({
//             username: formData.username,
//             fullName: formData.fullName,
//             email: formData.email,
//             phone: formData.phone,
//             password: formData.password,
//           });

//       toast.success(response.message);
//       isLogin ? navigate("/dashboard") : navigate("/sotp");
//     } catch (err) {
//       toast.error(err.message || "Something Went Wrong!");
//       if (err?.duplicateField) setErrorField(err.duplicateField);
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
//       <Toaster position="top-right" reverseOrder={false} />

//       {/* Animated Background */}
//       {/* <motion.div
//         className="absolute inset-0 bg-gradient-to-r from-purple-900 via-black to-purple-900 animate-pulse"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 2 }}
//       /> */}

//       <motion.div
//         className="relative z-10 p-8 bg-gray-900 text-white rounded-lg shadow-xl w-96 border border-purple-500"
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h2 className="text-2xl font-bold text-center mb-4">
//           {isLogin ? "Login" : "Sign Up"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {!isLogin && (
//             <>
//               <input
//                 className="input-field"
//                 type="text"
//                 name="username"
//                 placeholder="Username"
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//               <input
//                 className="input-field"
//                 type="text"
//                 name="fullName"
//                 placeholder="Full Name"
//                 value={formData.fullName}
//                 onChange={handleChange}
//               />
//               <input
//                 className="input-field"
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//               <input
//                 className="input-field"
//                 type="number"
//                 name="phone"
//                 placeholder="Phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//               />
//             </>
//           )}
//           <input
//             className="input-field"
//             type={isLogin ? "text" : "password"}
//             name={isLogin ? "usernameORemail" : "password"}
//             placeholder={isLogin ? "Username or Email" : "Password"}
//             value={isLogin ? formData.usernameORemail : formData.password}
//             onChange={handleChange}
//           />
//           {isLogin ? (
//             <input
//               className="input-field"
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//           ) : (
//             ""
//           )}

//           <button
//             type="submit"
//             className="w-full bg-purple-700 hover:bg-purple-900 py-2 rounded-lg font-bold uppercase"
//           >
//             Submit
//           </button>
//         </form>

//         <p className="text-center mt-4">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}
//           <span
//             className="text-blue-500 cursor-pointer ml-1"
//             onClick={() => setIsLogin(!isLogin)}
//           >
//             {isLogin ? "Sign Up" : "Login"}
//           </span>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default UserForm;

// // Tailwind CSS Classes
// // .input-field { @apply w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 focus:outline-none focus:border-purple-500; }
