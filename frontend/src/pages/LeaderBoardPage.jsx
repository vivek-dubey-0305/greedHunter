// import React, { useState, useEffect } from "react";
// import { useUserContext } from "../context/UserContext";
// import { useEventContext } from "../context/EventContex";
// import { motion } from "framer-motion";
// import { Crown, Sparkles } from "lucide-react";
// import Loader from "../components/Loader";

// import { io } from "socket.io-client";

// // const socket = io("http://localhost:8000"); // ✅ Connect to WebSocket server
// const socket = io("http://localhost:8000", { transports: ["websocket"] });

// const LeaderBoardPage = () => {
//   const { getUsers } = useUserContext();
//   const { getEvents } = useEventContext();

//   const [events, setEvents] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [subcategories, setSubcategories] = useState([]);
//   const [selectedSubcategory, setSelectedSubcategory] = useState("");
//   const [eventList, setEventList] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await getEvents();
//       setEvents(response);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };

//   const fetchLeaderboard = async (eventId) => {
//     setLoading(true);
//     try {
//       const allUsers = await getUsers();
//       const filteredUsers = allUsers.data.users
//         .map((usr) => {
//           const enrolledEvents =
//             usr.enrolledEvents?.[selectedCategory]?.[selectedSubcategory] || [];
//           console.log("enrolledEvents", enrolledEvents);
//           const matchedEvent = enrolledEvents.find(
//             (evt) => evt.eventId === eventId
//           );
//           // console.log(matchedEvent.marks)
//           return matchedEvent
//             ? {
//                 ...usr,
//                 marks: matchedEvent.marks || 0,
//                 isPlayed: matchedEvent.isPlayed || false,
//               }
//             : null;
//         })
//         .filter(Boolean)
//         .filter((usr) => usr.isPlayed)
//         .sort((a, b) => b.marks - a.marks);

//       setUsers(filteredUsers);
//     } catch (error) {
//       console.error("Error fetching leaderboard:", error);
//     }
//     setLoading(false);
//   };

//   const handleCategoryChange = (e) => {
//     const category = e.target.value;
//     setSelectedCategory(category);
//     setSelectedSubcategory("");
//     setSelectedEvent(null);
//     const subcategoriesList = Object.keys(
//       events.find((event) => event.category === category)?.subcategories || {}
//     );
//     setSubcategories(subcategoriesList);
//   };

//   const handleSubcategorySelect = (subcategory) => {
//     setSelectedSubcategory(subcategory);
//     setSelectedEvent(null);
//     const eventData =
//       events.find((evt) => evt.category === selectedCategory)?.subcategories[
//         subcategory
//       ] || [];
//     setEventList(eventData);
//   };

//   useEffect(() => {
//     // ✅ Listen for real-time leaderboard updates
//     socket.on("leaderboardUpdate", (data) => {
//       console.log("Leaderboard Updated:", data);

//       // ✅ Only update if the event matches the selected one
//       if (selectedEvent && data.eventId === selectedEvent._id) {
//         setUsers((prevUsers) => {
//           const updatedUsers = [...prevUsers];
//           const userIndex = updatedUsers.findIndex(
//             (user) =>
//               user.enrollmentNumber === data.updatedUser.enrollmentNumber
//           );

//           if (userIndex !== -1) {
//             // ✅ Update existing user's marks
//             updatedUsers[userIndex].marks = data.updatedUser.marks;
//           } else {
//             // ✅ Add new user if not found
//             updatedUsers.push(data.updatedUser);
//           }

//           return updatedUsers.sort((a, b) => b.marks - a.marks); // ✅ Sort leaderboard
//         });
//       }
//     });

//     return () => {
//       socket.off("leaderboardUpdate"); // ✅ Clean up on unmount
//     };
//   }, [selectedEvent]);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-10">
//       <h1 className="text-4xl font-bold text-center text-yellow-400 mb-6">
//         🏆 Leaderboard
//       </h1>

