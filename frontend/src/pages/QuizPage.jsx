import { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [animate, setAnimate] = useState(false);
  // const [isRegistered, setIsRegistered] = useState(true);
  const [idError, setIdError] = useState("Hello");

  const { getquizQuestions } = useQuizContext();

  const navigate = useNavigate();

  // const { user, isRegistered, setIsRegistered } = useUserContext();

  const { user, updateMarks, isAuthenticated, setIsRegistered } =
    useUserContext();
  // Fetch quiz questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getquizQuestions();
        // const response = await axios.get("/getquizQuestions");
        // console.log("response..\n-----------\n", response.data.questions);
        setQuestions(response.data.quizData);
        // console.log("USER...\n-----\n", user);
      } catch (error) {
        console.error("E-FQQ-49", error);
      }
    };

    fetchQuestions();
  }, []);

  // Timer effect
  useEffect(() => {
    if (rulesAccepted && timeLeft > 0 && !quizCompleted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmitQuiz();
    }
  }, [rulesAccepted, timeLeft, quizCompleted]);

  // !---Animations
  useEffect(() => {
    setAnimate(true);
  }, []);

  // !-----Navigation
  useEffect(() => {
    if (quizCompleted) {
      const handleBackButton = () => {
        window.location.href = navigate("/undefined"); // Change to your desired redirect page
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
    let calculatedScore = 0;

    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctOption) {
        calculatedScore += 2; // 2 marks per correct answer
      }
    });

    setScore(calculatedScore);
    const responseResult = await updateMarks({
      marks: calculatedScore,
      phone: user.phone,
    });
    // console.log("RepsonseREsultMarks..\n", responseResult);
  };

  const handleNavigate = () => {
    setIsRegistered(false);
    navigate("/leaderboard");
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

              <div className="w-full max-w-5xl h-full p-8 shadow-xl rounded-lg border-l-4 border-l-purple-700 text-white mt-24">
                <div className="max-h-auto">
                  {/* Timer */}
                  <div className="flex justify-end items-center text-gray-400 font-semibold mb-4">
                    {/* <span className="text-lg">Time Left:</span> */}
                    <span className="text-red-500 text-xl font-bold">
                      {formatTime(timeLeft)}
                    </span>
                  </div>

                  {/* Question */}
                  <h2 className="text-2xl font-bold mb-4 text-purple-500">
                    {currentQuestionIndex + 1}.{" "}
                    {questions[currentQuestionIndex].question}
                  </h2>

                  {/* Options */}
                  <div className="space-y-3">
                    {questions[currentQuestionIndex].options.map(
                      (option, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg text-lg cursor-pointer transition-all duration-300 border-r-4 border-r-purple-600  
            ${
              selectedAnswers[currentQuestionIndex] === index
                ? "bg-purple-600 text-white"
                : "bg-gray-800 hover:bg-purple-500 hover:text-white"
            }`}
                          onClick={() =>
                            handleAnswerSelect(currentQuestionIndex, index)
                          }
                        >
                          {option}
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  <button
                    className="px-5 py-2 bg-yellow-500 text-white rounded-md transition-all duration-300 hover:bg-yellow-600 disabled:opacity-50"
                    onClick={prevQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </button>
                  <button
                    className="px-5 py-2 bg-purple-600 text-white rounded-md transition-all duration-300 hover:bg-purple-700"
                    onClick={nextQuestion}
                    disabled={currentQuestionIndex === questions.length - 1}
                  >
                    Next
                  </button>
                </div>

                {/* Submit Button */}
                {currentQuestionIndex === questions.length - 1 && (
                  <button
                    className="w-full mt-6 bg-green-500 text-white font-bold py-3 rounded-md transition-all duration-300 hover:bg-green-600"
                    onClick={handleSubmitQuiz}
                  >
                    Submit Quiz
                  </button>
                )}
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

                <button
                  onClick={handleNavigate}
                  className="mt-6 w-full bg-purple-600 text-white font-bold py-3 rounded-md transition-all duration-300 hover:bg-purple-700 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  <Trophy size={20} /> Leaderboard
                </button>
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
