import { postCommissionProof } from "@/store/slices/commissionSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SubmitCommission = () => {
  const [proof, setProof] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const proofHandler = (e) => {
    const file = e.target.files[0];
    setProof(file);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.commission);

  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("amount", amount);
    formData.append("comment", comment);
    dispatch(postCommissionProof(formData));
  };

  const handlePayNow = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    // Redirect to GooglePay page with amount as a query parameter
    navigate(`/googlepay?amount=${amount}`);
  };

  return (
    <section
      className="w-full min-h-screen bg-gradient-to-br from-[#FDE8E9] via-[#FCE4E6] to-[#FAD8DA] px-8 py-12"
      style={{
        marginLeft: "320px", // Reserved space for side drawer
        maxWidth: "calc(100% - 320px)", // Content fits within remaining space
      }}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-10 border-t-[6px] border-[#D6482B]">
        <h3 className="text-[#D6482B] text-4xl font-bold text-center mb-8 tracking-wide">
          Upload Payment Proof
        </h3>
        <form className="flex flex-col gap-6" onSubmit={handlePaymentProof}>
          {/* Amount Input with Optional Pay Now Button */}
          <div className="flex items-center gap-4">
            <div className="flex-grow">
              <label className="text-lg font-semibold text-gray-800">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 bg-[#FCE4E6] border border-[#E8C4C6] rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-[#D6482B] transition"
                placeholder="Enter the payment amount"
              />
            </div>
            {/* Optional Pay Now Button */}
            <div className="self-end">
              <button
                type="button"
                onClick={handlePayNow}
                className="bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 px-6"
                style={{
                  height: "48px", // Matches input height
                  marginTop: "4px", // Adjust for better alignment
                }}
              >
                Pay Now
              </button>
            </div>
          </div>

          {/* Payment Proof Upload */}
          <div>
            <label className="text-lg font-semibold text-gray-800">
              Payment Proof (Screenshot)
            </label>
            <input
              type="file"
              onChange={proofHandler}
              className="w-full px-4 py-3 bg-[#FCE4E6] border border-[#E8C4C6] rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-[#D6482B] transition"
            />
          </div>

          {/* Comment Input */}
          <div>
            <label className="text-lg font-semibold text-gray-800">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 bg-[#FCE4E6] border border-[#E8C4E6] rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-[#D6482B] transition"
              placeholder="Write your comments or details here..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#D6482B] to-[#B8381E] text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-lg"
          >
            {loading ? "Uploading..." : "Upload Payment Proof"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubmitCommission;