//       <div className="flex flex-col items-center">
//         <select
//           onChange={handleCategoryChange}
//           className="px-4 py-2 mb-6 bg-gray-800 text-white border border-green-400 rounded-md"
//           value={selectedCategory}
//         >
//           <option value="">Select Category</option>
//           {events.map((event, index) => (
//             <option key={index} value={event.category}>
//               {event.category}
//             </option>
//           ))}
//         </select>
//       </div>

//       {selectedCategory && (
//         <div className="flex flex-wrap justify-center gap-6">
//           {subcategories.map((subcategory, index) => (
//             <motion.div
//               key={index}
//               className="bg-blue-500 p-6 text-white text-lg font-bold rounded-lg cursor-pointer shadow-lg transform transition-all hover:scale-105"
//               onClick={() => handleSubcategorySelect(subcategory)}
//             >
//               {subcategory}
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {selectedSubcategory && (
//         <div className="mt-6">
//           <h2 className="text-2xl font-bold text-yellow-300 text-center">
//             Events in {selectedSubcategory}
//           </h2>
//           <div className="flex flex-wrap justify-center gap-6 mt-4">
//             {eventList.map((event) => (
//               <motion.div
//                 key={event._id}
//                 className="bg-gray-800 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-700"
//                 onClick={() => {
//                   setSelectedEvent(event);
//                   fetchLeaderboard(event._id);
//                 }}
//               >
//                 <h3 className="font-bold">{event.title}</h3>
//                 <p className="text-sm text-gray-400">
//                   📅 {new Date(event.startTime).toLocaleString()}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       )}

//       {selectedEvent && (
//         <div className="mt-6">
//           <h2 className="text-2xl font-bold text-green-300 text-center">
//             Leaderboard for {selectedEvent.title}
//           </h2>
//           {loading ? (
//             <Loader />
//           ) : (
//             <table className="w-full max-w-4xl mx-auto mt-4 bg-gray-800 rounded-lg overflow-hidden">
//               <thead>
//                 <tr className="bg-gray-700 text-white">
//                   <th className="p-3">Rank</th>
//                   <th className="p-3">Name</th>
//                   <th className="p-3">Enrollment No.</th>
//                   <th className="p-3">Marks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.length > 0 ? (
//                   users.map((usr, index) => (
//                     <>
//                       {/* <tr key={usr.username} className="border-b text-green-700">
//                           <td className="p-3 font-semibold text-white">  {`${usr.isPlayed}`}</td>
                      
//                         </tr> */}

//                       <tr key={usr._id} className="border-b text-white">
//                         <td className="p-3 flex items-center gap-2">
//                           {index === 0 ? (
//                             <Crown
//                               className="text-yellow-300 animate-pulse"
//                               size={20}
//                             />
//                           ) : (
//                             index + 1
//                           )}
//                         </td>
//                         <td className="p-3 font-semibold">{usr.fullName}</td>
//                         <td className="p-3">
//                           {usr.enrollmentNumber || usr.rollNumber}
//                         </td>
//                         <td className="p-3 font-bold">{usr.marks || 0}</td>
//                       </tr>
//                     </>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="p-4 text-center text-gray-500">
//                       No users found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LeaderBoardPage;

// import React, { useState, useEffect } from "react";
// import { useUserContext } from "../context/UserContext";
// import { useEventContext } from "../context/EventContex";
// import { Crown, Sparkles } from "lucide-react";
// import Footer from "../components/Footer";
// import Loader from "../components/Loader";

// const LeaderBoardPage = () => {
//   const { user, getUsers } = useUserContext();
//   const { getEvents } = useEventContext();

//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [events, setEvents] = useState([]); // Store all events
//   const [selectedCategory, setSelectedCategory] = useState(""); // Selected main category
//   const [subcategories, setSubcategories] = useState([]); // Subcategories of selected category
//   const [selectedSubcategory, setSelectedSubcategory] = useState(""); // Selected subcategory

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   // ✅ Fetch all events from backend
//   const fetchEvents = async () => {
//     try {
//       const response = await getEvents();
//       setEvents(response); // Store all events correctly
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };

//   // ✅ Fetch leaderboard dynamically based on selected category & subcategory
//   const fetchLeaderboard = async () => {
//     if (!selectedCategory || !selectedSubcategory) return;

//     setLoading(true);
//     try {
//       const allUsers = await getUsers();
//       console.log("ALLUSERs", allUsers)

//       const filteredUsers = allUsers.data.users.map((usr) => {
//         // ✅ Extract user's enrolled events correctly from Map structure
//         const enrolledEvents = usr.enrolledEvents?.[selectedCategory][selectedSubcategory] || [];
//         console.log("EnrolledEvents...", enrolledEvents)

//         return {
//           ...usr,
//           marks: enrolledEvents.reduce((total, event) => total + (event.marks || 0), 0), // Sum marks of all enrolled events
//         };
//       });

//       // ✅ Only keep users with valid marks (to avoid empty leaderboard)
//       const sortedUsers = filteredUsers.filter(usr => usr.marks > 0).sort((a, b) => b.marks - a.marks);

//       setUsers(sortedUsers);
//     } catch (error) {
//       console.error("Error fetching leaderboard:", error);
//     }
//     setLoading(false);
//   };

//   // ✅ Handle category selection
//   const handleCategoryChange = (e) => {
//     const category = e.target.value;
//     setSelectedCategory(category);
//     setSelectedSubcategory("");

//     // ✅ Extract subcategories dynamically
//     const subcategoriesList = Object.keys(
//       events.find((event) => event.category === category)?.subcategories || {}
//     );
//     setSubcategories(subcategoriesList);
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 flex flex-col items-center py-10">
//         <h1 className="text-4xl font-bold text-white mb-6 flex items-center gap-2 animate-bounce">
//           🏆 Leaderboard
//         </h1>

//         {/* Category Selection */}
//         <select
//           onChange={handleCategoryChange}
//           className="px-4 py-2 mb-6 bg-gray-800 text-white border border-green-400 rounded-md"
//           value={selectedCategory}
//         >
//           <option value="">Select Category</option>
//           {events.map((event, index) => (
//             <option key={index} value={event.category}>
//               {event.category}
//             </option>
//           ))}
//         </select>

//         {/* Subcategory List */}
//         {selectedCategory && (
//           <div className="flex flex-wrap gap-4 mb-6">
//             {subcategories.length > 0 ? (
//               subcategories.map((subcategory, index) => (
//                 <button
//                   key={index}
//                   className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-md transition-all shadow-lg cursor-pointer ${
//                     selectedSubcategory === subcategory
//                       ? "bg-green-500"
//                       : "hover:bg-blue-700"
//                   }`}
//                   onClick={() => {
//                     setSelectedSubcategory(subcategory);
//                     fetchLeaderboard();
//                   }}
//                 >
//                   {subcategory}
//                 </button>
//               ))
//             ) : (
//               <p className="text-white">No subcategories available.</p>
//             )}
//           </div>
//         )}

//         {/* Leaderboard Table */}
//         {selectedSubcategory && (
//           <>
//             {loading ? (
//               <Loader />
//             ) : (
//               <div className="w-full max-w-auto bg-none border-l-4 border-l-green-500 border-r-4 border-r-green-500 shadow-2xl rounded-xl overflow-hidden p-3">
//                 <table className="w-full table-auto text-left border-collapse">
//                   <thead>
//                     <tr className="bg-gray-800 text-white">
//                       <th className="py-3 px-5">Rank</th>
//                       <th className="py-3 px-5">Name</th>
//                       <th className="py-3 px-5">Enrollment No.</th>
//                       <th className="py-3 px-5">Marks</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {users.length > 0 ? (
//                       users.map((usr, index) => (
//                         <tr
//                           key={usr._id}
//                           className={`border-b ${
//                             user?._id === usr._id
//                               ? "bg-yellow-200"
//                               : "bg-blue-700 text-white"
//                           } hover:bg-blue-500 transition-all duration-300 ${
//                             index === 0
//                               ? "bg-purple-700 text-white font-bold text-lg hover:bg-purple-400"
//                               : index === 1
//                               ? "bg-purple-600 text-white font-semibold hover:bg-purple-400"
//                               : index === 2
//                               ? "bg-purple-500 text-white font-medium hover:bg-purple-400"
//                               : ""
//                           }`}
//                         >
//                           <td className="py-3 px-5 flex items-center gap-2">
//                             {index === 0 && (
//                               <Crown
//                                 className="text-yellow-300 animate-pulse"
//                                 size={20}
//                               />
//                             )}
//                             {index === 1 && (
//                               <Sparkles
//                                 className="text-yellow-300 animate-pulse"
//                                 size={20}
//                               />
//                             )}
//                             {index === 2 && (
//                               <Sparkles
//                                 className="text-yellow-300 animate-pulse"
//                                 size={20}
//                               />
//                             )}
//                             {index + 1}
//                           </td>
//                           <td className="py-3 px-5 font-semibold">
//                             {usr?.fullName}
//                           </td>
//                           <td className="py-3 px-5">
//                             {usr.enrollmentNumber || usr.rollNumber}
//                           </td>
//                           <td className="py-3 px-5 font-bold text-white">
//                             {usr.marks || 0}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td
//                           colSpan="4"
//                           className="py-4 text-center text-gray-500"
//                         >
//                           No users found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             <button
//               className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-950 border-l-4 border-l-green-500 text-white font-semibold rounded-lg transition-all shadow-lg cursor-pointer"
//               onClick={fetchLeaderboard}
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Refresh Leaderboard"}
//             </button>
//           </>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default LeaderBoardPage;

// import React, { useState, useEffect } from "react";
// import { useUserContext } from "../context/UserContext";
// import { Crown, Sparkles } from "lucide-react";
// import Footer from "../components/Footer";
// import Loader from "../components/Loader";
// import { useEventContext } from "../context/EventContex";

// const LeaderBoardPage = () => {
//   const { user, getUsers } = useUserContext();
//   const { getEvents } = useEventContext();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [events, setEvents] = useState([]); // Store all events
//   const [selectedCategory, setSelectedCategory] = useState(""); // Selected main category
//   const [subcategories, setSubcategories] = useState([]); // Subcategories of selected category
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null); // Selected subcategory

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await getEvents();
//       setEvents(response.events); // Store all events
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };

