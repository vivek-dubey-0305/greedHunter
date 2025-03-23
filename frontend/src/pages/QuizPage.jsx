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
} from "lucide-react";
import Footer from "../components/Footer";
import WarningPopup from "../components/WarningPopup";

const QuizPage = () => {
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null); // 45 minutes in seconds
  const [totalTime, setTotalTime] = useState(null); // 45 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [animate, setAnimate] = useState(false);

  const [markedForReview, setMarkedForReview] = useState([]);
  // const [isRegistered, setIsRegistered] = useState(true);
  const [idError, setIdError] = useState(false);

  const { getquizQuestions } = useQuizContext();

  const navigate = useNavigate();

  const { category, eventCategory, subcategory, eventId } = useParams();

  // const { user, isRegistered, setIsRegistered } = useUserContext();

  const { user, updateMarks, isAuthenticated, setIsRegistered } =
    useUserContext();
  // Fetch quiz questions from backend
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

    const hasPlayed = user.enrolledEvents.some(
      (event) =>
        event.category === category &&
        event.subcategory === subcategory &&
        String(event.eventId) === String(eventId) && // Convert both to string
        event.isPlayed === true
    );

    if (hasPlayed) navigate("/");

    console.log("User has played:", hasPlayed);
  }, [user, category, subcategory, eventId]);

  // !-----Navigation
  useEffect(() => {
    if (quizCompleted || !quizCompleted) {
      const handleBackButton = () => {
        window.location.href = navigate("/undefined"); // Change to your desired redirect page
        handleSubmitQuiz();
      };

      window.onpopstate = handleBackButton;

      // Push a new history state to prevent immediate back navigation
      history.pushState(null, null, location.href);

      return () => {
        window.onpopstate = null; // Cleanup when component unmounts
      };
    }
  }, [quizCompleted]); // Runs only when quizCompleted changes

  // Convert seconds to MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
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
      setMarkedForReview(markedForReview.filter(index => index !== questionIndex));
    } else {
      setMarkedForReview([...markedForReview, questionIndex]);
    }
  };

  const handleNavigate = () => {
    setIsRegistered(false);
    navigate(
      `/leaderboard/${category}/${eventCategory}/${subcategory}/${eventId}`
    );
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-r from-gray-800 to-gray-950">
          {/* Quiz Rules Section */}
          {!rulesAccepted && (
            <div className="w-full min-h-screen   bg-gray-900 flex items-center justify-center p-4">
              <div className="max-w-lg w-full p-8 bg-gradient-to-r from-gray-900 to-gray-950 shadow-2xl rounded-xl text-center border border-l-4 border-l-purple-700 transform hover:scale-[1.02] transition-transform duration-300 animate-fadeIn">
                <div className="flex items-center justify-center mb-6">
                  <Award className="w-10 h-10 text-purple-500 animate-pulse" />
                  <h2 className="text-3xl font-bold ml-3 text-purple-500 animate-slideDown">
                    Quiz Rules & Guidelines
                  </h2>
                </div>

                <ul className="text-left space-y-4 text-gray-300 mb-6">
                  <li className="flex items-center space-x-3 animate-slideUp">
                    <Clock className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    <span>You have 45 minutes to complete the quiz.</span>
                  </li>
                  <li className="flex items-center space-x-3 animate-slideUp delay-100">
                    <Award className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    <span>Each question carries 2 marks.</span>
                  </li>
                  <li className="flex items-center space-x-3 animate-slideUp delay-200">
                    <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    <span>There is no negative marking.</span>
                  </li>
                  <li className="flex items-center space-x-3 animate-slideUp delay-300">
                    <Lock className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    <span>Once submitted, you cannot change your answers.</span>
                  </li>
                  <li className="flex items-center space-x-3 animate-slideUp delay-400">
                    <Clock className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    <span>The quiz will auto-submit when time runs out.</span>
                  </li>
                  <li className="flex items-start space-x-3 animate-bounce">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 animate-pulse" />
                    <span className="text-red-400 font-semibold">
                      If you refresh the page{" "}
                      <RefreshCw className="w-4 h-4 inline mx-1 animate-spin" />
                      , your data and progress will be lost, and you will be
                      banned from playing the quiz.
                    </span>
                  </li>
                </ul>

                <button
                  onClick={() => setRulesAccepted(true)}
                  className="mt-6 w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg 
                           transition-all duration-300 hover:bg-purple-700 hover:shadow-xl
                           active:scale-95 group animate-slideUp delay-500
                           border border-purple-500 hover:border-purple-400"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>I Accept & Start Quiz</span>
                    <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Quiz Section */}
{rulesAccepted && !quizCompleted && questions.length > 0 && (
  <>
    <WarningPopup />
    
    <div className="w-full max-w-7xl mx-auto p-8 bg-gray-900 rounded-xl shadow-2xl border-l-8 border-purple-600 mt-12 space-y-8">
      {/* Header Section with Timer and Mark Review */}
      <div className="flex justify-between items-center bg-gray-800 px-6 py-4 rounded-lg">
        <div className="flex items-center space-x-4">
          <span className="text-purple-400 font-bold text-lg">Time Left:</span>
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
          <h3 className="text-purple-400 text-xl font-bold mb-6">Question Navigator</h3>
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
                  ${currentQuestionIndex === index && "ring-2 ring-white scale-110"}`}
              >
                {index + 1}
                {markedForReview.includes(index) && (
                  <span className="absolute -top-1 -right-1 text-yellow-300">★</span>
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
            <span className="text-purple-500">{currentQuestionIndex + 1}.</span>
            {" "}{questions[currentQuestionIndex].question}
          </h2>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-4 mb-12">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestionIndex, index)}
                className={`p-4 text-left rounded-xl border-2 transition-all
                  ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? "border-purple-500 bg-purple-500/20"
                      : "border-gray-700 hover:border-purple-400 bg-gray-900/50"
                  }
                  ${selectedAnswers[currentQuestionIndex] === index && "ring-2 ring-purple-300"}`}
              >
                <span className="text-lg font-medium text-gray-300">{option}</span>
              </button>
            ))}
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
                disabled={currentQuestionIndex === questions.length - 1}
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
          {quizCompleted && (
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
                    {user.name}
                  </p>
                  <p className="text-white">
                    <span className="font-bold text-yellow-500">
                      Enrollment Number:
                    </span>{" "}
                    {user.enrollmentNumber}
                  </p>
                  <p className="text-white">
                    <span className="font-bold text-yellow-500">
                      Roll Number:
                    </span>{" "}
                    {user.rollNumber}
                  </p>
                  <p className="text-green-500 text-2xl font-bold mt-4">
                    Your Score: {score} / {questions.length * 2}
                  </p>
                </div>

                {timeLeft === 0 ? (
                  <button
                    onClick={handleNavigate}
                    className="mt-6 w-full bg-purple-600 text-white font-bold py-3 rounded-md transition-all duration-300 hover:bg-purple-700 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Trophy size={20} /> Leaderboard
                  </button>
                ) : (
                  <button
                    className="cursor-not-allowed mt-6 w-full bg-gray-500 text-white font-bold py-3 rounded-md flex items-center justify-center gap-2"
                    disabled
                  >
                    <Trophy size={20} /> {`Wait ${formatTime(timeLeft)}s`}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-800 to-gray-950 text-white relative overflow-hidden">
            {/* Floating animated background elements */}
            <div className="absolute w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
            <div className="absolute w-72 h-72 bg-pink-500 opacity-20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

            <div
              className={`relative z-10 p-10 text-center bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-2xl shadow-2xl transform transition-all duration-700 ${
                animate ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
            >
              <AlertCircle
                size={48}
                className="text-red-400 mx-auto mb-4 animate-bounce"
              />
              {idError ? (
                <>
                  <h1 className="text-2xl font-semibold mb-4">{idError}</h1>
                  <p className="text-gray-300">Please visit LeaderBoard</p>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-semibold mb-4">
                    You are not registered!
                  </h1>
                  <p className="text-gray-300">
                    Please register to play the quiz.
                  </p>
                </>
              )}
              {/* <p className="text-gray-300">Please register to play the quiz.</p> */}
              <button
                className="cursor-pointer mt-6 px-6 py-3 flex items-center justify-center gap-2 bg-purple-600 text-white font-medium text-lg rounded-full transition-all duration-300 hover:bg-purple-700 hover:shadow-lg active:scale-95"
                onClick={handleNavigate}
              >
                Go to Leaderboard <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default QuizPage;
