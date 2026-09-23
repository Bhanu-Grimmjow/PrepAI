import React, { useState } from "react";
import {useNavigate,Link} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [email,setEmail]= useState("")
  const [password,setPassword]= useState("")
  const[username, setUsername]=useState("")
const navigate=useNavigate();

const{loading,handleRegister}=useAuth()

    const handleSubmit= async(e)=>{
        e.preventDefault();
        await handleRegister({username,email,password});
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

      {/* Register Card */}
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
            Create Account
          </h1>

          <p className="text-sm text-[#8F8A94] mt-1">
            Create your account to get started
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* User Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white mb-1.5"
            >
              User Name 
            </label>

            <input
            onChange={(e)=>{setUsername(e.target.value)}}
              id="name"
              type="text"
              placeholder="Enter your full name"
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-1.5"
            >
              Password
            </label>

            <input
            onChange={(e)=>{setPassword(e.target.value)}}
              id="password"
              type="password"
              placeholder="Create a password"
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

         

          {/* Terms */}
          <label
            className="
              flex
              items-start
              gap-2
              text-sm
              text-[#8F8A94]
              cursor-pointer
            "
          >
            <input
              type="checkbox"
              className="
                w-4 h-4
                mt-0.5
                accent-[#E52B35]
                cursor-pointer
              "
            />

            <span>
              I agree to the{" "}
              <a
                href="#"
                className="
                  text-[#E52B35]
                  hover:text-[#FF5A62]
                  transition-colors
                  duration-150
                "
              >
                Terms & Conditions
              </a>
            </span>
          </label>

          {/* Register Button */}
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
            Create Account
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

        {/* Google */}
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

        {/* Login */}
        <p className="text-center text-sm text-[#8F8A94] mt-4">
          Already have an account?{" "}

          <Link
            to={"/login"}
            className="
              text-[#E52B35]
              font-semibold

              transition-colors
              duration-150

              hover:text-[#FF5A62]
            "
          >
            Login
          </Link>
        </p>

      </div>

    </main>
  );
};

export default Register;
