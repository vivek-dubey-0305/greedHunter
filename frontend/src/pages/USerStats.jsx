import React, { useEffect, useState } from "react";
// import { apiLeaderboard } from "../api/apiLeaderboard";
// import { Select, Card } from "@/components/ui";
import { BarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import { apiLeaderboard } from "../services/api";
import Footer from "../components/Footer";

const UserStats = () => {
  const [overallRank, setOverallRank] = useState(null);
  const [categoryRank, setCategoryRank] = useState(null);
  const [subcategoryRank, setSubcategoryRank] = useState(null);
  const [history, setHistory] = useState([]);
  const [category, setCategory] = useState("Quiz");
  const [subcategory, setSubcategory] = useState("AI");

  useEffect(() => {
    fetchOverallRank();
    fetchCategoryRank(category);
    fetchSubcategoryRank(category, subcategory);
    fetchHistory();
  }, [category, subcategory]);

  const fetchOverallRank = async () => {
      const res = await apiLeaderboard.get("/overall");
      console.log(res)
    setOverallRank(res.data);
  };

  const fetchCategoryRank = async (category) => {
    const res = await apiLeaderboard.get(`/category/${category}`);
    setCategoryRank(res.data);
  };

  const fetchSubcategoryRank = async (category, subcategory) => {
    const res = await apiLeaderboard.get(`/subcategory/${category}/${subcategory}`);
    setSubcategoryRank(res.data);
  };

  const fetchHistory = async () => {
    const res = await apiLeaderboard.get("/history");
    setHistory(res.data.history);
  };

  return (
    <>
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-900 p-5">
        <h2 className="text-xl font-bold text-yellow-400">Leaderboard</h2>
        <ul className="mt-4 space-y-3">
          <li className="cursor-pointer hover:text-yellow-400" onClick={fetchOverallRank}>
            🏆 Overall Ranking
          </li>
          <li>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Quiz">Quiz</option>
              <option value="Games">Games</option>
            </select>
            <button className="mt-2 text-purple-400" onClick={() => fetchCategoryRank(category)}>
              View Category Rank
            </button>
          </li>
          <li>
            <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
              <option value="AI">AI</option>
              <option value="OS">OS</option>
            </select>
            <button className="mt-2 text-purple-400" onClick={() => fetchSubcategoryRank(category, subcategory)}>
              View Subcategory Rank
            </button>
          </li>
          <li>
            <Link to="/head-to-head" className="text-red-400">
              ⚔️ Head-to-Head Comparison
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {overallRank && (
          <div className="p-5 bg-gray-800">
            <h3 className="text-yellow-300">🏆 Your Overall Rank: #{overallRank.rank} / {overallRank.totalPlayers}</h3>
          </div>
        )}

        {categoryRank && (
          <div className="mt-5 p-5 bg-gray-800">
            <h3 className="text-purple-300">Category Rank: #{categoryRank.rank} / {categoryRank.totalPlayers}</h3>
          </div>
        )}

        {subcategoryRank && (
          <div className="mt-5 p-5 bg-gray-800">
            <h3 className="text-blue-300">Subcategory Rank: #{subcategoryRank.rank} / {subcategoryRank.totalPlayers}</h3>
          </div>
        )}

        {/* Performance Chart */}
        <div className="mt-8 p-5 bg-gray-800">
          <h3 className="text-yellow-400">📊 Performance Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={history.map((h, i) => ({ name: `Event ${i+1}`, marks: h.marks }))}>
              <XAxis dataKey="name" stroke="#FFF" />
              <YAxis stroke="#FFF" />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.2)' }} />
              <Bar dataKey="marks" fill="#FACC15" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* History of Enrolled Events */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((event, index) => (
            <Link key={index} to="/leaderboard" className="block bg-gray-900 p-4 rounded-lg hover:bg-gray-700">
              <h4 className="text-yellow-300">{event.title}</h4>
              <p className="text-gray-400">Marks: {event.marks}</p>
            </Link>
          ))}
        </div>
      </main>
      </div>
      <Footer />
      </>
  );
};

export default UserStats;
