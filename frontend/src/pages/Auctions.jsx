import Card from "@/custom-components/Card";
import Spinner from "@/custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";

const Auctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section
          className="w-full min-h-screen bg-gradient-to-br from-[#FFF9F5] via-[#FFF1EB] to-[#FFE5DA] px-8 py-12"
          style={{
            marginLeft: "320px", // Reserved space for the side drawer
            maxWidth: "calc(100% - 320px)", // Ensure content fits properly
          }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Page Title */}
            <h1 className="text-[#D6482B] text-4xl font-extrabold mb-8 text-center tracking-wide">
              Explore Ongoing Auctions
            </h1>

            {/* Auctions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {allAuctions.map((element) => (
                <Card
                  title={element.title}
                  startTime={element.startTime}
                  endTime={element.endTime}
                  imgSrc={element.image?.url}
                  startingBid={element.startingBid}
                  id={element._id}
                  key={element._id}
                  customStyles="hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out"
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Auctions;
