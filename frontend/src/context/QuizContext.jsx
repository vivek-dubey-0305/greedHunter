import { createContext, useContext, useState } from "react";
// import  from "../services/api.js";
import { api } from "../services/api.js";
const QuizContext = createContext();

export const useQuizContext = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const getQuestion = async (question, options, correctOption) => {
    try {
      const response = await api.post("/createQuizQuestions", {
        question,
        options,
        correctOption,
      });
      //   console.log("QuizResponse..\n------------------\n", response);
      return response;
    } catch (error) {
      // console.error("error gtQ", error);
      return error;
    }
  };

  const getquizQuestions = async () => {
    try {
      const response = await api.get("/getquizQuestions");
      // console.log("GetquizQuestionReponse", response);
      return response;
    } catch (error) {
      // console.error("error Q", error);
      return error;
    }
  };

  return (
    <QuizContext.Provider value={{ getQuestion, getquizQuestions }}>
      {children}
    </QuizContext.Provider>
  );
};