//   const fetchLeaderboard = async (eventId, category) => {
//     setLoading(true);
//     try {
//       const allUsers = await getUsers();
//       const filteredUsers = allUsers.data.users.filter((usr) =>
//         usr.enrolledEvents.some(
//           (event) => event.eventId === eventId && event.category === category
//         )
//       );

//       setUsers(
//         filteredUsers.map((usr) => ({
//           ...usr,
//           marks:
//             usr.enrolledEvents.find(
//               (event) =>
//                 event.eventId === eventId && event.category === category
//             )?.marks || 0,
//         }))
//       );
//     } catch (error) {
//       console.error("Error fetching leaderboard:", error);
//     }
//     setLoading(false);
//   };

//   // Handle category selection
//   const handleCategoryChange = (e) => {
//     const category = e.target.value;
//     setSelectedCategory(category);
//     setSelectedSubcategory(null);

//     const filteredSubcategories = events
//       .filter((event) => event.title === category)
//       .map((event) => event.category);
//     setSubcategories([...new Set(filteredSubcategories)]); // Unique subcategories
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 flex flex-col items-center py-10">
//         <h1 className="text-4xl font-bold text-white mb-6 flex items-center gap-2 animate-bounce">
//           🏆 Leaderboard
//         </h1>

//         {/* Category Selection */}
//         <select
//           onChange={handleCategoryChange}
//           className="px-4 py-2 mb-6 bg-gray-800 text-white border border-green-400 rounded-md"
//           value={selectedCategory}
//         >
//           <option value="">Select Category</option>
//           {events.map((event, index) => (
//             <option key={index} value={event.title}>
//               {event.title}
//             </option>
//           ))}
//         </select>

