"use client";

import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";


const SignUpPage: React.FC = () => {
    
    const router = useRouter();
    const handleSignup = ()=> {
        router.push(`signup`)
    };

    type signup = {
        firstName: String
        lastName: String
        email: String
        password: String
        confirmPassword: String
        phone: number

    }

    const { register, handleSubmit, getValues, formState: { errors }} = useForm<Login>();

    const onSubmit = async (data: signup) => {
        try {
            let response = await axios.post(`${AUTH_SERVICE_URL}/user-login`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            const user = response.data.user;
            if(response.data.success) {
                localStorage.setItem('user', JSON.stringify(user));
                toast.success('user registered');
                setTimeout(()=> {
                    router.replace(`home`)
                },3000)
            }
        } catch (error) {
            
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
                        <p className="text-sm text-center text-gray-500">
                            Fill in the details to sign up
                        </p>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
                            {/* Name Input */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    First Name
                                </label>
                                <input
                            {...register("firstName", {
                                required: "First name is required",
                                pattern: {
                                    value: /^(?=.{1,15}$)[A-Za-z][A-Za-z0-9._]*$/,
                                    message:
                                        "Username can only contain letters, numbers, periods, and underscores. It must start with a letter.",
                                },
                            })}
                            type='text'
                            placeholder="First Name"
                            className="w-full px-4 py-2 text-lg text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
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
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
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
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    required
                                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>

                        <div className="flex items-center justify-center space-x-2 mt-6">
                            <span className="h-px w-16 bg-gray-300"></span>
                            <span className="text-sm text-gray-500">or</span>
                            <span className="h-px w-16 bg-gray-300"></span>
                        </div>

                        {/* Google Sign-In Button */}
                        <button
                            type="button"
                            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-2 mt-4"
                        >
                            <img
                                src="https://www.svgrepo.com/show/355037/google.svg"
                                alt="Google Icon"
                                className="w-5 h-5"
                            />
                            <span>Sign Up with Google</span>
                        </button>

                        <p className="text-sm text-center text-gray-500 mt-6">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-500 hover:underline">
                                Log in here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
