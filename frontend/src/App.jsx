import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext";
import { EventProvider } from "./context/EventContex";
import { useUserContext } from "./context/UserContext";
import Header from "./components/Header";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoutes";
import Dashboard from "./components/Dashboard";
import SupportUsPage from "./pages/SupportUsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import UserStats from "./pages/USerStats";
import HeadToHeadPage from "./pages/HeadtoHead";
import AboutUs from "./pages/AboutUsPage";
import ContactUs from "./pages/ContactUsPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionPage";
import SendMailtoTopTen from "./pages/SendMailtoTopTen";

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
const TUpdateProfile = lazy(() => import("./pages/CompleteProfile"));
const TAllEvents = lazy(() => import("./pages/AllEvents"));
const TEventDetails = lazy(() => import("./pages/EventDetail"));
const FAQPage = lazy(() => import("./pages/FAQPage"));

const UserSettings = lazy(() => import("./pages/UserSettings"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const CompleteProfile = lazy(() => import("./pages/CompleteProfile"));

const App = () => {
  const { user } = useUserContext();

  console.log("USer", user);

  return (
    <>
      {/* <div className="mt-20"> */}
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/greed-quiz-hunt-00/:category/:eventCategory/:subcategory/:eventId"
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
          <Route path="/completeProfile" element={<CompleteProfile />} />

          <Route path="/reset-password" element={<ResetPassword />} />

          <Route
            path="/events"
            element={
              <EventProvider>
                <TAllEvents />
              </EventProvider>
            }
          />
          <Route
            path="/event/:category/:subcategory/:eventId"
            element={
              <EventProvider>
                <TEventDetails />
              </EventProvider>
            }
          />
          {user?._id ? (
            <Route
              path={`/user/${user._id}/settings`}
              element={<UserSettings />}
            />
          ) : (
            <Route
              path={`/`}
              element={
                <EventProvider>
                  <GreedHomePage />
                </EventProvider>
              }
            />
          )}

          <Route path="/platform/faq" element={<FAQPage />} />
          <Route path="/get-in" element={<UserForm />} />
          <Route
            path="/greed-of-event/:category/:eventCategory/:subcategory/:eventId"
            element={<LandingPage />}
          />

          <Route
            path="/leaderboard/:category/:eventCategory/:subcategory/:eventId"
            element={
              <EventProvider>
                <LeaderBoardPage />
              </EventProvider>
            }
          />

          <Route path="/404" element={<PageNotFound />} />
          <Route path="/*" element={<PageNotFound />} />

          <Route
            path="/"
            element={
              <EventProvider>
                <GreedHomePage />
              </EventProvider>
            }
          />
          <Route path="/platform/support us" element={<SupportUsPage />} />
          <Route
            path="/platform/privacy policy"
            element={<PrivacyPolicyPage />}
          />

          <Route path="/userStats" element={<UserStats />} />
          <Route path="/head-to-head" element={<HeadToHeadPage />} />
          <Route path="/platform/about us" element={<AboutUs />} />
          <Route path="/platform/contact us" element={<ContactUs />} />
          <Route
            path="/platform/Terms and conditions"
            element={<TermsAndConditionsPage />}
          />

          <Route path="/abcs" element={<SendMailtoTopTen />} />
        </Routes>
      </Suspense>
      {/* </div> */}
    </>
  );
};

export default App;
