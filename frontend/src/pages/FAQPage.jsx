import React, { useState, useEffect } from "react";
import { greedHuntFAQ } from "../utils/data.js"; // Import FAQ data
import { Search, ChevronDown, ChevronUp } from "lucide-react"; // Icons

const FAQPage = () => {
  const [query, setQuery] = useState(""); // Search Query
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredFAQs, setFilteredFAQs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); // Stores index of open FAQ

  // Extract unique categories
  const categories = ["All", ...new Set(greedHuntFAQ.map((faq) => faq.questionCategory))];

  // Filter questions dynamically
  useEffect(() => {
    let results = greedHuntFAQ.filter((faq) =>
      faq.question.toLowerCase().includes(query.toLowerCase())
    );

    if (selectedCategory !== "All") {
      results = results.filter((faq) => faq.questionCategory === selectedCategory);
    }

    // Auto-update category based on search results
    if (query) {
      const foundCategory = results.length > 0 ? results[0].questionCategory : "All";
      setSelectedCategory(foundCategory);
    }

    setFilteredFAQs(results);
  }, [query, selectedCategory]);

  // Toggle specific question open/close
  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">
          GreedHunt FAQ
        </h1>

        {/* Search Input */}
        <div className="flex items-center bg-gray-800 p-2 rounded-lg mb-4 shadow-lg">
          <Search className="text-gray-400 ml-2" />
          <input
            type="text"
            className="bg-transparent text-white p-2 flex-1 outline-none"
            placeholder="Search for a question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide mb-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md font-semibold transition-all ${
                selectedCategory === category
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-purple-500"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg shadow-md transition-all hover:shadow-lg hover:bg-gray-700"
              >
                {/* Question with Chevron */}
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold text-purple-300">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="text-purple-400" />
                  ) : (
                    <ChevronDown className="text-purple-400" />
                  )}
                </div>

                {/* Answer - only visible if open */}
                {openIndex === index && (
                  <p className="text-gray-400 mt-2 transition-all duration-300 ease-in-out">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No questions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
