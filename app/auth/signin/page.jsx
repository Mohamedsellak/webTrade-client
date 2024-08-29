"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { FaEyeSlash, FaEye } from "react-icons/fa"

export default function Page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.')
            return
        }

        if (password.length ===0) {
            setError('Please Enter the Password .')
            return
        }

        setIsSubmitting(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()
            if (response.ok && data) {
                // Handle successful sign-in
                // console.log('Sign-in successful:', data)
                localStorage.setItem("token", data.token)
                localStorage.setItem("authData", JSON.stringify(data.authData))
                // Redirect or perform other actions
                window.location.href = `/${data.authData.role}`
            } else {
                setError(data || 'Sign-in failed. Please try again.')
            }

        } catch (error) {
            console.log(error)
            setError('An error occurred. Please try again later.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground m-4">
            <h1 className="m-2 text-4xl font-bold text-blue-500">Sign in</h1>

            <form className="w-full max-w-sm mt-6" onSubmit={handleSubmit}>
                <label className="block text-xl text-muted-foreground">Email</label>
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
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="bg-transparent mt-2 p-4 border-2 border-blue-900 rounded-full w-full outline-none focus:ring focus:ring-blue-500"
                        disabled={isSubmitting}
                    />
                    <span className="absolute right-4 top-7 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
                    </span>
                </div>

                {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

                <button
                    type="submit"
                    className="mt-8 p-4 bg-blue-500 text-white rounded-full w-full hover:bg-blue-400 flex justify-center items-center"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <div className="flex items-center">
                            <div className="h-6 w-6 border-4 border-white border-l-blue-600 animate-spin rounded-full mr-3">
                            </div>
                            Signing In...
                        </div>
                    ) : (
                        "Sign in"
                    )}
                </button>


                    

                
            </form>

            <div className="flex justify-between items-center mt-4 text-muted-foreground text-center">
                <Link href="/auth/forgotPassword" className="text-blue-500 hover:underline">
                    Forgot your password?
                </Link>
                <Link href="/auth/signup" className="text-blue-500 hover:underline">
                    Sign up
                </Link>
            </div>
        </div>
    )
}
