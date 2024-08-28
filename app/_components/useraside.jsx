"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars,FaEye, FaTimes, FaWallet} from 'react-icons/fa';
import { RiDashboardLine } from "react-icons/ri";
import { PiChartPolarBold } from "react-icons/pi";
import { GiChart } from "react-icons/gi";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Sidebar for larger screens */}
      <div
        className={`fixed inset-y-0 z-10 flex flex-col w-80 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Curvy shape */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ filter: "drop-shadow(10px 0 10px #00000030)", color: "#151617" }}
          preserveAspectRatio="none"
          viewBox="0 0 309 800"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M268.487 0H0V800H247.32C207.957 725 207.975 492.294 268.487 367.647C329 243 314.906 53.4314 268.487 0Z" />
        </svg>
        {/* Sidebar content */}
        <div className="z-10 flex flex-col flex-1">
          <div className="flex items-center justify-between flex-shrink-0 w-64 p-4">
            {/* Logo */}
            <Link href="#" className="py-4 flex items-center justify-center">
              <Image src="/assets/images/icon.png" height={40} width={40} alt="Logo" />
              <span className="ps-4 text-2xl text-blue-500 font-bold">WebTrade</span>
            </Link>
            {/* Close btn */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded-lg focus:outline-none focus:ring md:hidden"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col flex-1 w-64 ps-2 mt-6 text-white">
            <a href="/user/dashboard" className="flex items-center justify-start text-xl p-2 mt-3 rounded-full bg-white border border-green-500 text-black ">
              <span className="p-4 border rounded-full bg-black text-white">
              <RiDashboardLine className="w-6 h-6" />
              </span>
              <span className="ps-4">Dashboard</span>
            </a>
            <a href="/user/trading" className="flex items-center justify-start text-xl p-6 mt-3 rounded-full ">
              <GiChart className="w-6 h-6" />
              <span className="ps-4">Trading</span>
            </a>
            <a href="/user/wallet" className="flex items-center justify-start text-xl p-6 mt-3 rounded-full ">
              <FaWallet className="w-6 h-6" />
              <span className="ps-4">Wallet</span>
            </a>
            <a href="/user/portfolio" className="flex items-center justify-start text-xl p-6 mt-3 rounded-full ">
              <PiChartPolarBold className="w-6 h-6" />
              <span className="ps-4">Portfolio</span>
            </a>
            <a href="/user/watchlist" className="flex items-center justify-start text-xl p-6 mt-3 rounded-full ">
              <FaEye className="w-6 h-6" />
              <span className="ps-4">Watchlist</span>
            </a>
            {/* Add more navigation items here */}
          </nav>
          <div className="flex-shrink-0 p-4">
            <button className="flex items-center space-x-2 text-white hover:text-red-500">
              <FaTimes className="w-6 h-6" />
              <span className="ps-4">Logout</span>
            </button>
          </div>
        </div>
      </div>
      {/* Toggle Sidebar Button for mobile */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed p-2 text-white bg-black rounded-lg top-5 left-5 md:hidden"
      >
        <FaBars className="w-6 h-6" />
        <span className="sr-only">Open menu</span>
      </button>
    </>
  );
}