// import { useState } from "react";
// import { useAdminContext } from "../context/AdminContext";

// const CreateQuizPage = () => {
//   const [question, setQuestion] = useState("");
//   const [options, setOptions] = useState(["", ""]); // At least 2 options
//   const [correctOption, setCorrectOption] = useState(null);
//   const [message, setMessage] = useState("");
//   const [pwd, setPwd] = useState("");
//   const [isAdmin, setIsAdmin] = useState(false);

//   const { createQuiz } = useAdminContext();

//   // Add new option field
//   const addOption = () => {
//     if (options.length < 5) {
//       setOptions([...options, ""]);
//     } else {
//       setMessage("Maximum of 5 options allowed.");
//     }
//   };

//   // Remove option field
//   const removeOption = (index) => {
//     const updatedOptions = options.filter((_, i) => i !== index);
//     setOptions(updatedOptions);

//     // Adjust correct option index if needed
//     if (correctOption === index) {
//       setCorrectOption(null);
//     } else if (correctOption > index) {
//       setCorrectOption(correctOption - 1);
//     }
//   };

//   // Handle option input change
//   const handleOptionChange = (index, value) => {
//     const updatedOptions = [...options];
//     updatedOptions[index] = value;
//     setOptions(updatedOptions);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!question.trim()) {
//       setMessage("Question cannot be empty.");
//       return;
//     }

//     if (options.some((option) => !option.trim())) {
//       setMessage("All options must be filled.");
//       return;
//     }

//     if (correctOption === null) {
//       setMessage("Please select the correct option.");
//       return;
//     }

//     // const quizData = { question, options, correctOption };

//     try {
//       const responseQuiz = await createQuiz(question, options, correctOption);
//       //   const response = await axios.post("/postquizQuestions", quizData);
//       // console.log(responseQuiz)
//       setMessage(
//         responseQuiz.data.message || "Quiz question created successfully!"
//       );

//       // Reset form after submission
//       setQuestion("");
//       setOptions(["", ""]);
//       setCorrectOption(null);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Something went wrong.");
//     }
//   };

//   const handleCheck = () => {
//     // window.prompt(import.meta.env.VITE_ADMIN_ID)
//     // console.log(
//     //   "import.meta.env.VITE_ADMIN_ID;",
//     //   import.meta.env.VITE_ADMIN_ID
//     // );
//     const isTrue = pwd === import.meta.env.VITE_ADMIN_ID;
//     setIsAdmin(isTrue);
//   };

//   return (
//     <>
//       {isAdmin ? (
//         <div className="h-screen w-full text-white mx-auto p-6 bg-gray-900 shadow-lg rounded-lg">
//           <h2 className="text-xl font-bold text-center mb-4">
//             Create a Quiz Question
//           </h2>

//           {message && (
//             <p className="text-red-500 text-center mb-2">{message}</p>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Question Input */}
//             <div>
//               <label className="block font-medium mb-1">Question:</label>
//               <input
//                 type="text"
//                 className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//               />
//             </div>

//             {/* Options Inputs */}
//             <div>
//               <label className="block font-medium mb-1">Options:</label>
//               {options.map((option, index) => (
//                 <div key={index} className="flex items-center space-x-2 mb-2">
//                   <input
//                     type="text"
//                     className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={option}
//                     onChange={(e) => handleOptionChange(index, e.target.value)}
//                   />
//                   <input
//                     type="radio"
//                     name="correctOption"
//                     className="w-5 h-5"
//                     checked={correctOption === index}
//                     onChange={() => setCorrectOption(index)}
//                   />
//                   {options.length > 2 && (
//                     <button
//                       type="button"
//                       className="text-red-500 text-lg"
//                       onClick={() => removeOption(index)}
//                     >
//                       ✖
//                     </button>
//                   )}
//                 </div>
//               ))}
//               {options.length < 5 && (
//                 <button
//                   type="button"
//                   className="text-blue-500 mt-2"
//                   onClick={addOption}
//                 >
//                   + Add Option
//                 </button>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full p-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
//             >
//               Submit Question
//             </button>
//           </form>
//         </div>
//       ) : (
//         <>
//           {/* Admin Password Input */}
//           <div>
//             <input
//               className="bg-black text-white h-8 w-auto"
//               type="text"
//               value={pwd}
//               onChange={(e) => setPwd(e.target.value)}
//               placeholder="Enter Admin Password"
//             />
//             <button onClick={handleCheck}>check</button>
//           </div>
//           <div className="text-red-500 mt-4">
//             You cannot create the questions...please try again
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default CreateQuizPage;

import { useState } from "react";
import { useAdminContext } from "../context/AdminContext";

