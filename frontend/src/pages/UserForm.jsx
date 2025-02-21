// import { useState } from "react";
// // import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useUserContext } from "../context/UserContext";

// const UserForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     rollNumber: "",
//     enrollmentNumber: "",
//     section: "A",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const { registerUSer } = useUserContext();

//   const navigate = useNavigate();

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     // Basic validation
//     if (
//       !formData.name ||
//       !formData.rollNumber ||
//       !formData.enrollmentNumber ||
//       !formData.email ||
//       !formData.phone
//     ) {
//       setError("All fields are required!");
//       return;
//     }

//     try {
//       const responseUser = await registerUSer({
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         rollNumber: formData.rollNumber,
//         enrollmentNumber: formData.enrollmentNumber,
//         section: formData.section,
//       });
//       //   const response = await axios.post("/registerUser", formData);
//       setSuccess("User registered successfully!");
//       console.log("Response:", responseUser.data);

//       // Clear form after successful submission
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         rollNumber: "",
//         enrollmentNumber: "",
//         section: "A",
//       });
//       navigate("/Quiz");
//     } catch (err) {
//       setError("Failed to register user. Try again.");
//       console.error("Error:", err);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center mb-6">
//           User Registration
//         </h2>

//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//         {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter your name"
//             />
//           </div>
//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter your Email"
//             />
//           </div>
//           {/* Phone */}
//           <div>
//             <label className="block text-sm font-medium">Phone Number</label>
//             <input
//               type="number"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter your Phone Number"
//             />
//           </div>

//           {/* Roll Number */}
//           <div>
//             <label className="block text-sm font-medium">Roll Number</label>
//             <input
//               type="number"
//               name="rollNumber"
//               value={formData.rollNumber}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter your roll number"
//             />
//           </div>

//           {/* Enrollment Number */}
//           <div>
//             <label className="block text-sm font-medium">
//               Enrollment Number
//             </label>
//             <input
//               type="text"
//               name="enrollmentNumber"
//               value={formData.enrollmentNumber}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter your enrollment number"
//             />
//           </div>

//           {/* Section (Dropdown) */}
//           <div>
//             <label className="block text-sm font-medium">Section</label>
//             <select
//               name="section"
//               value={formData.section}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               <option value="A">Section A</option>
//               <option value="B">Section B</option>
//               <option value="C">Section C</option>
//               <option value="D">Section D</option>
//               <option value="E">Section E</option>
//             </select>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserForm;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { CheckCircle, AlertCircle } from "lucide-react";
import Footer from "../components/Footer";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Loader from "../components/Loader";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    rollNumber: "",
    enrollmentNumber: "",
    section: "A",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [deviceId, setDeviceId] = useState("");

  const { registerUSer } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const generateFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();

      // console.log("RESULTID:..\n", result.visitorId);
      setDeviceId(result.visitorId);
    };

    generateFingerprint();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (
      !formData.name ||
      !formData.rollNumber ||
      !formData.enrollmentNumber ||
      !formData.email ||
      !formData.phone
    ) {
      setError("All fields are required!");
      return;
    }

    try {
      const responseUser = await registerUSer(formData, deviceId);
      setSuccess("User registered successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        rollNumber: "",
        enrollmentNumber: "",
        section: "A",
      });
      setLoading(false);
      // console.log(responseUser.data.user._id);
      // console.log("responseUser", responseUser);
      // if (responseUser.data.user._id) {
      //   navigate(`/${responseUser.data.user._id}/greed-quiz-hunt`);
      // } else {
      //   navigate(`/${responseUser._id}/greed-quiz-hunt`);
      // }
      navigate(`/${responseUser._id}/greed-quiz-hunt`);
    } catch (err) {
      setError("Failed to register user. Try again.");
      console.error("E-FRU-265", err);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-950 text-white p-4">
          <div className="border-l-4 border-l-purple-700 bg-gradient-to-r from-gray-800 to-gray-950 shadow-lg rounded-lg p-8 max-w-md w-full border border-gray-700">
            <h2 className="text-3xl font-bold text-center mb-6 text-purple-500">
              User Registration
            </h2>

            {error && (
              <p className="text-red-400 text-sm mb-4 flex items-center gap-2">
                <AlertCircle size={18} /> {error}
              </p>
            )}
            {success && (
              <p className="text-green-400 text-sm mb-4 flex items-center gap-2">
                <CheckCircle size={18} /> {success}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Name", name: "name", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Phone Number", name: "phone", type: "number" },
                { label: "Roll Number", name: "rollNumber", type: "number" },
                {
                  label: "Enrollment Number",
                  name: "enrollmentNumber",
                  type: "text",
                },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-300">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-800 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                    placeholder={`Enter your ${label.toLowerCase()}`}
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Section
                </label>
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-800 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                  {["A", "B", "C", "D", "E"].map((sec) => (
                    <option key={sec} value={sec}>
                      Section {sec}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full bg-purple-600 text-white py-2 rounded-md font-semibold transition-all duration-300 hover:bg-purple-700 hover:shadow-lg active:scale-95"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default UserForm;
