import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();
  const handleContactForm = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      name,
      email,
      phone,
      subject,
      message,
    };

    emailjs
      .send(
        "service_v01mtcu",
        "template_3a1r5xp",
        templateParams,
        "YcOimjllS64zn4ghK"
      )
      .then(() => {
        toast.success("Thank You! Your message has been sent successfully.");
        setLoading(false);
        navigateTo("/");
      })
      .catch((err) => {
        toast.error("Failed to send message.");
        setLoading(false);
      });
  };

  return (
    <section
      className="w-full min-h-screen bg-gradient-to-br from-[#C4E3F3] via-[#F2FBFF] to-[#E8F5F8] px-8 py-12"
      style={{
        marginLeft: "320px", // Reserve space for the side drawer
        maxWidth: "calc(100% - 320px)", // Ensure content fits properly
      }}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 border-t-[6px] border-[#2196F3]">
        <h3 className="text-[#2196F3] text-4xl font-extrabold text-center mb-8">
          Get In Touch With Us
        </h3>
        <form className="flex flex-col gap-6" onSubmit={handleContactForm}>
          {/* Name Input */}
          <div>
            <label className="block text-lg font-semibold text-[#1A237E] mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-[#64B5F6] transition"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-lg font-semibold text-[#1A237E] mb-2">
              Your Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-[#64B5F6] transition"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-lg font-semibold text-[#1A237E] mb-2">
              Your Phone
            </label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-[#64B5F6] transition"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Subject Input */}
          <div>
            <label className="block text-lg font-semibold text-[#1A237E] mb-2">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-[#64B5F6] transition"
              placeholder="Enter the subject of your message"
              required
            />
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-lg font-semibold text-[#1A237E] mb-2">
              Message
            </label>
            <textarea
              rows={7}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-[#64B5F6] transition"
              placeholder="Write your message here"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#64B5F6] to-[#2196F3] text-white py-3 rounded-lg font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-lg"
          >
            {loading ? "Sending Message..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
