// import React, { useEffect, useRef, useState } from "react";
// import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
// import {
//   BookOpen,
//   ArrowRight,
//   Star,
//   BookOpenCheck,
//   Gamepad2,
//   Brain,
//   Zap,
//   Award,
//   Crown,
//   Compass,
//   Shield,
//   Trophy,
// } from "lucide-react";
// import Footer from "../components/Footer";

// import { testimonials } from "../utils/data.js";
// import { Link } from "react-router-dom";
// import FeaturesSection from "../components/FeaturesSection.jsx";
// import { useUserContext } from "../context/UserContext.jsx";
// import Dashboard from "../components/Dashboard.jsx";
// import { EventProvider } from "../context/EventContex.jsx";

// const HeroSection = () => {
//   const carouselRef = useRef(null);
//   const [isPaused, setIsPaused] = useState(false);
//   const { scrollYProgress } = useScroll();

//   const { user } = useUserContext();

//   // Variants for sliding from the left
//   const leftVariants = {
//     hidden: { opacity: 0, x: -100 }, // Off-screen to the left, invisible
//     visible: { opacity: 1, x: 0 }, // On-screen, fully visible
//   };

//   // Variants for sliding from the right
//   const rightVariants = {
//     hidden: { opacity: 0, x: 100 }, // Off-screen to the right, invisible
//     visible: { opacity: 1, x: 0 }, // On-screen, fully visible
//   };

//   useEffect(() => {
//     const carousel = carouselRef.current;
//     if (!carousel || isPaused) return;

//     const animation = carousel.animate(
//       [
//         { transform: "translateX(0)" },
//         { transform: `translateX(-${carousel.scrollWidth / 2}px)` },
//       ],
//       {
//         duration: 30000,
//         iterations: Infinity,
//         easing: "linear",
//       }
//     );

//     if (isPaused) {
//       animation.pause();
//     } else {
//       animation.play();
//     }

//     return () => {
//       animation.cancel();
//     };
//   }, [isPaused]);

//   // Glass card shine effect on scroll
//   const cardControls1 = useAnimation();
//   const cardControls2 = useAnimation();
//   const cardControls3 = useAnimation();

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       if (scrollPosition > 300) {
//         cardControls1.start({
//           background:
//             "linear-gradient(225deg, rgba(255,215,0,0.3) 0%, rgba(255,215,0,0.1) 25%, rgba(255,215,0,0.3) 50%, rgba(255,215,0,0.1) 75%, rgba(255,215,0,0.3) 100%)",
//           transition: { duration: 1.5, ease: "easeInOut" },
//         });
//         cardControls2.start({
//           background:
//             "linear-gradient(225deg, rgba(0,255,0,0.3) 0%, rgba(0,255,0,0.1) 25%, rgba(0,255,0,0.3) 50%, rgba(0,255,0,0.1) 75%, rgba(0,255,0,0.3) 100%)",
//           transition: { duration: 1.5, ease: "easeInOut", delay: 0.3 },
//         });
//         cardControls3.start({
//           background:
//             "linear-gradient(225deg, rgba(128,0,128,0.3) 0%, rgba(128,0,128,0.1) 25%, rgba(128,0,128,0.3) 50%, rgba(128,0,128,0.1) 75%, rgba(128,0,128,0.3) 100%)",
//           transition: { duration: 1.5, ease: "easeInOut", delay: 0.6 },
//         });
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [cardControls1, cardControls2, cardControls3]);

//   // Card animations when they come into view
//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
//   };

//   const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

