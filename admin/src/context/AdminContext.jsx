import { useContext, createContext, useState } from "react";

import { apiAdmin } from "../services/api";
// import Loader from "../components/Loader";

const AdminContext = createContext();

export const useAdminContext = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  //   const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Fetch user from backend on refresh

  const adminCred = async ({ adminName, adminPassword }) => {
    // console.log("Fields", adminName, adminPassword);
    try {
      const adminCredResponse = await apiAdmin.post("/isAdmin", {
        adminName,
        adminPassword,
      });
      // console.log("ResponseAdminCred", adminCredResponse);
      setAdmin(adminCredResponse.data);
      return adminCredResponse.data;
    } catch (error) {
      // console.error("Error ResponseAdminCred", error);
      throw new Error(error.message || "Something Went wrong adminCred!");
    }
  };

  const createEvent = async ({
    title,
    description,
    eventType,
    category,
    startTime,
    endTime,
    location,
    rules,
    rewardDetails,
    socialLinks,
  }) => {
    const fields = {
      title,
      description,
      eventType,
      category,
      startTime,
      endTime,
      location,
      rules,
      rewardDetails,
      socialLinks,
    };
    // console.log("FIELDS EVENTs", fields);

    try {
      const createEventResponse = await apiAdmin.post("/createEvent", {
        title,
        description,
        eventType,
        category,
        startTime,
        endTime,
        location,
        rules,
        rewardDetails,
        socialLinks,
      });

      // console.log("createEventResponse", createEventResponse);
      // console.log("createEventResponse", createEventResponse.data);
      return createEventResponse.data;
    } catch (error) {
      // console.log("ERROR", error);
      // console.log("ERROR", error.message);
      throw error.response.data.message || "Something went wrong";
    }
  };

  const createQuiz = async (question, options, correctOption) => {
    try {
      const response = await apiAdmin.post("/createQuizQuestions", {
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
  return (
    <AdminContext.Provider value={{ createEvent, createQuiz, adminCred }}>
      {children}
    </AdminContext.Provider>
  );
};
