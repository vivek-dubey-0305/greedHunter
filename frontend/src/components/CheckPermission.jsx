import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckPermissions = ({ onPermissionGranted }) => {
  const navigate = useNavigate();
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const cameraPermission = await navigator.permissions.query({ name: "camera" });
        const micPermission = await navigator.permissions.query({ name: "microphone" });

        if (cameraPermission.state === "granted" && micPermission.state === "granted") {
          onPermissionGranted(); // Proceed if granted
        } else {
          setPermissionStatus("denied"); // Show popup if denied
        }
      } catch (error) {
        console.error("Permission check error:", error);
        setPermissionStatus("denied");
      }
    };

    checkPermissions();
  }, [onPermissionGranted]);

  // Function to request permissions again
  const requestPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      if (stream) {
        stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately
        onPermissionGranted(); // Proceed
      }
    } catch (error) {
      console.error("Permission request error:", error);
      setErrorMessage("Please enable permissions manually in browser settings.");
    }
  };

  return (
    <>
      {permissionStatus === "denied" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-bold text-red-600">⚠️ Permission Required</h2>
            <p className="text-gray-700 mt-2">
              Please allow access to your camera and microphone to continue.
            </p>
            
            <button
              onClick={requestPermissions}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Allow Camera & Microphone
            </button>

            <button
              onClick={() => navigate(-1)}
              className="mt-4 ml-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Go Back
            </button>

            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default CheckPermissions;
