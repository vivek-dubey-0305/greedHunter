import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { apiUser } from "../services/api";
import toast, { Toaster } from "react-hot-toast";
import { useEventContext } from "../context/EventContex";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Award,
  Trophy,
  Info,
  Check,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { randomCode, randomUniqueCode } from "../utils/securedRoutes";
import Footer from "../components/Footer";

const EventDetail = () => {
  const { category, subcategory, eventId } = useParams();
  const { user, setUser } = useUserContext();
  const { getEvent } = useEventContext();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const { left, top, width, height } =
          containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Fetch event details
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const eventDetails = await getEvent(category, subcategory, eventId);
        setEvent(eventDetails);
      } catch (error) {
        console.error("Error fetching event:", error);
        toast.error("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [category, subcategory, eventId, getEvent]);

  // Check if user is enrolled
  const isAlreadyEnrolled = user?.enrolledEvents?.some(
    (enrolledEvent) => enrolledEvent.eventId === eventId
  );

  // Handle enrollment
  const handleEnroll = async () => {
    if (!user) {
      navigate(`/greed userform/hunter creation/${randomUniqueCode}`);
      return;
    }

    if (!user.isVerified) {
      toast.error("Verify your email to continue");
      navigate(`/hunter code verification/${randomCode}/${randomUniqueCode}`);
      return;
    }

    try {
      toast.loading("Enrolling...", { id: "enrolling" });
      const enrollResponse = await apiUser.post(`/enrollUser`, {
        category,
        subcategory,
        eventId,
        startTime: new Date(event.startTime),
        Location: event.Location || "Virtual",
      });

      if (enrollResponse.data.enrolledEvent) {
        setUser((prevUser) => ({
          ...prevUser,
          ...enrollResponse.data.user,
        }));
      }

      toast.success("Enrolled successfully!", { id: "enrolling" });
    } catch (error) {
      console.error("Enrollment failed:", error);
      toast.error("Failed to enroll in event", { id: "enrolling" });
    }
  };

  // Format time remaining
  const formatTimeRemaining = () => {
    if (!event) return "";
    const now = new Date();
    const eventDate = new Date(event.startTime);
    const diff = eventDate - now;
    if (diff < 0) return "Event has started";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${days}d ${hours}h ${minutes}m`;
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    tap: { scale: 0.95 },
  };

  // Handle back navigation

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-t-4 border-yellow-400 border-solid rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-purple-500 border-solid rounded-full animate-ping opacity-20"></div>
        </div>
      </div>
    );
  }

  // Error screen
  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center p-6">
        <AlertTriangle className="text-yellow-400 w-16 h-16 mb-4" />
        <h1 className="text-2xl font-bold text-white">Event Not Found</h1>
        <p className="text-gray-400 mt-2">
          We couldn't find the event you're looking for.
        </p>
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2 text-gray-400 hover:text-white mt-6 transition-colors cursor-pointer"
          onClick={() => {navigate(-1)}}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events</span>
        </motion.button>
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1e1e2f",
            color: "#fff",
            border: "1px solid #7e22ce",
          },
          success: {
            iconTheme: { primary: "#eab308", secondary: "#000" },
          },
        }}
      />
      <div
        ref={containerRef}
        className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6 overflow-hidden"
      >
        {/* Animated Background Elements */}
        {/* <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(128,90,213,0.1)_1px,transparent_1px)] bg-[length:30px_30px]"></div>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 bg-purple-500 rounded-full opacity-5 blur-xl"
              animate={{
                x: [
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`,
                ],
                y: [
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`,
                ],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
          <div
            className="absolute w-64 h-64 rounded-full bg-purple-600/10 blur-3xl"
            style={{
              top: `${20 + mousePosition.y * 10}%`,
              left: `${15 + mousePosition.x * 10}%`,
              transition: "top 0.3s ease-out, left 0.3s ease-out",
            }}
          />
          <div
            className="absolute w-72 h-72 rounded-full bg-yellow-400/5 blur-3xl"
            style={{
              bottom: `${30 - mousePosition.y * 10}%`,
              right: `${20 - mousePosition.x * 10}%`,
              transition: "bottom 0.3s ease-out, right 0.3s ease-out",
            }}
          />
        </div> */}

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors cursor-pointer pointer-events-auto z-10"
          onClick={() => {
            navigate(-1); // Use a direct route for testing
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events</span>
        </motion.button>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Event Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 flex justify-start"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-800/70 backdrop-blur-sm border border-purple-500/20">
              <Clock className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-sm font-medium">
                {formatTimeRemaining()} until start
              </span>
            </div>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/70 backdrop-blur-sm rounded-xl border border-purple-500/30 overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-yellow-400" />
            <div className="p-8">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400">
                {event.title}
              </h1>
              <div className="flex flex-wrap items-center mt-4 gap-3 text-sm">
                <span className="bg-purple-900/50 px-3 py-1 rounded-full border border-purple-500/30">
                  {category}
                </span>
                <span className="text-gray-400">→</span>
                <span className="bg-yellow-900/50 px-3 py-1 rounded-full border border-yellow-500/30">
                  {subcategory}
                </span>
                <span className="ml-auto bg-gray-800 px-3 py-1 rounded-full text-yellow-400 border border-yellow-500/30">
                  {event.eventType}
                </span>
              </div>
              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <p className="text-gray-300">{event.description}</p>
              </div>

              {/* Event Details */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div className="flex items-start p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:bg-purple-600/30 hover:border-yellow-500/30 transition-all duration-200">
                  <Calendar className="w-5 h-5 text-purple-400 mr-3 mt-1" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">
                      Start Time
                    </h3>
                    <p className="text-white">
                      {new Date(event.startTime).toLocaleString()}
                    </p>
                  </div>
                </motion.div>
                <motion.div className="flex items-start p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:bg-purple-600/30 hover:border-yellow-500/30 transition-all duration-200">
                  <Clock className="w-5 h-5 text-yellow-400 mr-3 mt-1" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">
                      End Time
                    </h3>
                    <p className="text-white">
                      {new Date(event.endTime).toLocaleString()}
                    </p>
                  </div>
                </motion.div>
                {event.eventType === "physical" && (
                  <motion.div className="flex items-start p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 md:col-span-2 hover:bg-purple-600/30 hover:border-yellow-500/30 transition-all duration-200">
                    <MapPin className="w-5 h-5 text-purple-400 mr-3 mt-1" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">
                        Location
                      </h3>
                      <p className="text-white">
                        {event.location || event.Location || "Virtual"}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Rules Section */}
              {event.rules && event.rules.length > 0 && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="flex items-center">
                    <Info className="text-purple-400 mr-2" />
                    <h3 className="text-xl font-bold text-purple-300">
                      Rules:
                    </h3>
                  </div>
                  <div className="mt-3 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <ul className="space-y-2">
                      {event.rules.map((rule, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <div className="w-6 h-6 rounded-full bg-purple-900/50 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                            <span className="text-xs text-purple-300">
                              {index + 1}
                            </span>
                          </div>
                          <span className="text-gray-200">{rule}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {/* Reward Section */}
              {event.rewardDetails && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <div className="flex items-center">
                    <Trophy className="text-yellow-400 mr-2" />
                    <h3 className="text-xl font-bold text-yellow-300">
                      Rewards:
                    </h3>
                  </div>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 flex items-start hover:bg-purple-600/30 hover:border-yellow-500/30 transition-all duration-200">
                      <Award className="w-5 h-5 text-yellow-400 mr-3 mt-1" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">
                          Cash Prize
                        </h3>
                        <p className="text-yellow-300 font-medium">
                          {event.rewardDetails.cashPrize || "None"}
                        </p>
                      </div>
                    </motion.div>
                    {event.rewardDetails.certificates && (
                      <motion.div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 flex items-start hover:bg-purple-600/30 hover:border-yellow-500/30 transition-all duration-200">
                        <div className="w-5 h-5 text-purple-400 mr-3 mt-1 flex items-center justify-center">
                          📜
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-400">
                            Certificates
                          </h3>
                          <p className="text-white">Provided</p>
                        </div>
                      </motion.div>
                    )}
                    {event.rewardDetails.otherPrizes && (
                      <motion.div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 flex items-start hover:bg-purple-600/30 hover:border-yellow-500/30 transition-all duration-200">
                        <div className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex items-center justify-center">
                          🏆
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-400">
                            Other Prizes
                          </h3>
                          <p className="text-white">
                            {event.rewardDetails.otherPrizes}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Enroll Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 flex justify-center"
          >
            <motion.button
              variants={buttonVariants}
              whileTap={isAlreadyEnrolled ? {} : "tap"}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 ${
                isAlreadyEnrolled
                  ? "bg-gray-700 text-gray-300 cursor-not-allowed border border-gray-600"
                  : "bg-gradient-to-r from-purple-600 to-yellow-500 text-white shadow-lg hover:from-purple-700 hover:to-yellow-600 hover:shadow-xl"
              }`}
              onClick={isAlreadyEnrolled ? null : handleEnroll}
              disabled={isAlreadyEnrolled}
            >
              {isAlreadyEnrolled ? (
                <>
                  <Check className="w-5 h-5" /> Already Enrolled
                </>
              ) : (
                "Enroll Now"
              )}
            </motion.button>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-6 text-center text-gray-400 text-sm"
          >
            Event starts in {formatTimeRemaining()}
          </motion.div>
        </div>
      </div>
      <Footer />

    </>
  );
};

export default EventDetail;
