import { login } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, loading]);

  return (
    <section className="w-full flex justify-center items-center min-h-screen px-6 py-10 bg-gradient-to-br from-[#E8F4FF] via-[#DFF9E5] to-[#FFEFE8]">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition duration-500 hover:scale-105 hover:shadow-2xl">
        <h1 className="text-[#4CAF50] text-center text-4xl font-extrabold mb-8">
          Welcome Back
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {/* Email Input */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-semibold">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border rounded-lg w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] shadow-sm transition-all duration-300"
            />
          </div>
          {/* Password Input */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-semibold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border rounded-lg w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] shadow-sm transition-all duration-300"
            />
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#4CAF50] to-[#388E3C] text-white py-3 rounded-lg font-bold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a
              href="/sign-up"
              className="text-[#4CAF50] font-semibold hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
