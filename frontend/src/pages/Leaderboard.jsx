import Spinner from "@/custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const { loading, leaderboard } = useSelector((state) => state.user);

  return (
    <section
      className="w-full min-h-screen bg-gradient-to-br from-[#FFFDE7] via-[#FFFAEB] to-[#FFF5E1] px-8 py-12"
      style={{
        marginLeft: "320px", // Reserved space for the side drawer
        maxWidth: "calc(100% - 320px)", // Content width fits the remaining space
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col mb-8">
            <h1 className="text-5xl font-bold text-[#F4A900] text-center mb-4">
              Bidders Leaderboard
            </h1>
            <p className="text-lg text-center text-[#5A4F3A]">
              Top 100 Bidders Based on Auction Expenditure and Wins
            </p>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto bg-white shadow-xl rounded-lg p-6 border-t-4 border-[#F4A900]">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-[#FFF7CC]">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-[#F4A900] text-lg">
                    Rank & Profile
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-[#F4A900] text-lg">
                    Username
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-[#F4A900] text-lg">
                    Bid Expenditure
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-[#F4A900] text-lg">
                    Auctions Won
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.slice(0, 100).map((element, index) => (
                  <tr
                    key={element._id}
                    className={`border-b border-gray-300 transition-all duration-300 ${
                      index % 2 === 0 ? "bg-[#FFFDE7]" : "bg-[#FFF9E5]"
                    } hover:bg-[#FFE8B2]`}
                  >
                    <td className="flex gap-4 items-center py-4 px-6">
                      <span className="text-[#F4A900] font-bold text-xl w-7">
                        {index + 1}
                      </span>
                      <img
                        src={element.profileImage?.url || "/default-avatar.png"}
                        alt={element.username}
                        className="h-14 w-14 object-cover rounded-full shadow-md border border-[#F4A900]"
                      />
                    </td>
                    <td className="py-4 px-6 text-[#5A4F3A] font-semibold">
                      {element.userName}
                    </td>
                    <td className="py-4 px-6 text-[#333] font-medium">
                      ${element.moneySpent.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-[#333] font-medium">
                      {element.auctionsWon}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default Leaderboard;
