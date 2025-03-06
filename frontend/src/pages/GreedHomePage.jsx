import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import {
  BookOpen,
  ArrowRight,
  Star,
  BookOpenCheck,
  Gamepad2,
  Brain,
  Zap,
  Award,
  Crown,
  Compass,
  Shield,
  Trophy,
} from "lucide-react";
import Footer from "../components/Footer";

import { testimonials } from "../utils/data.js";
import { Link } from "react-router-dom";
import FeaturesSection from "../components/FeaturesSection.jsx";
import { useUserContext } from "../context/UserContext.jsx";
import Dashboard from "../components/Dashboard.jsx";

const HeroSection = () => {
  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const { scrollYProgress } = useScroll();

  const { user } = useUserContext();

  // Variants for sliding from the left
  const leftVariants = {
    hidden: { opacity: 0, x: -100 }, // Off-screen to the left, invisible
    visible: { opacity: 1, x: 0 }, // On-screen, fully visible
  };

  // Variants for sliding from the right
  const rightVariants = {
    hidden: { opacity: 0, x: 100 }, // Off-screen to the right, invisible
    visible: { opacity: 1, x: 0 }, // On-screen, fully visible
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || isPaused) return;

    const animation = carousel.animate(
      [
        { transform: "translateX(0)" },
        { transform: `translateX(-${carousel.scrollWidth / 2}px)` },
      ],
      {
        duration: 30000,
        iterations: Infinity,
        easing: "linear",
      }
    );

    if (isPaused) {
      animation.pause();
    } else {
      animation.play();
    }

    return () => {
      animation.cancel();
    };
  }, [isPaused]);

  // Glass card shine effect on scroll
  const cardControls1 = useAnimation();
  const cardControls2 = useAnimation();
  const cardControls3 = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 300) {
        cardControls1.start({
          background:
            "linear-gradient(225deg, rgba(255,215,0,0.3) 0%, rgba(255,215,0,0.1) 25%, rgba(255,215,0,0.3) 50%, rgba(255,215,0,0.1) 75%, rgba(255,215,0,0.3) 100%)",
          transition: { duration: 1.5, ease: "easeInOut" },
        });
        cardControls2.start({
          background:
            "linear-gradient(225deg, rgba(0,255,0,0.3) 0%, rgba(0,255,0,0.1) 25%, rgba(0,255,0,0.3) 50%, rgba(0,255,0,0.1) 75%, rgba(0,255,0,0.3) 100%)",
          transition: { duration: 1.5, ease: "easeInOut", delay: 0.3 },
        });
        cardControls3.start({
          background:
            "linear-gradient(225deg, rgba(128,0,128,0.3) 0%, rgba(128,0,128,0.1) 25%, rgba(128,0,128,0.3) 50%, rgba(128,0,128,0.1) 75%, rgba(128,0,128,0.3) 100%)",
          transition: { duration: 1.5, ease: "easeInOut", delay: 0.6 },
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cardControls1, cardControls2, cardControls3]);

  // Card animations when they come into view
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <>
      {!user ? (
        <div className="overflow-hidden">
          {/* HERO SECTION */}
          <section className="bg-gradient-to-b from-black via-purple-900 to-black text-white min-h-screen flex items-center justify-center p-3">
            <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="text-center md:text-left"
              >
                <h1 className="text-5xl font-bold text-purple-400 flex items-center gap-3">
                  <BookOpen className="text-purple-500" size={48} /> GreedHunter
                </h1>
                <p className="mt-4 text-lg text-gray-300 max-w-lg">
                  Greed for knowledge is the only greed that makes you richer.
                  Embark on a journey where curiosity fuels wisdom, and every
                  answer unlocks new possibilities.
                </p>
                <Link to="/get-in">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg flex items-center gap-2 shadow-lg shadow-purple-500/30"
                  >
                    Register
                    <ArrowRight size={20} />
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative"
              >
                <motion.img
                  src="/book-coin.png"
                  alt="Book Coin"
                  className="h-96 w-96 drop-shadow-[0_0_35px_rgba(168,85,247,0.5)]"
                  animate={{
                    rotate: [0, 7, -7, 0],
                    filter: [
                      "drop-shadow(0 0 35px rgba(168,85,247,0.3))",
                      "drop-shadow(0 0 35px rgba(168,85,247,0.7))",
                      "drop-shadow(0 0 35px rgba(168,85,247,0.3))",
                    ],
                  }}
                  transition={{
                    rotate: {
                      repeat: Infinity,
                      duration: 5,
                      ease: "easeInOut",
                    },
                    filter: {
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut",
                    },
                  }}
                />
              </motion.div>
            </div>
          </section>

          {/* Info Section */}
          <FeaturesSection />

          {/* Testimonial section */}
          <section className="py-16 bg-gradient-to-b from-black to-purple-900/70">
            <motion.h2
              className="text-4xl font-bold text-center mb-12 text-purple-400"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              What Users Are Saying
            </motion.h2>

            <div
              className="relative overflow-hidden w-full py-8"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div ref={carouselRef} className="flex w-max gap-6 px-4">
                {/* First set of testimonials */}
                {testimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    className="w-80 flex-shrink-0 bg-gradient-to-br from-purple-900/40 to-black/80 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        className="rounded-full h-16 w-16 object-cover border-2 border-purple-500"
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                      <div>
                        <h3 className="font-semibold text-lg text-purple-300">
                          {testimonial.name}
                        </h3>
                        <span className="text-sm text-purple-400/70">
                          {testimonial.profession}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4 text-sm line-clamp-4">
                      {testimonial.content}
                    </p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={
                            i < testimonial.stars
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-600"
                          }
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}

                {/* Duplicate testimonials for continuous scrolling */}
                {testimonials.map((testimonial) => (
                  <motion.div
                    key={`dup-${testimonial.id}`}
                    className="w-80 flex-shrink-0 bg-gradient-to-br from-purple-900/40 to-black/80 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        className="rounded-full h-16 w-16 object-cover border-2 border-purple-500"
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                      <div>
                        <h3 className="font-semibold text-lg text-purple-300">
                          {testimonial.name}
                        </h3>
                        <span className="text-sm text-purple-400/70">
                          {testimonial.profession}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4 text-sm line-clamp-4">
                      {testimonial.content}
                    </p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={
                            i < testimonial.stars
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-600"
                          }
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <style jsx>{`
            @keyframes shine {
              0% {
                background-position: -100% 0;
              }
              100% {
                background-position: 200% 0;
              }
            }
          `}</style>
        </div>
      ) : (
        // Component DashBoard..
        <Dashboard />
      )}
      <Footer />
    </>
  );
};

export default HeroSection;
