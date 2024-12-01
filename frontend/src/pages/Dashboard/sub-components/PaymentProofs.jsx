import {
  deletePaymentProof,
  getSinglePaymentProofDetail,
  updatePaymentProof,
} from "@/store/slices/superAdminSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PaymentProofs = () => {
  const { paymentProofs, singlePaymentProof } = useSelector(
    (state) => state.superAdmin
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();

  const handlePaymentProofDelete = (id) => {
    dispatch(deletePaymentProof(id));
  };

  const handleFetchPaymentDetail = (id) => {
    dispatch(getSinglePaymentProofDetail(id));
  };

  useEffect(() => {
    if (singlePaymentProof && Object.keys(singlePaymentProof).length > 0) {
      setOpenDrawer(true);
    }
  }, [singlePaymentProof]);

  return (
    <div className="bg-gradient-to-br from-[#F9F9FF] to-[#EDEFF7] p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-[#4A90E2] mb-6">Payment Proofs</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gradient-to-r from-[#4A90E2] to-[#5AB9EA] text-white">
            <tr>
              <th className="py-3 px-4 text-left">User ID</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {paymentProofs.length > 0 ? (
              paymentProofs.map((element, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-[#F1F6FF] transition-all duration-300`}
                >
                  <td className="py-3 px-4">{element.userId}</td>
                  <td className="py-3 px-4">{element.status}</td>
                  <td className="py-3 px-4 flex justify-center items-center gap-3">
                    <button
                      className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-all duration-300"
                      onClick={() => handleFetchPaymentDetail(element._id)}
                    >
                      Verify
                    </button>
                    <button
                      className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-800 transition-all duration-300"
                      onClick={() => handlePaymentProofDelete(element._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="py-6 text-center text-xl text-gray-500"
                >
                  No payment proofs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Drawer setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
    </div>
  );
};

export default PaymentProofs;

export const Drawer = ({ setOpenDrawer, openDrawer }) => {
  const { singlePaymentProof, loading } = useSelector(
    (state) => state.superAdmin
  );
  const [amount, setAmount] = useState(singlePaymentProof.amount || "");
  const [status, setStatus] = useState(singlePaymentProof.status || "");

  const dispatch = useDispatch();

  const handlePaymentProofUpdate = () => {
    dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
  };

  return (
    <section
      className={`fixed ${
        openDrawer && singlePaymentProof.userId ? "bottom-0" : "-bottom-full"
      } left-0 w-full h-full bg-black bg-opacity-50 flex items-end justify-center transition-all duration-300`}
    >
      <div className="bg-white shadow-xl w-full max-w-lg rounded-t-lg">
        <div className="p-6">
          <h3 className="text-[#4A90E2] text-2xl font-bold mb-4 text-center">
            Payment Proof Verification
          </h3>
          <form className="flex flex-col gap-6">
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                User ID
              </label>
              <input
                type="text"
                value={singlePaymentProof.userId || ""}
                disabled
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Settled">Settled</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Comment
              </label>
              <textarea
                rows={4}
                value={singlePaymentProof.comment || ""}
                disabled
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
              ></textarea>
            </div>
            {/* Image Verification */}
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Proof Image
              </label>
              <div className="flex justify-center items-center bg-gray-100 p-4 rounded-md border">
                {singlePaymentProof.proof?.url ? (
                  <img
                    src={singlePaymentProof.proof.url}
                    alt="Payment Proof"
                    className="max-h-64"
                  />
                ) : (
                  <p className="text-gray-500">No image provided</p>
                )}
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <button
                type="button"
                className="bg-blue-600 text-white py-2 px-4 rounded-md w-full hover:bg-blue-800 transition-all duration-300"
                onClick={handlePaymentProofUpdate}
              >
                {loading ? "Updating..." : "Update"}
              </button>
              <button
                type="button"
                className="bg-gray-400 text-white py-2 px-4 rounded-md w-full hover:bg-gray-600 transition-all duration-300"
                onClick={() => setOpenDrawer(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