//   return (
//     <>
//       {!user ? (
//         <div className="overflow-hidden">
//           {/* HERO SECTION */}
//           <section className="bg-gradient-to-b from-black via-purple-900 to-black text-white min-h-screen flex items-center justify-center p-3">
//             <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto">
//               <motion.div
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 1 }}
//                 className="text-center md:text-left"
//               >
//                 <h1 className="text-5xl font-bold text-purple-400 flex items-center gap-3">
//                   <BookOpen className="text-purple-500" size={48} /> GreedHunter
//                 </h1>
//                 <p className="mt-4 text-lg text-gray-300 max-w-lg">
//                   Greed for knowledge is the only greed that makes you richer.
//                   Embark on a journey where curiosity fuels wisdom, and every
//                   answer unlocks new possibilities.
//                 </p>
//                 <Link to="/get-in">
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg flex items-center gap-2 shadow-lg shadow-purple-500/30"
//                   >
//                     Register
//                     <ArrowRight size={20} />
//                   </motion.button>
//                 </Link>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 1, ease: "easeOut" }}
//                 className="relative"
//               >
//                 <motion.img
//                   src="/book-coin.png"
//                   alt="Book Coin"
//                   className="h-96 w-96 drop-shadow-[0_0_35px_rgba(168,85,247,0.5)]"
//                   animate={{
//                     rotate: [0, 7, -7, 0],
//                     filter: [
//                       "drop-shadow(0 0 35px rgba(168,85,247,0.3))",
//                       "drop-shadow(0 0 35px rgba(168,85,247,0.7))",
//                       "drop-shadow(0 0 35px rgba(168,85,247,0.3))",
//                     ],
//                   }}
//                   transition={{
//                     rotate: {
//                       repeat: Infinity,
//                       duration: 5,
//                       ease: "easeInOut",
//                     },
//                     filter: {
//                       repeat: Infinity,
//                       duration: 3,
//                       ease: "easeInOut",
//                     },
//                   }}
//                 />
//               </motion.div>
//             </div>
//           </section>

//           {/* Info Section */}
//           <FeaturesSection />

//           {/* Testimonial section */}
//           <section className="py-16 bg-gradient-to-b from-black to-purple-900/70">
//             <motion.h2
//               className="text-4xl font-bold text-center mb-12 text-purple-400"
//               initial={{ opacity: 0, y: -20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7 }}
//               viewport={{ once: true }}
//             >
//               What Users Are Saying
//             </motion.h2>

//             <div
//               className="relative overflow-hidden w-full py-8"
//               onMouseEnter={() => setIsPaused(true)}
//               onMouseLeave={() => setIsPaused(false)}
//             >
//               <div ref={carouselRef} className="flex w-max gap-6 px-4">
//                 {/* First set of testimonials */}
//                 {testimonials.map((testimonial) => (
//                   <motion.div
//                     key={testimonial.id}
//                     className="w-80 flex-shrink-0 bg-gradient-to-br from-purple-900/40 to-black/80 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30"
//                     whileHover={{
//                       scale: 1.03,
//                       boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)",
//                     }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <div className="flex items-center gap-4 mb-4">
//                       <img
//                         className="rounded-full h-16 w-16 object-cover border-2 border-purple-500"
//                         src={testimonial.image}
//                         alt={testimonial.name}
//                       />
//                       <div>
//                         <h3 className="font-semibold text-lg text-purple-300">
//                           {testimonial.name}
//                         </h3>
//                         <span className="text-sm text-purple-400/70">
//                           {testimonial.profession}
//                         </span>
//                       </div>
//                     </div>
//                     <p className="text-gray-300 mb-4 text-sm line-clamp-4">
//                       {testimonial.content}
//                     </p>
//                     <div className="flex gap-1">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           size={18}
//                           className={
//                             i < testimonial.stars
//                               ? "text-yellow-400 fill-yellow-400"
//                               : "text-gray-600"
//                           }
//                         />
//                       ))}
//                     </div>
//                   </motion.div>
//                 ))}

//                 {/* Duplicate testimonials for continuous scrolling */}
//                 {testimonials.map((testimonial) => (
//                   <motion.div
//                     key={`dup-${testimonial.id}`}
//                     className="w-80 flex-shrink-0 bg-gradient-to-br from-purple-900/40 to-black/80 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30"
//                     whileHover={{
//                       scale: 1.03,
//                       boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)",
//                     }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <div className="flex items-center gap-4 mb-4">
//                       <img
//                         className="rounded-full h-16 w-16 object-cover border-2 border-purple-500"
//                         src={testimonial.image}
//                         alt={testimonial.name}
//                       />
//                       <div>
//                         <h3 className="font-semibold text-lg text-purple-300">
//                           {testimonial.name}
//                         </h3>
//                         <span className="text-sm text-purple-400/70">
//                           {testimonial.profession}
//                         </span>
//                       </div>
//                     </div>
//                     <p className="text-gray-300 mb-4 text-sm line-clamp-4">
//                       {testimonial.content}
//                     </p>
//                     <div className="flex gap-1">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           size={18}
//                           className={
//                             i < testimonial.stars
//                               ? "text-yellow-400 fill-yellow-400"
//                               : "text-gray-600"
//                           }
//                         />
//                       ))}
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           <style jsx>{`
//             @keyframes shine {
//               0% {
//                 background-position: -100% 0;
//               }
//               100% {
//                 background-position: 200% 0;
//               }
//             }
//           `}</style>
//         </div>
//       ) : (
//           // Component DashBoard..
//           <EventProvider>

