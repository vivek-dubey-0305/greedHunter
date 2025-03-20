import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { toast, Toaster } from "react-hot-toast";
import { Pencil, X, Key, Trash2, User } from "lucide-react";
import ForgetPasswordPopup from "../components/ForgetPasswordPopup";

import { useNavigate } from "react-router-dom";

const UserSettings = () => {
  const { user, setUser, updateProfile, changePassword, deleteAccount } =
    useUserContext();
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({ ...user });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  //*HandleSocial Cahnge
  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      social_links: {
        ...prev.social_links,
        [name]: value,
      },
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateProfile(formData);
      setUser(response.user);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message || "Update failed");
      if (error.duplicateField) {
        setErrors({ [error.duplicateField]: "Already exists!" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    setLoading(true);
    try {
      const changePasswordResponse = await changePassword(passwordData);
      console.log("changePasswordResponse", changePasswordResponse);
      toast.success(
        changePasswordResponse.data.message || "Password changed successfully!"
      );
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log("ErrorP", error);
      toast.error(error.data.message || "Password change failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (deleteConfirm !== "DELETE") {
      toast.error("Please type DELETE to confirm");
      return;
    }
    setLoading(true);
    try {
      await deleteAccount();
      toast.success("Account deleted successfully");
      setUser(null);
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Account deletion failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      <Toaster />
      {/* Sidebar Navigation */}
      <div className="w-64 bg-black p-6 space-y-4 border-r border-purple-500">
        <button
          onClick={() => setActiveTab("profile")}
          className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
            activeTab === "profile"
              ? "bg-purple-900 text-yellow-400"
              : "hover:bg-gray-800"
          }`}
        >
          <User size={20} />
          <span>Profile</span>
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
            activeTab === "password"
              ? "bg-purple-900 text-yellow-400"
              : "hover:bg-gray-800"
          }`}
        >
          <Key size={20} />
          <span>Change Password</span>
        </button>
        <button
          onClick={() => setActiveTab("delete")}
          className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
            activeTab === "delete"
              ? "bg-red-900 text-red-400"
              : "hover:bg-gray-800"
          }`}
        >
          <Trash2 size={20} />
          <span>Delete Account</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === "profile" && (
          <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl p-8 shadow-2xl border border-purple-500">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
                <User size={24} /> Profile Settings
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {isEditing ? (
                  <X className="text-red-500" />
                ) : (
                  <Pencil className="text-purple-400" />
                )}
              </button>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-6">
              {["username", "fullName", "email", "phone", "gender"].map(
                (field) => (
                  <div key={field} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 capitalize">
                      {field}
                    </label>
                    <input
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full p-3 rounded-lg bg-gray-900 border ${
                        errors[field] ? "border-red-500" : "border-purple-600"
                      } ${
                        isEditing ? "focus:border-yellow-400" : ""
                      } transition-colors`}
                    />
                    {errors[field] && (
                      <p className="text-red-500 text-sm">{errors[field]}</p>
                    )}
                  </div>
                )
              )}

              {/* Social Links */}
              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-bold text-yellow-300">
                  Social Links
                </h3>
                {[
                  "youtube",
                  "facebook",
                  "twitter",
                  "github",
                  "instagram",
                  "website",
                ].map((platform) => (
                  <div key={platform}>
                    <label className="block text-sm font-medium text-gray-300 capitalize">
                      {platform}
                    </label>
                    <input
                      type="url"
                      name={platform}
                      value={formData.social_links?.[platform] || ""}
                      onChange={handleSocialChange}
                      disabled={!isEditing}
                      className="w-full p-3 rounded-lg bg-gray-900 border border-purple-600 transition-colors"
                    />
                  </div>
                ))}
              </div>

              {isEditing && (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yellow-500 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-yellow-400 transition-colors disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              )}
            </form>
          </div>
        )}

        {activeTab === "password" && (
          <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl p-8 shadow-2xl border border-purple-500">
            <h2 className="text-2xl font-bold text-yellow-400 mb-8 flex items-center gap-2">
              <Key size={24} /> Change Password
            </h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              {["currentPassword", "newPassword", "confirmPassword"].map(
                (field) => (
                  <div key={field} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 capitalize">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type="password"
                      name={field}
                      value={passwordData[field]}
                      onChange={handlePasswordChange}
                      className="w-full p-3 rounded-lg bg-gray-900 border border-purple-600 focus:border-yellow-400 transition-colors"
                    />
                  </div>
                )
              )}
              {/* <div className="ml-7 bg-black w-xl"> */}
              <span
                className="relative text-blue-500 font-bold hover:text-blue-700 -right-100"
                onClick={() => setShowPopup(!showPopup)}
              >
                Forgot Current Password ?
              </span>
              {/* </div> */}
              <button
                type="submit"
                disabled={loading}
                className="mt-3 w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-500 transition-colors disabled:opacity-50"
              >
                {loading ? "Updating..." : "Change Password"}
              </button>
            </form>
            {showPopup && (
              <ForgetPasswordPopup onClose={() => setShowPopup(false)} />
            )}
          </div>
        )}

        {activeTab === "delete" && (
          <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl p-8 shadow-2xl border border-red-500">
            <h2 className="text-2xl font-bold text-red-400 mb-8 flex items-center gap-2">
              <Trash2 size={24} /> Delete Account
            </h2>
            <form onSubmit={handleDeleteAccount} className="space-y-6">
              <p className="text-gray-300">
                This action is permanent and cannot be undone. Please type{" "}
                <span className="font-bold">DELETE</span> to confirm.
              </p>
              <input
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-900 border border-red-600 focus:border-red-400 transition-colors"
                placeholder="Type DELETE to confirm"
              />
              <button
                type="submit"
                disabled={loading || deleteConfirm !== "DELETE"}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-500 transition-colors disabled:opacity-50 disabled:hover:bg-red-600"
              >
                {loading ? "Deleting..." : "Permanently Delete Account"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSettings;
