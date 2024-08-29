"use client"
import Link from 'next/link';
import React, { useState } from 'react';

export default function ResetPassword() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground m-4">
      <h1 className="m-2 text-4xl font-bold text-blue-500">Reset Password</h1>
      
      <div className="w-full max-w-sm mt-6">
        <label className="block text-xl text-muted-foreground">Email</label>
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="bg-transparent mt-2 p-4 border-2 border-blue-900 rounded-full w-full outline-none focus:ring focus:ring-blue-500" 
        />
        
        <button className="mt-8 p-4 bg-blue-500 text-white rounded-full w-full hover:bg-blue-400">
          Reset Password
        </button>
        
        <p className="mt-4 text-muted-foreground text-center">
          <Link href="/auth/signin" className="text-blue-500 hover:underline">Back to Sign In</Link>
        </p>
      </div>
    </div>
  );
}
