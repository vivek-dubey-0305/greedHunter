import { useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import { useAdminContext } from "../context/AdminContext";

const CreateEventPage = () => {
  const { createEvent } = useAdminContext();

  // ✅ State to store form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "virtual",
    category: "",
    startTime: "",
    endTime: "",
    location: "",
    rules: "",
    rewardDetails: { cashPrize: "", certificates: false, otherPrizes: "" },
    socialLinks: "",
  });

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle RewardDetails Changes
  const handleRewardChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      rewardDetails: {
        ...formData.rewardDetails,
        [name]: type === "checkbox" ? checked : value,
      },
    });
  };

  // ✅ Handle Rules (Convert to Array)
  const handleRulesChange = (e) => {
    setFormData({ ...formData, rules: e.target.value.split(",") });
  };

  // ✅ Handle Social Links (Convert to Array)
  const handleSocialLinksChange = (e) => {
    setFormData({ ...formData, socialLinks: e.target.value.split(",") });
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Form Validations
    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.startTime ||
      !formData.endTime
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (formData.eventType === "physical" && !formData.location) {
      toast.error("Location is required for physical events.");
      return;
    }

    try {
      const createEventResponse = await createEvent(formData);
      console.log("createEventResponse", createEventResponse);
      toast.success("Event created successfully!");

      // ✅ Reset Form after submission
      setFormData({
        title: "",
        description: "",
        eventType: "virtual",
        category: "",
        startTime: "",
        endTime: "",
        location: "",
        rules: "",
        rewardDetails: { cashPrize: "", certificates: false, otherPrizes: "" },
        socialLinks: "",
      });
    } catch (error) {
      console.log("Error", error);
      toast.error(error || "Failed to create event.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">
        Create New Event
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        {/* Title */}
        <label className="block mb-2">Event Title *</label>
        <input
          type="text"
          name="title"
          placeholder="Enter Event Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-gray-700 rounded"
          required
        />
        {/* Description */}
        <label className="block mb-2">Description *</label>
        <textarea
          name="description"
          placeholder="Enter Event Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-gray-700 rounded"
          required
        />
        {/* Event Type */}
        <label className="block mb-2">Event Type *</label>
        <select
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-gray-700 rounded"
        >
          <option value="virtual">Virtual</option>
          <option value="physical">Physical</option>
        </select>
        {/* Category */}
        <label className="block mb-2">Category *</label>
        <input
          type="text"
          name="category"
          placeholder="Enter Event Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-gray-700 rounded"
          required
        />
        {/* Start Time & End Time */}
        <label className="block mb-2">Start Time *</label>
        <input
          type="datetime-local"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-gray-700 rounded"
          required
        />
        <label className="block mb-2">End Time *</label>
        <input
          type="datetime-local"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-gray-700 rounded"
          required
        />
        {/* Location (Only if event is Physical) */}
        {formData.eventType === "physical" && (
          <>
            <label className="block mb-2">Location *</label>
            <input
              type="text"
              name="location"
              placeholder="Enter Event Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 mb-4 bg-gray-700 rounded"
            />
          </>
        )}
        {/* Rules */}
        <label className="block mb-2">Rules (comma-separated)</label>
        <input
          type="text"
          name="rules"
          placeholder="Enter event rules"
          value={formData.rules}
          onChange={handleRulesChange}
          className="w-full p-2 mb-4 bg-gray-700 rounded"
        />
        {/* Reward Details */}
        <label className="block mb-2">Cash Prize</label>
        <input
          type="number"
          name="cashPrize"
          placeholder="Enter cash prize amount"
          value={formData.rewardDetails.cashPrize}
          onChange={handleRewardChange}
          className="w-full p-2 mb-4 bg-gray-700 rounded"
        />
        <label className="block mb-2">Certificates</label>
        <input
          type="checkbox"
          name="certificates"
          checked={formData.rewardDetails.certificates}
          onChange={handleRewardChange}
          className="mr-2"
        />
        Provide Certificates
        <label className="block mt-2 mb-2">Other Prizes</label>
        <input
          type="text"
          name="otherPrizes"
          placeholder="Enter other prizes"
          value={formData.rewardDetails.otherPrizes}
          onChange={handleRewardChange}
          className="w-full p-2 mb-4 bg-gray-700 rounded"
        />
        {/* Social Links */}
        <label className="block mb-2">Social Links (comma-separated)</label>
        <input
          type="text"
          name="socialLinks"
          placeholder="Enter event social media links"
          value={formData.socialLinks}
          onChange={handleSocialLinksChange}
          className="w-full p-2 mb-4 bg-gray-700 rounded"
        />
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-500 text-black font-bold py-2 rounded"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventPage;
