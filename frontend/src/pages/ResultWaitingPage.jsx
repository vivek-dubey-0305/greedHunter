
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useQuizContext } from "../context/QuizContext";
import { 
  Clock, 
  Trophy, 
  Star, 
  ArrowRight, 
  BarChart2, 
  Zap, 
  ArrowLeft
} from "lucide-react";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { randomCode, randomUniqueCode } from "../utils/securedRoutes";

const ResultWaitingPage = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { getquizQuestions } = useQuizContext();
  
  const [timeLeft, setTimeLeft] = useState(null);
  const [totalTime, setTotalTime] = useState(null);
  const [funFacts, setFunFacts] = useState([
    "Did you know? Einstein took 6 years to complete his PhD!",
    "Top 1% of learners study consistently, not just before exams.",
    "Learning is a journey, not a destination.",
    "Every expert was once a beginner.",
    "Your brain grows stronger with each challenge you overcome!"
  ]);
  const [currentFact, setCurrentFact] = useState("");
  const [animateBackground, setAnimateBackground] = useState(false);

  const { category, subcategory , eventCategory, eventId} = useParams();


  useEffect(() => {
   
  

        window.history.pushState(null, undefined, window.location.href);

  
      window.onpopstate = () => {
        window.history.pushState(null, undefined, window.location.href);
      };
    
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getquizQuestions(category, subcategory);
        setTimeLeft(response.timeLeft);
        setTotalTime(response.totalTime);
        console.log(category, subcategory);
      } catch (error) {
        console.error("E-FQQ-49", error);
      }
    };

    fetchQuestions();
  }, []);

  // Timer and Fun Fact Rotation Effects
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      // Rotate fun facts every 5 seconds
      const factTimer = setInterval(() => {
        const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
        setCurrentFact(randomFact);
      }, 5000);

      // Background animation toggle
      const backgroundTimer = setInterval(() => {
        setAnimateBackground(prev => !prev);
      }, 3000);

      return () => {
        clearInterval(timer);
        clearInterval(factTimer);
        clearInterval(backgroundTimer);
      };
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleNavigate = () => {
    navigate(
      `/leaderboard/${category}/${eventCategory}/${subcategory}/${eventId}`
    );
  };

  return (
    <>
    <div 
      className={`
        flex items-center justify-center min-h-screen 
        bg-gradient-to-br from-black via-purple-950 to-black 
        text-white p-4 
        transition-all duration-1000 
        ${animateBackground ? 'bg-opacity-50 scale-[1.02]' : ''}
      `}
    >
      <div 
        className="
          max-w-md w-full p-8 
          bg-gradient-to-tr from-purple-900/60 to-black/80 
          shadow-2xl rounded-2xl 
          border-2 border-purple-700/50 
          backdrop-blur-sm
          transform transition-all hover:scale-[1.02]
        "
        >
           <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-gradient-to-l from-black via-fuchsia-500 to-purple-500 opacity-50 rounded-2xl flex items-center space-x-2 text-white hover:text-fuchsia-200 font-bold mb-6 transition-colors cursor-pointer pointer-events-auto z-10"
                            onClick={() => {
                              setTimeout(() => {
                                navigate(`/hunter/hunter dashboard/${randomUniqueCode + randomCode}`) // Navigate back
                                window.location.reload(); // Reload the page
                              }, 100);
                            }}
                            
                          >
                            <ArrowLeft className="w-7 h-7" />
                            {/* <span>Back to Events</span> */}
                          </motion.button>
        <div className="flex items-center justify-center mb-6">
          <Trophy className="text-yellow-500 mr-4" size={48} />
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-600">
            Quiz Completed! 
          </h2>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center">
            <Star className="text-yellow-500 mr-2" size={24} />
            <p className="text-lg">
              <span className="font-bold text-yellow-500">Name:</span>{" "}
              {user?.fullName}
            </p>
          </div>

          {user?.studyLevel === "College" && (
            <div className="flex items-center">
              <BarChart2 className="text-purple-500 mr-2" size={24} />
              <p className="text-lg">
                <span className="font-bold text-yellow-500">
                  Enrollment Number:
                </span>{" "}
                {user?.enrollmentNumber}
              </p>
            </div>
          )}

          {user?.studyLevel === "School" && (
            <div className="flex items-center">
              <BarChart2 className="text-purple-500 mr-2" size={24} />
              <p className="text-lg">
                <span className="font-bold text-yellow-500">Roll Number:</span>{" "}
                {user?.rollNumber}
              </p>
            </div>
          )}
        </div>

        {timeLeft === 0 ? (
          <button
            onClick={handleNavigate}
            className="
              mt-6 w-full 
              flex items-center justify-center
              bg-gradient-to-r from-purple-600 to-yellow-500 
              text-white font-bold py-3 rounded-full 
              transition-all duration-300 
              hover:scale-105 hover:shadow-xl
            "
          >
            Go to Leaderboard
            <ArrowRight className="ml-2" />
          </button>
        ) : (
          <div className="text-center">
            <div 
              className="
                mb-4 w-full 
                bg-purple-900/50 
                text-white font-bold py-3 rounded-full 
                flex items-center justify-center
              "
            >
              <Clock className="mr-2 text-yellow-500" />
              Wait {formatTime(timeLeft)}s
            </div>
            
            <div 
              className="
                p-4 
                bg-black/40 
                rounded-xl 
                border border-purple-700/30 
                text-yellow-300 
                animate-pulse
                flex items-center justify-center
              "
            >
              <Zap className="mr-2" />
              Result will be declared soon
            </div>

            {currentFact && (
              <div 
                className="
                  mt-4 
                  text-sm italic 
                  text-purple-300 
                  animate-fadeIn
                "
              >
                "{currentFact}"
              </div>
            )}
          </div>
        )}
      </div>
      </div>
      <Footer />
      </>
  );
};

export default ResultWaitingPage;