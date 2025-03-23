import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sparkles, Check, X } from "lucide-react";
import confetti from "canvas-confetti";
import Footer from "../components/Footer";
// import Header from "../components/Header";
import { useUserContext } from "../context/UserContext";
import ProfilePopup from "../components/Popup";
// import ProfilePopup from "../components/ProfilePopup";

const LandingPage = () => {
  const navigate = useNavigate();

  const {category, eventCategory, subcategory, eventId} = useParams()

  const quizStartTime = new Date();
  quizStartTime.setDate(8);
  quizStartTime.setMonth(2);
  quizStartTime.setFullYear(2025);
  quizStartTime.setHours(11, 0, 0, 0);

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [numberGuess, setNumberGuess] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const { user } = useUserContext();
  const [numberGuessStatus, setNumberGuessStatus] = useState(null);
  const [gameWins, setGameWins] = useState({
    quiz: false,
    memory: false,
    number: false,
  });

  const sanskritQuestions = [
    {
      word: "अश्वः",
      question: "What does अश्वः (Ashvah) mean?",
      options: ["Horse", "River", "Mountain", "Sky"],
      correct: 0,
    },
    {
      word: "पुस्तकम्",
      question: "What does पुस्तकम् (Pustakam) mean?",
      options: ["Book", "Pen", "Table", "Chair"],
      correct: 0,
    },
    {
      word: "नदी",
      question: "What does नदी (Nadee) mean?",
      options: ["Mountain", "River", "Forest", "Ocean"],
      correct: 1,
    },
    {
      word: "सूर्यः",
      question: "What does सूर्यः (Suryah) mean?",
      options: ["Moon", "Star", "Sun", "Planet"],
      correct: 2,
    },
  ];

  // Sanskrit number conversion
  const sanskritNumerals = {
    0: "०",
    1: "१",
    2: "२",
    3: "३",
    4: "४",
    5: "५",
    6: "६",
    7: "७",
    8: "८",
    9: "९",
  };

  function generateRandomSanskritNumber() {
    const num = Math.floor(Math.random() * 100) + 1;
    return num
      .toString()
      .split("")
      .map((digit) => sanskritNumerals[digit])
      .join("");
  }
  const [targetNumber, setTargetNumber] = useState(
    generateRandomSanskritNumber()
  );

  // Memory game pairs
  const memoryPairs = [
    { id: 1, content: "ॐ" },
    { id: 2, content: "॥" },
    { id: 3, content: "श्री" },
    { id: 4, content: "नम:" },
    { id: 5, content: "अः" },
    { id: 6, content: "क्ष" },
  ];

  function getTimeRemaining() {
    const now = new Date().getTime();
    const distance = quizStartTime - now;
    if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((distance / (1000 * 60)) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeRemaining();
      setTimeLeft(remaining);
      if (
        remaining.days === 0 &&
        remaining.hours === 0 &&
        remaining.minutes === 0 &&
        remaining.seconds === 0
      ) {
        setIsTimeUp(true);
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const shuffledPairs = [...memoryPairs, ...memoryPairs]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, uniqueId: index }));
    setMemoryCards(shuffledPairs);
  }, []);

  const celebrateWin = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // Quiz handler
  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    const isCorrect =
      answerIndex === sanskritQuestions[currentQuestionIndex].correct;
    setAnswerStatus(isCorrect);

    setTimeout(() => {
      if (isCorrect) {
        if (currentQuestionIndex < sanskritQuestions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setAnswerStatus(null);
        } else {
          celebrateWin();
          setGameWins((prev) => ({ ...prev, quiz: true }));
        }
      } else {
        setSelectedAnswer(null);
        setAnswerStatus(null);
      }
    }, 1500);
  };

  // Memory game handlers
  const handleCardClick = (cardIndex) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardIndex)) return;
    if (matchedPairs.includes(memoryCards[cardIndex].id)) return;

    const newFlippedCards = [...flippedCards, cardIndex];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (memoryCards[firstIndex].id === memoryCards[secondIndex].id) {
        setMatchedPairs([...matchedPairs, memoryCards[firstIndex].id]);
        if (matchedPairs.length + 1 === memoryPairs.length) {
          celebrateWin();
          setGameWins((prev) => ({ ...prev, memory: true }));
        }
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  // Number guess handler
  const handleNumberGuess = () => {
    // console.log("Raw numberGuess state:", numberGuess);
    // console.log("Raw targeNumber state:", targetNumber);

    const devanagariToNumber = Object.fromEntries(
      Object.entries(sanskritNumerals).map(([k, v]) => [k, v])
    );
    // console.log("Devanagari to Number Map:", devanagariToNumber);

    const guessNumber = numberGuess
      .split("")
      .map((char) => {
        // console.log(`Mapping ${char} → ${devanagariToNumber[char]}`); // Debugging
        // console.log(`DEvnagari ${devanagariToNumber.char}`)
        // console.log(`DEvnagari ${{devanagariToNumber}}`)
        // console.log(`DEvnagari ${{devanagariToNumber}[char]}`)
        return devanagariToNumber[char] || "?"; // Use "?" for unmapped characters
      })
      .join("");
    // console.log("GuessNumber", guessNumber);

    const numberToDevanagari = Object.fromEntries(
      Object.entries(sanskritNumerals).map(([k, v]) => [v, k])
    );
    // console.log("Number to Devanagari Map:", numberToDevanagari);
    const targetNum = targetNumber;
    //   .split("")
    //   .map((char) => {return devanagariToNumber[char]})
    //   .join("");
    // console.log("TargetNumber", targetNum);

    const isCorrect = guessNumber === targetNum;
    setNumberGuessStatus(isCorrect);

    if (isCorrect) {
      celebrateWin();
      setGameWins((prev) => ({ ...prev, number: true }));
    } else {
      setTimeout(() => {
        setNumberGuess("");
        setNumberGuessStatus(null);
        setTargetNumber(generateRandomSanskritNumber());
      }, 1500);
    }
  };

  const handlePravesh = () => {
    // console.log("PRAVESHED");
    // console.log("---", user.isProfileCompleted)
    if (!user.isProfileCompleted) {
      setShowPopup(true);

      // {
      //   showPopup && <ProfilePopup onClose={() => setShowPopup(false)} />;
      // }
    } else {
      navigate(`/greed-quiz-hunt-00/${category}/${eventCategory}/${subcategory}/${eventId}`);
    }
  };
  return (
    <>
      {/* <Header /> */}
      <div className="w-full min-h-screen bg-gradient-to-r from-gray-800 to-gray-950 text-white">
        <div className="h-full">
          <div className="text-center p-8 relative">
            <h1 className="text-5xl font-bold mb-4 text-purple-500 animate-none">
              {/* संस्कृत प्रश्नोत्तरी */}
              भारतीय मूल परंपरा एवं नैतिक शिक्षा
            </h1>
            {/* <p className="text-2xl mb-2 text-purple-500">
            Sanskrit Knowledge Quest
          </p> */}
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-gray-800 to-gray-950 p-6 rounded-lg shadow-lg backdrop-blur-sm w-auto">
              <div className="text-2xl font-semibold text-purple-500">
                परीक्षा प्रारम्भः
              </div>
              <div className="text-xl text-center text-purple-400 animate-pulse">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
                {timeLeft.seconds}s
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sanskrit MCQ Quiz */}
            <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg backdrop-blur-sm border-t-4 border-t-purple-700 border-b-4 border-b-purple-700">
              <h3 className="text-xl font-bold mb-4 text-center text-purple-500">
                Sanskrit Word Quiz
              </h3>
              {!gameWins.quiz ? (
                <div className="space-y-4">
                  <p className="text-3xl text-center mb-2 text-purple-600 font-bold">
                    {sanskritQuestions[currentQuestionIndex].word}
                  </p>
                  <p className="text-sm mb-4 text-purple-500">
                    {sanskritQuestions[currentQuestionIndex].question}
                  </p>
                  <div className="space-y-2">
                    {sanskritQuestions[currentQuestionIndex].options.map(
                      (option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          disabled={selectedAnswer !== null}
                          className={`cursor-pointer w-full p-3 hover:bg-purple-600 rounded transition-all duration-300 ${
                            selectedAnswer === index
                              ? answerStatus
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                              : "bg-gray-700 hover:bg-gray-600"
                          } ${
                            selectedAnswer !== null &&
                            index ===
                              sanskritQuestions[currentQuestionIndex].correct
                              ? "ring-2 ring-green-500"
                              : ""
                          }`}
                        >
                          {option}
                          {selectedAnswer === index && (
                            <span className="ml-2">
                              {answerStatus ? (
                                <Check className="inline" />
                              ) : (
                                <X className="inline" />
                              )}
                            </span>
                          )}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center text-green-400">
                  <Sparkles className="inline-block mb-2" />
                  <p>Quiz Completed!</p>
                </div>
              )}
            </div>

            {/* Memory Game */}
            <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg backdrop-blur-sm border-t-4 border-t-purple-700 border-b-4 border-b-purple-700">
              <h3 className="text-xl font-bold mb-4 text-center text-purple-500">
                Sanskrit Memory
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {memoryCards.map((card, index) => (
                  <button
                    key={card.uniqueId}
                    onClick={() => handleCardClick(index)}
                    disabled={gameWins.memory}
                    className={`cursor-pointer h-12 w-12 hover:bg-purple-600 rounded transition-all duration-300 ${
                      flippedCards.includes(index) ||
                      matchedPairs.includes(card.id)
                        ? "bg-purple-600"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    {(flippedCards.includes(index) ||
                      matchedPairs.includes(card.id)) &&
                      card.content}
                  </button>
                ))}
              </div>
              {gameWins.memory && (
                <div className="text-center mt-4 text-green-400">
                  <Sparkles className="inline-block mb-2" />
                  <p>Memory Game Completed!</p>
                </div>
              )}
            </div>

            {/* Number Guessing Game */}
            <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg backdrop-blur-sm border-t-4 border-t-purple-700 border-b-4 border-b-purple-700">
              <h3 className="text-xl font-bold mb-4 text-center text-purple-500">
                Guess the Sanskrit Number
              </h3>
              {!gameWins.number ? (
                <div className="space-y-4">
                  <p className="text-2xl text-center mb-4 text-purple-500 font-bold">
                    {targetNumber}
                  </p>
                  <input
                    type="text"
                    value={numberGuess}
                    onChange={(e) => setNumberGuess(e.target.value)}
                    className={`w-full p-2 rounded transition-colors duration-300 ${
                      numberGuessStatus === null
                        ? "bg-gray-700 border-l-3 border-l-purple-700"
                        : numberGuessStatus
                        ? "bg-green-500/20 border-green-500"
                        : "bg-red-500/20 border-red-500"
                    } text-white`}
                    placeholder="Type the number in Sanskrit..."
                  />
                  <button
                    onClick={handleNumberGuess}
                    className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded cursor-pointer"
                  >
                    Check
                  </button>
                </div>
              ) : (
                <div className="text-center text-green-400">
                  <Sparkles className="inline-block mb-2" />
                  <p>Number Game Completed!</p>
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-8 pb-8">
            <button
              onClick={handlePravesh}
              disabled={!isTimeUp}
              className={`cursor-pointer px-8 py-4 text-xl font-bold rounded-lg transition-all duration-300 shadow-lg ${
                isTimeUp
                  ? "bg-gradient-to-r from-purple-500 to-purple-950 hover:bg-purple-700 border-l-4 border-l-purple-800 text-white"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            >
              {isTimeUp ? "प्रवेश करें" : "पंजीकरण शीघ्र"}
            </button>
            {showPopup && <ProfilePopup onClose={() => setShowPopup(false)} />}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
