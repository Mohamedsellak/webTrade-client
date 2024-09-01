"use client"
import Link from 'next/link';
import React, { useState } from 'react';

export default function ResetPassword() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <h1 className="m-2 text-4xl font-bold">Reset Password</h1>
      
      <div className="w-full max-w-sm mt-6">
        <label className="block text-xl">Email</label>
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="bg-transparent mt-2 p-4 border-2 border-zinc-400 rounded-full w-full outline-none focus:border-black" 
        />
        
        <button className="mt-8 p-4 border-2 bg-black text-white rounded-full w-full hover:bg-white hover:border-black hover:text-black flex justify-center items-center">
          Reset Password
        </button>
        
        <p className="mt-4 text-center">
          <Link href="/auth/signin" className="hover:underline">Back to Sign In</Link>
        </p>
      </div>
    </div>
  );
}