//             <Dashboard />
//           </EventProvider>
//       )}
//       <Footer />
//     </>
//   );
// };

// export default HeroSection;














// !CHATGPT
// import React, { useState, useEffect } from "react";
// // import { motion } from "framer-motion";
// // import { Sparkles, Crown } from "lucide-react";
// import { useUserContext } from "../context/UserContext";
// import { useEventContext } from "../context/EventContex";

// import { useNavigate } from "react-router-dom";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { Sparkles, Crown, Trophy, Zap, BookOpen, Sword, Star } from "lucide-react";

// const testimonials = [
//   {
//     id: 1,
//     name: "Shonak Alia",
//     profession: "Student",
//     image: "shonak.jpg",
//     content: "GreedHunter has transformed my learning experience...",
//     stars: 5,
//   },
//   {
//     id: 2,
//     name: "Akshansh Tyagi",
//     profession: "Student",
//     image: "akshanshTyagi.jpg",
//     content: "The game challenges are addictive!",
//     stars: 5,
//   },
//   {
//     id: 3,
//     name: "Asim Bin Quamar",
//     profession: "Student",
//     image: "asim.jpg",
//     content: "As an educator, I appreciate GreedHunter...",
//     stars: 4,
//   },
// ];

// const HeroSection = () => {
//   const { getUsers, user } = useUserContext();
//   const [topUsers, setTopUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const { getEvents } = useEventContext();

//   const navigate = useNavigate();

//   const [scheduledEvents, setScheduledEvents] = useState({
//     Upcoming: [],
//   });

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const response = await getUsers();
//       if (response?.data?.users) {
//         const sortedUsers = response.data.users
//           .sort((a, b) => b.marks - a.marks)
//           .slice(0, 3);
//         setTopUsers(sortedUsers);
//       }
//       setLoading(false);
//     };
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     const fetchUserEvents = async () => {
//       try {
//         const now = new Date();

//         // ✅ Fetch All Events
//         const allEvents = await getEvents();
//         // ✅ Process Upcoming & Active Events
//         let upcoming = [];

//         allEvents.forEach(({ category , subcategories  }) => {
//           Object.entries(subcategories || {}).forEach(
//             ([subcategory, events]) => {
//               (events || []).forEach((event) => {
//                 const start = new Date(event.startTime);
//                 const end = new Date(event.endTime);

//                 if (start > now) {
//                   upcoming.push({ ...event, category, subcategory });
//                 } else if (start <= now && end >= now) {
//                   active.push({ ...event, category, subcategory });
//                 }
//               });
//             }
//           );
//         });

//         setScheduledEvents({ Upcoming: upcoming });
//       } catch (error) {
//         console.error("Error fetching scheduled events:", error);
//       }
//     };

//     fetchUserEvents();
//   }, []);

//   return (
//     <div className="bg-gradient-to-b from-gray-900 to-purple-900/10 min-h-screen">
//       <style jsx>{`
//         .gradient-text {
//           background: linear-gradient(45deg, #f59e0b, #d946ef);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }
//         .glass-card {
//           background: rgba(17, 24, 39, 0.6);
//           backdrop-filter: blur(12px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//         }
//       `}</style>

//       {/* Hero Section */}
//       <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="relative z-10"
//         >
//           <h1 className="text-6xl font-bold gradient-text mb-6 font-serif">
//             Hunt Events. Win Greed Prizes.
//           </h1>
//           <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
//             Compete in adrenaline-pumping quizzes and challenges to win exclusive
//             rewards and dominate the leaderboards!
//           </p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-amber-400 text-black px-8 py-3 rounded-xl font-bold text-lg shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50 transition-all"
//           >
//             Start Hunting Now
//           </motion.button>
//         </motion.div>

//         {/* Animated Background Elements */}
//         <motion.div
//           className="absolute inset-0 pointer-events-none"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           {/* Floating Coins */}
//           {[...Array(8)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute text-amber-400"
//               style={{
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//               }}
//               animate={{
//                 y: [0, -40, 0],
//                 rotate: [0, 360],
//               }}
//               transition={{
//                 duration: 4 + Math.random() * 4,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             >
//               <Sparkles size={28} />
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Top Winners Panel */}
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="glass-card absolute top-20 right-8 p-6 rounded-2xl shadow-xl"
//         >
//           <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
//             <Trophy className="inline-block" /> Leader Champions
//           </h3>
//           {loading ? (
//             <div className="animate-pulse flex flex-col gap-3">
//               {[...Array(3)].map((_, i) => (
//                 <div key={i} className="h-6 bg-gray-700 rounded w-32" />
//               ))}
//             </div>
//           ) : (
//             topUsers.map((user, index) => (
//               <motion.div
//                 key={user._id}
//                 whileHover={{ x: 10 }}
//                 className="flex items-center mt-3 group"
//               >
//                 <div className="relative">
//                   {index === 0 ? (
//                     <Crown className="text-amber-400 mr-3 w-6 h-6" />
//                   ) : (
//                     <Sparkles className="text-purple-400 mr-3 w-6 h-6" />
//                   )}
//                 </div>
//                 <div>
//                   <p className="font-medium text-purple-100">{user.fullName}</p>
//                   <p className="text-sm text-amber-300">{user.marks} Points</p>
//                 </div>
//               </motion.div>
//             ))
//           )}
//         </motion.div>
//       </section>

