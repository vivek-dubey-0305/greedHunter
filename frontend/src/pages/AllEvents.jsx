import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { getEvents } from "../context/EventContext";
import { useEventContext } from "../context/EventContex";
import Footer from "../components/Footer";

const TAllEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const {getEvents} = useEventContext()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await getEvents();
        setEvents(allEvents); // Ensure events is an array
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">
        All Events
      </h1>

      {events.length > 0 ? (
        events.map(({ category, subcategories }) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-300">{category}</h2>

            {Object.entries(subcategories).map(([subcategoryName, eventArray]) => (
              <div key={subcategoryName} className="mt-4">
                <h3 className="text-xl font-semibold text-yellow-200">{subcategoryName}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {eventArray.length > 0 ? (
                    eventArray.map((event) => (
                      <div
                        key={event._id}
                        className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition"
                        onClick={() => navigate(`/event/${category}/${subcategoryName}/${event._id}`)}
                      >
                        <h2 className="text-xl font-bold text-yellow-300">{event.title}</h2>
                        <p className="mt-2">{event.description.substring(0, 100)}...</p>
                        <p className="text-sm mt-2">📅 {new Date(event.startTime).toLocaleString()} - {new Date(event.endTime).toLocaleString()}</p>
                        <p className="text-sm mt-2">🎭 Type: {event.eventType}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No events available</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400">No events found</p>
      )}
    </div>
          <Footer />
          </>
  );
};

export default TAllEvents;



// import { useEffect, useState } from "react";
// // import { useEventContext } from "../context/EventContext";
// import { useNavigate } from "react-router-dom";
// import { useEventContext } from "../context/EventContex";

// const TAllEvents = () => {
//   const { getEvents } = useEventContext();
//   const [events, setEvents] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const allEvents = await getEvents();
//         setEvents(allEvents.events); // Assuming API returns { success, events: [...] }
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">
//         All Events
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//         {events.length > 0 ? (
//           events.map((event) => (
//             <div
//               key={event._id}
//               className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition"
//               onClick={() => navigate(`/event/${event._id}`)}
//             >
//               <h2 className="text-xl font-bold text-yellow-300">
//                 {event.title}
//               </h2>
//               {/* <div className="fixed flex items-center justify-center">
//               </div> */}
//                 <p className="text-sm text-gray-400">{event.category}</p>
//                 {/* <span className="relative top-0 -right-60 text-sm font-bold bg-green-500/10 h-auto w-auto px-1 pb-1 text-center items-center rounded-full text-green-400">
//                   {event.isFree || event.price}
//                 </span> */}
//               <p className="mt-2">{event.description.substring(0, 100)}...</p>
//               <p className="text-sm mt-2">
//                 📅 {new Date(event.startTime).toLocaleString()} -{" "}
//                 {new Date(event.endTime).toLocaleString()}
//               </p>
//               <p className="text-sm mt-2">🎭 Type: {event.eventType}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-center">No events found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TAllEvents;
