import React, { useState } from "react";
import { RiAuctionFill, RiInstagramFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook, FaUserCircle } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <div
        onClick={() => setShow(!show)}
        className="fixed right-5 top-5 bg-gradient-to-br from-[#1a73e8] to-[#1c8ef9] text-white text-3xl p-3 rounded-md shadow-lg hover:scale-110 transition-all duration-300 lg:hidden cursor-pointer"
      >
        <GiHamburgerMenu />
      </div>

      {/* Side Drawer */}
      <div
        className={`fixed top-0 ${
          show ? "left-0" : "-left-full"
        } w-[80%] sm:w-[300px] bg-gradient-to-b from-[#ffffff] to-[#e3f2fd] shadow-lg h-full border-r border-[#d6dde3] p-6 flex flex-col justify-between transition-all duration-500 ease-in-out lg:left-0 z-50`}
      >
        {/* Header */}
        <div className="relative">
          <Link to="/">
            <h4 className="text-3xl font-bold mb-6 text-gray-800">
              Bid<span className="text-[#1c8ef9]">Buddy</span>
            </h4>
          </Link>

          {/* Navigation Links */}
          <ul className="flex flex-col gap-6 mb-8">
            <li>
              <Link
                to="/auctions"
                className="flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-[#1c8ef9] hover:scale-105 transition-all duration-300"
              >
                <RiAuctionFill className="text-[#1c8ef9]" /> Auctions
              </Link>
            </li>
            <li>
              <Link
                to="/leaderboard"
                className="flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-[#1c8ef9] hover:scale-105 transition-all duration-300"
              >
                <MdLeaderboard className="text-[#f9a825]" /> Leaderboard
              </Link>
            </li>
            {isAuthenticated && user?.role === "Auctioneer" && (
              <>
                <li>
                  <Link
                    to="/submit-commission"
                    className="flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-[#1c8ef9] hover:scale-105 transition-all duration-300"
                  >
                    <FaFileInvoiceDollar className="text-[#e53935]" /> Submit Commission
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-auction"
                    className="flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-[#1c8ef9] hover:scale-105 transition-all duration-300"
                  >
                    <IoIosCreate className="text-[#43a047]" /> Create Auction
                  </Link>
                </li>
                <li>
                  <Link
                    to="/view-my-auctions"
                    className="flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-[#1c8ef9] hover:scale-105 transition-all duration-300"
                  >
                    <FaEye className="text-[#8e24aa]" /> View My Auctions
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && user?.role === "Super Admin" && (
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-[#1c8ef9] hover:scale-105 transition-all duration-300"
                >
                  <MdDashboard className="text-[#fdd835]" /> Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* Authentication Section */}
          {!isAuthenticated ? (
            <div className="flex gap-4 my-4">
              <Link
                to="/sign-up"
                className="bg-[#1a73e8] hover:bg-[#0a47a1] text-white py-2 px-4 rounded-md font-semibold shadow-md hover:scale-105 transition-all duration-300"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="text-[#e3f2fd] bg-gradient-to-r from-[#f48fb1] to-[#ff80ab] border-2 border-[#f48fb1] hover:scale-105 py-2 px-4 rounded-md font-semibold transition-all duration-300"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="flex gap-4 my-4">
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-[#1c8ef9] to-[#0a47a1] text-white py-2 px-4 rounded-md font-semibold shadow-md hover:scale-105 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          )}

          <hr className="border-t-gray-300 mb-6" />

          {/* Additional Links */}
          <ul className="flex flex-col gap-5">
            {isAuthenticated && (
              <li>
                <Link
                  to="/me"
                  className="flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-[#1c8ef9] hover:scale-105 transition-all duration-300"
                >
                  <FaUserCircle className="text-[#3f51b5]" /> Profile
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/how-it-works-info"
                className="flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-[#1c8ef9] hover:scale-105 transition-all duration-300"
              >
                <SiGooglesearchconsole className="text-[#e91e63]" /> How it works
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-[#1c8ef9] hover:scale-105 transition-all duration-300"
              >
                <BsFillInfoSquareFill className="text-[#009688]" /> About Us
              </Link>
            </li>
          </ul>

          {/* Close Button */}
          <IoMdCloseCircleOutline
            onClick={() => setShow(!show)}
            className="absolute top-6 right-6 text-[28px] text-gray-600 cursor-pointer lg:hidden"
          />
        </div>

        {/* Footer Section */}
        <div>
          <div className="flex gap-3 items-center mb-4">
            <Link
              to="/"
              className="p-3 rounded-full bg-gray-100 text-gray-600 hover:text-blue-600 hover:shadow-md transition-all duration-300"
            >
              <FaFacebook />
            </Link>
            <Link
              to="/"
              className="p-3 rounded-full bg-gray-100 text-gray-600 hover:text-pink-500 hover:shadow-md transition-all duration-300"
            >
              <RiInstagramFill />
            </Link>
          </div>
          <Link
            to="/contact"
            className="text-gray-600 hover:text-[#1c8ef9] font-semibold transition-all duration-200"
          >
            Contact Us
          </Link>
          <p className="text-gray-600 text-sm">&copy; Bidbuddy.</p>
          <p className="text-gray-600 text-sm">
            Designed by{" "}
            <Link
              to="/"
              className="font-semibold hover:text-[#1c8ef9] transition-all duration-200"
            >
              Abhinav Sriram 
              Shivanishmith Reddy
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
