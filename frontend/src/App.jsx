import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext";
import { EventProvider } from "./context/EventContex";
import { useUserContext } from "./context/UserContext";
import Header from "./components/Header";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoutes";
// import Dashboard from "./components/Dashboard";
import SupportUsPage from "./pages/SupportUsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import UserStats from "./pages/USerStats";
import HeadToHeadPage from "./pages/HeadtoHead";
import AboutUs from "./pages/AboutUsPage";
import ContactUs from "./pages/ContactUsPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionPage";
import SendMailtoTopTen from "./pages/SendMailtoTopTen";

import Dashboard from "./pages/DashboardPage";
import CameraDetection from "./components/Camera";
import ResultWaitingPage from "./pages/ResultWaitingPage";
import CancellationRefund from "./pages/Refund";

// Lazy Loading Pages
const QuizPage = lazy(() => import("./pages/QuizPage"));
const UserForm = lazy(() => import("./pages/UserForm"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const LeaderBoardPage = lazy(() => import("./pages/LeaderBoardPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const GreedHomePage = lazy(() => import("./pages/GreedHomePage"));
// const DashboardPage = lazy(() => import("./pages/DashBoard"));
const VerifyOtpCode = lazy(() => import("./pages/VerifyOtpCode"));
// const TverifyEmail = lazy(() => import("./pages/VerifyEmail"));
const TUpdateProfile = lazy(() => import("./pages/CompleteProfile"));
const TAllEvents = lazy(() => import("./pages/AllEvents"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const FAQPage = lazy(() => import("./pages/FAQPage"));

const UserSettings = lazy(() => import("./pages/UserSettings"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const CompleteProfile = lazy(() => import("./pages/CompleteProfile"));

const App = () => {
 
    const context = useUserContext();
    if (!context) {
      console.error("Error: useEventContext is undefined!");
      return <div>Something went wrong! Please refresh.</div>;
    }
    
    const { user } = context;
  // console.log("USer", user);

  // useEffect(() => {
  //   // Disable right-click
  //   document.addEventListener("contextmenu", (event) => {
  //     event.preventDefault();
  //   });

  //   // Disable DevTools shortcuts
  //   const handleKeyDown = (event) => {
  //     if (
  //       event.ctrlKey &&
  //       (event.key === "u" ||
  //         event.key === "U" ||
  //         event.key === "i" ||
  //         event.key === "I" ||
  //         event.key === "j" ||
  //         event.key === "J" ||
  //         event.key === "T" ||
  //         event.key === "t" ||
  //         event.key === "c" ||
  //         event.key === "C" ||
  //         event.key === "v")
  //     ) {
  //       event.preventDefault();
  //     }

  //     if (event.key === "F12") {
  //       event.preventDefault();
  //     }

  //     if (
  //       event.ctrlKey &&
  //       event.shiftKey &&
  //       (event.key === "I" ||
  //         event.key === "i" ||
  //         event.key === "C" ||
  //         event.key === "c" ||
  //         event.key === "V" ||
  //         event.key === "v" ||
  //         event.key === "J" ||
  //         event.key === "j" ||
  //         event.key === "t" ||
  //         event.key === "T")
  //     ) {
  //       event.preventDefault();
  //     }
  //   };

  //   // Attach event listeners
  //   document.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     // Cleanup event listeners on component unmount
  //     document.removeEventListener("contextmenu", (event) =>
  //       event.preventDefault()
  //     );
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

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
            <Route path="/hunter/hunter dashboard/:randomId" element={
              <EventProvider>
                
                <Dashboard />
              </EventProvider>
            } />
          </Route>

          {/* navigate(`/hunter code verification/${randomCode}/${randomUniqueCode}`) */}
          <Route
            path={`/hunter code verification/:randomCode/:randomUniqueCode`}
            element={<VerifyOtpCode />}
          />

          {/* <Route path="/votp" element={<TverifyEmail />} /> */}
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
                <EventDetail />
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

          <Route
            path={`/greed userform/hunter creation/:randomUniqueCode`}
            element={<UserForm />}
          />
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


            <Route path="/platform/faq" element={<FAQPage />} />
          <Route path="/platform/contact-us" element={<ContactUs />} />
          <Route path="/platform/about-us" element={<AboutUs />} />
          <Route path="/platform/privacy-policy" element={<PrivacyPolicyPage />}/>
          <Route path="/platform/Terms-and-conditions" element={<TermsAndConditionsPage />}/>
          <Route path="/platform/support-us" element={<SupportUsPage />} />
          <Route path="/platform/about-refund-policy" element={<CancellationRefund />} />



          <Route path="/userStats" element={<UserStats />} />
          <Route path="/head-to-head" element={<HeadToHeadPage />} />

          <Route path="/abcdddds" element={<SendMailtoTopTen />} />
          <Route path="/camera" element={<CameraDetection />} />
          <Route path="/quiz-result-waiting/:category/:eventCategory/:subcategory/:eventId" element={
            <QuizProvider>


              <ResultWaitingPage />
            </QuizProvider>
          } />

     
        </Routes>
      </Suspense>
      {/* </div> */}
    </>
  );
};

export default App;
