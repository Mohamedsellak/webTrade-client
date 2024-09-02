"use client"
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is Webtrade?",
      answer:
        "Webtrade is a decentralized exchange that allows users to trade cryptocurrencies, tokens, and other digital assets without relying on a centralized authority.",
    },
    {
      question: "How secure is Webtrade?",
      answer:
        "Webtrade uses the latest security technology to ensure your funds and personal information are safe. We have implemented multiple layers of security to protect your assets.",
    },
    {
      question: "What are the fees associated with trading on Webtrade?",
      answer:
        "Webtrade charges a small fee for each trade, which is used to cover the cost of running the exchange. We believe in transparent pricing with no hidden fees.",
    },
    {
      question: "What assets can I trade on Webtrade?",
      answer:
        "Webtrade supports a wide range of assets, including cryptocurrencies, tokens, and other digital assets. You can diversify your portfolio on a single platform.",
    },
    {
      question: "How does Webtrade use AI and Machine Learning?",
      answer:
        "Webtrade is powered by AI and Machine Learning technologies that analyze market data in real-time to help you make informed trading decisions.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-gray-50">
      <h3 className="text-3xl font-bold text-center mb-12 text-black">
        Frequently Asked Questions
      </h3>
      <div className="container mx-auto px-4 space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-semibold text-indigo-500">
                {faq.question}
              </h4>
              <span>
                {activeIndex === index ? (
                  <FaChevronUp className="text-indigo-500" />
                ) : (
                  <FaChevronDown className="text-indigo-500" />
                )}
              </span>
            </div>
            {activeIndex === index && (
              <p className="text-gray-600 mt-4">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
