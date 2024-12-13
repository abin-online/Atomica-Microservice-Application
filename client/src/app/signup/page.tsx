"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signup } from "@/api/user";
import userAuth from "@/api/middleware/middleware";

const SignUpPage: React.FC = () => {
  userAuth()
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSignup = () => {
    router.push(`signup`);
  };

  type signup = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: number;
  };

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<signup>();

  const onSubmit = async (data: signup) => {
    const {name, email, password, phone,  confirmPassword} = data

    if(password != confirmPassword) {
        return toast.error('Password not matching');
    }

    try {
        const response = await signup({name, email,phone, password});
        console.log("res==========>",response)
        if(response.success) {
            localStorage.setItem('verifyToken', response.verifyToken);
            toast.success('OTP sent successfully')
            setTimeout(() => {
              router.replace(`/otp/${email}`);
            }, 3000);
        }else {
            console.log('ttttttttt' , response , 'dfsa')
            toast.error(response.response?.data?.message || "An error occurred.");
          }
    } catch (error) {
        toast.error('Failed to register. Please try again')
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {/* Centered Container */}
      
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section - Image */}
        <div className="hidden lg:block lg:w-1/2 bg-green-500">
          <img
            src="https://cdn.wallpapersafari.com/13/89/wb4WOU.jpg"
            alt="Sign Up Visual"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Section - Sign Up Form */}
        <div className="flex items-center justify-center w-full lg:w-1/2 p-8 bg-white">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Create Your Account
            </h2>
            <p className="text-sm text-center text-gray-500 mt-2">
              Fill in the details to sign up
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 mt-6"
            >
              {/* Username Input with Animation */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  {...register("name", {
                    required: "Username is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_]{3,15}$/,
                      message:
                        "Username must be between 3-15 characters and only contain letters, numbers, or underscores.",
                    },
                  })}
                  type="text"
                  placeholder="Enter your username"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
                )}
              </motion.div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address.",
                    },
                  })}
                  type="email"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Input */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Please enter a valid 10-digit phone number.",
                    },
                  })}
                  type="tel"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                              

                  {...register("password", {
                    required: "Enter a password",
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_+~`|}{[\]:;?><,./-]).{8,}$/,
                      message:
                        "Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character",
                    },
                })}
                  type="password"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === getValues("password") || "Passwords do not match",
                  })}
                  type="password"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className={`w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  disabled={isSubmitting}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
