import { useState } from "react";
import { useAdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const { adminCred } = useAdminContext();
  const navigate = useNavigate();

  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [admin, setAdmin] = useState(null); // Store authenticated admin
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!adminName.trim() || !adminPassword.trim()) {
      setMessage("Admin Name and Password are required!");
      return;
    }

    try {
      const response = await adminCred({ adminName, adminPassword });
      if (response) {
        setAdmin(response); // ✅ Set admin state on successful login
        setMessage("Login Successful!");
      }
    } catch (error) {
      setMessage("Invalid Credentials. Access Denied!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {!admin ? (
        <>
          <h1 className="text-3xl font-bold mb-4">Admin Login</h1>

          {message && <p className="text-red-500 mb-4">{message}</p>}

          <form onSubmit={handleLogin} className="w-96 p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className="mb-4">
              <label className="block font-medium">Admin Name:</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">Admin Password:</label>
              <input
                type="password"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome, {admin.adminName}!</h2>

          <div className="flex gap-4">
            <button
              className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
              onClick={() => navigate("/createEvent-overseer-accept")}
            >
              Create Event
            </button>

            <button
              className="p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              onClick={() => navigate("/createQiuz-overseer-accept")}
            >
              Create Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLoginPage;
