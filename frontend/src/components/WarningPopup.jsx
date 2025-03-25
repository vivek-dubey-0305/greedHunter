// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { XCircle, AlertTriangle, ShieldAlert, X } from "lucide-react";

// const WarningPopup = () => {
//   const [warningCount, setWarningCount] = useState(0);
//   const [showWarning, setShowWarning] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleBlur = () => {
//       if (warningCount < 3) {
//         setWarningCount((prev) => prev + 1);
//         setShowWarning(true);
//       } else {
//         window.location.href = navigate("/");

//         window.onpopstate = window.location.href;
//         history.pushState(null, null, location.href);

//         window.onpopstate = null;
//       }
//     };

//     window.addEventListener("blur", handleBlur);
//     return () => {
//       window.removeEventListener("blur", handleBlur);
//     };
//   }, [warningCount, navigate]);

//   const closePopup = () => setShowWarning(false);

//   const warningLevels = [
//     {
//       icon: <AlertTriangle className="text-yellow-500" size={40} />,
//       title: "Warning 1!",
//       message: "Please do not switch tabs or minimize the browser.",
//       bg: "from-yellow-600 to-yellow-700",
//       border: "border-yellow-400",
//       animation: "animate-pulse",
//     },
//     {
//       icon: <ShieldAlert className="text-orange-500" size={40} />,
//       title: "Warning 2!",
//       message:
//         "You have violated the rule again. One more time and you'll be redirected!",
//       bg: "from-orange-700 to-orange-800",
//       border: "border-orange-500",
//       animation: "animate-pulse",
//     },
//     {
//       icon: <XCircle className="text-red-500" size={40} />,
//       title: "Final Warning!",
//       message:
//         "This is your last chance! Switching tabs again will result in a forceful exit.",
//       bg: "from-red-800 to-red-900",
//       border: "border-red-600",
//       animation: "animate-pulse",
//     },
//   ];

//   const currentWarning = warningLevels[warningCount - 1];

//   return (
//     showWarning && (
//       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm z-50 transition-all duration-300">
//         <div
//           className={`relative w-96 p-8 rounded-xl shadow-2xl bg-gradient-to-br ${
//             currentWarning?.bg
//           } border-2 ${
//             currentWarning?.border
//           } dark:text-white text-center transform transition-all duration-500 ${
//             currentWarning?.animation === "animate-pulse" ? "animate-pulse" : ""
//           } ${
//             currentWarning?.animation === "animate-pulse" ? "animate-pulse" : ""
//           } ${
//             currentWarning?.animation === "animate-pulse" ? "animate-pulse" : ""
//           }`}
//         >
//           <div className="absolute -top-4 -right-4 flex justify-center items-center bg-gray-900 rounded-full p-1 border-2 border-gray-700 hover:scale-110 transition-transform duration-200">
//             <button
//               onClick={closePopup}
//               className="focus:outline-none"
//               aria-label="Close"
//             >
//               <X className="text-gray-400 hover:text-white" size={24} />
//             </button>
//           </div>

//           <div className="flex flex-col items-center justify-center space-y-4">
//             <div className="p-4 bg-gray-900 bg-opacity-50 rounded-full border border-gray-700 shadow-inner">
//               {currentWarning?.icon}
//             </div>

//             <h2 className="text-2xl font-bold mt-2 text-white drop-shadow-lg">
//               {currentWarning?.title}
//             </h2>

//             <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-30"></div>

//             <p className="mt-2 text-lg text-gray-100">
//               {currentWarning?.message}
//             </p>

//             <button
//               onClick={closePopup}
//               className="mt-6 bg-gray-900 text-white px-6 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 hover:scale-105 transition-all duration-200 shadow-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
//             >
//               Acknowledge
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default WarningPopup;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ShieldAlert, XCircle, X, Clock } from "lucide-react";

const WarningPopup = ({ warningSubmit = () => {} }) => {
  const [warningCount, setWarningCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(10); // 10 seconds timer
  const [countdownActive, setCountdownActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleBlur = () => {
      if (warningCount < 3) {
        setWarningCount((prev) => prev + 1);
        setShowWarning(true);
        setCountdown(10);
        setCountdownActive(true);
      } else {
        warningSubmit();
        setTimeout(() => {
          // navigate(-1);
          window.location.reload();
        }, 200);
        // navigate(-1);
        // window.location.reload();
      }
    };

    window.addEventListener("blur", handleBlur);
    return () => window.removeEventListener("blur", handleBlur);
  }, [warningCount]);

  // Countdown Timer
  useEffect(() => {
    let timer;
    if (countdownActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      warningSubmit();
        setTimeout(() => {
          // navigate(-1);
          window.location.reload();
        }, 200);
     
      // navigate(-1);
      // window.location.reload();
    }

    return () => clearInterval(timer);
  }, [countdown, countdownActive, navigate]);

  const handleFocus = () => {
    setShowWarning(false);
    setCountdownActive(false);
  };

  const warningLevels = [
    {
      icon: <AlertTriangle className="text-yellow-500" size={40} />,
      title: "Warning 1!",
      message: "Please return to the page within 10 seconds.",
      bg: "from-yellow-600 to-yellow-700",
      border: "border-yellow-400",
    },
    {
      icon: <ShieldAlert className="text-orange-500" size={40} />,
      title: "Warning 2!",
      message: "You're violating the rules! Return in 10 seconds or exit.",
      bg: "from-orange-700 to-orange-800",
      border: "border-orange-500",
    },
    {
      icon: <XCircle className="text-red-500" size={40} />,
      title: "Final Warning!",
      message: "This is your last chance! Switching tabs will exit you.",
      bg: "from-red-800 to-red-900",
      border: "border-red-600",
    },
  ];

  const currentWarning = warningLevels[warningCount - 1];

  return (
    showWarning && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm z-50 transition-all duration-300">
        <div
          className={`relative w-96 p-8 rounded-xl shadow-2xl bg-gradient-to-br ${currentWarning?.bg} border-2 ${currentWarning?.border} text-white text-center`}
        >
          <div className="absolute -top-4 -right-4">
            <button
              onClick={handleFocus}
              className="bg-gray-900 rounded-full p-2 border border-gray-700 hover:scale-110 transition-transform"
            >
              <X className="text-gray-400 hover:text-white" size={24} />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-4 bg-gray-900 bg-opacity-50 rounded-full border border-gray-700 shadow-inner">
              {currentWarning?.icon}
            </div>

            <h2 className="text-2xl font-bold">{currentWarning?.title}</h2>

            <p className="text-lg">{currentWarning?.message}</p>

            <div className="flex items-center space-x-2">
              <Clock size={20} className="text-yellow-400" />
              <span className="text-2xl font-bold text-yellow-300">
                {countdown}s
              </span>
            </div>

            <button
              onClick={handleFocus}
              className="mt-4 bg-gray-900 text-white px-6 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 hover:scale-105 transition-all duration-200"
            >
              I Am Back!
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default WarningPopup;
