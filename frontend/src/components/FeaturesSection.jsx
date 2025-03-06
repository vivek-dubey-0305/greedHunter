import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { 
  BookOpenCheck, 
  ArrowRight, 
  Gamepad2,
  Brain,
  Zap,
  Award,
  Crown,
  Compass,
  Shield,
  Trophy
} from "lucide-react";

const FeaturesSection = () => {
  // Animation controls for different elements
  const headingControls = useAnimation();
  const cardControls = useAnimation();
  
  // Animate elements when they come into view
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = 300;
      
      if (scrollY > triggerPoint) {
        headingControls.start("visible");
        cardControls.start("visible");
      } else {
        headingControls.start("hidden");
        cardControls.start("hidden");
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headingControls, cardControls]);
  
  // Animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: "easeOut" 
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: item => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing for smoother animation
        delay: item * 0.2 // Stagger the animations
      }
    })
  };
  
  const hoverScale = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.03,
      transition: { 
        duration: 0.3, 
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Subtle background patterns */}
      <div className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "30px 30px"
        }}
      />
      
      {/* Floating gradient orbs for depth */}
      <div className="absolute top-1/4 left-1/6 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/6 w-80 h-80 rounded-full bg-green-500/10 blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute top-3/4 left-1/2 w-72 h-72 rounded-full bg-yellow-500/10 blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.h2
          initial="hidden"
          animate={headingControls}
          variants={headingVariants}
          className="text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-400"
        >
          Unlock Your Potential
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-16">
          {/* Quiz Card - Gold */}
          <motion.div
            className="rounded-2xl overflow-hidden backdrop-blur-lg border border-yellow-500/30 relative"
            initial="hidden"
            animate={cardControls}
            variants={cardVariants}
            custom={0}
            whileHover="hover"
            // final="rest"
            // variants={hoverScale}
          >
            {/* Improved background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/60 via-amber-800/40 to-yellow-500/20 z-0" />
            
            {/* Glowing accent elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl transform translate-x-16 -translate-y-8" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-600/10 rounded-full blur-2xl transform -translate-x-12 translate-y-6" />

            <div className="relative z-10 p-10">
              {/* Header section with improved layout */}
              <div className="flex items-start gap-6 mb-10">
                <motion.div 
                  className="bg-gradient-to-br from-yellow-500/30 to-amber-600/40 p-5 rounded-xl shadow-lg shadow-yellow-500/20 backdrop-blur-sm ring-1 ring-yellow-500/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <BookOpenCheck size={48} className="text-yellow-300" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 uppercase tracking-wide">
                    Quizzes
                  </h3>
                  <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-amber-300 rounded-full mt-2 mb-4" />
                  <p className="text-yellow-100/90 mb-1 text-2xl font-light">
                    Unlock Your Knowledge
                  </p>
                </div>
              </div>

              {/* Content with enhanced styling */}
              <ul className="space-y-6 text-yellow-100/90 relative">
                {[
                  {
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" x2="9" y1="3" y2="18"></line><line x1="15" x2="15" y1="6" y2="21"></line></svg>,
                    title: "Embark on a Journey:",
                    text: "Dive into a realm where each question is a gateway to hidden wisdom."
                  },
                  {
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>,
                    title: "Expand Your Mind:",
                    text: "Discover new facts and concepts that will transform your understanding of the world."
                  },
                  {
                    icon: <Zap size={18} />,
                    title: "Challenge Yourself:",
                    text: "Test your knowledge with increasingly difficult questions that adapt to your skill level."
                  },
                  {
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain-circuit"><path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z"></path><path d="M16 8V5c0-1.1.9-2 2-2"></path><path d="M12 13h4"></path><path d="M12 18h6a2 2 0 0 1 2 2v1"></path><path d="M12 8h8"></path><path d="M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path><path d="M16.5 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path><path d="M20.5 21a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path><path d="M18.5 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path></svg>,
                    title: "Stimulate Your Mind:",
                    text: "Enjoy engaging, mind-stimulating quizzes crafted to push the limits of your intellect."
                  }
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex gap-4 items-start group/item p-3 rounded-lg border border-transparent"
                    whileHover={{ 
                      x: 10, 
                      backgroundColor: "rgba(234, 179, 8, 0.1)",
                      borderColor: "rgba(234, 179, 8, 0.1)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <div className="mt-1 text-yellow-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="group-hover/item:text-yellow-200 transition-colors duration-300">
                        <span className="font-semibold text-yellow-200">
                          {item.title}
                        </span>{" "}
                        {item.text}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* Enhanced call to action */}
              <div className="mt-10 flex justify-between items-center">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(234, 179, 8, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="px-6 py-4 bg-gradient-to-r from-yellow-600 to-amber-500 text-yellow-50 rounded-lg font-medium text-sm flex items-center gap-2 shadow-lg shadow-yellow-500/20 relative overflow-hidden"
                >
                  <span className="relative z-10">Start Exploring</span>
                  <ArrowRight
                    size={16}
                    className="relative z-10 group-hover:translate-x-1 transition-transform"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-400"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                {/* Image with enhanced effects */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/40 to-amber-300/20 rounded-lg blur-md transform scale-110"></div>
                  <img
                    src="/api/placeholder/120/140"
                    alt="Quiz Book"
                    className="h-32 w-28 object-cover rounded-lg shadow-lg shadow-yellow-500/40 relative z-10 border border-yellow-400/30"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-yellow-300 to-amber-400 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-yellow-900 shadow-md">
                    NEW
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Games Card - Green */}
          <motion.div
            className="rounded-2xl overflow-hidden backdrop-blur-lg border border-green-500/30 relative"
            initial="hidden"
            animate={cardControls}
            variants={cardVariants}
            custom={1}
            whileHover="hover"
            // final="rest"
            // variants={hoverScale}
          >
            {/* Improved background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-green-800/40 to-green-500/20 z-0" />
            
            {/* Glowing accent elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/10 rounded-full blur-3xl transform translate-x-16 -translate-y-8" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-600/10 rounded-full blur-2xl transform -translate-x-12 translate-y-6" />

            <div className="relative z-10 p-10">
              {/* Header section */}
              <div className="flex items-start gap-6 mb-10">
                <motion.div 
                  className="bg-gradient-to-br from-green-500/30 to-green-600/40 p-5 rounded-xl shadow-lg shadow-green-500/20 backdrop-blur-sm ring-1 ring-green-500/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Gamepad2 size={48} className="text-green-300" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-400 uppercase tracking-wide">
                    Games
                  </h3>
                  <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-green-300 rounded-full mt-2 mb-4" />
                  <p className="text-green-100/90 mb-1 text-2xl font-light">
                    Play, Compete, and Conquer!
                  </p>
                </div>
              </div>

              {/* Content list */}
              <ul className="space-y-6 text-green-100/90 relative">
                {[
                  {
                    icon: <Brain size={18} />,
                    title: "Battle of Wits:",
                    text: "Enter an arena where strategy, skill, and knowledge collide in epic battles."
                  },
                  {
                    icon: <Zap size={18} />,
                    title: "Mind-Bending Challenges:",
                    text: "Tackle puzzles and adrenaline-fueled trivia that keep your brain on its toes."
                  },
                  {
                    icon: <Award size={18} />,
                    title: "Rise to the Top:",
                    text: "Compete with peers, scale the leaderboards, and earn exclusive rewards for your victories."
                  },
                  {
                    icon: <Crown size={18} />,
                    title: "Dominate the Game:",
                    text: "More than just playing—it's about conquering challenges and celebrating triumphs."
                  }
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex gap-4 items-start group/item p-3 rounded-lg border border-transparent"
                    whileHover={{ 
                      x: 10, 
                      backgroundColor: "rgba(34, 197, 94, 0.1)",
                      borderColor: "rgba(34, 197, 94, 0.1)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <div className="mt-1 text-green-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="group-hover/item:text-green-200 transition-colors duration-300">
                        <span className="font-semibold text-green-200">
                          {item.title}
                        </span>{" "}
                        {item.text}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* Enhanced call to action */}
              <div className="mt-10 flex justify-between items-center">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="px-6 py-4 bg-gradient-to-r from-green-600 to-green-500 text-green-50 rounded-lg font-medium text-sm flex items-center gap-2 shadow-lg shadow-green-500/20 relative overflow-hidden"
                >
                  <span className="relative z-10">Start Gaming</span>
                  <ArrowRight
                    size={16}
                    className="relative z-10 group-hover:translate-x-1 transition-transform"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                {/* Image with enhanced effects */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-green-500/40 to-green-400/20 rounded-lg blur-md transform scale-110"></div>
                  <img
                    src="/api/placeholder/120/140"
                    alt="Game Book"
                    className="h-32 w-28 object-cover rounded-lg shadow-lg shadow-green-500/40 relative z-10 border border-green-400/30"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-green-300 to-green-400 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-green-900 shadow-md">
                    NEW
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Challenges Card - Purple */}
          <motion.div
            className="rounded-2xl overflow-hidden backdrop-blur-lg border border-purple-500/30 relative"
            initial="hidden"
            animate={cardControls}
            variants={cardVariants}
            custom={2}
            whileHover="hover"
            // initial="rest"
            // variants={hoverScale}
          >
            {/* Improved background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-purple-800/40 to-purple-500/20 z-0" />
            
            {/* Glowing accent elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl transform translate-x-16 -translate-y-8" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl transform -translate-x-12 translate-y-6" />

            <div className="relative z-10 p-10">
              {/* Header section */}
              <div className="flex items-start gap-6 mb-10">
                <motion.div 
                  className="bg-gradient-to-br from-purple-500/30 to-purple-600/40 p-5 rounded-xl shadow-lg shadow-purple-500/20 backdrop-blur-sm ring-1 ring-purple-500/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Compass size={48} className="text-purple-300" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-400 uppercase tracking-wide">
                    Challenges & Mysteries
                  </h3>
                  <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-purple-300 rounded-full mt-2 mb-4" />
                  <p className="text-purple-100/90 mb-1 text-2xl font-light">
                    Dare to Solve the Unsolvable!
                  </p>
                </div>
              </div>

              {/* Content list */}
              <ul className="space-y-6 text-purple-100/90 relative">
                {[
                  {
                    icon: <Compass size={18} />,
                    title: "Venture into the Unknown:",
                    text: "Embark on daring quests filled with cryptic clues, secret riddles, and elusive mysteries."
                  },
                  {
                    icon: <Shield size={18} />,
                    title: "Test Your Resolve:",
                    text: "Only the most determined minds can unravel these captivating enigmas."
                  },
                  {
                    icon: <Zap size={18} />,
                    title: "Ultimate Brain Teasers:",
                    text: "Face challenges designed to stretch your problem-solving skills to new limits."
                  },
                  {
                    icon: <Trophy size={18} />,
                    title: "Become a Legend:",
                    text: "Step into a world of mystery, decode perplexing puzzles, and prove yourself as the ultimate GreedHunter."
                  }
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex gap-4 items-start group/item p-3 rounded-lg border border-transparent"
                    whileHover={{ 
                      x: 10, 
                      backgroundColor: "rgba(168, 85, 247, 0.1)",
                      borderColor: "rgba(168, 85, 247, 0.1)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <div className="mt-1 text-purple-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="group-hover/item:text-purple-200 transition-colors duration-300">
                        <span className="font-semibold text-purple-200">
                          {item.title}
                        </span>{" "}
                        {item.text}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* Enhanced call to action */}
              <div className="mt-10 flex justify-between items-center">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-purple-50 rounded-lg font-medium text-sm flex items-center gap-2 shadow-lg shadow-purple-500/20 relative overflow-hidden"
                >
                  <span className="relative z-10">Start Challenging</span>
                  <ArrowRight
                    size={16}
                    className="relative z-10 group-hover:translate-x-1 transition-transform"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-400"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                {/* Image with enhanced effects */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/40 to-purple-400/20 rounded-lg blur-md transform scale-110"></div>
                  <img
                    src="/api/placeholder/120/140"
                    alt="Challenge Book"
                    className="h-32 w-28 object-cover rounded-lg shadow-lg shadow-purple-500/40 relative z-10 border border-purple-400/30"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-purple-300 to-purple-400 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-purple-900 shadow-md">
                    NEW
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Add custom animation class */}
      <style jsx>{`
        @keyframes pulse-slow {
          0% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
          100% { opacity: 0.5; transform: scale(1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s infinite;
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;