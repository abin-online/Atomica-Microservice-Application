"use client";

import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AUTH_SERVICE_URL } from "@/utils/constants";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase/config";

function Page() {
  const router = useRouter();
  const handleSignup = () => {
    router.push(`signup`);
  };

  type Login = {
    email: string;
    password: string;
  };

  const { register, handleSubmit, formState: { errors } } = useForm<Login>();

  const onSubmit = async (data: Login) => {
    try {
      let response = await axios.post(`${AUTH_SERVICE_URL}/user-login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const user = response.data.user;
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Welcome");
        setTimeout(() => {
          router.replace(`jobListingPage`);
        }, 3000);
      }
      if (response.data.errorMessage === "Give valid credentials") {
        toast.info("Give valid credentials");
      }
      if (response.data.errorMessage === "User is blocked") {
        toast.error("You are blocked");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          toast.error("User is blocked");
        } else if (error.response?.status === 401) {
          toast.error("Invalid credentials");
        } else {
          toast.error("An unexpected error occurred");
        }
      } else {
        toast.error("An unexpected error occurred");
        console.error(error);
      }
    }
  };

  const handleGoogleLogin = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' }); 


    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user);
      let response = await axios.post(`${AUTH_SERVICE_URL}/google-login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response);
      const googleUser = response.data.googleUser;
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(googleUser));
        toast.success("Welcome");
        setTimeout(() => {
          router.replace(`jobListingPage`);
        }, 3000);
      }
      if (response.data.errorMessage === "User is blocked") {
        toast.error("You are blocked");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.response?.data || error.message);
        toast.error("Login failed due to network or server issues");
      } else {
        console.error("Unexpected Error:", error);
      }
    }
  };

  return (
    <>
      <div
        className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('images/homepage1.jpg')` }}
      >
        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg bg-black p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-white text-center mb-6">
            Login to <span className="text-green-400">{`_JobClub.`}</span>
          </h2>

          <div className="mb-4">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address.",
                },
              })}
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-2 text-lg text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-red-600">{errors.email?.message as string}</p>
          </div>

          <div className="mb-4">
            <input
              {...register("password", {
                required: "Enter password",
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_+~`|}{[\]:;?><,./-]).{8,}$/,
                  message:
                    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 text-lg text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-red-600">{errors.password?.message as string}</p>
          </div>

          <div className="space-y-2">
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
            >
              Login
            </button>
          </div>
        </form>

        <div className="w-full max-w-lg mt-4 space-y-4">
          <button
            onClick={handleSignup}
            className="w-full bg-green-900 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
          >
            New User? Sign Up
          </button>
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-300 hover:bg-gray-100"
          >
            <img
              src="/images/glogo.png"
              alt="Google logo"
              className="w-5 h-5"
            />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Page;