//         {/* Subcategory List */}
//         {selectedCategory && (
//           <div className="flex flex-wrap gap-4 mb-6">
//             {subcategories.length > 0 ? (
//               subcategories.map((subcategory, index) => (
//                 <button
//                   key={index}
//                   className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-md transition-all shadow-lg cursor-pointer ${
//                     selectedSubcategory === subcategory
//                       ? "bg-green-500"
//                       : "hover:bg-blue-700"
//                   }`}
//                   onClick={() => {
//                     setSelectedSubcategory(subcategory);
//                     const selectedEvent = events.find(
//                       (event) =>
//                         event.title === selectedCategory &&
//                         event.category === subcategory
//                     );
//                     fetchLeaderboard(selectedEvent._id, subcategory);
//                   }}
//                 >
//                   {subcategory}
//                 </button>
//               ))
//             ) : (
//               <p className="text-white">No subcategories available.</p>
//             )}
//           </div>
//         )}

//         {/* Leaderboard Table */}
//         {selectedSubcategory && (
//           <>
//             {loading ? (
//               <Loader />
//             ) : (
//               <div className="w-full max-w-auto bg-none border-l-4 border-l-green-500 border-r-4 border-r-green-500 shadow-2xl rounded-xl overflow-hidden p-3">
//                 <table className="w-full table-auto text-left border-collapse">
//                   <thead>
//                     <tr className="bg-gray-800 text-white">
//                       <th className="py-3 px-5">Rank</th>
//                       <th className="py-3 px-5">Name</th>
//                       <th className="py-3 px-5">Enrollment No.</th>
//                       <th className="py-3 px-5">Marks</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {users.length > 0 ? (
//                       users
//                         .sort((a, b) => b.marks - a.marks)
//                         .map((usr, index) => (
//                           <tr
//                             key={usr._id}
//                             className={`border-b ${
//                               user?._id === usr._id
//                                 ? "bg-yellow-200"
//                                 : "bg-blue-700 text-white"
//                             } hover:bg-blue-500 transition-all duration-300 ${
//                               index === 0
//                                 ? "bg-purple-700 text-white font-bold text-lg hover:bg-purple-400"
//                                 : index === 1
//                                 ? "bg-purple-600 text-white font-semibold hover:bg-purple-400"
//                                 : index === 2
//                                 ? "bg-purple-500 text-white font-medium hover:bg-purple-400"
//                                 : ""
//                             }`}
//                           >
//                             <td className="py-3 px-5 flex items-center gap-2">
//                               {index === 0 && (
//                                 <Crown
//                                   className="text-yellow-300 animate-pulse"
//                                   size={20}
//                                 />
//                               )}
//                               {index === 1 && (
//                                 <Sparkles
//                                   className="text-yellow-300 animate-pulse"
//                                   size={20}
//                                 />
//                               )}
//                               {index === 2 && (
//                                 <Sparkles
//                                   className="text-yellow-300 animate-pulse"
//                                   size={20}
//                                 />
//                               )}
//                               {index + 1}
//                             </td>
//                             <td className="py-3 px-5 font-semibold">
//                               {usr?.fullName}
//                             </td>
//                             <td className="py-3 px-5">
//                               {usr.enrollmentNumber || usr.rollNumber}
//                             </td>
//                             <td className="py-3 px-5 font-bold text-white">
//                               {usr.marks || 0}
//                             </td>
//                           </tr>
//                         ))
//                     ) : (
//                       <tr>
//                         <td
//                           colSpan="4"
//                           className="py-4 text-center text-gray-500"
//                         >
//                           No users found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             <button
//               className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-950 border-l-4 border-l-green-500 text-white font-semibold rounded-lg transition-all shadow-lg cursor-pointer"
//               onClick={() => fetchLeaderboard(selectedSubcategory._id)}
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Refresh Leaderboard"}
//             </button>
//           </>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default LeaderBoardPage;






