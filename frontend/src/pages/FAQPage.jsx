import { greedHuntFAQ } from "../utils/data.js"; // Import FAQ data
import React, { useState, useEffect } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react"; // Icons
import Footer from "../components/Footer.jsx";

// Sample data for testing - replace with your actual data import

const FAQPage = () => {
  const [query, setQuery] = useState(""); // Search Query
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredFAQs, setFilteredFAQs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); // Stores index of open FAQ
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Extract unique categories
  const categories = [
    "All",
    ...new Set(greedHuntFAQ.map((faq) => faq.questionCategory)),
  ];

  // Filter questions dynamically when query or category changes
  useEffect(() => {
    let results = greedHuntFAQ;

    // Apply search filter if query exists
    if (query.trim() !== "") {
      results = results.filter((faq) =>
        faq.question.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply category filter if not "All"
    if (selectedCategory !== "All") {
      results = results.filter(
        (faq) => faq.questionCategory === selectedCategory
      );
    }

    setFilteredFAQs(results);

    // Fixed logic: Don't auto-change category based on search results
    // This was causing confusion in the original code
  }, [query, selectedCategory]);

  // Toggle specific question open/close
  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-2">
            <span className="text-yellow-400">Frequently </span>
            <span className="text-purple-600">Asked Questions</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about GreedHunter, our mission, and
            how you can get involved.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Search Input */}
          <div
            className={`flex items-center bg-gray-900 p-3 rounded-lg mb-6 shadow-lg border transition-all duration-300 ${
              isSearchFocused ? "border-purple-500" : "border-gray-700"
            }`}
          >
            <Search className="text-yellow-400 ml-2" size={20} />
            <input
              type="text"
              className="bg-transparent text-white p-2 flex-1 outline-none"
              placeholder="Search for a question..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>

          {/* Category Filter */}
          <div className="flex space-x-2 overflow-x-auto pb-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-md font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-yellow-400"
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
                  className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800 transition-all duration-300 hover:border-purple-800"
                >
                  {/* Question with Chevron */}
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="text-lg font-semibold text-yellow-400">
                      {faq.question}
                    </h3>
                    {openIndex === index ? (
                      <ChevronUp className="text-purple-500" />
                    ) : (
                      <ChevronDown className="text-purple-500" />
                    )}
                  </div>

                  {/* Answer - with smooth transition */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index ? "max-h-96 mt-4" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
                <div className="text-5xl mb-4 text-yellow-400">🔍</div>
                <h3 className="text-xl font-bold text-purple-400 mb-2">
                  No Questions Found
                </h3>
                <p className="text-gray-400">
                  Try adjusting your search terms or select a different
                  category.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      </div>
      <Footer />
      </>
  );
};

export default FAQPage;
