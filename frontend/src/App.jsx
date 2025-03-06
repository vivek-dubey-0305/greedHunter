import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext";
import { EventProvider } from "./context/EventContex";
import { useUserContext } from "./context/UserContext";
import Header from "./components/Header";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoutes";
import Dashboard from "./components/Dashboard";

// Lazy Loading Pages
const QuizPage = lazy(() => import("./pages/QuizPage"));
const UserForm = lazy(() => import("./pages/UserForm"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const LeaderBoardPage = lazy(() => import("./pages/LeaderBoardPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const GreedHomePage = lazy(() => import("./pages/GreedHomePage"));
const DashboardPage = lazy(() => import("./pages/DashBoard"));
const TsendVerifyOtp = lazy(() => import("./pages/SendOtp"));
const TverifyEmail = lazy(() => import("./pages/VerifyEmail"));
const TUpdateProfile = lazy(() => import("./pages/UpdateProfile"));
const TAllEvents = lazy(() => import("./pages/AllEvents"));
const TEventDetails = lazy(() => import("./pages/EventDetail"));
const FAQPage = lazy(() => import("./pages/FaqPage"));

const App = () => {
  const { user } = useUserContext();

  return (
    <>
      <Header />
      <div className="pt-20">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/greed-quiz-hunt-00"
              element={
                <QuizProvider>
                  <QuizPage />
                </QuizProvider>
              }
            />

            {/* ✅ Protected Dashboard Route */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route path="/sotp" element={<TsendVerifyOtp />} />
            <Route path="/votp" element={<TverifyEmail />} />
            <Route path="/completeProfile" element={<TUpdateProfile />} />

            <Route
              path="/events"
              element={
                <EventProvider>
                  <TAllEvents />
                </EventProvider>
              }
            />
            <Route
              path="/event/:eventId"
              element={
                <EventProvider>
                  <TEventDetails />
                </EventProvider>
              }
            />

            <Route path="/platform/faq" element={<FAQPage />} />
            <Route path="/get-in" element={<UserForm />} />
            <Route path="/greed-of-sanskrit" element={<LandingPage />} />
            <Route path="/leaderboard" element={<LeaderBoardPage />} />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="/*" element={<PageNotFound />} />
            <Route path="/" element={<GreedHomePage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

export default App;
