import React, { useEffect, useState } from "react";
// import { apiLeaderboard } from "../util//s/apiLeaderboard";
// import { Select } from "@/components/ui/select";
import { BarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Loader from "../components/Loader";
import { apiLeaderboard, apiUser } from "../services/api";

const HeadToHeadPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiUser.get("/getUsers");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

    const fetchComparison = async (userId) => {
      console.log(userId)
    setLoading(true);
    try {
      const response = await apiLeaderboard.get(`/head-to-head/${userId}`);
        setComparisonData(response.data);
        console.log(response)
    } catch (error) {
      console.error("Error fetching comparison:", error);
    }
    setLoading(false);
  };

  const COLORS = ["#facc15", "#9333ea"]; // Yellow & Purple

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-4xl font-bold text-center text-yellow-400 mb-6">⚔️ Head-to-Head Comparison</h1>
      <div className="flex justify-center mb-6">
        <select
          onChange={(e) => {
            setSelectedUser(e.target.value);
            fetchComparison(e.target.value);
          }}
          className="px-4 py-2 bg-gray-800 text-white border border-yellow-400 rounded-md"
        >
          <option value="">Select a User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>{user.fullName}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : (
        comparisonData && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-purple-400">Results Against {comparisonData.opponentName}</h2>
            
            <div className="flex gap-10 mt-6">
              {/* Win/Loss Pie Chart */}
              <div>
                <h3 className="text-xl text-yellow-400 mb-3">Win Ratio</h3>
                <PieChart width={200} height={200}>
                  <Pie
                    data={[{ name: "Wins", value: comparisonData.userWins }, { name: "Losses", value: comparisonData.losses }]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              
              {/* Score Bar Chart */}
              <div className="w-[400px]">
                <h3 className="text-xl text-yellow-400 mb-3">Score Comparison</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={comparisonData.scores}>
                    <XAxis dataKey="quiz" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Bar dataKey="yourScore" fill="#facc15" name="Your Score" />
                    <Bar dataKey="opponentScore" fill="#9333ea" name="Opponent's Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default HeadToHeadPage;