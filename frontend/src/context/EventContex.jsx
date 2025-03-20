import { useContext, createContext, useState, useEffect } from "react";
import { apiUser } from "../services/api.js";

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {


  // const getEvent = async (eventId) => {
  //   try {
  //     const response = await apiUser.get(`/getEvent/${eventId}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching event:", error);
  //     throw error.response?.data || "Failed to fetch event";
  //   }
  // };

  // const getEvents = async () => {
  //   try {
  //     const response = await apiUser.get("/getAllEvents");
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching events:", error);
  //     throw error.response?.data || "Failed to fetch events";
  //   }
  // };







  
  

  const getEvent = async (category, subcategory, eventId) => {
    try {
        const response = await apiUser.get(`/getEvent/${category}/${subcategory}/${eventId}`);
        return response.data.event;  
    } catch (error) {
        console.error("Error fetching event:", error);
        throw error.response?.data || "Failed to fetch event";
    }
  };
  
  // const getEvent = async (category, subcategory, eventId) => {
  //   try {
  //     const response = await apiUser.get(`/getEvent/${eventId}`);
  //     return response.data.event;
  //   } catch (error) {
  //     console.error("Error fetching event:", error);
  //     throw error.response?.data || "Failed to fetch event";
  //   }
  // };


const getEvents = async (category = "", subcategory = "") => {
  try {
      const queryParams = new URLSearchParams();
      if (category) queryParams.append("category", category);
      if (subcategory) queryParams.append("subcategory", subcategory);

      const response = await apiUser.get(`/getAllEvents?${queryParams.toString()}`);
      return response.data.events;
  } catch (error) {
      console.error("Error fetching events:", error);
      throw error.response?.data || "Failed to fetch events";
  }
};


  return (
    <EventContext.Provider value={{ getEvent, getEvents }}>
      {children}
    </EventContext.Provider>
  );
};










