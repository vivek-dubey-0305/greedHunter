// 

import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import toast, { Toaster } from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";
const TloginUser = () => {
  const [formData, setFormData] = useState({
    usernameORemail: "",
    password: "",
  });

  const [errorField, setErrorField] = useState("");

  const navigate = useNavigate()

  const { loginUser } = useUserContext();
  const handleChange = (e) => {
    // console.log("efe");
    // console.log(e);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorField("");
    // console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    try {
      const submitResponse = await loginUser(formData);
      // console.log("submitloginResponse:\n", submitResponse);
      toast.success(submitResponse.message);
      navigate("/sotp")
    } catch (err) {
      console.log("Err", err);
      toast.error(err.message || "Somethng Went Wrong!");
      if (err?.duplicateField) setErrorField(err.duplicateField);
      // if field == username -> red boundary
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div>
        <form onSubmit={handleSubmit} className="bg-black text-white">
          <input
            className={` ${
              errorField === "username"
                ? "border-3 border-red-600"
                : "border-b-4 border-b-yellow-500"
            } m-2`}
            type="text"
            name="usernameORemail"
            placeholder="usernameORemail"
            value={formData.usernameORemail}
            onChange={handleChange}
          />

          <input
            className="border-b-4 border-b-yellow-500 text-white m-2"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-blue-700 block mt-3 text-white font-bold uppercase border-b-3 border-b-gray-800"
          >
            Submit
          </button>
        </form>
        <Link className="text-black" to={"/get-in"}>
          already have an account !? <span className="text-green-600 hover:text-green-900">Register</span> 
        </Link>
      </div>
    </>
  );
};

export default TloginUser;
