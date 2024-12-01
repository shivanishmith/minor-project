import Spinner from "@/custom-components/Spinner";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import { placeBid } from "@/store/slices/bidSlice";
import React, { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const AuctionItem = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);
  const handleBid = () => {
    const formData = new FormData();
    formData.append("amount", amount);
    dispatch(placeBid(id, formData));
    dispatch(getAuctionDetail(id));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated]);

  return (
    <section
      className="w-full min-h-screen bg-gradient-to-r from-[#fff8f5] via-[#ffede8] to-[#fff3f1] px-8 py-12"
      style={{
        marginLeft: "320px", // Reserved space for the side drawer
        maxWidth: "calc(100% - 320px)", // Ensures proper alignment
      }}
    >
      {/* Breadcrumb Navigation */}
      <div className="text-sm flex flex-wrap gap-2 items-center mb-6">
        <Link
          to="/"
          className="font-medium text-gray-700 hover:text-[#E36414] transition-all"
        >
          Home
        </Link>
        <FaGreaterThan className="text-gray-400" />
        <Link
          to={"/auctions"}
          className="font-medium text-gray-700 hover:text-[#E36414] transition-all"
        >
          Auctions
        </Link>
        <FaGreaterThan className="text-gray-400" />
        <p className="text-gray-600">{auctionDetail.title}</p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Auction Details Section */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <img
                src={auctionDetail.image?.url || "/placeholder.png"}
                alt={auctionDetail.title}
                className="w-full h-auto object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4 bg-[#E36414] text-white text-sm px-3 py-1 rounded-md shadow-md">
                {new Date(auctionDetail.startTime) < Date.now() &&
                new Date(auctionDetail.endTime) > Date.now()
                  ? "Live Auction"
                  : "Upcoming Auction"}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mt-6">
              {auctionDetail.title}
            </h3>
            <p className="text-lg mt-2">
              Condition:{" "}
              <span className="text-[#E36414] font-semibold">
                {auctionDetail.condition}
              </span>
            </p>
            <p className="text-lg mt-2">
              Minimum Bid:{" "}
              <span className="text-[#E36414] font-semibold">
                ₹{auctionDetail.startingBid}
              </span>
            </p>
            <h4 className="text-xl font-bold text-gray-800 mt-6">
              Auction Item Description
            </h4>
            <hr className="border-t-2 border-gray-300 my-4" />
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {auctionDetail.description &&
                auctionDetail.description.split(". ").map((desc, index) => (
                  <li key={index} className="text-base">
                    {desc}
                  </li>
                ))}
            </ul>
          </div>

          {/* Bids Section */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <header className="bg-gradient-to-r from-[#FFB48E] to-[#E36414] text-white py-3 px-4 rounded-t-md text-lg font-semibold">
              Bids
            </header>
            <div className="p-4 bg-gradient-to-b from-[#FFF4E8] to-white rounded-b-md min-h-[500px]">
              {auctionBidders &&
              new Date(auctionDetail.startTime) < Date.now() &&
              new Date(auctionDetail.endTime) > Date.now() ? (
                auctionBidders.length > 0 ? (
                  auctionBidders.map((element, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-4 border-b last:border-none hover:bg-[#FFF4E9] transition-all duration-300 px-4 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={element.profileImage || "/default-avatar.png"}
                          alt={element.userName}
                          className="w-12 h-12 rounded-full shadow-md"
                        />
                        <p className="text-gray-800 font-medium">
                          {element.userName}
                        </p>
                      </div>
                      <p className="text-lg font-semibold text-gray-600">
                        ₹{element.amount}
                      </p>
                      <p
                        className={`text-lg font-semibold ${
                          index === 0
                            ? "text-green-500"
                            : index === 1
                            ? "text-blue-500"
                            : index === 2
                            ? "text-yellow-500"
                            : "text-gray-500"
                        }`}
                      >
                        {index === 0
                          ? "1st"
                          : index === 1
                          ? "2nd"
                          : index === 2
                          ? "3rd"
                          : `${index + 1}th`}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">
                    No bids have been placed yet.
                  </p>
                )
              ) : Date.now() < new Date(auctionDetail.startTime) ? (
                <p className="text-center text-gray-700 py-4">
                  The auction has not started yet.
                </p>
              ) : (
                <p className="text-center text-gray-700 py-4">
                  The auction has ended.
                </p>
              )}
            </div>
            {/* Place Bid Section */}
            <footer className="bg-[#FFF3F1] p-4 flex items-center justify-between rounded-b-md">
              {Date.now() >= new Date(auctionDetail.startTime) &&
              Date.now() <= new Date(auctionDetail.endTime) ? (
                <>
                  <input
                    type="number"
                    placeholder="Enter Bid"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-grow px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#E36414] transition-all"
                  />
                  <button
                    onClick={handleBid}
                    className="ml-4 bg-[#E36414] text-white py-2 px-4 rounded-lg hover:bg-[#C05311] transition-all"
                  >
                    Place Bid
                  </button>
                </>
              ) : Date.now() < new Date(auctionDetail.startTime) ? (
                <p className="text-gray-600">Auction has not started yet.</p>
              ) : (
                <p className="text-gray-600">Auction has ended.</p>
              )}
            </footer>
          </div>
        </div>
      )}
    </section>
  );
};

export default AuctionItem;
