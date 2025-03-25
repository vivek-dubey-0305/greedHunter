import { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useQuizContext } from "../context/QuizContext";
import { useUserContext } from "../context/UserContext";

import {
  AlertCircle,
  ArrowRight,
  Clock,
  Award,
  Trophy,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Lock,
  SquarePower,
  ScanFace,
  ListRestart,
} from "lucide-react";

import WarningPopup from "../components/WarningPopup";

import { randomUniqueCode } from "../utils/securedRoutes";
// import CameraDetection from "../components/Camera";
import CheckPermissions from "../components/CheckPermission";
import CameraDetectionPopup from "../components/Camera";
import SessionExpired from "../components/SessionOutComponent/SessionExpired";
import RulesAndGuidelines from "../components/RulesAndGuidelines/RulesAndGuidelines";

const QuizPage = () => {
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [rulesAndGuildelinesPopup, setRulesAndGuildelinesPopup] =
    useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null); // 45 minutes in seconds
  const [totalTime, setTotalTime] = useState(null); // 45 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [played, setPlayed] = useState(false);
  const [alert, setAlert] = useState(false);

  // Camera access state
  const [hasAccess, setHasAccess] = useState(false);

  const [markedForReview, setMarkedForReview] = useState([]);
  // const [isRegistered, setIsRegistered] = useState(true);
  const [idError, setIdError] = useState(false);

  const { getquizQuestions } = useQuizContext();

  const navigate = useNavigate();

  const { category, eventCategory, subcategory, eventId } = useParams();

  // const { user, isRegistered, setIsRegistered } = useUserContext();

  const { user, updateMarks, isAuthenticated } = useUserContext();
  // Fetch quiz questions from backend

  // const randomCode = [
  //   ...Array(Math.floor(Math.random() * (200 - 100 + 1)) + 100),
  // ]
  //   .map(() =>
  //     Math.random()
  //       .toString(36)
  //       .charAt(Math.floor(Math.random() * 10) + 2)
  //       .toLowerCase()
  //   )
  //   .join("");
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getquizQuestions(category, subcategory);
        // const response = await axios.get("/getquizQuestions");
        // console.log("response..\n-----------\n", response.questions);
        // console.log("response..\n-----------\n", response.timeLeft);
        // console.log("response..\n-----------\n", response.totalTime);
        setQuestions(response.questions);
        setTimeLeft(response.timeLeft);
        setTotalTime(response.totalTime);
        // console.log("USER...\n-----\n", user);
        console.log(category, subcategory);
      } catch (error) {
        console.error("E-FQQ-49", error);
      }
    };

    fetchQuestions();
  }, []);

  // Timer effect
  useEffect(() => {
    // if (quizCompleted) return;

    if (rulesAccepted && timeLeft > 0 && !quizCompleted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmitQuiz();
    } else if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [rulesAccepted, timeLeft, quizCompleted, questions]);

  // !---Animations
  useEffect(() => {
    setAnimate(true);
  }, []);

  useEffect(() => {
    // user.enrolledEvents.forEach((event) => {
    // console.log("Checking Event:", event);
    // console.log("event.eventCategory:", event.category, "vs", category);
    // console.log("event.subcategory:", event.subcategory, "vs", subcategory);
    // console.log("event.eventId:", event.eventId, "vs", eventId);
    // console.log("event.isPlayed:", event.isPlayed);
    // });

    const hasPlayed = user?.enrolledEvents.some(
      (event) =>
        event.category === category &&
        event.subcategory === subcategory &&
        String(event.eventId) === String(eventId) && // Convert both to string
        event.isPlayed === true
    );

    if (hasPlayed) setPlayed(true);

    console.log("User has played:", hasPlayed);
  }, [user, category, subcategory, eventId]);

  // !-----Navigation
  useEffect(() => {
    if (quizCompleted || !quizCompleted) {
      const handleBackButton = () => {
        handleSubmitQuiz();
        navigate(-1); // Change to your desired redirect page
      };

      window.onpopstate = handleBackButton;

      // Push a new history state to prevent immediate back navigation
      history.pushState(null, "/", location.href);

      return () => {
        window.onpopstate = null; // Cleanup when component unmounts
      };
    }
  }, [quizCompleted]); // Runs only when quizCompleted changes


  useEffect(() => {
    if (quizCompleted || played) {
      // Navigate to result waiting page
      navigate(`/quiz-result-waiting/${category}/${eventCategory}/${subcategory}/${eventId}`);
  
      // Prevent back navigation
      setTimeout(() => {
        window.history.pushState(null, "", window.location.href);
      }, 100);
  
      window.onpopstate = () => {
        window.history.pushState(null, "", window.location.href);
      };
    }
  }, [quizCompleted, played, navigate]);

  // Convert seconds to MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // const handleOpenCameraPopup = () => {
  //   setRulesAndGuildelinesPopup(true);
  //   setRulesAccepted(false)
  // };

  const handleCloseGuidelinesPopup = () => {
    setRulesAndGuildelinesPopup(false);
    setRulesAccepted(true);
  };

  // Handle answer selection
  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: optionIndex });
  };

  // Navigate to previous question
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Navigate to next question
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Submit quiz & calculate score
  const handleSubmitQuiz = async () => {
    setQuizCompleted(true);
    let isPlayed = true;
    let calculatedScore = 0;
    let winTime = totalTime - timeLeft;

    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctOption) {
        calculatedScore += 2; // 2 marks per correct answer
      }
    });

    setScore(calculatedScore);
    const responseResult = await updateMarks({
      marks: calculatedScore,
      // phone: user.phone,
      category,
      subcategory,
      eventId,
      isPlayed,
      winTime,
    });

    // if (timeLeft === 0)
    console.log("RepsonseREsultMarks..\n", responseResult);
  };

  const handleMarkForReview = (questionIndex) => {
    if (markedForReview.includes(questionIndex)) {
      setMarkedForReview(
        markedForReview.filter((index) => index !== questionIndex)
      );
    } else {
      setMarkedForReview([...markedForReview, questionIndex]);
    }
  };

  // const handleNavigate = () => {
  //   // setIsRegistered(false);
  //   navigate(
  //     `/leaderboard/${category}/${eventCategory}/${subcategory}/${eventId}`
  //   );
  // };

  return (
    <>
      {isAuthenticated ? (
        <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-r from-gray-800 to-gray-950">
          {/* Quiz Rules Section */}
          {!rulesAccepted &&
            !played &&
            (rulesAndGuildelinesPopup ? (
              <RulesAndGuidelines onclose={handleCloseGuidelinesPopup} />
            ) : (
              ""
            ))}

          {/* Quiz Section */}
          {rulesAccepted &&
            !quizCompleted &&
            questions.length > 0 &&
            !played && (
              <>
                {!hasAccess ? (
                  <CheckPermissions
                    onPermissionGranted={() => setHasAccess(true)}
                  />
                ) : (
                  <CameraDetectionPopup
                    onClose={() => {
                      setHasAccess(false);
                      setAlert(true);
                    }}
                    isTest={false}
                    reloadSubmit={handleSubmitQuiz}
                  />
                )}
                {/* <CameraDetection onAlert={() => setAlert(true)} /> */}
                <WarningPopup warningSubmit={handleSubmitQuiz}/>

                {alert && (
                  <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-4 text-center">
                    🚨 **Unusual activity detected! Stop Cheating!**
                  </div>
                )}

                <div className="w-full max-w-7xl mx-auto p-8 bg-gray-900 rounded-xl shadow-2xl border-l-8 border-purple-600 mt-12 space-y-8">
                  {/* Header Section with Timer and Mark Review */}
                  <div className="flex justify-between items-center bg-gray-800 px-6 py-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <span className="text-purple-400 font-bold text-lg">
                        Time Left:
                      </span>
                      <div className="bg-red-500/20 px-4 py-2 rounded-full">
                        <span className="text-red-400 font-mono text-xl">
                          {formatTime(timeLeft)}
                        </span>
                      </div>
                    </div>
                    <button
                      className={`px-6 py-2 rounded-full font-semibold transition-all ${
                        markedForReview.includes(currentQuestionIndex)
                          ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                          : "bg-purple-600/20 text-purple-400 hover:bg-purple-600/30"
                      }`}
                      onClick={() => handleMarkForReview(currentQuestionIndex)}
                    >
                      {markedForReview.includes(currentQuestionIndex)
                        ? "★ Unmark Question"
                        : "☆ Mark for Review"}
                    </button>
                  </div>

                  {/* Main Content Area */}
                  <div className="flex gap-8">
                    {/* Question Navigator Panel */}
                    <div className="w-1/3 bg-gray-800 p-6 rounded-xl shadow-lg">
                      <h3 className="text-purple-400 text-xl font-bold mb-6">
                        Question Navigator
                      </h3>
                      <div className="grid grid-cols-5 gap-3 mb-8">
                        {questions.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentQuestionIndex(index)}
                            className={`relative w-10 h-10 flex items-center justify-center rounded-lg font-semibold transition-all
                  ${
                    selectedAnswers[index] !== undefined
                      ? "bg-green-500 hover:bg-green-600"
                      : markedForReview.includes(index)
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-red-500 hover:bg-red-600"
                  }
                  ${
                    currentQuestionIndex === index &&
                    "ring-2 ring-white scale-110"
                  }`}
                          >
                            {index + 1}
                            {markedForReview.includes(index) && (
                              <span className="absolute -top-1 -right-1 text-yellow-300">
                                ★
                              </span>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Legend */}
                      <div className="space-y-3 border-t border-gray-700 pt-6">
                        <div className="flex items-center text-sm">
                          <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                          <span className="text-gray-300">Answered</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                          <span className="text-gray-300">Unanswered</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                          <span className="text-gray-300">Marked</span>
                        </div>
                      </div>
                    </div>

                    {/* Question and Options Panel */}
                    <div className="flex-1 bg-gray-800 p-8 rounded-xl shadow-lg">
                      {/* Question */}
                      <h2 className="text-2xl font-bold text-purple-400 mb-8 leading-relaxed">
                        <span className="text-purple-500">
                          {currentQuestionIndex + 1}.
                        </span>{" "}
                        {questions[currentQuestionIndex].question}
                      </h2>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 gap-4 mb-12">
                        {questions[currentQuestionIndex].options.map(
                          (option, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                handleAnswerSelect(currentQuestionIndex, index)
                              }
                              className={`p-4 text-left rounded-xl border-2 transition-all
                  ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? "border-purple-500 bg-purple-500/20"
                      : "border-gray-700 hover:border-purple-400 bg-gray-900/50"
                  }
                  ${
                    selectedAnswers[currentQuestionIndex] === index &&
                    "ring-2 ring-purple-300"
                  }`}
                            >
                              <span className="text-lg font-medium text-gray-300">
                                {option}
                              </span>
                            </button>
                          )
                        )}
                      </div>

                      {/* Control Buttons */}
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4">
                          <button
                            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all disabled:opacity-40"
                            onClick={prevQuestion}
                            disabled={currentQuestionIndex === 0}
                          >
                            ← Previous
                          </button>
                          <button
                            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all disabled:opacity-40"
                            onClick={nextQuestion}
                            disabled={
                              currentQuestionIndex === questions.length - 1
                            }
                          >
                            Next →
                          </button>
                        </div>

                        <button
                          className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all"
                          onClick={handleSubmitQuiz}
                        >
                          Submit All Answers
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

          {/* Quiz Results Section */}
          {/* {(quizCompleted || played) && (
            <div className="flex items-center justify-center min-h-screen text-white p-4">
              <div className="max-w-auto w-full p-8 bg-gradient-to-r from-gray-900 to-gray-950 shadow-xl rounded-lg text-center border-l-4 border-l-green-500">
                <CheckCircle
                  className="text-green-500 mx-auto mb-4"
                  size={48}
                />
                <h2 className="text-3xl font-bold mb-4 text-purple-500">
                  Quiz Completed! 🎉
                </h2>

                <div className="text-lg justify-items-start font-semibold text-gray-300 space-y-2">
                  <p className="text-white">
                    <span className="font-bold text-yellow-500">Name:</span>{" "}
                    {user?.fullName}
                  </p>

                  {user?.studyLevel === "College" && (
                    <p className="text-white">
                      <span className="font-bold text-yellow-500">
                        Enrollment Number:
                      </span>{" "}
                      {user?.enrollmentNumber}{" "}
                    </p>
                  )}
                  {user?.studyLevel === "School" && (
                    <p className="text-white">
                      <span className="font-bold text-yellow-500">
                        Roll Number:
                      </span>{" "}
                      {user?.rollNumber}{" "}
                    </p>
                  )}

                 
                </div>

                {timeLeft === 0 ? (
                  <button
                    onClick={handleNavigate}
                    className="mt-6 w-full bg-purple-600 text-white font-bold py-3 rounded-md transition-all duration-300 hover:bg-purple-700 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Trophy size={20} /> Leaderboard
                  </button>
                ) : (
                  <>
                    <button
                      className="mb-2 cursor-not-allowed mt-6 w-full bg-gray-500 text-white font-bold py-3 rounded-md flex items-center justify-center gap-2"
                      disabled
                    >
                      <Trophy size={20} /> {`Wait ${formatTime(timeLeft)}s`}
                    </button>
                    <span className="text-yellow-500 animate-pulse font-bold">
                      Result will be declared soon
                    </span>
                  </>
                )}
              </div>
            </div>
          )} */}
        </div>
      ) : (
        <SessionExpired />
      )}

      <footer className="bg-black">
        <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-t-yellow-500">
         


          {/* Name & Copyright */}
          <div className="text-center space-y-4">
            <p className="text-2xl font-semibold text-yellow-300 animate-glow">
              ༄✽GreedHunter✽࿐
            </p>

            <p className="text-sm text-gray-500">
              © 2025 All rights reserved. Crafted with ❤️ and 🧠.
            </p>
          </div>
        </div>

        <style jsx>{`
          @keyframes glow {
            0%,
            100% {
              text-shadow: 0 0 10px rgba(255, 215, 0, 0.6),
                0 0 20px rgba(255, 165, 0, 0.4), 0 0 30px rgba(255, 69, 0, 0.2);
            }
            50% {
              text-shadow: 0 0 20px rgba(255, 215, 0, 0.8),
                0 0 30px rgba(255, 165, 0, 0.6), 0 0 40px rgba(255, 69, 0, 0.4);
            }
          }
          .animate-glow {
            animation: glow 2s ease-in-out infinite;
          }
        `}</style>
      </footer>
    </>
  );
};

export default QuizPage;