// import React, { useState, useEffect } from "react";
// import { useUserContext } from "../context/UserContext";
// import { Crown, Sparkles } from "lucide-react";
// import Footer from "../components/Footer";
// import Loader from "../components/Loader"; // Import Loader component

// const LeaderBoardPage = () => {
//   const { user, getUsers } = useUserContext();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false); // Loader state

//   useEffect(() => {
//     handleGetUsers();
//   }, []);

//   const handleGetUsers = async () => {
//     setLoading(true); // Show loader
//     try {

//       const allUsers = await getUsers();
//       console.log("ALLUsers", allUsers)
//       setUsers(allUsers.data.users);
//     } catch (error) {
//       window.prompt(
//         "No User Found...please try again after a while, or contact the developer\nPlease Write your valuable feedback here!"
//       );
//     }
//     setLoading(false); // Hide loader
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 flex flex-col items-center py-10">
//         <h1 className="text-4xl font-bold text-white mb-6 flex items-center gap-2 animate-bounce">
//           🏆
//         </h1>

//         {loading ? ( // Show loader while fetching data
//           <Loader />
//         ) : (
//           <div className="w-full max-w-auto bg-none border-l-4 border-l-green-500 border-r-4 border-r-green-500 shadow-2xl rounded-xl overflow-hidden p-3">
//             <table className="w-full table-auto text-left border-collapse">
//               <thead>
//                 <tr className="bg-gray-800 text-white">
//                   <th className="py-3 px-5">Rank</th>
//                   <th className="py-3 px-5">Name</th>
//                   <th className="py-3 px-5">Enrollment No.</th>
//                   <th className="py-3 px-5">Marks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.length > 0 ? (
//                   users.enrolledEvents
//                     .sort((a, b) => (b.marks || 0) - (a.marks || 0))
//                     .map((usr, index) => (
//                       <tr
//                         key={usr._id}
//                         className={`border-b ${
//                           user?._id === usr._id
//                             ? "bg-yellow-200"
//                             : "bg-blue-700 text-white"
//                         } hover:bg-blue-500 transition-all duration-300 ${
//                           index === 0
//                             ? "bg-purple-700 text-white font-bold text-lg hover:bg-purple-400"
//                             : index === 1
//                             ? "bg-purple-600 text-white font-semibold hover:bg-purple-400"
//                             : index === 2
//                             ? "bg-purple-500 text-white font-medium hover:bg-purple-400"
//                             : ""
//                         }`}
//                       >
//                         <td className="py-3 px-5 flex items-center gap-2">
//                           {index === 0 && (
//                             <Crown
//                               className="text-yellow-300 animate-pulse"
//                               size={20}
//                             />
//                           )}
//                           {index === 1 && (
//                             <Sparkles
//                               className="text-yellow-300 animate-pulse"
//                               size={20}
//                             />
//                           )}
//                           {index === 2 && (
//                             <Sparkles
//                               className="text-yellow-300 animate-pulse"
//                               size={20}
//                             />
//                           )}
//                           {index + 1}
//                         </td>
//                         <td className="py-3 px-5 font-semibold">
//                           {usr?.fullName}
//                         </td>
//                         <td className="py-3 px-5">
//                           {usr.enrollmentNumber || usr.rollNumber}
//                         </td>
//                         <td className="py-3 px-5 font-bold text-white">
//                           {usr.marks || 0}
//                         </td>
//                       </tr>
//                     ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="py-4 text-center text-gray-500">
//                       No users found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <button
//           className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-950 border-l-4 border-l-green-500 text-white font-semibold rounded-lg transition-all shadow-lg cursor-pointer"
//           onClick={handleGetUsers}
//           disabled={loading}
//         >
//           {loading ? "Loading..." : "Refresh Leaderboard"}
//         </button>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default LeaderBoardPage;






