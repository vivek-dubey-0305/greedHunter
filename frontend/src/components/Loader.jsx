// // Install required dependencies:
// // npm install lucide-react @heroicons/react framer-motion

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Loader2 } from "lucide-react";

// const Loader = () => {
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//     return () => setIsMounted(false);
//   }, []);

//   // Floating orb component
//   const Orb = ({ size = 5, color = "#ffffff", delay = 1 }) => {
//     return (
//       <motion.div
//         initial={{ opacity: 0, scale: 0 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{
//           duration: 1.5,
//           repeat: Infinity,
//           repeatType: "reverse",
//           delay,
//           ease: "easeInOut",
//         }}
//         className={`absolute rounded-full ${color} blur-[20px]`}
//         style={{
//           width: `${size}px`,
//           height: `${size}px`,
//         }}
//       />
//     );
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-none">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.5 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="relative flex items-center justify-center"
//       >
//         {/* Central Spinner */}
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
//           className="relative z-10"
//         >
//           <Loader2 className="h-16 w-16 text-white/90 animate-pulse" />
//         </motion.div>

//         {/* Animated Orbiters */}
//         {[0, 1, 2].map((i) => (
//           <motion.div
//             key={i}
//             className="absolute h-24 w-24 border-2 border-white/20 rounded-full"
//             animate={{
//               scale: [1, 1.2, 1],
//               opacity: [0.3, 0.6, 0.3],
//               rotate: 360,
//             }}
//             transition={{
//               duration: 4 + i,
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: i * 0.5,
//             }}
//           >
//             <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
//               <div className="h-3 w-3 bg-purple-400 rounded-full blur-[2px]" />
//             </div>
//           </motion.div>
//         ))}

//         {/* Floating Orbs */}
//         <Orb size={120} color="bg-purple-500/30" delay={0} />
//         <Orb size={80} color="bg-blue-400/30" delay={0.2} />
//         <Orb size={160} color="bg-purple-700/30" delay={0.4} />

//         {/* Floating Particles */}
//         {[...Array(12)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute h-1 w-1 bg-white/50 rounded-full"
//             initial={{
//               opacity: 0,
//               scale: 0,
//               x: Math.cos((i * 30 * Math.PI) / 180) * 100,
//               y: Math.sin((i * 30 * Math.PI) / 180) * 100,
//             }}
//             animate={{
//               opacity: [0, 0.8, 0],
//               scale: [0, 1, 0],
//               x: Math.cos((i * 30 * Math.PI) / 180) * 160,
//               y: Math.sin((i * 30 * Math.PI) / 180) * 160,
//             }}
//             transition={{
//               duration: 3 + i * 0.3,
//               repeat: Infinity,
//               delay: i * 0.1,
//               ease: "easeInOut",
//             }}
//           />
//         ))}

//         {/* Loading Text */}
//         <motion.div
//           className="absolute -bottom-16 text-center"
//           animate={{ y: [0, -10, 0], opacity: [0.8, 1, 0.8] }}
//           transition={{ duration: 2, repeat: Infinity }}
//         >
//           {/* <span className="text-xl font-light tracking-widest text-white/90 animate-pulse">
//             Loading...
//           </span> */}
//           {/* <div className="mt-2 h-1 w-32 bg-white/20 rounded-full overflow-hidden">
//             <motion.div
//               className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
//               animate={{ x: [-100, 100] }}
//               transition={{ duration: 2, repeat: Infinity }}
//             />
//           </div> */}
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default Loader;

import React, { useEffect, useState } from "react";

