import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import QuizForm from "./pages/CreateQuizQuestions";
import { QuizProvider } from "./context/QuizContext";
import QuizPage from "./pages/QuizPage";
import UserForm from "./pages/UserForm";
import { useUserContext } from "./context/UserContext";
import LandingPage from "./pages/LandingPage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  useEffect(() => {
    // Disable right-click
    document.addEventListener("contextmenu", (event) => event.preventDefault());

    // Disable DevTools shortcuts
    const handleKeyDown = (event) => {
      if (
        event.ctrlKey &&
        (event.key === "u" ||
          event.key === "U" ||
          event.key === "i" ||
          event.key === "I" ||
          event.key === "j" ||
          event.key === "J" ||
          event.key === "c" ||
          event.key === "C" ||
          event.key === "v")
      ) {
        event.preventDefault();
      }

      if (event.key === "F12") {
        event.preventDefault();
      }

      if (
        event.ctrlKey &&
        event.shiftKey &&
        (event.key === "I" || event.key === "J")
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", (event) =>
        event.preventDefault()
      );
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const { user } = useUserContext();
  return (
    <Routes>
      <Route
        path="/createQuiz"
        element={
          <QuizProvider>
            <QuizForm />
          </QuizProvider>
        }
      />
      {user && user._id ? (
        <Route
          path={`/${user._id}/greed-quiz-hunt`}
          element={
            <QuizProvider>
              <QuizPage />
            </QuizProvider>
          }
        />
      ) : (
        <Route path="/quiz" element={<Navigate to="/404" />} />
      )}
      <Route path="/get-in" element={<UserForm />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/leaderboard" element={<LeaderBoardPage />} />
      <Route path="/404" element={<PageNotFound />} />
      <Route path="/*" element={<PageNotFound />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}
    </Routes>
  );
};

export default App;
