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
    setError('');
    
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground m-4">
      <h1 className="m-2 text-4xl font-bold text-blue-500">Sign Up</h1>
      
      <form className="w-full max-w-sm mt-6" onSubmit={handleSubmit}>
        <label className="block text-xl text-muted-foreground">username</label>
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username" 
          className="bg-transparent mt-2 p-4 border-2 border-blue-900 rounded-full w-full outline-none focus:ring focus:ring-blue-500"
          disabled={isSubmitting}
        />
        
        <label className="block text-xl text-muted-foreground mt-4">Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email" 
          className="bg-transparent mt-2 p-4 border-2 border-blue-900 rounded-full w-full outline-none focus:ring focus:ring-blue-500"
          disabled={isSubmitting}
        />
        
        <label className="block text-xl text-muted-foreground mt-4">Password</label>
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password" 
            className="bg-transparent mt-2 p-4 border-2 border-blue-900 rounded-full w-full outline-none focus:ring focus:ring-blue-500"
            disabled={isSubmitting}
          />
          <span 
            className="absolute right-4 top-7 cursor-pointer" 
            onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEye className='h-5 w-5' /> : <FaEyeSlash className='h-5 w-5' />}
          </span>
        </div>

        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        {success && <p className="text-green-500 mt-2 text-center">{success}</p>}

        <button
          type="submit"
          className="mt-8 p-4 bg-blue-500 text-white rounded-full w-full hover:bg-blue-400 flex justify-center items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="w-5 h-5 border-4 border-t-transparent border-white border-solid rounded-full animate-spin mr-3"></div>
              <span>Signing Up...</span>
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
        
        <p className="mt-4 text-muted-foreground text-center">
          <Link href="/auth/signin" className="text-blue-500 hover:underline">Already have an account? Sign In</Link>
        </p>
      </form>
    </div>
  );
}