const Loader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // if (!visible) {
  //   return (
  //     <div className="animate-ready-pop text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-bold text-center text-4xl">
  //       READY!
  //     </div>
  //   );
  // }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 rounded-lg p-6 overflow-hidden relative group">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 animate-rotating-gradient bg-gradient-to-tr from-purple-900 via-indigo-900 to-pink-900 opacity-70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1)_0%,transparent_70%)]">
          <div
            className="absolute inset-0 animate-grid-pulse"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(147, 51, 234, 0.15) 20px),
                              repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(147, 51, 234, 0.15) 20px)`,
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>
      </div>

      {/* Particle explosion */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-particle-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`,
              background: `radial-gradient(circle at center, 
                   ${Math.random() > 0.5 ? "#c084fc" : "#f472b6"}, 
                   ${Math.random() > 0.5 ? "#9333ea" : "#db2777"})`,
            }}
          ></div>
        ))}
      </div>

      {/* Core animation */}
      <div className="relative z-10 space-y-4">
        {/* Holographic rings */}
        <div className="relative flex items-center justify-center">
          <div
            className="absolute w-32 h-32 border-4 border-transparent border-t-purple-400 rounded-full 
                         animate-holo-ring-1 filter drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
          ></div>
          <div
            className="absolute w-40 h-40 border-4 border-transparent border-b-pink-400 rounded-full 
                         animate-holo-ring-2 filter drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]"
          ></div>

          {/* Central prism */}
          <div className="relative w-20 h-20 animate-prism-float">
            <div
              className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-400 transform-gpu 
                          rotate-45 scale-110 animate-prism-glow rounded-lg blur-[2px]"
            ></div>
            <div
              className="absolute inset-0.5 bg-gradient-to-tr from-purple-600 to-pink-500 transform-gpu 
                          rotate-45 shadow-[inset_0_0_15px_rgba(255,255,255,0.3)] rounded-lg"
            ></div>
          </div>
        </div>

        {/* Energy waves */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-energy-wave w-48 h-48 rounded-full border-2 border-purple-300 opacity-30"></div>
          <div
            className="animate-energy-wave w-64 h-64 rounded-full border-2 border-pink-300 opacity-20"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
      </div>

      {/* Glitch text */}
      <div className="absolute bottom-6 flex space-x-2 animate-text-glitch">
        <span className="text-purple-300 text-lg font-bold">L</span>
        <span className="text-pink-300 text-lg font-bold">O</span>
        <span className="text-purple-300 text-lg font-bold">A</span>
        <span className="text-pink-300 text-lg font-bold">D</span>
        <span className="text-purple-300 text-lg font-bold">I</span>
        <span className="text-pink-300 text-lg font-bold">N</span>
        <span className="text-purple-300 text-lg font-bold">G</span>
        <div
          className="text-purple-300 text-lg"
          style={{ animation: "blink 0.5s ease-in-out infinite" }}
        >
          .
        </div>
      </div>

      <style jsx>{`
        @keyframes rotating-gradient {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes grid-pulse {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes particle-float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translate(
                ${Math.random() * 40 - 20}px,
                ${Math.random() * 40 - 20}px
              )
              scale(1.5);
            opacity: 1;
          }
        }

        @keyframes holo-ring-1 {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.2);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes holo-ring-2 {
          0% {
            transform: rotate(45deg) scale(1);
          }
          50% {
            transform: rotate(225deg) scale(0.8);
          }
          100% {
            transform: rotate(405deg) scale(1);
          }
        }

        @keyframes prism-float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        @keyframes prism-glow {
          0%,
          100% {
            opacity: 0.8;
            filter: brightness(1);
          }
          50% {
            opacity: 1;
            filter: brightness(1.5);
          }
        }

        @keyframes energy-wave {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes text-glitch {
          0%,
          100% {
            transform: translate(0);
          }
          25% {
            transform: translate(-2px, 2px);
          }
          50% {
            transform: translate(2px, -2px);
          }
          75% {
            transform: translate(-2px, -2px);
          }
        }

        @keyframes ready-pop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          80% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-ready-pop {
          animation: ready-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-rotating-gradient {
          animation: rotating-gradient 20s linear infinite;
        }

        .animate-grid-pulse {
          animation: grid-pulse 3s ease-in-out infinite;
        }

        .animate-particle-float {
          animation: particle-float ${Math.random() * 2 + 3}s ease-in-out
            infinite;
        }

        .animate-holo-ring-1 {
          animation: holo-ring-1 4s linear infinite;
        }

        .animate-holo-ring-2 {
          animation: holo-ring-2 5s linear infinite;
        }

        .animate-prism-float {
          animation: prism-float 3s ease-in-out infinite;
        }

        .animate-prism-glow {
          animation: prism-glow 2s ease-in-out infinite;
        }

        .animate-energy-wave {
          animation: energy-wave 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .animate-text-glitch {
          animation: text-glitch 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;
