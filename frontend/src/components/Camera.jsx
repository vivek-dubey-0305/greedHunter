// !----deeeo
import React, { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import { useNavigate } from "react-router-dom";

const CameraDetectionPopup = ({ onClose, isTest, reloadSubmit = () => {} }) => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [warningCounts, setWarningCounts] = useState({
    blackout: 0,
    person: 0,
    multiple: 0,
    unusual: 0,
  });
  const [blackoutDetected, setBlackoutDetected] = useState(false);
  const [personInsideFrame, setPersonInsideFrame] = useState(true);
  const lastPersonDetected = useRef(Date.now());
  const detectionTimeout = useRef(null);

  useEffect(() => {
    const setupMedia = async () => {
      try {
        console.log(isTest);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720, facingMode: "user" },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Media access error:", error);
        addAlert(
          "error",
          "⚠️ Camera access denied. Please allow access.",
          null
        );
      }
    };

    setupMedia();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (Object.values(warningCounts).some((count) => count > 3)) {
      reloadSubmit();
      setTimeout(() => {
        navigate(-1);
        window.location.reload();
      }, 200);
      // navigate("/", { replace: true }); // ✅ Redirects to home without keeping history
    }
  }, [warningCounts]);

  useEffect(() => {
    let timer;
    if (blackoutDetected || !personInsideFrame) {

    
       

      timer = setTimeout(() => {
        reloadSubmit()
        // navigate(-1);
        window.location.reload();
      }, 15000);
      console.log("timer", timer);
    }
    return () => clearTimeout(timer);
  }, [blackoutDetected, personInsideFrame, navigate]);

  const captureFrame = () => {
    if (!canvasRef.current) return null;
    return canvasRef.current.toDataURL("image/png");
  };

  // const addAlert = (type, message, imageUrl = null) => {
  //   if (!activeAlerts.some(alert => alert.type === type)) {
  //     setActiveAlerts(prev => [...prev, { type, message, imageUrl }]);
  //   }
  // };

  // const removeAlert = (type) => {
  //   setActiveAlerts(prev => prev.filter(alert => alert.type !== type));
  // };

  // Add or replace alert with current count
  const addAlert = (type, message, imageUrl = null) => {
    setActiveAlerts((prev) => [
      ...prev.filter((alert) => alert.type !== type),
      { type, message, imageUrl, timestamp: Date.now() },
    ]);
  };

  // Remove specific alert type
  const removeAlert = (type) => {
    setActiveAlerts((prev) => prev.filter((alert) => alert.type !== type));
  };

  // Auto-remove old alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setActiveAlerts((prev) =>
        prev.filter((alert) => now - alert.timestamp < 7000)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let model;
    const loadModelAndDetect = async () => {
      try {
        model = await cocoSsd.load();
        detect();
      } catch (error) {
        console.error("Model loading error:", error);
        addAlert("error", "⚠️ AI Model failed to load.", null);
      }
    };

    const detect = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.warn("Camera feed is not ready.");
        setTimeout(detect, 500);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      try {
        const predictions = await model.detect(video);
        let detectedPerson = false;
        let personCount = 0;
        let unusualDetected = false;

        predictions.forEach(({ class: className }) => {
          if (className === "person") {
            personCount++;
            detectedPerson = true;
            lastPersonDetected.current = Date.now();
          }

          if (["cell phone", "laptop", "book"].includes(className)) {
            unusualDetected = true;
          }
        });

        // if (!detectedPerson && predictions.length === 0) {
        //   if (!blackoutDetected) {
        //     const img = captureFrame();
        //     setBlackoutDetected(true);
        //     setWarningCounts((prev) => ({
        //       ...prev,
        //       blackout: prev.blackout + 1,
        //     }));
        //     addAlert("blackout", `🚨 Camera is blocked! Clean your lens.`, img);
        //   }
        // } else {
        //   setBlackoutDetected(false);
        // }

        // Updated camera blocked detection
        if (!detectedPerson && predictions.length === 0) {
          if (!blackoutDetected) {
            setBlackoutDetected(true);
            setWarningCounts((prev) => {
              const newCount = prev.blackout + 1;
              addAlert(
                "blackout",
                `🚨 Camera blocked! (Warning ${newCount}/3)`,
                captureFrame()
              );
              return { ...prev, blackout: newCount };
            });
          }
        } else if (blackoutDetected) {
          setBlackoutDetected(false);
          removeAlert("blackout");
        }

        // if (!detectedPerson && Date.now() - lastPersonDetected.current > 2000) {
        //   if (personInsideFrame) {
        //     const img = captureFrame();
        //     setPersonInsideFrame(false);
        //     setWarningCounts((prev) => ({ ...prev, person: prev.person + 1 }));
        //     addAlert(
        //       "person",
        //       `🚨 Please sit properly in the frame! ${warningCounts.person}`,
        //       img
        //     );
        //   }
        // } else {
        //   setPersonInsideFrame(true);
        // }

        // Updated person position detection
        if (!detectedPerson && Date.now() - lastPersonDetected.current > 2000) {
          if (personInsideFrame) {
            setPersonInsideFrame(false);
            setWarningCounts((prev) => {
              const newCount = prev.person + 1;
              addAlert(
                "person",
                `🚨 Sit properly! (Warning ${newCount}/3)`,
                captureFrame()
              );
              return { ...prev, person: newCount };
            });
          }
        } else if (!personInsideFrame) {
          setPersonInsideFrame(true);
          removeAlert("person");
        }

        if (personCount > 1) {
          // const img = captureFrame();

          setWarningCounts((prev) => {
            const newCount = prev.multiple + 1;
            addAlert(
              "multiple",
              `🚨 Remove extra people from the frame! (Warning ${newCount}/3)`,
              captureFrame()
            );
            return { ...prev, multiple: newCount };
          });
          // setWarningCounts((prev) => ({
          //   ...prev,
          //   multiple: prev.multiple + 1,
          // }));
          // addAlert(
          //   "multiple",
          //   `🚨 Remove extra people from the frame! ${warningCounts.multiple}`,
          //   img
          // );
        }

        if (unusualDetected) {
          // const img = captureFrame();

          setWarningCounts((prev) => {
            const newCount = prev.unusual + 1;
            addAlert(
              "unusual",
              `🚨Restricted object detected! (Warning ${newCount}/3)`,
              captureFrame()
            );
            return { ...prev, unusual: newCount };
          });
          // setWarningCounts((prev) => ({ ...prev, unusual: prev.unusual + 1 }));
          // addAlert(
          //   "unusual",
          //   `🚨 Restricted object detected! ${warningCounts.unusual}`,
          //   img
          // );
        }

        detectionTimeout.current = setTimeout(detect, 1000);
      } catch (error) {
        console.error("Detection error:", error);
      }
    };

    loadModelAndDetect();

    return () => {
      clearTimeout(detectionTimeout.current);
      model?.dispose();
    };
  }, [personInsideFrame, blackoutDetected]);

  return isTest ? (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl w-11/12 max-w-4xl h-4/5 flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 z-50"
        >
          <X size={24} />
        </button>

        <div className="relative w-full h-full flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover rounded-t-lg"
          />
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="absolute top-5 left-5 flex flex-col space-y-2 max-w-xs">
          {activeAlerts.map((alert, index) => (
            <div
              key={alert.timestamp}
              className="bg-white p-3 rounded-lg shadow-md flex items-center space-x-2"
            >
              {alert.imageUrl && (
                <img
                  src={alert.imageUrl}
                  alt="Alert"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setEnlargedImage(alert.imageUrl)}
                />
              )}
              <span
                className="text-red-600 font-bold cursor-pointer"
                onClick={() => setEnlargedImage(alert.imageUrl)}
              >
                {alert.message}
              </span>
              <button
                onClick={() => removeAlert(alert.type)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        {enlargedImage && (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
            <div className="relative bg-white p-4 rounded-lg max-w-md">
              <button
                className="absolute -top-8 right-0 text-white hover:text-gray-200"
                onClick={() => setEnlargedImage(null)}
              >
                <X size={24} />
              </button>
              <img
                src={enlargedImage}
                alt="Enlarged"
                className="max-w-full h-auto rounded-md"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div
      className={`fixed bottom-10 right-10 z-50 bg-black bg-opacity-80 flex items-center justify-center transition-all duration-300 ${
        expanded ? "w-[768px] h-[500px] rounded-xl" : "w-24 h-24 rounded-lg"
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={`object-cover transition-all duration-300 ${
          expanded ? "w-full h-full rounded-xl" : "w-24 h-24 rounded-lg"
        }`}
      />
      <canvas ref={canvasRef} className="hidden" />
      {expanded && (
        <div>
          <div className="absolute top-5 left-5 flex flex-col space-y-2 max-w-xs">
            {activeAlerts.map((alert, index) => (
              <div
                key={alert.timestamp}
                className="bg-white p-3 rounded-lg shadow-md flex items-center space-x-2"
              >
                {alert.imageUrl && (
                  <img
                    src={alert.imageUrl}
                    alt="Alert"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={() => setEnlargedImage(alert.imageUrl)}
                  />
                )}
                <span
                  className="text-red-600 font-bold cursor-pointer"
                  onClick={() => setEnlargedImage(alert.imageUrl)}
                >
                  {alert.message}
                </span>
                <button
                  onClick={() => removeAlert(alert.type)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          {enlargedImage && (
            <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
              <div className="relative bg-white p-4 rounded-lg max-w-md">
                <button
                  className="absolute -top-8 right-0 text-white hover:text-gray-200"
                  onClick={() => setEnlargedImage(null)}
                >
                  <X size={24} />
                </button>
                <img
                  src={enlargedImage}
                  alt="Enlarged"
                  className="max-w-full h-auto rounded-md"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CameraDetectionPopup;

// !!!!11

// import React, { useRef, useEffect, useState } from "react";
// import { X } from 'lucide-react';
// import * as cocoSsd from "@tensorflow-models/coco-ssd";
// import "@tensorflow/tfjs";
// import { useNavigate } from "react-router-dom";

// const CameraDetectionPopup = ({ onClose }) => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const navigate = useNavigate();

//   const [alertImage, setAlertImage] = useState(null);
//   const [isImageEnlarged, setIsImageEnlarged] = useState(false);
//   const [alerts, setAlerts] = useState([]);
//   const [warningCount, setWarningCount] = useState(0);
//   const [countdown, setCountdown] = useState(null);

//   let lastPersonDetected = Date.now();

//   useEffect(() => {
//     const setupMedia = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: {
//             width: { ideal: 4096 },
//             height: { ideal: 1280 },
//             facingMode: "environment",
//           },
//           audio: false,
//         });

//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (error) {
//         console.error("Media access error:", error);
//       }
//     };

//     setupMedia();

//     return () => {
//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   useEffect(() => {
//     let model;
//     let detectInterval;

//     const loadModelAndDetect = async () => {
//       model = await cocoSsd.load();
//       console.log("COCO-SSD Model Loaded");
//       detect();
//     };

//     const detect = async () => {
//       if (!videoRef.current || !canvasRef.current) return;

//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");

//       if (video.readyState !== 4 || video.videoWidth === 0 || video.videoHeight === 0) {
//         console.warn("Video feed not ready, waiting...");
//         setTimeout(detect, 500);
//         return;
//       }

//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;

//       try {
//         const predictions = await model.detect(video);
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//         let unusualDetected = false;
//         let personCount = 0;
//         let detectedPerson = false;

//         predictions.forEach(({ class: objectName, bbox }) => {
//           const [x, y, width, height] = bbox;

//           ctx.strokeStyle = objectName === "person" ? "green" : "red";
//           ctx.lineWidth = 2;
//           ctx.strokeRect(x, y, width, height);
//           ctx.fillStyle = "red";
//           ctx.fillText(objectName, x, y - 5);

//           if (objectName === "person") {
//             personCount++;
//             detectedPerson = true;
//             lastPersonDetected = Date.now();
//           }

//           const unusualObjects = ["cell phone", "laptop", "tablet", "mouse", "remote", "mirror"];
//           if (unusualObjects.includes(objectName)) {
//             unusualDetected = true;
//             showAlert("🚨 Unusual object detected! Put it away.", canvas);
//           }
//         });

//         if (!detectedPerson && predictions.length === 0) {
//           showAlert("🚨 Camera is blocked! Please clean your camera.", canvas, true);
//         }

//         if (!detectedPerson && Date.now() - lastPersonDetected > 3000) {
//           showAlert("🚨 Please sit properly in the frame!", canvas, true);
//         }

//         if (unusualDetected) {
//           captureFrame(canvas);
//         }

//         if (personCount > 1) {
//           showAlert("🚨 More than one person detected! Remove others from the frame.", canvas);
//         }

//         detectInterval = setTimeout(detect, 1000);
//       } catch (error) {
//         console.error("Detection error:", error);
//       }
//     };

//     loadModelAndDetect();

//     return () => {
//       clearTimeout(detectInterval);
//       if (model) model.dispose();
//     };
//   }, []);

//   const captureFrame = (canvas) => {
//     const imageUrl = canvas.toDataURL("image/png");
//     setAlertImage(imageUrl);
//   };

//   const showAlert = (message, canvas, startCountdown = false) => {
//     setAlerts(prev => [...prev, { message, image: canvas.toDataURL("image/png") }]);
//     setWarningCount(prev => prev + 1);

//     if (warningCount + 1 >= 3) {
//       console.log(warningCount)
//       setTimeout(() => navigate(-1), 2000);
//     }

//     if (startCountdown) {
//       let timeLeft = 15;
//       setCountdown(timeLeft);
//       const timer = setInterval(() => {
//         timeLeft -= 1;
//         setCountdown(timeLeft);
//         if (timeLeft === 0) {
//           clearInterval(timer);
//           navigate(-1);
//         }
//       }, 1000);
//     }
//   };

//   const handleCloseAlert = (index) => {
//     setAlerts(prev => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="relative bg-white rounded-lg shadow-xl w-11/12 max-w-4xl h-4/5 flex flex-col">
//         {/* Close Popup Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-60 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
//         >
//           <X size={24} />
//         </button>

//         {/* Video Container */}
//         <div className="relative w-full h-full flex items-center justify-center">
//           <video
//             ref={videoRef}
//             autoPlay
//             playsInline
//             className="w-full h-full object-cover rounded-t-lg"
//           />
//           <canvas
//             ref={canvasRef}
//             className="absolute top-4 right-4 w-24 h-24 rounded-full object-cover border-2 border-white shadow-md"
//           />
//         </div>

//         {/* Alerts */}
//         {alerts.length > 0 && (
//           <div className="absolute bottom-4 right-4 bg-white shadow-md rounded-lg p-4 max-w-xs">
//             <h3 className="text-red-500 font-bold text-sm">🚨 Alerts</h3>
//             {alerts.map((alert, index) => (
//               <div key={index} className="relative flex items-center p-2 border-b">
//                 <img
//                   src={alert.image}
//                   alt="Alert Capture"
//                   className="w-10 h-10 rounded-full mr-3 cursor-pointer"
//                   onClick={() => setAlertImage(alert.image)}
//                 />
//                 <p className="text-xs">{alert.message}</p>
//                 <button onClick={() => handleCloseAlert(index)} className="ml-auto text-gray-600">
//                   <X size={14} />
//                 </button>
//               </div>
//             ))}
//             {countdown !== null && <p className="text-red-500 text-center mt-2">Time Left: {countdown}s</p>}
//           </div>
//         )}

//         {/* Enlarged Image */}
//         {isImageEnlarged && alertImage && (
//           <div className="fixed inset-0 z-60 bg-black bg-opacity-80 flex items-center justify-center">
//             <div className="relative">
//               <button onClick={() => setIsImageEnlarged(false)} className="absolute top-2 right-2 text-white">
//                 <X size={24} />
//               </button>
//               <img src={alertImage} alt="Captured Alert" className="max-w-lg max-h-lg rounded-lg" />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CameraDetectionPopup;
//
//!-----------------

// import React, { useRef, useEffect, useState } from "react";
// import { X, ExpandIcon } from 'lucide-react';
// import * as cocoSsd from "@tensorflow-models/coco-ssd";
// import "@tensorflow/tfjs";

// const CameraDetectionPopup = ({ onClose }) => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [alertImage, setAlertImage] = useState(null);
//   const [isImageEnlarged, setIsImageEnlarged] = useState(false);
//   const [personInsideFrame, setPersonInsideFrame] = useState(true);
//   const [blackoutDetected, setBlackoutDetected] = useState(false);
//   let lastPersonDetected = Date.now();

//   useEffect(() => {
//     const setupMedia = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: {
//             width: { ideal: 4096 },
//             height: { ideal: 1280 },
//             facingMode: "environment",
//           },
//           audio: true,
//         });

//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           stream.getAudioTracks().forEach((track) => {
//             track.enabled = false;
//           });
//         }
//       } catch (error) {
//         console.error("Media access error:", error);
//       }
//     };

//     setupMedia();

//     return () => {
//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   useEffect(() => {
//     let model;
//     let detectInterval;

//     const loadModelAndDetect = async () => {
//       model = await cocoSsd.load();
//       console.log("COCO-SSD Model Loaded");
//       detect();
//     };

//     const detect = async () => {
//       if (!videoRef.current || !canvasRef.current) return;

//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");

//       if (video.readyState !== 4 || video.videoWidth === 0 || video.videoHeight === 0) {
//         console.warn("Video feed not ready, waiting...");
//         setTimeout(detect, 500);
//         return;
//       }

//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;

//       try {
//         const predictions = await model.detect(video);
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//         let unusualDetected = false;
//         let personCount = 0;
//         let detectedPerson = false;

//         predictions.forEach(({ class: objectName, bbox }) => {
//           const [x, y, width, height] = bbox;

//           ctx.strokeStyle = objectName === "person" ? "green" : "red";
//           ctx.lineWidth = 2;
//           ctx.strokeRect(x, y, width, height);
//           ctx.fillStyle = "red";
//           ctx.fillText(objectName, x, y - 5);

//           if (objectName === "person") {
//             personCount++;
//             detectedPerson = true;
//             lastPersonDetected = Date.now();
//           }

//           const unusualObjects = ["cell phone", "laptop", "tablet", "mouse", "remote", "mirror"];
//           if (unusualObjects.includes(objectName)) {
//             window.alert("🚨 Unusual object detected! Put it away.");
//             unusualDetected = true;
//           }
//         });

//         if (!detectedPerson && predictions.length === 0) {
//           if (!blackoutDetected) {
//             setBlackoutDetected(true);
//             window.alert("🚨 Camera is blocked! Please clean your camera.");
//           }
//         } else {
//           setBlackoutDetected(false);
//         }

//         if (!detectedPerson && Date.now() - lastPersonDetected > 3000) {
//           if (personInsideFrame) {
//             setPersonInsideFrame(false);
//             window.alert("🚨 Please sit properly in the frame!");
//           }
//         } else {
//           setPersonInsideFrame(true);
//         }

//         if (unusualDetected) {
//           captureFrame(canvas);
//         }

//         if (personCount > 1) {
//           console.log("More than one person detected!");
//           window.alert("🚨 Please remove the other person from the frame.");
//           captureFrame(canvas);
//         }

//         detectInterval = setTimeout(detect, 1000);
//       } catch (error) {
//         console.error("Detection error:", error);
//       }
//     };

//     loadModelAndDetect();

//     return () => {
//       clearTimeout(detectInterval);
//       if (model) model.dispose();
//     };
//   }, []);

//   const captureFrame = (canvas) => {
//     const imageUrl = canvas.toDataURL("image/png");
//     setAlertImage(imageUrl);
//   };

//   const handleImageClick = () => {
//     setIsImageEnlarged(true);
//   };

//   const handleCloseEnlargedImage = () => {
//     setIsImageEnlarged(false);
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="relative bg-white rounded-lg shadow-xl w-11/12 max-w-4xl h-4/5 flex flex-col">
//         {/* Close Popup Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-60 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
//         >
//           <X size={24} />
//         </button>

//         {/* Video Container */}
//         <div className="relative w-full h-full flex items-center justify-center">
//           <video
//             ref={videoRef}
//             autoPlay
//             playsInline
//             className="w-full h-full object-cover rounded-t-lg"
//           />

//           {/* Small Canvas Preview */}
//           <canvas
//             ref={canvasRef}
//             className="absolute top-4 right-4 w-24 h-24 rounded-full object-cover border-2 border-white shadow-md"
//           />
//         </div>

//         {/* Alert Image Section */}
//         {alertImage && !isImageEnlarged && (
//           <div
//             className="absolute bottom-4 right-4 cursor-pointer"
//             onClick={handleImageClick}
//           >
//             <h3 className="text-red-500 font-bold text-sm">🚨 Alert!</h3>
//             <img
//               src={alertImage}
//               alt="Captured Alert"
//               className="border-2 border-red-500 rounded-lg w-24 h-24 object-cover"
//             />
//           </div>
//         )}

//         {/* Enlarged Image Overlay */}
//         {isImageEnlarged && alertImage && (
//           <div
//             className="fixed inset-0 z-60 bg-black bg-opacity-90 flex items-center justify-center p-8"
//             onClick={handleCloseEnlargedImage}
//           >
//             <div className="relative">
//               <button
//                 onClick={handleCloseEnlargedImage}
//                 className="absolute -top-10 right-0 z-70 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
//               >
//                 <X size={24} />
//               </button>
//               <img
//                 src={alertImage}
//                 alt="Enlarged Alert"
//                 className="max-w-full max-h-full object-contain rounded-lg"
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CameraDetectionPopup;

// !-------------------------------

// import React, { useRef, useEffect, useState } from "react";
// import { X, ExpandIcon } from 'lucide-react';
// import * as cocoSsd from "@tensorflow-models/coco-ssd";
// import "@tensorflow/tfjs";

// const CameraDetection = ({ onAlert, onMultiplePersonsDetected,
//  }) => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [alertImage, setAlertImage] = useState(null);
//   const [isImageEnlarged, setIsImageEnlarged] = useState(false);
//   const [personInsideFrame, setPersonInsideFrame] = useState(true);
//   const [blackoutDetected, setBlackoutDetected] = useState(false);
//   let lastPersonDetected = Date.now();

//   useEffect(() => {
//     const setupMedia = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: {
//             width: { ideal: 4096 }, // Optimize size for performance
//             height: { ideal: 1280 },
//             facingMode: "evironment",
//           },
//           audio: true, // Allow audio access but mute it
//         });

//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;

//           // 🔹 Mute the audio input (prevents unnecessary noise)
//           stream.getAudioTracks().forEach((track) => {
//             track.enabled = false; // Mutes microphone output
//           });
//         }
//       } catch (error) {
//         console.error("Media access error:", error);
//       }
//     };

//     setupMedia();

//     return () => {
//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   useEffect(() => {
//     let model;
//     let detectInterval;

//     const loadModelAndDetect = async () => {
//       model = await cocoSsd.load();
//       console.log("COCO-SSD Model Loaded");
//       detect();
//     };

//     const detect = async () => {
//       if (!videoRef.current || !canvasRef.current) return;

//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");

//       // Ensure video is ready
//       if (video.readyState !== 4 || video.videoWidth === 0 || video.videoHeight === 0) {
//         console.warn("Video feed not ready, waiting...");
//         setTimeout(detect, 500); // Retry
//         return;
//       }

//       // Set canvas size dynamically
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;

//       try {
//         const predictions = await model.detect(video);
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//         let unusualDetected = false;
//         let personCount = 0;
//         let detectedPerson = false;

//         predictions.forEach(({ class: objectName, bbox }) => {
//           const [x, y, width, height] = bbox;

//           ctx.strokeStyle = objectName === "person" ? "green" : "red";
//           ctx.lineWidth = 2;
//           ctx.strokeRect(x, y, width, height);
//           ctx.fillStyle = "red";
//           ctx.fillText(objectName, x, y - 5);

//           if (objectName === "person") {
//             personCount++;
//             detectedPerson = true;
//             lastPersonDetected = Date.now();
//           }

//           // Unusual Object Detection
//           const unusualObjects = ["cell phone", "laptop", "tablet", "mouse", "remote", "mirror"];
//           if (unusualObjects.includes(objectName)) {
//             console.log("Detected:", objectName);
//             window.alert("🚨 Unusual object detected! Put it away.");
//             unusualDetected = true;
//           }
//         });

//         // Check for camera blackout (black screen detection)
//         if (!detectedPerson && predictions.length === 0) {
//           if (!blackoutDetected) {
//             setBlackoutDetected(true);
//             window.alert("🚨 Camera is blocked! Please clean your camera.");
//           }
//         } else {
//           setBlackoutDetected(false);
//         }

//         // Alert only if out of frame for 3+ seconds
//         if (!detectedPerson && Date.now() - lastPersonDetected > 3000) {
//           if (personInsideFrame) {
//             setPersonInsideFrame(false);
//             window.alert("🚨 Please sit properly in the frame!");
//           }
//         } else {
//           setPersonInsideFrame(true);
//         }

//         if (unusualDetected) {
//           captureFrame(canvas);
//           if (onAlert) onAlert();
//         }

//         // Detect multiple persons
//         if (personCount > 1) {
//           console.log("More than one person detected!");
//           window.alert("🚨 Please remove the other person from the frame.");
//           captureFrame(canvas);
//           if (onMultiplePersonsDetected) onMultiplePersonsDetected();
//         }

//         detectInterval = setTimeout(detect, 1000);
//       } catch (error) {
//         console.error("Detection error:", error);
//       }
//     };

//     loadModelAndDetect();

//     return () => {
//       clearTimeout(detectInterval);
//       if (model) model.dispose();
//     };
//   }, [onAlert, onMultiplePersonsDetected]);

//   const captureFrame = (canvas) => {
//     const imageUrl = canvas.toDataURL("image/png");
//     setAlertImage(imageUrl);
//   };

//   const handleImageClick = () => {
//     setIsImageEnlarged(true);
//   };

//   const handleCloseEnlargedImage = () => {
//     setIsImageEnlarged(false);
//   };

//   return (
//       <div className="fixed inset-0 z-50 bg-gray-700 w-96">
//         <video ref={videoRef} autoPlay playsInline className="" />
//         <canvas
//           ref={canvasRef}
//           className="w-24 h-24 rounded-full object-cover"
//           style={{
//               position: 'absolute',
//               top: '1rem',
//               right: '1rem'
//         }}
//       />
//       {alertImage && (
//         <div className="mt-4 absolute top-28 right-4">
//           <h3 className="text-red-500 font-bold text-sm">🚨 Alert!</h3>
//           <img
//             src={alertImage}
//             alt="Captured Alert"
//             className="border-2 border-red-500 rounded-lg w-24 h-24 object-fit"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CameraDetection;

// return (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
//     <div className="relative bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
//       {/* Close Popup Button */}
//       <button
//         onClick={onClose}
//         className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 transition-colors"
//       >
//         <X className="w-6 h-6" />
//       </button>

//       {/* Video Element */}
//       <div className="mb-4">
//         <video
//           ref={videoRef}
//           autoPlay
//           playsInline
//           className="w-full rounded-lg"
//         />
//       </div>

//       {/* Alert Image */}
//       {alertImage && (
//         <div className="relative">
//           <div className="flex items-center mb-2">
//             <h3 className="text-red-500 font-bold text-sm mr-2">🚨 Alert!</h3>
//             <button
//               onClick={handleImageClick}
//               className="text-blue-500 hover:text-blue-700 transition-colors"
//             >
//               <ExpandIcon className="w-4 h-4" />
//             </button>
//           </div>
//           <img
//             src={alertImage}
//             alt="Captured Alert"
//             className="border-2 border-red-500 rounded-lg w-24 h-24 object-cover cursor-pointer"
//             onClick={handleImageClick}
//           />
//         </div>
//       )}
//     </div>

//     {/* Enlarged Image Modal */}
//     {isImageEnlarged && alertImage && (
//       <div
//         className="fixed inset-0 z-60 bg-black bg-opacity-90 flex items-center justify-center p-4"
//         onClick={handleCloseEnlargedImage}
//       >
//         <div className="relative max-w-4xl max-h-[90vh]">
//           <button
//             onClick={handleCloseEnlargedImage}
//             className="absolute -top-8 right-0 text-white hover:text-gray-300 transition-colors"
//           >
//             <X className="w-8 h-8" />
//           </button>
//           <img
//             src={alertImage}
//             alt="Enlarged Captured Alert"
//             className="max-w-full max-h-full object-contain rounded-lg"
//           />
//         </div>
//       </div>
//     )}
//   </div>
// );