import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { Crown, Sparkles } from "lucide-react";
import Footer from "../components/Footer";
import Loader from "../components/Loader"; // Import Loader component

const LeaderBoardPage = () => {
  const { user, getUsers } = useUserContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Loader state

  useEffect(() => {
    handleGetUsers();
  }, []);

  const handleGetUsers = async () => {
    setLoading(true); // Show loader
    try {
      const response = await getUsers();
      console.log("ALL USERS RESPONSE:", response);

      if (response?.data?.users) {
        setUsers(response.data.users);
      } else {
        setUsers([]); // Prevents errors if data is missing
      }
    } catch (error) {
      window.prompt(
        "No User Found...please try again after a while, or contact the developer\nPlease Write your valuable feedback here!"
      );
    }
    setLoading(false); // Hide loader
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold text-white mb-6 flex items-center gap-2 animate-bounce">
          🏆 Leaderboard
        </h1>

        {loading ? ( // Show loader while fetching data
          <Loader />
        ) : (
          <div className="w-full max-w-auto bg-none border-l-4 border-l-green-500 border-r-4 border-r-green-500 shadow-2xl rounded-xl overflow-hidden p-3">
            <table className="w-full table-auto text-left border-collapse">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="py-3 px-5">Rank</th>
                  <th className="py-3 px-5">Name</th>
                  <th className="py-3 px-5">Enrollment No.</th>
                  <th className="py-3 px-5">Category</th>
                  <th className="py-3 px-5">Subcategory</th>
                  <th className="py-3 px-5">Marks</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users
                    .map((usr) => ({
                      ...usr,
                      // Get highest marks from enrolled events
                      highestEvent:
                        usr.enrolledEvents?.reduce(
                          (max, event) =>
                            event.marks > (max?.marks || 0) ? event : max,
                          {}
                        ) || {},
                    }))
                    .filter((usr) => usr.highestEvent.marks !== undefined) // Remove users without marks
                    .sort(
                      (a, b) =>
                        (b.highestEvent.marks || 0) - (a.highestEvent.marks || 0)
                    )
                    .map((usr, index) => (
                      <tr
                        key={usr._id}
                        className={`border-b ${
                          user?._id === usr._id
                            ? "bg-yellow-200"
                            : "bg-blue-700 text-white"
                        } hover:bg-blue-500 transition-all duration-300 ${
                          index === 0
                            ? "bg-purple-700 text-white font-bold text-lg hover:bg-purple-400"
                            : index === 1
                            ? "bg-purple-600 text-white font-semibold hover:bg-purple-400"
                            : index === 2
                            ? "bg-purple-500 text-white font-medium hover:bg-purple-400"
                            : ""
                        }`}
                      >
                        <td className="py-3 px-5 flex items-center gap-2">
                          {index === 0 && (
                            <Crown
                              className="text-yellow-300 animate-pulse"
                              size={20}
                            />
                          )}
                          {index === 1 && (
                            <Sparkles
                              className="text-yellow-300 animate-pulse"
                              size={20}
                            />
                          )}
                          {index === 2 && (
                            <Sparkles
                              className="text-yellow-300 animate-pulse"
                              size={20}
                            />
                          )}
                          {index + 1}
                        </td>
                        <td className="py-3 px-5 font-semibold">{usr?.fullName}</td>
                        <td className="py-3 px-5">
                          {usr.enrollmentNumber || usr.rollNumber}
                        </td>
                        <td className="py-3 px-5 font-semibold">
                          {usr.highestEvent.category || "N/A"}
                        </td>
                        <td className="py-3 px-5 font-semibold">
                          {usr.highestEvent.subcategory || "N/A"}
                        </td>
                        <td className="py-3 px-5 font-bold text-white">
                          {usr.highestEvent.marks || 0}
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-4 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <button
          className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-950 border-l-4 border-l-green-500 text-white font-semibold rounded-lg transition-all shadow-lg cursor-pointer"
          onClick={handleGetUsers}
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh Leaderboard"}
        </button>
      </div>
      <Footer />
    </>
  );
};

export default LeaderBoardPage;
