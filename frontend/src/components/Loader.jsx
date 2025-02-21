// Install required dependencies:
// npm install lucide-react @heroicons/react framer-motion

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const Loader = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Floating orb component
  const Orb = ({ size = 5, color = "#ffffff", delay = 1 }) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay,
          ease: "easeInOut",
        }}
        className={`absolute rounded-full ${color} blur-[20px]`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex items-center justify-center"
      >
        {/* Central Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="relative z-10"
        >
          <Loader2 className="h-16 w-16 text-white/90 animate-pulse" />
        </motion.div>

        {/* Animated Orbiters */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute h-24 w-24 border-2 border-white/20 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: 360,
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
              <div className="h-3 w-3 bg-purple-400 rounded-full blur-[2px]" />
            </div>
          </motion.div>
        ))}

        {/* Floating Orbs */}
        <Orb size={120} color="bg-purple-500/30" delay={0} />
        <Orb size={80} color="bg-blue-400/30" delay={0.2} />
        <Orb size={160} color="bg-purple-700/30" delay={0.4} />

        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-white/50 rounded-full"
            initial={{
              opacity: 0,
              scale: 0,
              x: Math.cos((i * 30 * Math.PI) / 180) * 100,
              y: Math.sin((i * 30 * Math.PI) / 180) * 100,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              x: Math.cos((i * 30 * Math.PI) / 180) * 160,
              y: Math.sin((i * 30 * Math.PI) / 180) * 160,
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Loading Text */}
        <motion.div
          className="absolute -bottom-16 text-center"
          animate={{ y: [0, -10, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* <span className="text-xl font-light tracking-widest text-white/90 animate-pulse">
            Loading...
          </span> */}
          {/* <div className="mt-2 h-1 w-32 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
              animate={{ x: [-100, 100] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div> */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Loader;
