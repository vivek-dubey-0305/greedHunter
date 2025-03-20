// !Claude
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEventContext } from "../context/EventContex";
import { ChevronLeft, ChevronRight, Award, Calendar, HelpCircle, Settings } from "lucide-react";

const Dashboard = () => {
  const { user } = useUserContext();
  const { getEvents } = useEventContext();
  const navigate = useNavigate();

  const [scheduledEvents, setScheduledEvents] = useState({
    Enrolled: [],
    Upcoming: [],
    Active: [],
  });

  const [activeTab, setActiveTab] = useState("Events");
  const [activeSubTab, setActiveSubTab] = useState("Enrolled");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const now = new Date();

        // ✅ Fetch All Events
        const allEvents = await getEvents();

        // ✅ Extract Enrolled Events from User (populated eventId)
        let enrolled =
          user?.enrolledEvents?.map((enrollment) => ({
            ...enrollment.eventId, // Populated event details
            subcategory: enrollment.subcategory,
            category: enrollment.category,
            categoryId: enrollment.eventId,
            EventDate: enrollment.startTime,
            Location: enrollment.Location,
            isPlayed: enrollment.isPlayed,
            won: enrollment.won,
          })) || [];

        // ✅ Process Upcoming & Active Events
        let upcoming = [];
        let active = [];

        allEvents.forEach(({ category, subcategories }) => {
          Object.entries(subcategories || {}).forEach(
            ([subcategory, events]) => {
              (events || []).forEach((event) => {
                const start = new Date(event.startTime);
                const end = new Date(event.endTime);

                if (start > now) {
                  upcoming.push({ ...event, category, subcategory });
                } else if (start <= now && end >= now) {
                  active.push({ ...event, category, subcategory });
                }
              });
            }
          );
        });

        setScheduledEvents({
          Enrolled: enrolled,
          Upcoming: upcoming,
          Active: active,
        });
      } catch (error) {
        console.error("Error fetching scheduled events:", error);
      }
    };

    fetchUserEvents();
  }, [user.enrolledEvents, getEvents]);

  // Icons for menu items
  const menuIcons = {
    Events: <Calendar size={20} />,
    Badges: <Award size={20} />,
    Support: <HelpCircle size={20} />,
  };

  // Animation variants
  const sidebarVariants = {
    open: { width: "280px", transition: { ease: "easeOut", duration: 0.3 } },
    closed: { width: "80px", transition: { ease: "easeOut", duration: 0.3 } },
  };

  const arrowVariants = {
    open: { rotate: 0 },
    closed: { rotate: 180 },
  };

  const menuItemVariants = {
    open: { 
      x: 0, 
      opacity: 1,
      transition: { 
        delay: 0.1,
        duration: 0.2 
      } 
    },
    closed: { 
      x: -10, 
      opacity: 0,
      transition: { 
        duration: 0.2 
      }
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-black text-white overflow-hidden">
      {/* Left Sidebar */}
      <motion.aside
        initial="open"
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="bg-gray-900 border-r-2 border-yellow-500 flex flex-col relative"
      >
        {/* Sidebar Toggle Button */}
        <motion.div
          className="absolute -right-4 top-8 bg-yellow-500 rounded-full p-2 cursor-pointer z-10"
          animate={sidebarOpen ? "open" : "closed"}
          variants={arrowVariants}
          whileHover={{ scale: 1.1 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <ChevronLeft className="text-black" size={16} />
        </motion.div>

        {/* Sidebar Header */}
        <div className="p-6 flex items-center">
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-black font-bold">D</span>
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.h2
                variants={menuItemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="text-xl font-bold text-yellow-500"
              >
                Dashboard
              </motion.h2>
            )}
          </AnimatePresence>
        </div>

        {/* Menu Items */}
        <nav className="flex-1">
          <ul className="space-y-1 px-3">
            {Object.keys(menuIcons).map((tab) => (
              <motion.li
                key={tab}
                className={`rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                  activeTab === tab 
                    ? "bg-gradient-to-r from-yellow-600 to-yellow-500" 
                    : "hover:bg-gray-800"
                }`}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: sidebarOpen ? 1.03 : 1 }}
              >
                <div className="py-3 px-4 flex items-center">
                  <div className="flex-shrink-0">
                    {menuIcons[tab]}
                  </div>
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span
                        variants={menuItemVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="ml-3 font-medium"
                      >
                        {tab}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Account & Settings Button */}
        <div className="p-3 mt-auto">
          <motion.button
            className="w-full py-3 px-4 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800 hover:to-red-700 text-white font-bold rounded-lg flex items-center justify-center transition-all duration-300"
            onClick={() => navigate(`/user/${user._id}/settings`)}
            whileHover={{ scale: 1.03 }}
          >
            <Settings size={20} />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  variants={menuItemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="ml-2"
                >
                  Account & Settings
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* EVENTS SECTION */}
        {activeTab === "Events" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h1 className="text-3xl font-bold text-yellow-500 mb-4 sm:mb-0">
                My {activeSubTab} Events
              </h1>
              
              <div className="flex space-x-2 p-1 bg-gray-900 rounded-lg">
                {["Enrolled", "Upcoming", "Active"].map((tab) => (
                  <motion.button
                    key={tab}
                    className={`py-2 px-4 font-medium rounded-md transition-all duration-300 ${
                      activeSubTab === tab 
                        ? "bg-purple-600 text-white" 
                        : "text-gray-400 hover:text-white"
                    }`}
                    onClick={() => setActiveSubTab(tab)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>
            </div>

            {scheduledEvents[activeSubTab]?.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-yellow-500 mb-3">
                  <Calendar size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-300">No {activeSubTab} Events</h3>
                <p className="text-gray-500 mt-2">Events you {activeSubTab.toLowerCase()} will appear here</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scheduledEvents[activeSubTab]?.map((event, index) => (
                  <motion.div
                    key={event._id || index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    variants={cardVariants}
                    className="bg-gray-900 rounded-xl overflow-hidden border-l-4 border-purple-600 shadow-lg"
                    onClick={() =>
                      activeSubTab === "Enrolled"
                        ? navigate(
                            `/greed-of-event/${event.category}/${event.subcategory}/${event.categoryId}`
                          )
                        : navigate(
                            `/event/${event.category}/${event.subcategory}/${event._id}`
                          )
                    }
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-white line-clamp-1">
                          {event.title}
                        </h3>
                        <span className="text-xs px-2 py-1 bg-yellow-500 text-black rounded-full font-medium">
                          {event.eventType || "Event"}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-400 mb-3">
                        <span className="mr-2">{event.category}</span>
                        <ChevronRight size={12} />
                        <span className="ml-2">{event.subcategory}</span>
                      </div>
                      
                      <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                        {event.description}
                      </p>
                      
                      <div className="space-y-2 text-sm border-t border-gray-800 pt-3">
                        {activeSubTab === "Enrolled" ? (
                          <>
                            <div className="flex items-center text-gray-400">
                              <Calendar size={14} className="mr-2" />
                              <span>
                                {new Date(event.EventDate).toLocaleString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{event.Location || "TBD"}</span>
                            </div>
                            {/* {event.isPlayed && (
                              <div className={`flex items-center ${event.won ? "text-green-400" : "text-red-400"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                                <span>{event.won ? "Won" : "Lost"}</span>
                              </div>
                            )} */}
                          </>
                        ) : (
                          <>
                            <div className="flex items-center text-gray-400">
                              <Calendar size={14} className="mr-2" />
                              <span>
                                {new Date(event.startTime).toLocaleString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>
                                Until {new Date(event.endTime).toLocaleString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="h-1 w-full bg-gradient-to-r from-purple-600 to-yellow-500"></div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* BADGES SECTION */}
        {activeTab === "Badges" && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-full pt-20"
          >
            <Award size={80} className="text-yellow-500 mb-6" />
            <h2 className="text-2xl font-bold text-gray-300">Badges Coming Soon</h2>
            <p className="text-gray-500 mt-2 max-w-md text-center">
              Complete events and unlock achievements to earn badges that showcase your skills and accomplishments.
            </p>
          </motion.div>
        )}

        {/* SUPPORT SECTION */}
        {activeTab === "Support" && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-full pt-20"
          >
            <HelpCircle size={80} className="text-yellow-500 mb-6" />
            <h2 className="text-2xl font-bold text-gray-300">Support Center</h2>
            <p className="text-gray-500 mt-2 max-w-md text-center">
              Need help? Our support team is here to assist you with any issues or questions you may have.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg font-medium"
            >
              Contact Support
            </motion.button>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
