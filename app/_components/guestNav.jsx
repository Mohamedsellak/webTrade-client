"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { MdMenuOpen } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';

const Nav = () => {

    const [openMobileMenu,setOpenMobileMenu] = useState(false)

  return (
    <nav className="fixed w-full z-20 top-0 start-0 backdrop-blur-sm bg-white shadow-md shadow-gray-300">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className='text-black uppercase text-2xl font-extrabold'>
            PrimeWebTrade
            {/* <Image src="/assets/images/logo.svg" height={150} width={150} alt="Logo" /> */}
          </Link>
        </div>
        
        {/* Center Links */}
        <div className="hidden md:flex justify-center flex-1">
          <ul className="flex space-x-8 text-black font-bold text-lg">
            <li>
              <Link href="/" className="hover:text-gray-400 ">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-400">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gray-400">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Sign In/Sign Up */}
        <div className="hidden md:flex items-center space-x-4 text-lg">
          <Link href="/auth/signin" className="bg-transparent text-black border-2 border-black rounded-full px-7 py-3 hover:bg-black hover:text-white">
            Sign In
          </Link>
          <Link href="/auth/signup" className="bg-black text-white border-2 border-black rounded-full px-7 py-3 hover:bg-white hover:text-black">
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            data-collapse-toggle="navbar-sticky" 
            type="button" className="p-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={()=>setOpenMobileMenu(!openMobileMenu)}
          >
            {
                openMobileMenu 
                ? (<IoMdClose className='h-8 w-8'/>) 
                : (<MdMenuOpen  className='h-8 w-8'/>)
                    
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {
        openMobileMenu && (
            <div className="md:hidden flex flex-col items-center space-y-2 text-white p-4 border-t-2 border-white text-lg">
                <Link href="/" className="text-black py-2 w-full text-center hover:text-gray-500">
                Home
                </Link>
                <Link href="/#about" className="text-black py-2 w-full text-center hover:text-gray-500">
                About
                </Link>
                <Link href="/#services" className="text-black py-2 w-full text-center hover:text-gray-500">
                Services
                </Link>
                <Link href="/#contact" className="text-black py-2 w-full text-center hover:text-gray-500">
                Contact
                </Link>
                <Link href="/auth/signin" className="py-2 w-full text-center text-black border-2 border-black rounded-full hover:bg-black hover:text-white">
                Sign In
                </Link>
                <Link href="/auth/signup" className="py-2 w-full text-center text-white bg-black border-2 border-black rounded-full hover:bg-white hover:text-black">
                Sign Up
                </Link>
            </div>
        )
      }
    </nav>
  );
};

export default Nav;
