import express from "express";
import { sendEmail } from "../utils/sendEmail.js"; // Adjust the path to your sendEmail utility

const router = express.Router();

// Route to handle sending the payment link
router.post("/send-payment-link", async (req, res) => {
  const { email, paymentLink, amount } = req.body;

  // Validate the input
  if (!email || !paymentLink || !amount) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  // Create the email content
  const message = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            background-color: #4CAF50;
            text-align: center;
            margin: 10px 0;
          }
          a {
            color: #4CAF50;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <h1>Payment Request</h1>
        <p>You have been requested to make a payment of <strong>₹${amount}</strong>.</p>
        <p>Click the button below to complete your payment:</p>
        <a href="${paymentLink}" target="_blank" class="button">Pay Now</a>
        <p>If the button does not work, copy and paste the link below into your browser or UPI app:</p>
        <p><a href="${paymentLink}" target="_blank">${paymentLink}</a></p>
        <p>Thank you!</p>
      </body>
    </html>
  `;

  try {
    // Use the sendEmail utility to send the email
    await sendEmail({
      email,
      subject: "Payment Request from BidBuddy",
      html: message, // Use the 'html' field for HTML content
    });

    res.status(200).json({ success: true, message: "Payment link sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

export default router;
