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

  // const createEvent = async ({
  //   title,
  //   description,
  //   eventType,
  //   category,
  //   startTime,
  //   endTime,
  //   location,
  //   rules,
  //   rewardDetails,
  //   socialLinks,
  // }) => {
  //   const fields = {
  //     title,
  //     description,
  //     eventType,
  //     category,
  //     startTime,
  //     endTime,
  //     location,
  //     rules,
  //     rewardDetails,
  //     socialLinks,
  //   };
  //   // console.log("FIELDS EVENTs", fields);

  //   try {
  //     const createEventResponse = await apiAdmin.post("/createEvent", {
  //       title,
  //       description,
  //       eventType,
  //       category,
  //       startTime,
  //       endTime,
  //       location,
  //       rules,
  //       rewardDetails,
  //       socialLinks,
  //     });

  //     // console.log("createEventResponse", createEventResponse);
  //     // console.log("createEventResponse", createEventResponse.data);
  //     return createEventResponse.data;
  //   } catch (error) {
  //     // console.log("ERROR", error);
  //     // console.log("ERROR", error.message);
  //     throw error.response.data.message || "Something went wrong";
  //   }
  // };





  // *
  
  const createEvent = async ({
    title,
    description,
    eventType,
    category,
    subcategory,
    startTime,
    endTime,
    location,
    price,
    isFree,
    rules,
    rewardDetails,
    socialLinks,
  }) => {
    try {
      // ✅ Convert rules & socialLinks to arrays if not already
      const formattedRules = Array.isArray(rules) ? rules : rules.split(",");
      const formattedSocialLinks = Array.isArray(socialLinks)
        ? socialLinks
        : socialLinks.split(",");
  
      const createEventResponse = await apiAdmin.post("/createEvent", {
        title,
        description,
        eventType,
        category,
        subcategory,
        startTime,
        endTime,
        location: eventType === "physical" ? location : "",
        price,
        isFree,
        rules: formattedRules,
        rewardDetails,
        socialLinks: formattedSocialLinks,
      });
  
      return createEventResponse.data;
    } catch (error) {
      throw error.response?.data?.message || "Something went wrong";
    }
  };
  

  

  const createQuiz = async (subCategory, questions) => {
    try {
      const response = await apiAdmin.post("/createQuizQuestions", {
        subCategory,
        questions,
      });
      //   console.log("QuizResponse..\n------------------\n", response);
      return response;
    } catch (error) {
      console.error("error gtQ", error);
      throw error.response || "Something Went wrong!!";
      // return error;
    }
  };
  return (
    <AdminContext.Provider value={{ createEvent, createQuiz, adminCred }}>
      {children}
    </AdminContext.Provider>
  );
};
