import { createContext, useContext, useEffect, useState } from "react";
// import apiU from "../services/api.js";
import { apiUser } from "../services/api.js";
import Loader from "../components/Loader.jsx";
const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState(null);
  //   const [user, setUser] = useState({
  //     // Add initial empty Map structure
  //     enrolledEvents: new Map()
  // });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user from backend on refresh
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // ✅ Start loading
      try {
        const response = await apiUser.get("/getUser");
        // console.log("getUserResponseContext:\n", response);
        // console.log("getUserResponseContext:\n", response.data.user);
        // console.log("getUserResponseContext:\n", response.data.user.isVerified);
        setUser(response.data.user);
        setIsAuthenticated(response.data.user.isVerified);
      } catch (error) {
        console.error("UC-UE-UgE:", error);
        setUser(null);
        setIsAuthenticated(false);
        if (error.response?.status === 401) {
          // console.log("🔄 Trying Token Refresh Before Fetching User Again...");

          try {
            await apiUser.post("/refreshToken", {}, { withCredentials: true });

            // ✅ Retry getting user after refreshing token
            const retryResponse = await apiUser.get("/getUser", {
              withCredentials: true,
            });
            setUser(retryResponse.data);
          } catch (refreshError) {
            console.error("❌ rF. LgU.");
            setUser(null);
          }
        }
      } finally {
        setLoading(false); // ✅ Ensure loading is false after API call
      }
    };

    fetchUser();
  }, []);

  const registerUser = async ({
    username,
    fullName,
    email,
    phone,
    password,
  }) => {
    try {
      const fields = { username, fullName, email, phone, password };
      // console.log("fields userContext:\n", fields);
      const registerResponse = await apiUser.post("/register", {
        username,
        fullName,
        email,
        phone,
        password,
      });

      // console.log("registerResponse userContext:\n", registerResponse.data);
      registerResponse?.data?.user
        ? setUser(registerResponse.data.user)
        : setUser(null);
      return registerResponse.data;
    } catch (error) {
      console.error("Uc-rE:\n", error);
      throw error.response?.data || { message: "Failed to register user" };
      // return error.response.data.message;
    }
  };

  const loginUser = async ({ usernameORemail, password }) => {
    try {
      const fields = { usernameORemail, password };
      console.log("fields userContext:\n", fields);
      const loginResponse = await apiUser.post("/login", {
        usernameORemail,
        password,
      });

      // console.log("loginResponse userContext:\n", loginResponse.data);
      loginResponse?.data?.user
        ? setUser(loginResponse.data.user)
        : setUser(null);
      return loginResponse.data;
    } catch (error) {
      console.error("Uc-lgE:\n", error);
      throw error.response?.data || { message: "Failed to register user" };
      // return error.response.data.message;
    }
  };

  const sendOtp = async ({ email }) => {
    try {
      // console.log("fields userContext:\n", email);
      const otpResponse = await apiUser.post("/sendOtp", {
        email,
      });

      // console.log("otpResponse userContext:\n", otpResponse.data);
      return otpResponse.data;
    } catch (error) {
      console.error("Uc-OtE:\n", error);
      throw error.response?.data || { message: "Failed to register user" };
      // return error.response.data.message;
    }
  };

  // !RESET PASSWORD
  const sendLink = async ({ email }) => {
    try {
      // console.log("fields userContext:\n", email);
      const linkResponse = await apiUser.post("/reset-password-link", {
        email,
      });

      console.log("linkResponse userContext:\n", linkResponse.data);
      return linkResponse.data;
    } catch (error) {
      console.error("Uc-LME:\n", error);
      throw error.response?.data || { message: "Failed to register user" };
    }
  };

  const resetPassword = async () => {
    try {
      const response = await apiUser.post("/reset-password");
      // console.log("GetUSersResponse..\n", response);
      return response;
    } catch (error) {
      console.error("Error gtU..\n", error);
      return error.response.data.message;
    }
  };

  const verifyOtp = async ({ email, otp }) => {
    try {
      // console.log("fields userContext:\n", email, Number(otp), typeof otp);
      const verificationResponse = await apiUser.post("/verifyOtp", {
        email,
        otp,
      });

      // console.log(
      //   "verificationResponse userContext:\n",
      //   verificationResponse.data
      // );
      setUser(verificationResponse.data.user);
      setIsAuthenticated(verificationResponse.data.user.isVerified);
      return verificationResponse.data;
    } catch (error) {
      console.error("Uc-verRE:\n", error);
      throw error.response?.data || { message: "Failed to register user" };
      // return error.response.data.message;
    }
  };

  const logoutUser = async () => {
    try {
      const logoutResponse = await apiUser.post("/logout");

      // console.log("logoutResponse userContext:\n", logoutResponse.data);
      setUser(null);
      setIsAuthenticated(false);
      return logoutResponse.data;
    } catch (error) {
      console.error("Uc-logRE:\n", error);
      throw error.response?.data || { message: "Failed to register user" };
      // return error.response.data.message;
    }
  };

  const completeUserProfile = async ({
    username,
    fullName,
    email,
    phone,
    gender,
    studyLevel,
    schoolName,
    standard,
    rollNumber,
    collegeName,
    course,
    semester,
    enrollmentNumber,
  }) => {
    try {
      const fields = {
        username,
        fullName,
        email,
        phone,
        gender,
        studyLevel,
        schoolName,
        standard,
        rollNumber,
        collegeName,
        course,
        semester,
        enrollmentNumber,
      };
      // console.log("fields userContext:\n", fields);
      const completeUserResponse = await apiUser.post("/completeProfile", {
        username,
        fullName,
        email,
        phone,
        gender,
        studyLevel,
        schoolName,
        standard,
        rollNumber,
        collegeName,
        course,
        semester,
        enrollmentNumber,
      });

      // console.log(
      //   "completeUserProfileResponse userContext:\n",
      //   completeUserResponse.data
      // );
      return completeUserResponse.data;
    } catch (error) {
      console.error("Uc-CUPe:\n", error);
      throw error.response?.data || { message: "Failed to Update user" };
      // return error.response.data.message;
    }
  };

  const updateProfile = async ({
    username,
    fullName,
    email,
    phone,
    gender,
    social_links = {},
  }) => {
    console.log(
      "contextU body",
      username,
      fullName,
      email,
      phone,
      gender,
      social_links
    );
    try {
      const updateUserResponse = await apiUser.post("/updateProfile", {
        username,
        fullName,
        email,
        phone,
        gender,
        social_links,
      });

      console.log("UPDATERES", updateUserResponse);
      console.log("UPDATERES", updateUserResponse.data);
      setUser((prevUser) => ({
        ...prevUser,
        ...updateUserResponse.data.user,
      }));
      return updateUserResponse.data;
    } catch (error) {
      console.error("Uc-upU-E:\n", error);
      throw error.response?.data || { message: "Failed to register user" };
    }
  };

  const changePassword = async ({
    currentPassword,
    newPassword,
    confirmPassword,
  }) => {
    console.log(
      "currentPassword,newPassword,confirmPassword",
      currentPassword,
      newPassword,
      confirmPassword
    );

    try {
      const changePasswordRes = await apiUser.post("/change-password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      console.log("Reponse change password", changePasswordRes);
      return changePasswordRes.data.message;
    } catch (error) {
      console.error("Error CPwE", error);
      throw error.response || "Something Went Wrong!!";
    }
  };

  const deleteAccount = async () => {
    try {
      const deleteUserRes = await apiUser.get("/delete-account");
      console.log("DElETEUSer", deleteUserRes);
      setUser(null);
      return deleteUserRes.data;
    } catch (error) {
      console.error("ErrorDELETEINGUSER", error);
      throw error.response;
    }
  };

  const updateMarks = async ({
    marks,
    category,
    subcategory,
    eventId,
    isPlayed,
    winTime,
  }) => {
    try {
      // console.log("MARKS AND PGONE NUMBER..\n", marks, phone);
      // console.log("MARKS AND PGONE NUMBER..\n", { marks, phone });
      const response = await apiUser.post("/updateUserMarks", {
        marks,
        category,
        subcategory,
        eventId,
        isPlayed,
        winTime,
      });
      console.log("REsponse update marks..\n", response);
      return response;
    } catch (error) {
      console.error("Error upM..\n", error);

      throw error || "Unablw to update amrks";
    }
  };

  //   const enrollUser = async (category, subcategory, eventId) => {
  //     const response = await apiUser.post("/enrollUser", { category, subcategory, eventId });
  //     return response.data;
  //   };

  const getUsers = async () => {
    try {
      const response = await apiUser.get("/getUsers");
      // console.log("GetUSersResponse..\n", response);
      return response;
    } catch (error) {
      console.error("Error gtU..\n", error);
      return error.response.data.message;
    }
  };

  const sendTopUserEmails = async () => {
    try {
      const response = await apiUser.get("/sendMailToTopTen");
      console.log("📧 Emails sent to top users:", response.data);
      alert("Emails sent successfully to the top 10 users!");
    } catch (error) {
      console.error("Error sending emails:", error);
      alert("Failed to send emails. Try again later.");
    }
  };

  const sendMailToHunter = async ({ name, email, subject, message }) => {
    console.log("details...\n", { name, email, subject, message });
    try {
      const response = await apiUser.post("/sendMailToHunter", {
        name,
        email,
        subject,
        message,
      });
      console.log("📧 Emails sent", response.data);
      console.log("📧 Emails sent to huntre", response);
      // alert("Emails sent successfully to the top 10 users!");
    } catch (error) {
      console.error("Error sending emails:", error);
      alert("Failed to send emails. Try again later.");
    }
  };
  return (
    <UserContext.Provider
      value={{
        registerUser,
        loginUser,
        sendOtp,

        sendLink,
        resetPassword,

        verifyOtp,
        logoutUser,
        completeUserProfile,
        getUsers,

        updateProfile,

        changePassword,

        deleteAccount,

        updateMarks,
        isRegistered,
        user,
        setUser,
        isAuthenticated,
        loading,

        setIsRegistered,
        sendTopUserEmails,
        sendMailToHunter,

        // user,
      }}
    >
      {!loading ? children : <Loader />} {/* ✅ Show Loader until done */}
    </UserContext.Provider>
  );
};
