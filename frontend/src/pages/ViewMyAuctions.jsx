import CardTwo from "@/custom-components/CardTwo";
import Spinner from "@/custom-components/Spinner";
import { getMyAuctionItems } from "@/store/slices/auctionSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewMyAuctions = () => {
  const { myAuctions, loading } = useSelector((state) => state.auction);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
    dispatch(getMyAuctionItems());
  }, [dispatch, isAuthenticated]);

  return (
    <section
      className="w-full min-h-screen bg-gradient-to-br from-[#E9E4F6] via-[#F4F1FC] to-[#E7DFF2] px-8 py-12"
      style={{
        marginLeft: "320px", // Reserved space for the side drawer
        maxWidth: "calc(100% - 320px)", // Ensure content fits properly
      }}
    >
      {/* Page Title */}
      <h1 className="text-[#6B47DC] text-4xl font-extrabold text-center mb-8">
        My Auctions
      </h1>

      {/* Content */}
      {loading ? (
        <Spinner />
      ) : (
        <div className="max-w-6xl mx-auto">
          {myAuctions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {myAuctions.map((element) => (
                <CardTwo
                  title={element.title}
                  startingBid={element.startingBid}
                  endTime={element.endTime}
                  startTime={element.startTime}
                  imgSrc={element.image?.url}
                  id={element._id}
                  key={element._id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <h3 className="text-[#6B47DC] text-xl font-semibold">
                You have not posted any auctions.
              </h3>
              <p className="text-gray-600 mt-2">
                Start posting auctions to see them listed here!
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ViewMyAuctions;
