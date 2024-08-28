"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { FaEyeSlash,FaEye } from "react-icons/fa";

export default function page() {

    const [showPassword,setShowPassword] = useState(false)
  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground m-4">
        <h1 className="m-2 text-4xl font-bold text-green-500">Sign in</h1>
        
        <div className="w-full max-w-sm mt-6">
            <label className="block text-xl text-muted-foreground">Email</label>
            <input type="email" placeholder="Enter your email" className="bg-transparent mt-2 p-4 border-2 border-green-900 rounded-full w-full outline-none focus:ring focus:ring-green-500" />
            
            <label className="block text-xl text-muted-foreground mt-4">Password</label>
            <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Enter your password" className="bg-transparent mt-2 p-4 border-2 border-green-900 rounded-full w-full outline-none focus:ring focus:ring-green-500" />
                <span className="absolute right-4 top-7 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    
                    {
                        showPassword ? 
                        <FaEye className='h-5 w-5'/> : 
                        <FaEyeSlash className='h-5 w-5'/> 
                    }
                </span>
            </div>

            <button className="mt-8 p-4 bg-green-500 text-white rounded-full w-full hover:bg-green-400">Sign in</button>
            
            <div className="flex justify-between items-center mt-4 text-muted-foreground text-center">
                <Link href="/auth/forgotPassword" className="text-green-500 hover:underline">
                    Forgot your password?
                </Link>
                <Link href="/auth/signup" className="text-green-500 hover:underline">
                    Sign up
                </Link>
            </div>
        </div>
    </div>
  )
}
