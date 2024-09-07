"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from "js-cookie"
import { FaBars, FaTimes, FaHome, FaUsers, FaWallet, FaUserShield, FaChartLine, FaMoneyCheckAlt } from 'react-icons/fa';
import { PiHandWithdrawFill } from 'react-icons/pi';
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentPath = usePathname()


  const logOut = ()=>{
    // Remove the token and auth data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('authData');

    // Remove the token and auth data from cookies
    Cookies.remove('authData');
    location.href = "/"
  }

  const getLinkClassName = (path) => {
    return `flex items-center justify-start text-xl p-2 mt-3 border-2 border-neutral-800 rounded-full ${
      currentPath === path
        ? "bg-white text-black"
        : "text-white"
    }`;
  };


  return (
    <>
      {/* Sidebar for larger screens */}
      <div
        className={`fixed inset-y-0 z-10 flex flex-col w-80 transition-transform duration-300 bg-neutral-900 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Curvy shape */}
        {/* <svg
          className="absolute inset-0 w-full h-full"
          style={{ filter: "drop-shadow(10px 0 10px #00000030)", color: "#151617" }}
          preserveAspectRatio="none"
          viewBox="0 0 309 800"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M268.487 0H0V800H247.32C207.957 725 207.975 492.294 268.487 367.647C329 243 314.906 53.4314 268.487 0Z" />
        </svg> */}
        {/* Sidebar content */}
        <div className="z-10 flex flex-col flex-1 items-center">
          <div className="flex items-center justify-between flex-shrink-0 w-64 p-4">
            {/* Logo */}
            <Link href="/admin" className="py-4 flex items-center justify-center">
              <Image src="/assets/images/icon.png" height={40} width={40} alt="Logo" />
              <span className="ps-4 text-2xl text-white font-bold">WebTrade</span>
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
            <a href="/admin/users" className={getLinkClassName('/admin/users')}>
              <span className="p-4 border rounded-full bg-black text-white">
              <FaUsers className="w-6 h-6" /> 
              </span>
              <span className="ps-4">Users</span>
            </a>
            <a href="/admin/wallet" className={getLinkClassName('/admin/wallet')}>
              <span className="p-4 border rounded-full bg-black text-white">
              <FaWallet className="w-6 h-6" />
              </span>
              <span className="ps-4">Wallets</span>
            </a>
            <a href="/admin/subAdmin" className={getLinkClassName('/admin/subAdmin')}>
              <span className="p-4 border rounded-full bg-black text-white">
              <FaUserShield className="w-6 h-6" />
              </span>
              <span className="ps-4">Admins</span>
            </a>
            <a href="/admin/trading" className={getLinkClassName('/admin/trading')}>
              <span className="p-4 border rounded-full bg-black text-white">
              <FaChartLine className="w-6 h-6" />
              </span>
              <span className="ps-4">Trading</span>
            </a>
            <a href="/admin/deposit" className={getLinkClassName('/admin/deposit')}>
              <span className="p-4 border rounded-full bg-black text-white">
              <FaMoneyCheckAlt className="w-6 h-6" />
              </span>
              <span className="ps-4">Deposits</span>
            </a>
            <a href="/admin/withdraw" className={getLinkClassName('/admin/withdraw')}>
              <span className="p-4 border rounded-full bg-black text-white">
              <PiHandWithdrawFill className="w-6 h-6" />
              </span>
              <span className="ps-4">Withdrawals</span>
            </a>
            {/* Add more navigation items here */}
          </nav>

          <div>
            <button 
              onClick={logOut}
              className="flex items-center justify-start text-xl rounded-full bg-white text-black mb-2 p-2 w-64 ps-2 hover:text-red-500">
              <span className="p-4 border rounded-full bg-black text-white">
                <FaTimes className="w-6 h-6" />
              </span>
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