const CreateQuizPage = () => {
  const [subCategory, setSubCategory] = useState(""); // Subcategory input
  const [questions, setQuestions] = useState([]); // Stores all questions
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentOptions, setCurrentOptions] = useState(["", ""]);
  const [correctOption, setCorrectOption] = useState(null);
  const [message, setMessage] = useState("");
  const [pwd, setPwd] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { createQuiz } = useAdminContext();

  // ✅ Add a question to the bulk list
  const addQuestionToList = () => {
    if (!currentQuestion.trim()) {
      setMessage("Question cannot be empty.");
      return;
    }
    if (currentOptions.some((option) => !option.trim())) {
      setMessage("All options must be filled.");
      return;
    }
    if (correctOption === null) {
      setMessage("Please select the correct option.");
      return;
    }

    const newQuestion = {
      question: currentQuestion,
      options: currentOptions,
      correctOption,
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion("");
    setCurrentOptions(["", ""]);
    setCorrectOption(null);
    setMessage("");
  };

  // ✅ Remove a question from the bulk list
  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // ✅ Add new option field
  const addOption = () => {
    if (currentOptions.length < 5) {
      setCurrentOptions([...currentOptions, ""]);
    } else {
      setMessage("Maximum of 5 options allowed.");
    }
  };

  // ✅ Remove an option
  const removeOption = (index) => {
    const updatedOptions = currentOptions.filter((_, i) => i !== index);
    setCurrentOptions(updatedOptions);

    if (correctOption === index) setCorrectOption(null);
    else if (correctOption > index) setCorrectOption(correctOption - 1);
  };

  // ✅ Handle option input change
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...currentOptions];
    updatedOptions[index] = value;
    setCurrentOptions(updatedOptions);
  };

  // ✅ Submit the bulk quiz questions
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!subCategory.trim()) {
      setMessage("Please enter a subcategory.");
      return;
    }
    if (questions.length === 0) {
      setMessage("Please add at least one question.");
      return;
    }

    try {
      const responseQuiz = await createQuiz(subCategory, questions);
      setMessage(
        responseQuiz.data.message || "Quiz questions added successfully!"
      );

      // Reset form after submission
      setSubCategory("");
      setQuestions([]);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleCheck = () => {
    const isTrue = pwd === import.meta.env.VITE_ADMIN_ID;
    setIsAdmin(isTrue);
  };

  return (
    <>
      {isAdmin ? (
        <div className="h-screen w-full text-white mx-auto p-6 bg-gray-900 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold text-center mb-4">
            Bulk Quiz Question Creator
          </h2>

          {message && (
            <p className="text-red-500 text-center mb-2">{message}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Subcategory Input */}
            <div>
              <label className="block font-medium mb-1">Subcategory:</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              />
            </div>

            {/* Question Input */}
            <div>
              <label className="block font-medium mb-1">Question:</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
              />
            </div>

            {/* Options Inputs */}
            <div>
              <label className="block font-medium mb-1">Options:</label>
              {currentOptions.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                  <input
                    type="radio"
                    name="correctOption"
                    className="w-5 h-5"
                    checked={correctOption === index}
                    onChange={() => setCorrectOption(index)}
                  />
                  {currentOptions.length > 2 && (
                    <button
                      type="button"
                      className="text-red-500 text-lg"
                      onClick={() => removeOption(index)}
                    >
                      ✖
                    </button>
                  )}
                </div>
              ))}
              {currentOptions.length < 5 && (
                <button
                  type="button"
                  className="text-blue-500 mt-2"
                  onClick={addOption}
                >
                  + Add Option
                </button>
              )}
            </div>

            {/* Add Question Button */}
            <button
              type="button"
              onClick={addQuestionToList}
              className="w-full p-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600"
            >
              + Add Question to Bulk List
            </button>

            {/* Display Bulk Questions */}
            {questions.length > 0 && (
              <div className="mt-4 p-4 bg-gray-800 rounded-md">
                <h3 className="text-lg font-bold">
                  Questions to be submitted:
                </h3>
                <ul className="list-disc pl-5">
                  {questions.map((q, index) => (
                    <li key={index} className="mb-2 flex justify-between">
                      <span>{q.question}</span>
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => removeQuestion(index)}
                      >
                        ✖ Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
            >
              Submit Bulk Quiz Questions
            </button>
          </form>
        </div>
      ) : (
        <>
          {/* Admin Password Input */}
          <div>
            <input
              className="bg-black text-white h-8 w-auto"
              type="text"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Enter Admin Password"
            />
            <button onClick={handleCheck}>Check</button>
          </div>
          <div className="text-red-500 mt-4">
            You cannot create the questions...please try again
          </div>
        </>
      )}
    </>
  );
};

export default CreateQuizPage;
