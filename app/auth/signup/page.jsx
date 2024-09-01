"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { FaEyeSlash, FaEye } from "react-icons/fa";

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    setSuccess("")
    
    // Simple validation
    if (!username || !email || !password) {
      setError('Please fill out all fields.');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Replace with your API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok && data) {
        // Handle successful sign-up
        console.log('Sign-up successful:', data);
        // Redirect or perform other actions
        setSuccess('Sign-up successful !!!');
        setTimeout(() => {
          window.location.href = '/auth/signin';
        }, 4000);
      } else {
        setError(data || 'Sign-up failed. Please try again.');
      }

    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <h1 className="m-2 text-4xl font-bold text-black">Sign Up</h1>
      
      <form className="w-full max-w-sm mt-6" onSubmit={handleSubmit}>
        <label className="block text-xl text-zinc-600">username</label>
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username" 
          className="bg-transparent mt-2 p-4 border-2 border-zinc-400 rounded-full w-full outline-none focus:border-black"
          disabled={isSubmitting}
        />
        
        <label className="block text-xl text-zinc-600 mt-4">Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email" 
          className="bg-transparent mt-2 p-4 border-2 border-zinc-400 rounded-full w-full outline-none focus:border-black"
          disabled={isSubmitting}
        />
        
        <label className="block text-xl text-zinc-600 mt-4">Password</label>
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password" 
            className="bg-transparent mt-2 p-4 border-2 border-zinc-400 rounded-full w-full outline-none focus:border-black"
            disabled={isSubmitting}
          />
          <span 
            className="absolute right-4 top-7 cursor-pointer text-black" 
            onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEye className='h-5 w-5' /> : <FaEyeSlash className='h-5 w-5' />}
          </span>
        </div>

        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        {success && <p className="text-green-500 mt-2 text-center">{success}</p>}

        <button
          type="submit"
          className="mt-8 p-4 border-2 bg-black text-white rounded-full w-full hover:bg-white hover:border-black hover:text-black flex justify-center items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="h-6 w-6 border-4 border-blue-500 border-l-blue-600 animate-spin rounded-full mr-3"></div>
              <span>Signing Up...</span>
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
        
        <p className="mt-4 text-muted-foreground text-center">
          <Link href="/auth/signin" className="text-black hover:underline">Already have an account?</Link>
        </p>
      </form>
    </div>
  );
}
