import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedAuctions from "./home-sub-components/FeaturedAuctions";
import UpcomingAuctions from "./home-sub-components/UpcomingAuctions";
import Leaderboard from "./home-sub-components/Leaderboard";

const Home = () => {
  const howItWorks = [
    { title: "Post Items", description: "Auctioneer posts items for bidding." },
    { title: "Place Bids", description: "Bidders place bids on listed items." },
    {
      title: "Win Notification",
      description: "Highest bidder receives a winning email.",
    },
    {
      title: "Payment & Fees",
      description: "Bidder pays; auctioneer pays 5% fee.",
    },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <section className="w-full px-6 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-10">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <p className="text-[#DECCBE] font-bold text-xl mb-6">
          Transparency Leads to Your Victory
        </p>
        <h1 className="text-[#111] text-4xl font-bold mb-3 min-[480px]:text-5xl md:text-6xl xl:text-7xl">
          Transparent Auctions
        </h1>
        <h1 className="text-[#31b535] text-4xl font-bold mb-6 min-[480px]:text-5xl md:text-6xl xl:text-7xl">
          Be The Winner
        </h1>
        <div className="flex justify-center gap-6">
          {!isAuthenticated && (
            <>
              <Link
                to="/sign-up"
                className="bg-[#31b535] font-semibold hover:bg-[#0a8a0e] rounded-md px-10 py-3 text-white transition-all duration-300"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="text-[#DECCBE] bg-transparent border-2 border-[#DECCBE] hover:bg-[#fff3fd] hover:text-[#fdba88] font-bold text-lg rounded-md px-10 py-3 transition-all duration-300"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mb-12">
        <h3 className="text-[#111] text-center text-2xl font-semibold mb-8">
          How It Works
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((element) => (
            <div
              key={element.title}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-center items-center text-center"
            >
              <h5 className="font-bold text-lg mb-2">{element.title}</h5>
              <p className="text-sm text-gray-600">{element.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Auctions */}
      <div className="mt-16">
        <FeaturedAuctions />
      </div>

      {/* Upcoming Auctions */}
      <div className="mt-16">
        <UpcomingAuctions />
      </div>

      {/* Leaderboard Section */}
      <div className="mt-16">
        <Leaderboard />
      </div>
    </section>
  );
};

export default Home;
