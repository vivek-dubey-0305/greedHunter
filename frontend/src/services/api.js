import axios from "axios";

export const apiUser = axios.create({
    // baseURL: "http://localhost:8000/api/v1/users", // Change this to your actual backend URL
    baseURL: import.meta.env.VITE_USER_API_URL,
    withCredentials: true, // ✅ Ensures cookies are sent and received
});

export const apiLeaderboard = axios.create({
    // baseURL: "http://localhost:8000/api/v1/users", // Change this to your actual backend URL
    baseURL: import.meta.env.VITE_LEADERBOARD_API_URL,
    withCredentials: true, // ✅ Ensures cookies are sent and received
});


apiUser.interceptors.response.use(
    response => response,  // ✅ If response is OK, return it as is.

    async (error) => {
        const originalRequest = error.config;  // Store the original request

        if (error.response?.status === 401 && !originalRequest._retry) {
            console.error("❌ 401 Unauthorized Error Detected");

            // ✅ Only retry if the error message indicates an expired token
            const errorMessage = error.response?.data?.message || "";
            if (errorMessage.includes("expired") || errorMessage.includes("token")) {
                // console.log("🔄 Access Token Expired, Attempting Refresh...");

                originalRequest._retry = true;

                try {
                    // 🔄 Refresh token request (includes credentials for cookies)
                    const refreshResponse = await apiUser.post("/refreshToken", {}, { withCredentials: true });

                    // console.log("✅ Token Refreshed Successfully", refreshResponse.data);

                    // ✅ Update headers with the new access token from cookies
                    const newAccessToken = refreshResponse.data.accessToken || refreshResponse.headers["set-cookie"];

                    if (newAccessToken) {
                        apiUser.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    }

                    // ✅ Retry the original request with the new token
                    return apiUser(originalRequest);
                } catch (refreshError) {
                    console.error("⚠️ Refresh Token Expired! User Must Log In Again.");
                    return Promise.reject(refreshError);
                }
            } else {
                console.error("⚠️ 401 Error is NOT Due to Token Expiration.");
                return Promise.reject(error);
            }
        }

        return Promise.reject(error); // Pass all other errors through
    }
);

