"use client";

import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AUTH_SERVICE_URL } from "@/utils/constants";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { login } from "@/api/user";
import { useAppDispatch } from "@/lib/hook";
import { setUser } from "@/lib/features/users/userSlice";
import userAuth from "@/api/middleware/middleware";

function Page() {
  userAuth()
  const router = useRouter();
  const dispatch = useAppDispatch()
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
    // Perform the login request
    const response = await login(data); // Assuming `login` is an API function
    console.log("Response received:", response);

    const user = response?.user;
    const success = response?.data?.success;
    const errorMessage = response?.data?.errorMessage;

    if (user) {
      // Store user data in localStorage and show success toast
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Welcome to atomica");
      console.log('user data ___________>', user)
      
      dispatch((setUser({
        id: user._id,
        name: user.name,
        email: user.email,
        blocked: user.is_blocked
      })))

      // Redirect to home page after a brief delay
      setTimeout(() => {
        router.replace(`/`);
      }, 3000);
    } else {
      // Log error and handle different error messages
      
          toast.error("Invalid credentials.");
      
    }
  } catch (error) {
    // Handle Axios errors based on status codes
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response);
      switch (error.response?.status) {
        case 403:
          toast.error("User is blocked");
          break;
        case 401:
          toast.error("Invalid credentials");
          break;
        default:
          toast.error("An unexpected server error occurred");
      }
    } else {
      // Handle any non-Axios errors
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred");
    }
  }
};

  

  // const handleGoogleLogin = async () => {
  //   const auth = getAuth(app);
  //   const provider = new GoogleAuthProvider();
  //   provider.setCustomParameters({ prompt: 'select_account' }); 


  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;
  //     console.log("User Info:", user);
  //     let response = await axios.post(`${AUTH_SERVICE_URL}/googleLogin`, user, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       withCredentials: true,
  //     });
  //     console.log(response);
  //     const googleUser = response.data.googleUser;
  //     if (response.data.success) {
  //       localStorage.setItem("user", JSON.stringify(googleUser));
  //       toast.success("Welcome");
  //       setTimeout(() => {
  //         router.replace(`jobListingPage`);
  //       }, 3000);
  //     }
  //     if (response.data.errorMessage === "User is blocked") {
  //       toast.error("You are blocked");
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.error("Axios Error:", error.response?.data || error.message);
  //       toast.error("Login failed due to network or server issues");
  //     } else {
  //       console.error("Unexpected Error:", error);
  //     }
  //   }
  // };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      
      {/* Centered Container */}
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section - Image */}
        <div className="hidden lg:block lg:w-1/2 bg-blue-500">
          <img
            src="https://cdn.wallpapersafari.com/13/89/wb4WOU.jpg"
            alt="Login Visual"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Section - Login Form */}
        <div className="flex items-center justify-center w-full lg:w-1/2 p-8 bg-white">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Welcome Back!
            </h2>
            <p className="text-sm text-center text-gray-500">
              Login to access your account
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
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
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <p className="text-red-600">{errors.email?.message as string}</p>
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
                    required: "Enter password",
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_+~`|}{[\]:;?><,./-]).{8,}$/,
                      message:
                        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
                    },
                  })}
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <p className="text-red-600">{errors.password?.message as string}</p>
                <div className="flex justify-end text-sm mt-2">
                  <a href="#" className="text-blue-500 hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit
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
              // onClick={googleSubmit}
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google Icon"
                className="w-5 h-5"
              />
              <span>Sign in with Google</span>
            </button>

            <p className="text-sm text-center text-gray-500 mt-6">
              Are you new?{" "}
              <a href="/signup" className="text-blue-500 hover:underline">
                Please Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;