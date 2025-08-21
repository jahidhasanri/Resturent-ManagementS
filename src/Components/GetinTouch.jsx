import React, { useContext, useRef, useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";

const GetinTouch = () => {
  const form = useRef();
  const {user}=useContext(AuthContext)
  console.log(user);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_jizj1od",    // Replace with your EmailJS service ID
        "template_rg63o4g",   // Replace with your EmailJS template ID
        form.current,
        "FoEjVdKKyqZh6InyP"     // Replace with your EmailJS public key
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Message sent successfully!");
          e.target.reset(); 
        },
        (error) => {
          console.log(error.text);
          toast.error("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="bg-[#f5f2eb] py-12 relative overflow-hidden">
      <div className="container mx-auto relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 hidden md:block">
          <img
            src="/images/contactThumb2_1.png"
            alt="Contact Illustration"
          />
        </div>

        {/* Right Side Form */}
        <div className="ml-auto md:w-1/2 bg-white rounded-2xl shadow-lg p-8 relative z-10">
          <h2 className="text-2xl font-bold mb-6 mt-2">Get In Touch</h2>

          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                className="border rounded-lg p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                required
                 value={user?.displayName || ""}
              />
              <input
                type="email"
                name="user_email"
                placeholder="Email Address"
                className="border rounded-lg p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                required
                 value={user?.email || ""}
              />
            </div>

            {/* Phone & Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                name="phone"
                placeholder="Phone Number"
                className="border rounded-lg p-3 bg-white w-full focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <select
                name="subject"
                className="border rounded-lg bg-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Subject</option>
                <option value="Order Inquiry">Order Inquiry</option>
                <option value="Feedback">Feedback</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message */}
            <textarea
              name="message"
              placeholder="Write your message here..."
              rows="4"
              className="border rounded-lg p-3 bg-white w-full focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            ></textarea>

            {/* Checkbox */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="w-4 h-4" required />
              <label className="text-sm text-gray-600 mt-4 mb-4">
                Collaboratively formulate principle capital. Progressively evolve user
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg w-full font-semibold transition mb-4"
            >
              SUBMIT NOW →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetinTouch;
