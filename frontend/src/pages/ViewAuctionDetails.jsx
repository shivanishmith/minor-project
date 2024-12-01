import Spinner from "@/custom-components/Spinner";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import React, { useEffect } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewAuctionDetails = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated || user.role === "Bidder") {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated]);

  return (
    <section
      className="w-full min-h-screen bg-gradient-to-b from-[#fef6e4] via-[#fff8eb] to-[#fffdf9] px-12 py-10"
      style={{
        marginLeft: "320px", // Reserved space for the side drawer
        maxWidth: "calc(100% - 320px)", // Ensure content fits properly
      }}
    >
      {/* Breadcrumb Navigation */}
      <div className="text-sm flex flex-wrap gap-2 items-center mb-6">
        <Link
          to="/"
          className="font-semibold text-[#E36414] hover:underline transition-all duration-200"
        >
          Home
        </Link>
        <FaGreaterThan className="text-gray-400" />
        <Link
          to="/view-my-auctions"
          className="font-semibold text-[#E36414] hover:underline transition-all duration-200"
        >
          My Auctions
        </Link>
        <FaGreaterThan className="text-gray-400" />
        <p className="text-gray-600">{auctionDetail.title}</p>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {/* Auction Item Details */}
          <div className="bg-white shadow-lg rounded-lg p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="relative">
              <div className="bg-gradient-to-tr from-[#FFE5D5] to-[#FFD9C2] p-6 rounded-lg">
                <img
                  src={auctionDetail.image?.url || "/placeholder.png"}
                  alt={auctionDetail.title}
                  className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-300 shadow-md"
                />
              </div>
              <div className="absolute top-4 left-4 bg-[#E36414] text-white text-xs px-3 py-1 rounded-md shadow-md">
                Live Auction
              </div>
            </div>
            <h3 className="text-[#E36414] text-3xl font-extrabold mt-6">
              {auctionDetail.title}
            </h3>
            <p className="text-lg text-gray-700 mt-4">
              Condition:{" "}
              <span className="font-semibold text-[#E36414]">
                {auctionDetail.condition}
              </span>
            </p>
            <p className="text-lg text-gray-700 mt-2">
              Minimum Bid:{" "}
              <span className="font-semibold text-[#E36414]">
                ₹{auctionDetail.startingBid}
              </span>
            </p>

            <h4 className="text-xl font-bold text-gray-800 mt-8">
              Auction Item Description
            </h4>
            <hr className="my-4 border-t-gray-300" />
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {auctionDetail.description &&
                auctionDetail.description.split(". ").map((element, index) => (
                  <li key={index}>{element}</li>
                ))}
            </ul>
          </div>

          {/* Bids Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
            <header className="bg-gradient-to-r from-[#FFB48E] to-[#E36414] text-white py-4 px-6 rounded-t-lg text-xl font-semibold shadow-lg">
              Bids
            </header>
            <div className="p-4 bg-gradient-to-b from-[#FFF4E8] to-[#FFFFFF] rounded-b-lg">
              {auctionBidders &&
              auctionBidders.length > 0 &&
              new Date(auctionDetail.startTime) < Date.now() &&
              new Date(auctionDetail.endTime) > Date.now() ? (
                auctionBidders.map((element, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-4 border-b last:border-none bg-white shadow-sm rounded-lg hover:shadow-md transition-all duration-300 px-4 mb-2"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={element.profileImage || "/default-avatar.png"}
                        alt={element.userName}
                        className="w-12 h-12 rounded-full shadow-lg"
                      />
                      <p className="text-gray-800 font-medium text-lg">
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
              ) : Date.now() < new Date(auctionDetail.startTime) ? (
                <div className="text-center py-10">
                  <img
                    src="/notStarted.png"
                    alt="not-started"
                    className="w-48 mx-auto"
                  />
                  <p className="text-lg font-medium text-gray-600 mt-4">
                    Auction has not started yet!
                  </p>
                </div>
              ) : (
                <div className="text-center py-10">
                  <img
                    src="/auctionEnded.png"
                    alt="ended"
                    className="w-48 mx-auto"
                  />
                  <p className="text-lg font-medium text-gray-600 mt-4">
                    Auction has ended!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ViewAuctionDetails;
