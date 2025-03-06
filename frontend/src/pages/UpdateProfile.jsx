import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TUpdateProfile = () => {
  const { completeUserProfile, user, setUser } = useUserContext();
  const [formData, setFormData] = useState({
    gender: "",
    studyLevel: "",
    schoolName: "",
    standard: "",
    rollNumber: "",
    collegeName: "",
    course: "",
    enrollmentNumber: "",
    semester: "",
    currentStatus: "",
  });

  const navigate = useNavigate();
  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Updated Profile:", formData);
    try {
      const updateUSerResponse = await completeUserProfile(formData);
      // console.log("updateUSerResponse:\n", updateUSerResponse);
      setUser((prevUser) => ({
        ...prevUser,
        ...updateUSerResponse.user,
      }));
      toast.success(updateUSerResponse.message);
      navigate("/greed-of-sanskrit");
    } catch (error) {
      // console.log("updateUSerError:\n", error);
      // console.log("updateUSerError:\n", error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster />
      <div className="h-screen bg-gradient-to-t from-gray-300 to-purple-500 font-bold">
        <div className="max-w-lg mx-auto p-4">
          <h1 className="text-2xl font-bold text-center mb-4">
            Update Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Gender Dropdown */}
            <div>
              <label className="block text-sm font-semibold">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Trans">Trans</option>
              </select>
            </div>

            {/* Study Level Dropdown */}
            <div>
              <label className="block text-sm font-semibold">Study Level</label>
              <select
                name="studyLevel"
                value={formData.studyLevel}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Study Level</option>
                <option value="School">School</option>
                <option value="College">College</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* School Fields */}
            {formData.studyLevel === "School" && (
              <>
                {/* School Name */}
                <div>
                  <label className="block text-sm font-semibold">
                    School Name
                  </label>
                  <select
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select School</option>
                    <option value="KNHSS">KNHSS</option>
                    <option value="Thomas">Thomas</option>
                    <option value="Other">Other</option>
                  </select>
                  {formData.schoolName === "Other" && (
                    <input
                      type="text"
                      name="schoolName"
                      placeholder="Enter School Name"
                      className="w-full p-2 mt-2 border rounded"
                      onChange={handleChange}
                    />
                  )}
                </div>

                {/* Standard */}
                <div>
                  <label className="block text-sm font-semibold">Class</label>
                  <select
                    name="standard"
                    value={formData.standard}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Class</option>
                    {[6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Roll Number */}
                <div>
                  <label className="block text-sm font-semibold">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    name="rollNumber"
                    placeholder="Enter Roll Number"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </>
            )}

            {/* College Fields */}
            {formData.studyLevel === "College" && (
              <>
                {/* College Name */}
                <div>
                  <label className="block text-sm font-semibold">
                    College Name
                  </label>
                  <select
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select College</option>
                    <option value="BIST">BIST</option>
                    <option value="BIRT">BIRT</option>
                    <option value="LNCT">LNCT</option>
                    <option value="Other">Other</option>
                  </select>
                  {formData.collegeName === "Other" && (
                    <input
                      type="text"
                      name="collegeName"
                      placeholder="Enter College Name"
                      className="w-full p-2 mt-2 border rounded"
                      onChange={handleChange}
                    />
                  )}
                </div>

                {/* Course */}
                <div>
                  <label className="block text-sm font-semibold">Course</label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Course</option>
                    <option value="BCA">BCA</option>
                    <option value="BCA AIDA">BCA AIDA</option>
                    <option value="MCA">MCA</option>
                    <option value="MTECH">MTECH</option>
                    <option value="BTECH">BTECH</option>
                  </select>
                </div>

                {/* Semester */}
                <div>
                  <label className="block text-sm font-semibold">
                    Semester
                  </label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Semester</option>
                    <option value="I">I</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                    <option value="V">V</option>
                    <option value="VI">VI</option>
                    <option value="VII">VII</option>
                    <option value="VIII">VIII</option>
                  </select>
                </div>

                {/* Enrollment Number */}
                <div>
                  <label className="block text-sm font-semibold">
                    Enrollment Number
                  </label>
                  <input
                    type="text"
                    name="enrollmentNumber"
                    placeholder="Enter Enrollment Number"
                    value={formData.enrollmentNumber}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </>
            )}

            {/* Other - Current Status */}
            {formData.studyLevel === "Other" && (
              <div>
                <label className="block text-sm font-semibold">
                  Current Status
                </label>
                <select
                  name="currentStatus"
                  value={formData.currentStatus}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Status</option>
                  <option value="Study">Studying</option>
                  <option value="Job">Working</option>
                </select>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded font-semibold"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TUpdateProfile;
