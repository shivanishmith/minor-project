import { createAuction } from "@/store/slices/auctionSlice";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const CreateAuction = () => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const auctionCategories = [
    "Electronics",
    "Furniture",
    "Art & Antiques",
    "Jewelry & Watches",
    "Automobiles",
    "Real Estate",
    "Collectibles",
    "Fashion & Accessories",
    "Sports Memorabilia",
    "Books & Manuscripts",
  ];

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auction);

  const handleCreateAuction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("startingBid", startingBid);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(createAuction(formData));
  };

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <section
      className="w-full min-h-screen bg-gradient-to-br from-[#E9F9EE] via-[#F1FCF4] to-[#DFF5E3] px-8 py-12"
      style={{
        marginLeft: "320px", // Reserved space for side drawer
        maxWidth: "calc(100% - 320px)", // Ensure proper alignment with drawer
      }}
    >
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 border-t-[6px] border-[#31b535]">
        <h1 className="text-[#31b535] text-center text-4xl font-extrabold mb-8">
          Create Auction
        </h1>
        <form className="flex flex-col gap-6" onSubmit={handleCreateAuction}>
          {/* Title and Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-700 font-semibold">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-[#F1FCF4] border border-[#CDE8D4] rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-[#31b535] transition"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 font-semibold">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-[#F1FCF4] border border-[#CDE8D4] rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-[#31b535] transition"
              >
                <option value="">Select Category</option>
                {auctionCategories.map((element) => (
                  <option key={element} value={element}>
                    {element}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Condition and Starting Bid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-700 font-semibold">
                Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-3 py-2 bg-[#F1FCF4] border border-[#CDE8D4] rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-[#31b535] transition"
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-700 font-semibold">
                Starting Bid
              </label>
              <input
                type="number"
                value={startingBid}
                onChange={(e) => setStartingBid(e.target.value)}
                className="w-full px-3 py-2 bg-[#F1FCF4] border border-[#CDE8D4] rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-[#31b535] transition"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-700 font-semibold">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-[#F1FCF4] border border-[#CDE8D4] rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-[#31b535] transition"
              rows={6}
            />
          </div>

          {/* Start Time and End Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-700 font-semibold">
                Auction Starting Time
              </label>
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full px-3 py-2 bg-[#F1FCF4] border border-[#CDE8D4] rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-[#31b535] transition"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 font-semibold">
                Auction End Time
              </label>
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full px-3 py-2 bg-[#F1FCF4] border border-[#CDE8D4] rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-[#31b535] transition"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm text-gray-700 font-semibold">
              Auction Item Image
            </label>
            <div className="flex items-center justify-center w-full mt-2">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-[#F5F9F3] hover:bg-[#EDF7ED]">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={title}
                    className="w-44 h-auto object-cover"
                  />
                ) : (
                  <div className="text-gray-500">
                    <p className="text-sm">Click to upload or drag and drop</p>
                    <p className="text-xs">SVG, PNG, JPG or GIF (max: 800x400px)</p>
                  </div>
                )}
                <input
                  type="file"
                  className="hidden"
                  onChange={imageHandler}
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#31b535] to-[#27892C] text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            {loading ? "Creating Auction..." : "Create Auction"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateAuction;
