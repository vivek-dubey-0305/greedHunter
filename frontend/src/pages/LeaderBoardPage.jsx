import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { Crown, Sparkles } from "lucide-react";
import Footer from "../components/Footer";
import Loader from "../components/Loader"; // Import Loader component

const LeaderBoardPage = () => {
  const { user, getUsers, idError } = useUserContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Loader state

  useEffect(() => {
    handleGetUsers();
  }, []);

  const handleGetUsers = async () => {
    setLoading(true); // Show loader
    try {
      
      const allUsers = await getUsers();
      setUsers(allUsers.data.users);
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
          🏆
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
                  <th className="py-3 px-5">Marks</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users
                    .sort((a, b) => (b.marks || 0) - (a.marks || 0))
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
                        <td className="py-3 px-5 font-semibold">
                          {usr?.fullName}
                        </td>
                        <td className="py-3 px-5">
                          {usr.enrollmentNumber || usr.rollNumber}
                        </td>
                        <td className="py-3 px-5 font-bold text-white">
                          {usr.marks || 0}
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-500">
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
