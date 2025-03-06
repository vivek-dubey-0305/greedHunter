// import { useUserContext } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";

// const DashboardPage = () => {
//   const { user, logoutUser } = useUserContext();

//   const navigate = useNavigate();
//   const handleLogOut = async () => {
//     const res = await logoutUser();
//     console.log("REs", res);
//   };

//   return (
//     <div>
//       <h1>Welcome, {user?.fullName}</h1>
//       <p>Email: {user?.email}</p>
//       <p>Phone: {user?.phone}</p>
//       <button onClick={handleLogOut}>Logout</button>
//       <div>
//         {user?.isProfileCompleted ? (
//           <div>
//             <div>
//               <h1>Completed</h1>
//               <button className="bg-black z-50 text-white rounded-full w-auto h-auto fixed top-20 right-0 font-bold underline">
//                 wallet
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div>
//             <h1>Incomplete</h1>
//             <button
//               onClick={() => navigate("/completeProfile")}
//               className="bg-blue-700 font-bold text-white"
//             >
//               Complete Your profile
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useUserContext();
  const [scheduledEvents, setScheduledEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        // const response = await axios.get(`/api/user/${user._id}`);
        console.log("USER..DASHBOARD", user);
        const events = user.enrolledEvents || user.user.enrolledEvents;

        console.log("EVENTS>>>>\n", events);
        const now = new Date();
        const filteredEvents = events.filter(
          (event) => new Date(event.endTime) > now
        );
        console.log("FILTERED EVERNT---------\n", filteredEvents);
        setScheduledEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching scheduled events:", error);
      }
    };

    fetchUserEvents();
  }, [user._id || user.user._id]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <aside className="w-64 bg-gray-800 p-6">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <ul className="mt-4">
          <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">
            Schedule
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Scheduled Events</h2>
        {scheduledEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scheduledEvents.map((event) => (
              <div
                key={event.eventId}
                className="bg-gray-800 p-4 rounded-lg shadow-lg"
              >
                <h3 className="text-lg font-bold">{event.title}</h3>
                <p className="text-gray-400">{event.category}</p>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                  onClick={() => navigate("/greed-of-sanskrit")}
                >
                  Go to Quiz
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No upcoming events.</p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
