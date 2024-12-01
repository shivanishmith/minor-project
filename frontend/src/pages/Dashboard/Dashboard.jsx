import {
  clearAllSuperAdminSliceErrors,
  getAllPaymentProofs,
  getAllUsers,
  getMonthlyRevenue,
} from "@/store/slices/superAdminSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuctionItemDelete from "./sub-components/AuctionItemDelete";
import BiddersAuctioneersGraph from "./sub-components/BiddersAuctioneersGraph";
import PaymentGraph from "./sub-components/PaymentGraph";
import PaymentProofs from "./sub-components/PaymentProofs";
import Spinner from "@/custom-components/Spinner";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.superAdmin);

  useEffect(() => {
    dispatch(getMonthlyRevenue());
    dispatch(getAllUsers());
    dispatch(getAllPaymentProofs());
    dispatch(clearAllSuperAdminSliceErrors());
  }, [dispatch]);

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (user.role !== "Super Admin" || !isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo, user.role]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section
          className="w-full min-h-screen bg-gradient-to-br from-[#F4F6FA] via-[#EDEEF7] to-[#E4E7F1] px-8 py-12"
          style={{
            marginLeft: "320px", // Reserve space for the side drawer
            maxWidth: "calc(100% - 320px)", // Ensure content fits within remaining space
          }}
        >
          {/* Dashboard Header */}
          <h1 className="text-[#3B82F6] text-center text-5xl font-extrabold mb-8">
            Super Admin Dashboard
          </h1>

          {/* Dashboard Sections */}
          <div className="grid grid-cols-1 gap-10">
            {/* Payment Graph Section */}
            <div className="bg-white shadow-xl rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-[#1D4ED8] text-2xl font-bold mb-4">
                Monthly Total Payments Received
              </h3>
              <PaymentGraph />
            </div>

            {/* Users Section */}
            <div className="bg-white shadow-xl rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-[#1D4ED8] text-2xl font-bold mb-4">Users</h3>
              <BiddersAuctioneersGraph />
            </div>

            {/* Payment Proofs Section */}
            <div className="bg-white shadow-xl rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-[#1D4ED8] text-2xl font-bold mb-4">
                Payment Proofs
              </h3>
              <PaymentProofs />
            </div>

            {/* Auction Items Deletion Section */}
            <div className="bg-white shadow-xl rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-[#1D4ED8] text-2xl font-bold mb-4">
                Delete Items From Auction
              </h3>
              <AuctionItemDelete />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Dashboard;
