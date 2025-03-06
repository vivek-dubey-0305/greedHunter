import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminFormPage from "./pages/AdminFormPage";
import CreateEventPage from "./pages/CreateEventPage";
import CreateQuizPage from "./pages/CreateQuizPage";

// Lazy Loading Pages
// const QuizForm = lazy(() => import("./pages/CreateQuizQuestions"));

const App = () => {
  // const { user } = useUserContext();

  return (
    <>
      <Routes>
        <Route path="/" element={<AdminFormPage />} />
        <Route
          path="/createEvent-overseer-accept"
          element={<CreateEventPage />}
        />
        <Route
          path="/createQiuz-overseer-accept"
          element={<CreateQuizPage />}
        />
      </Routes>
    </>
  );
};

export default App;
