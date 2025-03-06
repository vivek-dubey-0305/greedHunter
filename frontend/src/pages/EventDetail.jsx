import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useEventContext } from "../context/EventContex";
import { useUserContext } from "../context/UserContext";
import { apiUser } from "../services/api";

import toast, { Toaster } from "react-hot-toast";

const TEventDetails = () => {
  const { getEvent } = useEventContext();
  const { eventId } = useParams();
  const { user, setUser } = useUserContext();
  const [event, setEvent] = useState(null);
  // const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  // const [enrollResponse, setEnrollResponse] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventDetails = await getEvent(eventId);
        // console.log("eventDetails.event", eventDetails.event);
        // console.log("eventDetails", eventDetails);
        // console.log("USERER", user);
        setEvent(eventDetails.event); // Assuming API returns { success, event }

        // if (!enrollResponse) {
        //   console.error("No user and events foud, false");
        // } else {
        //   setIsAlreadyEnrolled(true); // ✅ Button updates instantly
        // }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  // ✅ Check if the user is already enrolled dynamically on every render
  const isAlreadyEnrolled = user?.enrolledEvents?.some(
    (enrolledEvent) => enrolledEvent.eventId === eventId
  );

  const handleEnroll = async () => {
    try {
      // console.log("USER..", user);
      if (!user) {
        navigate("/get-in");
        return;
      }
      if (!user.isVerified) {
        toast.error("Verify you mail to continue");
        navigate("/sotp");
        return;
      }

      const enrollResponse = await apiUser.post(`/enrollUser`, { eventId });
      // console.log("Enroll Response:", enrollResponse);

      // ✅ Check if the response contains the enrolled event
      if (enrollResponse.data.enrolledEvent) {
        setUser((prevUser) => ({
          ...prevUser,
          enrolledEvents: [
            ...prevUser.enrolledEvents,
            enrollResponse.data.enrolledEvent,
          ],
        }));
        // setIsAlreadyEnrolled(true); // ✅ Button updates immediately
        // setEnrollResponse(enrollResponse.data.enrolledEvent);
      }
    } catch (error) {
      console.error("Enrollment failed:", error);
    }
  };

  if (!event)
    return <p className="text-center text-white">Loading event details...</p>;

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-yellow-400">{event.title}</h1>
          <p className="text-gray-400 mt-2">{event.category}</p>
          <p className="mt-4">{event.description}</p>
          <p className="mt-4">
            📅 Start: {new Date(event.startTime).toLocaleString()}
          </p>
          <p className="mt-1">
            ⏳ End: {new Date(event.endTime).toLocaleString()}
          </p>
          {event.eventType === "physical" && (
            <p className="mt-1">📍 Location: {event.location}</p>
          )}

          {event.rules.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-bold text-yellow-300">Rules:</h3>
              <ul className="list-disc pl-6">
                {event.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
          )}

          {event.rewardDetails && (
            <div className="mt-4">
              <h3 className="text-lg font-bold text-yellow-300">Rewards:</h3>
              <p>💰 Cash Prize: {event.rewardDetails.cashPrize || "None"}</p>
              {event.rewardDetails.certificates && (
                <p>📜 Certificates Provided</p>
              )}
              {event.rewardDetails.otherPrizes && (
                <p>🏆 Other Prizes: {event.rewardDetails.otherPrizes}</p>
              )}
            </div>
          )}

          {event.socialLinks.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-bold text-yellow-300">
                Follow Event:
              </h3>
              <ul className="list-disc pl-6">
                {event.socialLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          className={`mt-4 px-4 py-2 ${
            isAlreadyEnrolled
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          } text-white font-bold rounded`}
          onClick={handleEnroll}
          disabled={isAlreadyEnrolled}
        >
          {isAlreadyEnrolled ? "Enrolled" : "Enroll"}
        </button>
      </div>
    </>
  );
};

export default TEventDetails;
