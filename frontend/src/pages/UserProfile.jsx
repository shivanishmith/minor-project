import Spinner from "@/custom-components/Spinner";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#fef6e4] px-6 py-10 lg:pl-[320px]">
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-[#ffffff] shadow-lg rounded-xl p-8 w-full max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-10">
            <img
              src={user.profileImage?.url || "/imageHolder.jpg"}
              alt="User Profile"
              className="w-36 h-36 rounded-full shadow-md border-4 border-[#4b9cd3] mb-4"
            />
            <h1 className="text-4xl font-bold text-[#2b4c7e]">{user.userName}</h1>
            <p className="text-lg font-medium text-[#e98973]">{user.role}</p>
          </div>

          {/* Personal Details */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-[#576a9e] mb-6">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Full Name", value: user.userName },
                { label: "Email", value: user.email },
                { label: "Phone Number", value: user.phone || "Not Provided" },
                { label: "Address", value: user.address || "Not Provided" },
                { label: "Joined On", value: user.createdAt?.substring(0, 10) },
              ].map((item, index) => (
                <div key={index}>
                  <label className="block text-sm font-semibold text-[#45484d] mb-1">
                    {item.label}
                  </label>
                  <input
                    type="text"
                    value={item.value}
                    className="w-full p-3 border border-[#d6dde3] rounded-lg bg-[#edf7ff] text-[#374151] font-medium"
                    disabled
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          {user.role === "Auctioneer" && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-[#576a9e] mb-6">Payment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    label: "Bank Name",
                    value: user.paymentMethods.bankTransfer.bankName || "Not Provided",
                  },
                  {
                    label: "Bank Account Number",
                    value:
                      user.paymentMethods.bankTransfer.bankAccountNumber || "Not Provided",
                  },
                  {
                    label: "Account Holder Name",
                    value: user.paymentMethods.bankTransfer.bankAccountName || "Not Provided",
                  },
                  {
                    label: "PhonePe Account",
                    value: user.paymentMethods.phonepe.phonepeAccountNumber || "Not Provided",
                  },
                  {
                    label: "PayPal Email",
                    value: user.paymentMethods.paypal.paypalEmail || "Not Provided",
                  },
                ].map((item, index) => (
                  <div key={index}>
                    <label className="block text-sm font-semibold text-[#45484d] mb-1">
                      {item.label}
                    </label>
                    <input
                      type="text"
                      value={item.value}
                      className="w-full p-3 border border-[#d6dde3] rounded-lg bg-[#fef7ed] text-[#374151] font-medium"
                      disabled
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Details */}
          <div>
            <h2 className="text-2xl font-bold text-[#576a9e] mb-6">Other Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.role === "Auctioneer" && (
                <div>
                  <label className="block text-sm font-semibold text-[#45484d] mb-1">
                    Unpaid Commissions
                  </label>
                  <input
                    type="text"
                    value={user.unpaidCommission || "0"}
                    className="w-full p-3 border border-[#d6dde3] rounded-lg bg-[#edf7ff] text-[#374151] font-medium"
                    disabled
                  />
                </div>
              )}
              {user.role === "Bidder" && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-[#45484d] mb-1">
                      Auctions Won
                    </label>
                    <input
                      type="text"
                      value={user.auctionsWon || "0"}
                      className="w-full p-3 border border-[#d6dde3] rounded-lg bg-[#fef7ed] text-[#374151] font-medium"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#45484d] mb-1">
                      Money Spent
                    </label>
                    <input
                      type="text"
                      value={user.moneySpent || "0"}
                      className="w-full p-3 border border-[#d6dde3] rounded-lg bg-[#edf7ff] text-[#374151] font-medium"
                      disabled
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
