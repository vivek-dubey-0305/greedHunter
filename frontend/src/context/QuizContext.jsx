import { createContext, useContext, useState } from "react";
// import  from "../services/api.js";
import { apiUser } from "../services/api.js";
const QuizContext = createContext();

export const useQuizContext = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const getquizQuestions = async (category,subcategory) => {
    try {
      console.log("QuizCategory", category,subcategory)
      const response = await apiUser.get(`/getquizQuestions/${category}/${subcategory}`);
      // console.log("GetquizQuestionReponse", response);
      return response;
    } catch (error) {
      console.error("error Q", error);
      return error;
    }
  };

  return (
    <QuizContext.Provider value={{ getquizQuestions }}>
      {children}
    </QuizContext.Provider>
  );
};
