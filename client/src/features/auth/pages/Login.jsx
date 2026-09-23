import React from "react";
import {useNavigate,Link} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";


const Login = () => {
const { loading, handleLogin } = useAuth();


const [email,setEmail]= useState("")
const [password,setPassword]= useState("")

    const navigate =useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        await handleLogin({email,password})
        navigate("/")

    }
 if (loading) {
  return (
    <div className="min-h-screen w-full bg-[#080808] flex items-center justify-center">

      <div className="flex flex-col items-center">

        {/* Loading Indicator */}
        <div className="flex items-center gap-1.5">

          <span
            className="
              w-2 h-2
              rounded-full
              bg-[#E52B35]
              animate-pulse
            "
          />

          <span
            className="
              w-2 h-2
              rounded-full
              bg-[#E52B35]
              animate-pulse
              [animation-delay:150ms]
            "
          />

          <span
            className="
              w-2 h-2
              rounded-full
              bg-[#E52B35]
              animate-pulse
              [animation-delay:300ms]
            "
          />

        </div>

        <p className="mt-4 text-sm text-[#8F8A94]">
          Loading...
        </p>

      </div>

    </div>
  );
}
  return (
    <main className="min-h-screen w-full bg-[#080808] flex items-center justify-center px-4 py-6">

      {/* Login Card */}
      <div
        className="
          w-full
          max-w-[420px]
          bg-[#13090A]
          border border-[#321619]
          rounded-2xl
          px-6 py-5
          sm:px-7 sm:py-6
        "
      >

        {/* Logo */}
        <div className="flex justify-center mb-3">
          <div
            className="
              w-11 h-11
              rounded-xl
              flex items-center justify-center
              bg-[#2A0D10]
              border border-[#7A252C]
              text-xl
            "
          >
            🔥
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="text-sm text-[#8F8A94] mt-1">
            Login to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-1.5"
            >
              Email
            </label>

            <input
            onChange={(e)=>{setEmail(e.target.value)}}
              id="email"
              type="email"
              placeholder="Enter your email"
              className="
                w-full
                h-11
                px-4
                rounded-lg
                bg-[#0B0B0B]
                border border-[#321619]
                text-white
                placeholder-[#5F5963]
                outline-none

                transition-colors
                duration-150

                hover:border-[#4A1D22]
                focus:border-[#E52B35]
              "
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">

              <label
                htmlFor="password"
                className="text-sm font-medium text-white"
              >
                Password
              </label>

              <a
                href="#"
                className="
                  text-xs sm:text-sm
                  text-[#E52B35]
                  transition-colors
                  duration-150
                  hover:text-[#FF5A62]
                "
              >
                Forgot password?
              </a>

            </div>

            <input
             onChange={(e)=>{setPassword(e.target.value)}}
              id="password"
              type="password"
              placeholder="Enter your password"
              className="
                w-full
                h-11
                px-4
                rounded-lg
                bg-[#0B0B0B]
                border border-[#321619]
                text-white
                placeholder-[#5F5963]
                outline-none

                transition-colors
                duration-150

                hover:border-[#4A1D22]
                focus:border-[#E52B35]
              "
            />
          </div>

          {/* Remember Me */}
          <label className="flex items-center gap-2 text-sm text-[#8F8A94] cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#E52B35] cursor-pointer"
            />

            Remember me
          </label>

          {/* Login Button */}
          <button
            type="submit"
            className="
              w-full
              h-11
              rounded-lg
              bg-[#E52B35]
              text-white
              font-semibold

              transition-colors
              duration-150

              hover:bg-[#F13A44]
              active:bg-[#D9232D]
            "
          >
            Login
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-4">

          <div className="h-px flex-1 bg-[#321619]" />

          <span className="text-xs text-[#77717A]">
            OR
          </span>

          <div className="h-px flex-1 bg-[#321619]" />

        </div>

        {/* Google Button */}
        <button
          type="button"
          className="
            w-full
            h-11
            rounded-lg
            border border-[#321619]
            bg-transparent
            text-white
            font-medium

            flex
            items-center
            justify-center
            gap-2

            transition-colors
            duration-150

            hover:bg-[#1A0C0E]
            hover:border-[#4A1D22]
          "
        >
          <span className="font-bold">
            G
          </span>

          Continue with Google
        </button>

        {/* Signup */}
        <p className="text-center text-sm text-[#8F8A94] mt-4">
          Don't have an account?{" "}

         <Link
            to={"/register"}
            className="
              text-[#E52B35]
              font-semibold
              transition-colors
              duration-150
              hover:text-[#FF5A62]    
            "
          >
            Sign Up
        </Link>
        </p>

      </div>

    </main>
  );
};

export default Login;