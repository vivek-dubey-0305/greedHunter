// import React, { useState } from "react";
// import { useUserContext } from "../context/UserContext";
// import toast, { Toaster } from "react-hot-toast";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const UserForm = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     fullName: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const [errorField, setErrorField] = useState("");
//   const navigate = useNavigate();

//   const { registerUser } = useUserContext();
//   const handleChange = (e) => {
//     console.log("efe");
//     console.log(e);
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrorField("");
//     console.log(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData);
//     try {
//       const submitResponse = await registerUser(formData);
//       console.log("submitResponse:\n", submitResponse);
//       toast.success(submitResponse.message);
//       navigate("/sotp")

//     } catch (err) {
//       console.log("Err", err);
//       toast.error(err.message || "Somethng Went Wrong!");
//       if (err?.duplicateField) setErrorField(err.duplicateField);
//       // if field == username -> red boundary
//     }
//   };

//   return (
//     <>
//       <Toaster position="top-right" reverseOrder={false} />
//       <div>
//         <form onSubmit={handleSubmit} className="bg-black text-white">
//           <input
//             className={` ${
//               errorField === "username"
//                 ? "border-3 border-red-600"
//                 : "border-b-4 border-b-yellow-500"
//             } m-2`}
//             type="text"
//             name="username"
//             placeholder="username"
//             value={formData.username}
//             onChange={handleChange}
//           />
//           <input
//             className="border-b-4 border-b-yellow-500 mt-2"
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             value={formData.fullName}
//             onChange={handleChange}
//           />
//           <input
//             className={` ${
//               errorField === "email"
//                 ? "border-3 border-red-600"
//                 : "border-b-4 border-b-yellow-500"
//             } m-2`}
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <input
//             className={` ${
//               errorField === "phone"
//                 ? "border-3 border-red-600"
//                 : "border-b-4 border-b-yellow-500"
//             } m-2`}
//             type="number"
//             name="phone"
//             placeholder="Phone Number"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//           <input
//             className="border-b-4 border-b-yellow-500 text-white m-2"
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           <button
//             type="submit"
//             className="bg-blue-700 block mt-3 text-white font-bold uppercase border-b-3 border-b-gray-800"
//           >
//             Submit
//           </button>
//         </form>

//         <Link className="text-black" to={"/login"}>
//           already have an account !? <span className="text-blue-600 hover:text-blue-900">Login</span>
//         </Link>
//       </div>
//     </>
//   );
// };

// export default UserForm;

import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const UserForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { registerUser, loginUser } = useUserContext();

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    usernameORemail: "",
  });
  const [errorField, setErrorField] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorField("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isLogin
        ? await loginUser({
            usernameORemail: formData.usernameORemail,
            password: formData.password,
          })
        : await registerUser({
            username: formData.username,
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          });

      toast.success(response.message);
      isLogin ? navigate("/dashboard") : navigate("/sotp");
    } catch (err) {
      toast.error(err.message || "Something Went Wrong!");
      if (err?.duplicateField) setErrorField(err.duplicateField);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-900 via-black to-purple-900 animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      <motion.div
        className="relative z-10 p-8 bg-gray-900 text-white rounded-lg shadow-xl w-96 border border-purple-500"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
                className="input-field"
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              <input
                className="input-field"
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
              <input
                className="input-field"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                className="input-field"
                type="number"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </>
          )}
          <input
            className="input-field"
            type={isLogin ? "text" : "password"}
            name={isLogin ? "usernameORemail" : "password"}
            placeholder={isLogin ? "Username or Email" : "Password"}
            value={isLogin ? formData.usernameORemail : formData.password}
            onChange={handleChange}
          />
          {isLogin ? (
            <input
              className="input-field"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          ) : (
            ""
          )}

          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-900 py-2 rounded-lg font-bold uppercase"
          >
            Submit
          </button>
        </form>

        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            className="text-blue-500 cursor-pointer ml-1"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default UserForm;

// Tailwind CSS Classes
// .input-field { @apply w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 focus:outline-none focus:border-purple-500; }
