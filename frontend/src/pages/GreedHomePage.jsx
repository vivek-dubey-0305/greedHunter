// !Claude AI
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Crown,
  ArrowRight,
  Calendar,
  Trophy,
  Star,
  Gift,
  Book,
} from "lucide-react";
import { useUserContext } from "../context/UserContext";
import { useEventContext } from "../context/EventContex";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";

import { testimonials } from "../utils/data.js";
import Dashboard from "../components/Dashboard";

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
        const { left, top, width, height } =
          heroRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      if (response?.data?.users) {
        // console.log("response.data.users", response.data.users);
        const sortedUsers = response.data.users
          .map((usr) => ({
            ...usr,
            highestEvent:
              usr.enrolledEvents?.reduce(
                (max, event) =>
                  event.marks > (max?.marks || 0) ||
                  (event.marks === max?.marks && event.winTime < max?.winTime) // ✅ Sort by marks, then winTime
                    ? event
                    : max,
                {}
              ) || {},
          }))
          .filter((usr) => usr.highestEvent.marks !== undefined) // Remove users without marks
          .sort((a, b) => {
            if ((b.highestEvent.marks || 0) !== (a.highestEvent.marks || 0)) {
              return (b.highestEvent.marks || 0) - (a.highestEvent.marks || 0); // Highest marks first
            } else {
              return (
                (a.highestEvent.winTime || Infinity) -
                (b.highestEvent.winTime || Infinity)
              ); // Least time wins
            }
          })
          .sort((a, b) => b.marks - a.marks)
          .slice(0, 3);
        // console.log("SortedUsers", sortedUsers);
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
      boxShadow:
        "0 20px 25px -5px rgba(139, 92, 246, 0.25), 0 10px 10px -5px rgba(139, 92, 246, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(234, 179, 8, 0.6)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  const featuresData = [
    {
      icon: <Gift className="w-8 h-8 text-yellow-400" />,
      title: "Win Cash Prizes & Goodies",
      description:
        "Compete in challenges and earn real rewards for your skills.",
    },
    {
      icon: <Book className="w-8 h-8 text-purple-400" />,
      title: "Exclusive Notes & Resources",
      description:
        "Gain access to premium learning materials to help you excel.",
    },
    {
      icon: <Trophy className="w-8 h-8 text-yellow-400" />,
      title: "Leaderboards & Challenges",
      description: "Track your progress and compete with other learners.",
    },
    {
      icon: <Star className="w-8 h-8 text-purple-400" />,
      title: "One-on-One Battle Mode",
      description: "Challenge your friends in direct knowledge duels.",
    },
  ];

  return (
    <>
      {user ? (
        <Dashboard />
      ) : (
        <div className="bg-gradient-to-br from-gray-900  to-black text-white min-h-screen overflow-hidden">
          {/* Animated Background */}
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(128,90,213,0.1)_1px,transparent_1px)] bg-[length:30px_30px]"></div>
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E\")",
                backgroundSize: "40px 40px",
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
                transition: "top 0.3s ease-out, left 0.3s ease-out",
              }}
            ></div>
            <div
              className="absolute w-72 h-72 rounded-full bg-yellow-400/10 blur-3xl"
              style={{
                bottom: `${30 - mousePosition.y * 10}%`,
                right: `${20 - mousePosition.x * 10}%`,
                transition: "bottom 0.3s ease-out, right 0.3s ease-out",
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
                Compete in quizzes, games, and challenges to win exclusive
                rewards and establish your dominance.
              </p>
              <motion.button
                className="mt-8 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 mx-auto group"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
                onClick={() => navigate("/get-in")}
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
                <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400">
                  Top Hunters
                </h3>
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
                      {user.fullName} -{" "}
                      <span className="text-yellow-400">
                        {user.marks} Points
                      </span>
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
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400">
                  Why GreedHunter?
                </span>
              </h2>
              <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
                Join our community of competitive learners and experience a new
                way to build your skills while having fun.
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
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
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
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-yellow-400">
                  Upcoming Events
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                {scheduledEvents["Upcoming"].length > 0 ? (
                  scheduledEvents["Upcoming"].map((event, index) => (
                    <motion.div
                      key={event._id}
                      className="relative bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20 group"
                      whileHover={{
                        y: -5,
                        transition: { type: "spring", stiffness: 300 },
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      onClick={() => {
                        user
                          ? navigate(
                              `/event/${event.category}/${event.subcategory}/${event._id}`
                            )
                          : navigate("/get-in");
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="p-6 relative z-10">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                              {event.title}
                            </h3>
                            <div className="flex items-center mt-1 text-sm text-gray-400">
                              <span className="bg-purple-900/50 px-2 py-1 rounded mr-2">
                                {event.category}
                              </span>
                              <ArrowRight className="w-3 h-3 mx-1" />
                              <span className="bg-yellow-900/50 px-2 py-1 rounded">
                                {event.subcategory}
                              </span>
                            </div>
                          </div>
                          <span className="bg-gray-800 text-yellow-400 text-xs font-medium px-2 py-1 rounded-full">
                            {event.eventType}
                          </span>
                        </div>

                        <p className="text-gray-300 mb-4 line-clamp-2">
                          {event.description}
                        </p>

                        <div className="flex items-center text-sm text-gray-400">
                          <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                          <span>
                            {new Date(event.startTime).toLocaleDateString()} at{" "}
                            {new Date(event.startTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
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
                    <p className="text-gray-400">
                      No upcoming events at this time. Check back soon!
                    </p>
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
              {/* Heading */}
              <h2 className="text-4xl font-bold text-center mb-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400">
                  Testimonials
                </span>
              </h2>
              <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
                See what our community has to say about their GreedHunter
                experience.
              </p>

              {/* Testimonial Slider */}
              <div className="testimonial-wrapper overflow-hidden relative pb-6">
                <div
                  className="testimonial-container flex"
                  style={{ animation: "scroll 20s linear infinite" }}
                >
                  {[...testimonials, ...testimonials].map((t, index) => (
                    <motion.div
                      key={`${t.id}-${index}`}
                      className="m-2 flex-shrink-0 w-[330px] bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-500/20 flex flex-col"
                      whileHover={{
                        y: -10,
                        boxShadow:
                          "0 20px 25px -5px rgba(168, 85, 247, 0.2), 0 10px 10px -5px rgba(168, 85, 247, 0.1)",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {/* Profile Image & Name */}
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 overflow-hidden border-2 border-yellow-400">
                          <img
                            src={t.image}
                            alt={t.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold">{t.name}</h3>
                          <p className="text-gray-400 text-sm">
                            {t.profession}
                          </p>
                        </div>
                      </div>

                      {/* Testimonial Content */}
                      <p className="mt-4 text-gray-300">{t.content}</p>

                      {/* Star Ratings */}
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

            {/* Auto-Scroll Animation */}
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
                }
              `}
            </style>

            <Footer />
          </section>
          {/* Custom Cursor */}
          {cursorHover && (
            <motion.div
              className="fixed w-12 h-12 pointer-events-none z-50 rounded-full border-2 border-yellow-400"
              animate={{
                x: mousePosition.x * window.innerWidth - 24,
                y: mousePosition.y * window.innerHeight - 24,
                scale: cursorHover ? 1.2 : 1,
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
      )}
    </>
  );
};

export default HeroSection;
