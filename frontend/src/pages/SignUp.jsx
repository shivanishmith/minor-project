import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { register } from "@/store/slices/userSlice";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState(""); // Password state
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [phonepeAccountNumber, setPhonepeAccountNumber] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  // Send OTP
  const sendOtp = async () => {
    try {
      await axios.post("http://localhost:5000/api/v1/user/send-otp", { email });
      setIsOtpSent(true);
      alert("OTP sent to your email!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/user/verify-otp", { email, otp });
      if (response.data.success) {
        setIsOtpVerified(true);
        alert("OTP verified successfully!");
      } else {
        alert("Invalid OTP, please try again.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to verify OTP");
    }
  };

  // Handle Registration
  const handleRegister = (e) => {
    e.preventDefault();
    if (!isOtpVerified) {
      alert("Please verify your OTP first.");
      return;
    }
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password); // Include password
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);

    if (role === "Auctioneer") {
      formData.append("bankAccountName", bankAccountName);
      formData.append("bankAccountNumber", bankAccountNumber);
      formData.append("bankName", bankName);
      formData.append("phonepeAccountNumber", phonepeAccountNumber);
      formData.append("paypalEmail", paypalEmail);
    }

    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, loading, isAuthenticated]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  return (
    <section className="min-h-screen w-full bg-gradient-to-r from-[#c6f6d5] via-[#fefcbf] to-[#fbb6ce] flex justify-center items-center py-10">
      <div className="w-full max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] bg-white shadow-2xl rounded-lg px-8 py-10 animate-fade-in transition-transform transform hover:scale-105 ml-[300px]">
        <h1 className="text-[#2c5282] text-4xl sm:text-5xl font-extrabold text-center mb-8 tracking-wide animate-pulse">
          Create Account
        </h1>
        <form className="flex flex-col gap-8" onSubmit={handleRegister}>
          {!isOtpVerified && (
            <>
              <div className="flex flex-col">
                <label className="text-lg font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-3 px-4 bg-[#edf2f7] rounded-md shadow focus:ring-4 focus:ring-[#2c5282] transition-all duration-300"
                />
              </div>
              {!isOtpSent ? (
                <button
                  type="button"
                  onClick={sendOtp}
                  className="w-full bg-[#2c5282] hover:bg-[#2b6cb0] text-white font-bold py-2 rounded-lg transition-transform transform hover:scale-105 shadow-lg"
                >
                  Send OTP
                </button>
              ) : (
                <>
                  <div className="flex flex-col">
                    <label className="text-lg font-semibold text-gray-700">Enter OTP</label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="py-3 px-4 bg-[#edf2f7] rounded-md shadow focus:ring-4 focus:ring-[#2c5282] transition-all duration-300"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={verifyOtp}
                    className="w-full bg-[#2c5282] hover:bg-[#2b6cb0] text-white font-bold py-2 rounded-lg transition-transform transform hover:scale-105 shadow-lg"
                  >
                    Verify OTP
                  </button>
                </>
              )}
            </>
          )}
          {isOtpVerified && (
            <>
              <p className="font-semibold text-2xl sm:text-3xl text-gray-700 border-b-4 border-[#2c5282] pb-2">
                Personal Details
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-lg font-semibold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="py-3 px-4 bg-[#edf2f7] rounded-md shadow focus:ring-4 focus:ring-[#2c5282] transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-semibold text-gray-700">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-3 px-4 bg-[#edf2f7] rounded-md shadow focus:ring-4 focus:ring-[#2c5282] transition-all duration-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-lg font-semibold text-gray-700">Phone</label>
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="py-3 px-4 bg-[#edf2f7] rounded-md shadow focus:ring-4 focus:ring-[#2c5282] transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-semibold text-gray-700">Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="py-3 px-4 bg-[#edf2f7] rounded-md shadow focus:ring-4 focus:ring-[#2c5282] transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-lg font-semibold text-gray-700">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="py-3 px-4 bg-[#edf2f7] rounded-md shadow focus:ring-4 focus:ring-[#2c5282] transition-all duration-300"
                >
                  <option value="">Select Role</option>
                  <option value="Auctioneer">Auctioneer</option>
                  <option value="Bidder">Bidder</option>
                </select>
              </div>
              {role === "Auctioneer" && (
                <>
                  <label className="text-lg font-semibold text-gray-700">Bank Details</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="text-lg font-semibold text-gray-700">Bank Name</label>
                      <input
                        type="text"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="py-3 px-4 bg-[#edf2f7] rounded-md shadow focus:ring-4 focus:ring-[#2c5282] transition-all duration-300"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-lg font-semibold text-gray-700">Account Number</label>
                      <input
                        type="text"
                        value={bankAccountNumber}
                        onChange={(e) => setBankAccountNumber(e.target.value)}
                        className="py-3 px-4 bg-[#edf2f7] rounded-md shadow focus:ring-4 focus:ring-[#2c5282] transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="text-lg font-semibold text-gray-700">PhonePe Number</label>
                      <input
                        type="text"
                        value={phonepeAccountNumber}
                        onChange={(e) => setPhonepeAccountNumber(e.target.value)}
                        className="py-3 px-4 bg-[#edf2f7] rounded-md shadow focus:ring-4 focus:ring-[#2c5282] transition-all duration-300"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-lg font-semibold text-gray-700">PayPal Email</label>
                      <input
                        type="email"
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                        className="py-3 px-4 bg-[#edf2f7] rounded-md shadow focus:ring-4 focus:ring-[#2c5282] transition-all duration-300"
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="flex flex-col">
                <label className="text-lg font-semibold text-gray-700">Profile Image</label>
                <div className="flex items-center gap-5">
                  <img
                    src={profileImagePreview ? profileImagePreview : "/imageHolder.jpg"}
                    alt="Preview"
                    className="w-16 h-16 rounded-full shadow-md"
                  />
                  <input
                    type="file"
                    onChange={imageHandler}
                    className="py-2 px-4 bg-[#edf2f7] rounded-md shadow focus:ring-4 focus:ring-[#2c5282] transition-all duration-300"
                  />
                </div>
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-[#2c5282] hover:bg-[#2b6cb0] text-white font-bold py-4 rounded-lg transition-transform transform hover:scale-105 shadow-lg"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