//       {/* Why GreedHunter Section */}
//       <section className="px-10 py-20">
//         <h2 className="text-4xl font-bold text-center mb-16 gradient-text font-serif">
//           Why Choose GreedHunter?
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
//           {[
//             { icon: Zap, title: "Instant Cash Rewards" },
//             { icon: BookOpen, title: "Premium Resources" },
//             { icon: Trophy, title: "Live Leaderboards" },
//             { icon: Sword, title: "1v1 Battles" },
//           ].map(({ icon: Icon, title }, index) => (
//             <motion.div
//               key={title}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.2 }}
//               className="group relative p-1 rounded-2xl bg-gradient-to-br from-amber-400/30 to-purple-500/30"
//             >
//               <div className="glass-card p-6 rounded-xl h-full">
//                 <Icon className="w-12 h-12 text-amber-400 mb-4" />
//                 <h3 className="text-xl font-semibold text-purple-100 mb-3">
//                   {title}
//                 </h3>
//                 <p className="text-purple-200">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Upcoming Events Section */}
//       <section className="px-10 py-20">
//         <h2 className="text-4xl font-bold text-center mb-16 gradient-text font-serif">
//           Upcoming Events
//         </h2>
//         <div className="flex overflow-x-auto pb-8 gap-6 scrollbar-hide">
//           {scheduledEvents["Upcoming"]?.map((event, index) => (
//             <motion.div
//               key={event._id}
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//               className="min-w-[320px] flex-shrink-0"
//             >
//               <div
//                 className="glass-card p-6 rounded-2xl cursor-pointer h-full transform transition-all hover:bg-purple-900/30"
//                 onClick={() => navigate(`/event/${event.category}/${event.subcategory}/${event._id}`)}
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h3 className="text-xl font-bold text-purple-100">
//                       {event.title}
//                     </h3>
//                     <p className="text-sm text-amber-400">
//                       {event.category} → {event.subcategory}
//                     </p>
//                   </div>
//                   <span className="px-3 py-1 bg-amber-400/10 text-amber-400 rounded-full text-sm">
//                     {event.eventType}
//                   </span>
//                 </div>
//                 <p className="text-purple-200 mb-4 line-clamp-3">
//                   {event.description}
//                 </p>
//                 <div className="space-y-2 text-sm text-purple-300">
//                   <p>
//                     🕒 {new Date(event.startTime).toLocaleDateString("en-US", {
//                       weekday: 'short',
//                       month: 'short',
//                       day: 'numeric',
//                       hour: '2-digit',
//                       minute: '2-digit'
//                     })}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="px-10 py-20 bg-gradient-to-r from-purple-900/30 to-amber-900/10">
//         <h2 className="text-4xl font-bold text-center mb-16 gradient-text font-serif">
//           Player Testimonials
//         </h2>
//         <div className="flex overflow-x-auto pb-8 gap-8 scrollbar-hide">
//           {testimonials.map((t) => (
//             <motion.div
//               key={t.id}
//               className="min-w-[320px] flex-shrink-0 glass-card p-8 rounded-2xl"
//               whileHover={{ y: -10 }}
//             >
//               <div className="flex items-center gap-4 mb-6">
//                 <img
//                   src={t.image}
//                   alt={t.name}
//                   className="w-14 h-14 rounded-full border-2 border-amber-400"
//                 />
//                 <div>
//                   <h3 className="text-lg font-bold text-purple-100">{t.name}</h3>
//                   <p className="text-sm text-amber-400">{t.profession}</p>
//                 </div>
//               </div>
//               <p className="text-purple-200 mb-4 italic">"{t.content}"</p>
//               <div className="flex gap-1 text-amber-400">
//                 {[...Array(t.stars)].map((_, i) => (
//                   <Star key={i} className="w-5 h-5 fill-current" />
//                 ))}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HeroSection;







