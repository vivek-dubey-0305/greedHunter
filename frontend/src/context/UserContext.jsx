import { createContext, useContext, useState } from "react";
// import apiU from "../services/api.js";
import { apiUser } from "../services/api.js";
const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [idError, setIdError] = useState("");
  const [user, setUser] = useState(null);

  const registerUSer = async (
    { name, email, phone, rollNumber, enrollmentNumber, section },
    deviceId
  ) => {
    try {
      // console.log(
      //   name,
      //   email,
      //   phone,
      //   rollNumber,
      //   enrollmentNumber,
      //   section,
      //   deviceId
      // );
      const response = await apiUser.post("/register", {
        name,
        email,
        phone,
        rollNumber,
        enrollmentNumber,
        section,
        deviceId,
      });
      // console.log("UserResponse..\n------------------\n", response);
      // console.log("UserResponse..\n------------------\n", response.data.user);
      // console.log(
      //   "UserResponse..is registered\n------------------\n",
      //   response.data.user.isRegisteredUSer
      // );
      setIsRegistered(response.data.user.isRegisteredUSer);
      setUser(response.data.user);
      // setIsRegisteredUser(response.data.user.isRegisteredUSer);
      // console.log("USer..\n", user);
      // console.log("USer..\n", { user });
      return response.data.user;
    } catch (error) {
      // console.error("Error u", error);
      // console.error("Error u", error.response.data.message);
      // console.error("Error u", error.response.data.existingDeviceIdUser);
      setIdError(error.response.data.message);
      setUser(error.response.data.existingDeviceIdUser);
      // setIsRegisteredUser(false);
      return error.response.data.existingDeviceIdUser;
    }
  };

  const updateMarks = async ({ marks, phone }) => {
    try {
      // console.log("MARKS AND PGONE NUMBER..\n", marks, phone);
      // console.log("MARKS AND PGONE NUMBER..\n", { marks, phone });
      const response = await apiUser.post("/updateUserMarks", { marks, phone });
      // console.log("REsponse update marks..\n", response);
      return response;
    } catch (error) {
      // console.error("Error upM..\n", error);
      setIdError(error.response.data.message);
      return error;
    }
  };

  const getUsers = async () => {
    try {
      const response = await apiUser.get("/getUsers");
      // console.log("GetUSersResponse..\n", response);
      return response;
    } catch (error) {
      // console.error("Error gtU..\n", error);
      return error.response.data.message;
      return error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        registerUSer,
        getUsers,
        updateMarks,
        isRegistered,
        setIsRegistered,
        user,
        idError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
