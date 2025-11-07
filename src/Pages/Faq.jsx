import React from "react";
import { FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    question: "1. What is Restaurant Management System?",
    answer:
      "A Restaurant Management System helps manage daily operations like order tracking, inventory control, billing, and staff management from a single platform.",
  },
  {
    question: "2. How can I add a new food item to the menu?",
    answer:
      "You can easily add a new dish through the admin dashboard under the 'Menu Management' section by providing name, category, price, and image.",
  },
  {
    question: "3. Can customers place online orders?",
    answer:
      "Yes, customers can browse the menu and place online orders directly from the website. Orders are then sent to the kitchen in real time.",
  },
  {
    question: "4. How does the reservation system work?",
    answer:
      "Customers can select a date, time, and number of guests to reserve a table. The system automatically updates table availability.",
  },
  {
    question: "5. Is payment processing secure?",
    answer:
      "Absolutely! We use SSL encryption and trusted payment gateways like Stripe or SSLCommerz to ensure safe and secure transactions.",
  },
  {
    question: "6. Can I track customer feedback or reviews?",
    answer:
      "Yes, all customer feedback is stored in your dashboard. You can analyze ratings and respond to reviews to improve service.",
  },
  {
    question: "7. How can I manage restaurant staff?",
    answer:
      "You can add, edit, or remove staff details and assign them specific roles such as waiter, chef, or cashier directly from the admin panel.",
  },
  {
    question: "8. Does the system support multiple branches?",
    answer:
      "Yes, our Restaurant Management System supports multiple restaurant branches. You can manage each branch’s data separately.",
  },
  {
    question: "9. How can I check daily sales reports?",
    answer:
      "You can view detailed reports on total sales, most popular items, and customer statistics directly from the analytics dashboard.",
  },
  {
    question: "10. Is there any support if I face technical issues?",
    answer:
      "Of course! Our support team is available 24/7. You can contact us through live chat or email for any technical assistance.",
  },
];

const Faq = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 sm:px-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <FaQuestionCircle className="text-3xl text-red-500" />
          <h1 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h1>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group border border-gray-200 rounded-lg bg-gray-100 p-5 cursor-pointer transition-all hover:bg-gray-200"
            >
              <summary className="flex justify-between items-center font-medium text-lg text-gray-800">
                {faq.question}
                <span className="transition-transform group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
