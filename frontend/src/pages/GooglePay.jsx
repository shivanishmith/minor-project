import React, { useState } from "react";
import QRCode from "react-qr-code";

const GooglePay = () => {
  const [amount, setAmount] = useState(""); // State for the payment amount
  const [paymentLink, setPaymentLink] = useState(""); // UPI Payment Link for the user
  const [email, setEmail] = useState(""); // Email input state
  const [showError, setShowError] = useState(""); // To handle error messages
  const [isSending, setIsSending] = useState(false); // Loader state

  const yourUpiID = "shivanishmithnishu@oksbi"; // Your UPI ID (receiver's UPI ID)

  // Handle Amount Input
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setShowError(""); // Clear error when amount is valid
  };

  // Generate UPI Payment Request Link
  const generatePaymentLink = () => {
    if (!amount || parseFloat(amount) <= 0) {
      setShowError("Please enter a valid amount.");
      return;
    }
    // Generate UPI payment link using yourUpiID
    const upiLink = `upi://pay?pa=${yourUpiID}&pn=BidBuddy&am=${amount}&cu=INR&tn=Payment+for+Goods`;
    setPaymentLink(upiLink); // Store the generated payment link
  };

  // Handle Sending Email
  const sendEmail = async () => {
    if (!email || !paymentLink) {
      setShowError("Please provide a valid email and generate a payment link first.");
      return;
    }

    setIsSending(true); // Start loading
    setShowError(""); // Clear any previous error

    try {
      // Make a POST request to the backend route
      const response = await fetch("http://localhost:5000/api/v1/payment/send-payment-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          paymentLink,
          amount,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Show success message
      } else {
        setShowError(data.message || "Failed to send the email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setShowError("Failed to send the email. Please try again.");
    } finally {
      setIsSending(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-lg p-8 transition-all transform hover:scale-105 duration-300">
        <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-6 animate-fadeIn">
          Payment Link Generator
        </h2>
        <p className="text-center text-gray-700 mb-8 text-lg animate-fadeIn">
          Enter the details below to generate a payment link or QR code.
        </p>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-600 mb-2">
            Enter Amount (INR)
          </label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
            placeholder="e.g., 500"
          />
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-600 mb-2">
            Recipient's Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
            placeholder="e.g., example@example.com"
          />
        </div>

        {/* Error Message */}
        {showError && (
          <p className="text-red-500 text-center mb-4 font-semibold animate-bounce">
            {showError}
          </p>
        )}

        {/* Generate Payment Link */}
        {!paymentLink && (
          <button
            onClick={generatePaymentLink}
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-purple-700 transition-all duration-300"
          >
            Generate Payment Link
          </button>
        )}

        {/* Send Email */}
        {paymentLink && (
          <div className="mt-6">
            <div className="mb-6">
              <button
                onClick={sendEmail}
                disabled={isSending}
                className={`w-full ${
                  isSending ? "bg-gray-400" : "bg-green-600"
                } text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-green-700 transition-all duration-300`}
              >
                {isSending ? "Sending..." : "Send Link via Email"}
              </button>
            </div>

            {/* QR Code Display */}
            <div className="text-center animate-fadeIn">
              <QRCode value={paymentLink} size={200} />
              <p className="text-gray-600 text-sm mt-4">
                Scan the QR code using your UPI app to complete the payment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GooglePay;