// !Claude AI
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, Crown, ArrowRight, Calendar, Trophy, Star, Gift, Book } from "lucide-react";
import { useUserContext } from "../context/UserContext";
import { useEventContext } from "../context/EventContex";
import { useNavigate } from "react-router-dom";


import Footer from "../components/Footer";

import { testimonials } from "../utils/data.js";
import Dashboard from "../components/Dashboard";
// const testimonials = [
//   {
//     id: 1,
//     name: "Shonak Alia",
//     profession: "Student",
//     image: "shonak.jpg",
//     content: "GreedHunter has transformed my learning experience...",
//     stars: 5,
//   },
//   {
//     id: 2,
//     name: "Akshansh Tyagi",
//     profession: "Student",
//     image: "akshanshTyagi.jpg",
//     content: "The game challenges are addictive!",
//     stars: 5,
//   },
//   {
//     id: 3,
//     name: "Asim Bin Quamar",
//     profession: "Student",
//     image: "asim.jpg",
//     content: "As an educator, I appreciate GreedHunter...",
//     stars: 4,
//   },
// ];

const HeroSection = () => {
  const { getUsers, user } = useUserContext();
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);
  const heroRef = useRef(null);

  const { getEvents } = useEventContext();
  const navigate = useNavigate();

  const [scheduledEvents, setScheduledEvents] = useState({
    Upcoming: [],
  });

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      if (response?.data?.users) {
        const sortedUsers = response.data.users
          .sort((a, b) => b.marks - a.marks)
          .slice(0, 3);
        setTopUsers(sortedUsers);
      }
      setLoading(false);
    };
    fetchUsers();
  }, [getUsers]);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const now = new Date();

        // ✅ Fetch All Events
        const allEvents = await getEvents();

        // ✅ Process Upcoming Events
        let upcoming = [];

        allEvents.forEach(({ category, subcategories }) => {
          Object.entries(subcategories || {}).forEach(
            ([subcategory, events]) => {
              (events || []).forEach((event) => {
                const start = new Date(event.startTime);
                const end = new Date(event.endTime);

                if (start > now) {
                  upcoming.push({ ...event, category, subcategory });
                }
              });
            }
          );
        });

        setScheduledEvents({ Upcoming: upcoming });
      } catch (error) {
        console.error("Error fetching scheduled events:", error);
      }
    };

    fetchUserEvents();
  }, [getEvents]);

  // Animation variants
  const cardVariants = {
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.25), 0 10px 10px -5px rgba(139, 92, 246, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 0 20px rgba(234, 179, 8, 0.6)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  const featuresData = [
    { 
      icon: <Gift className="w-8 h-8 text-yellow-400" />,
      title: "Win Cash Prizes & Goodies",
      description: "Compete in challenges and earn real rewards for your skills."
    },
    {
      icon: <Book className="w-8 h-8 text-purple-400" />,
      title: "Exclusive Notes & Resources",
      description: "Gain access to premium learning materials to help you excel."
    },
    {
      icon: <Trophy className="w-8 h-8 text-yellow-400" />,
      title: "Leaderboards & Challenges",
      description: "Track your progress and compete with other learners."
    },
    {
      icon: <Star className="w-8 h-8 text-purple-400" />,
      title: "One-on-One Battle Mode",
      description: "Challenge your friends in direct knowledge duels."
    }
  ];

  return (
    <>
      {

        user ?
          <Dashboard />
          :
    <div className="bg-gradient-to-br from-gray-900  to-black text-white min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(128,90,213,0.1)_1px,transparent_1px)] bg-[length:30px_30px]"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E\")",
            backgroundSize: "40px 40px"
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex flex-col justify-center items-center text-center p-6 z-10 overflow-hidden"
      >
        {/* Animated Gradient Orbs */}
        <div 
          className="absolute w-64 h-64 rounded-full bg-purple-600/20 blur-3xl"
          style={{ 
            top: `${20 + mousePosition.y * 10}%`, 
            left: `${15 + mousePosition.x * 10}%`,
            transition: "top 0.3s ease-out, left 0.3s ease-out" 
          }}
        ></div>
        <div 
          className="absolute w-72 h-72 rounded-full bg-yellow-400/10 blur-3xl"
          style={{ 
            bottom: `${30 - mousePosition.y * 10}%`, 
            right: `${20 - mousePosition.x * 10}%`,
            transition: "bottom 0.3s ease-out, right 0.3s ease-out" 
          }}
        ></div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl relative z-10"
        >
          <h1 className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-purple-400 leading-tight">
            Hunt Events. Win Greed Prizes. Dominate the Game.
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Compete in quizzes, games, and challenges to win exclusive rewards and establish your dominance.
          </p>
          <motion.button 
            className="mt-8 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 mx-auto group"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
              onClick={() =>navigate("/get-in")}
          >
            Join the Hunt
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Top Winners Card */}
        {/* <motion.div 
          className="absolute top-10 right-10 bg-gray-800/80 backdrop-blur-sm p-5 rounded-lg border border-purple-500/30 shadow-xl"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="text-yellow-400" />
            <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400">Top Hunters</h3>
          </div>
          {loading ? (
            <div className="flex justify-center py-2">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-yellow-400"></div>
            </div>
          ) : (
            topUsers.map((user, index) => (
              <motion.div 
                key={user._id} 
                className="flex items-center mt-3 p-2 rounded-md hover:bg-purple-900/20 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {index === 0 ? (
                  <Crown className="text-yellow-400 mr-2" />
                ) : (
                  <Sparkles className="text-purple-400 mr-2" />
                )}
                <p className="font-medium">
                  {user.fullName} - <span className="text-yellow-400">{user.marks} Points</span>
                </p>
              </motion.div>
            ))
          )}
        </motion.div> */}
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400">Why GreedHunter?</span>
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
            Join our community of competitive learners and experience a new way to build your skills while having fun.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuresData.map((feature, index) => (
              <motion.div
                key={index}
                className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-purple-500/10 p-6 h-full"
                variants={cardVariants}
                whileHover="hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-800/50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Upcoming Events Section */}
      <section className="relative z-10 py-16 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-yellow-400">Upcoming Events</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {scheduledEvents["Upcoming"].length > 0 ? (
              scheduledEvents["Upcoming"].map((event, index) => (
                <motion.div
                  key={event._id}
                  className="relative bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20 group"
                  whileHover={{ 
                    y: -5, 
                    transition: { type: "spring", stiffness: 300 } 
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  onClick={() => {
                    user 
                      ? navigate(`/event/${event.category}/${event.subcategory}/${event._id}`) 
                      : navigate("/get-in")
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="p-6 relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">{event.title}</h3>
                        <div className="flex items-center mt-1 text-sm text-gray-400">
                          <span className="bg-purple-900/50 px-2 py-1 rounded mr-2">{event.category}</span>
                          <ArrowRight className="w-3 h-3 mx-1" />
                          <span className="bg-yellow-900/50 px-2 py-1 rounded">{event.subcategory}</span>
                        </div>
                      </div>
                      <span className="bg-gray-800 text-yellow-400 text-xs font-medium px-2 py-1 rounded-full">
                        {event.eventType}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4 line-clamp-2">{event.description}</p>
                    
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                      <span>
                        {new Date(event.startTime).toLocaleDateString()} at {new Date(event.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    
                    <div className="absolute bottom-4 right-4 bg-yellow-500 text-black rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 translate-x-4 transition-all duration-300">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 text-center py-10 bg-gray-800/50 rounded-lg">
                <p className="text-gray-400">No upcoming events at this time. Check back soon!</p>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-b from-transparent to-black/60">
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="max-w-7xl mx-auto"
  >
    <h2 className="text-4xl font-bold text-center mb-2">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400">Testimonials</span>
    </h2>
    <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
      See what our community has to say about their GreedHunter experience.
    </p>
    
    <div className="testimonial-wrapper overflow-hidden relative pb-6">
      <div className="testimonial-container flex" style={{ animation: 'scroll 20s linear infinite' }}>
        {[...testimonials, ...testimonials].map((t, index) => (
          <motion.div
            key={`${t.id}-${index}`} // Ensure unique keys by combining id and index
            className="m-2 flex-shrink-0 w-[330px] bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-500/20 flex flex-col"
            whileHover={{ 
              y: -10,
              boxShadow: "0 20px 25px -5px rgba(168, 85, 247, 0.2), 0 10px 10px -5px rgba(168, 85, 247, 0.1)"
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center ">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 overflow-hidden border-2 border-yellow-400 flex items-center justify-center">
                <span className="text-yellow-400 font-bold text-lg">{t.name[0]}</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{t.name}</h3>
                <p className="text-gray-400 text-sm">{t.profession}</p>
              </div>
            </div>
            <p className="mt-4 text-gray-300">{t.content}</p>
            <div className="mt-4 text-yellow-400 flex">
              {[...Array(t.stars)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400" />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
          </motion.div>
          
          <style jsx>
            {`
.testimonial-wrapper {
  position: relative;
  overflow: hidden;
}

.testimonial-container {
  display: flex;
  animation: scroll 20s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.testimonial-wrapper:hover .testimonial-container {
  animation-play-state: paused;
}`}
          </style>
</section>

      {/* Custom Cursor */}
      {cursorHover && (
        <motion.div
          className="fixed w-12 h-12 pointer-events-none z-50 rounded-full border-2 border-yellow-400"
          animate={{
            x: mousePosition.x * window.innerWidth - 24,
            y: mousePosition.y * window.innerHeight - 24,
            scale: cursorHover ? 1.2 : 1
          }}
          transition={{ type: "spring", damping: 10, stiffness: 50 }}
        />
      )}

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
      }
    <Footer />
    </>
  );
};

export default HeroSection;


// !GROK AI

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Sparkles, Crown } from "lucide-react";
// import { useUserContext } from "../context/UserContext";
// import { useEventContext } from "../context/EventContex";
// import { useNavigate } from "react-router-dom";

// const testimonials = [
//   {
//     id: 1,
//     name: "Shonak Alia",
//     profession: "Student",
//     image: "shonak.jpg",
//     content: "GreedHunter has transformed my learning experience...",
//     stars: 5,
//   },
//   {
//     id: 2,
//     name: "Akshansh Tyagi",
//     profession: "Student",
//     image: "akshanshTyagi.jpg",
//     content: "The game challenges are addictive!",
//     stars: 5,
//   },
//   {
//     id: 3,
//     name: "Asim Bin Quamar",
//     profession: "Student",
//     image: "asim.jpg",
//     content: "As an educator, I appreciate GreedHunter...",
//     stars: 4,
//   },
// ];

// const HeroSection = () => {
//   const { getUsers, user } = useUserContext();
//   const [topUsers, setTopUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { getEvents } = useEventContext();
//   const navigate = useNavigate();
//   const [scheduledEvents, setScheduledEvents] = useState({ Upcoming: [] });

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const response = await getUsers();
//       if (response?.data?.users) {
//         const sortedUsers = response.data.users
//           .sort((a, b) => b.marks - a.marks)
//           .slice(0, 3);
//         setTopUsers(sortedUsers);
//       }
//       setLoading(false);
//     };
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     const fetchUserEvents = async () => {
//       try {
//         const now = new Date();
//         const allEvents = await getEvents();
//         let upcoming = [];
//         allEvents.forEach(({ category, subcategories }) => {
//           Object.entries(subcategories || {}).forEach(([subcategory, events]) => {
//             (events || []).forEach((event) => {
//               const start = new Date(event.startTime);
//               const end = new Date(event.endTime);
//               if (start > now) {
//                 upcoming.push({ ...event, category, subcategory });
//               }
//             });
//           });
//         });
//         setScheduledEvents({ Upcoming: upcoming });
//       } catch (error) {
//         console.error("Error fetching scheduled events:", error);
//       }
//     };
//     fetchUserEvents();
//   }, []);

//   return (
//     <div className="bg-black text-white min-h-screen font-sans">
//       {/* Hero Section */}
//       <section className="relative h-[90vh] flex flex-col justify-center items-center text-center p-6 overflow-hidden">
//         <motion.h1
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-yellow-400"
//         >
//           Hunt. Win. Rule.
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5, duration: 1 }}
//           className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl"
//         >
//           Dive into epic quizzes, battles, and challenges to claim your greed prizes.
//         </motion.p>
//         <motion.button
//           whileHover={{ scale: 1.1, rotate: 2 }}
//           whileTap={{ scale: 0.95 }}
//           className="mt-8 bg-gradient-to-r from-purple-600 to-yellow-500 text-black font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-purple-500/50 transition-all"
//         >
//           Join the Hunt
//         </motion.button>
//         {/* Top Winners */}
//         <motion.div
//           initial={{ opacity: 0, x: 100 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.8, duration: 0.8 }}
//           className="absolute top-10 right-10 bg-purple-900/80 p-6 rounded-xl shadow-xl border border-yellow-400/30 backdrop-blur-sm"
//         >
//           <h3 className="text-xl font-semibold text-yellow-400">Top Hunters</h3>
//           {loading ? (
//             <p className="text-gray-400">Loading...</p>
//           ) : (
//             topUsers.map((user, index) => (
//               <motion.div
//                 key={user._id}
//                 whileHover={{ x: 5 }}
//                 className="flex items-center mt-3 text-gray-200"
//               >
//                 {index === 0 ? (
//                   <Crown className="text-yellow-400 mr-2" />
//                 ) : (
//                   <Sparkles className="text-purple-400 mr-2" />
//                 )}
//                 <p>
//                   {user.fullName} - <span className="text-yellow-400">{user.marks}</span> Pts
//                 </p>
//               </motion.div>
//             ))
//           )}
//         </motion.div>
//         <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-900/20 to-black pointer-events-none" />
//       </section>

//       {/* Why GreedHunter Section */}
//       <section className="p-10 bg-gradient-to-r from-black to-purple-950">
//         <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-yellow-400">
//           Why GreedHunter?
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {[
//             { icon: "🎯", text: "Win Cash Prizes & Goodies" },
//             { icon: "📚", text: "Exclusive Notes & Resources" },
//             { icon: "🏆", text: "Leaderboards & Challenges" },
//             { icon: "🔥", text: "One-on-One Battle Mode" },
//           ].map((item, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.05, rotate: 1 }}
//               className="bg-purple-900/50 p-6 rounded-lg shadow-lg border border-purple-500/30 hover:border-yellow-400/50 transition-colors"
//             >
//               <span className="text-3xl">{item.icon}</span>
//               <h3 className="mt-4 text-xl font-semibold text-gray-200">{item.text}</h3>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Upcoming Events Section */}
//       <section className="p-10">
//         <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-purple-400">
//           Upcoming Hunts
//         </h2>
//         <div className="space-y-6">
//           {scheduledEvents["Upcoming"]?.map((event) => (
//             <motion.div
//               key={event._id}
//               whileHover={{ scale: 1.03 }}
//               className="bg-purple-900/70 p-6 rounded-xl shadow-lg cursor-pointer border border-yellow-400/20 hover:border-yellow-400/50 transition-all"
//               onClick={() =>
//                 user
//                   ? navigate(`/event/${event.category}/${event.subcategory}/${event._id}`)
//                   : navigate("/get-in")
//               }
//             >
//               <h3 className="text-xl font-bold text-yellow-400">{event.title}</h3>
//               <p className="text-gray-300">
//                 {event.category} → {event.subcategory}
//               </p>
//               <p className="mt-2 text-gray-400">{event.description}</p>
//               <p className="mt-2 text-sm text-gray-300">
//                 {new Date(event.startTime).toLocaleString()} -{" "}
//                 {new Date(event.endTime).toLocaleString()}
//               </p>
//               <p className="text-sm mt-2 text-purple-300">🎭 Type: {event.eventType}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="p-10 bg-black">
//         <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-yellow-400">
//           Voices of the Hunt
//         </h2>
//         <div className="flex overflow-x-scroll space-x-6 p-4 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-900">
//           {testimonials.map((t) => (
//             <motion.div
//               key={t.id}
//               whileHover={{ scale: 1.05 }}
//               className="min-w-[300px] bg-purple-900/50 p-6 rounded-xl shadow-lg border border-purple-500/30"
//             >
//               <img
//                 src={t.image}
//                 alt={t.name}
//                 className="w-14 h-14 rounded-full border-2 border-yellow-400"
//               />
//               <h3 className="text-lg font-semibold mt-3 text-gray-200">{t.name}</h3>
//               <p className="text-gray-400">{t.content}</p>
//               <p className="text-yellow-400 mt-2">{"⭐".repeat(t.stars)}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       <style jsx>{`
//         .scrollbar-thin::-webkit-scrollbar {
//           height: 8px;
//         }
//         .scrollbar-thumb-purple-600::-webkit-scrollbar-thumb {
//           background-color: #9333ea;
//           border-radius: 4px;
//         }
//         .scrollbar-track-gray-900::-webkit-scrollbar-track {
//           background-color: #111827;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HeroSection;