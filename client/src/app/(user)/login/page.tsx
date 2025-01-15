"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { login } from "@/api/userAuthentication";
import { useAppDispatch } from "@/lib/hook";
import { setUser } from "@/lib/features/users/userSlice";
import { userGoogleLogin } from "@/api/userAuthentication";
import { jwtDecode } from 'jwt-decode';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { userAuth } from "@/api/middleware/middleware";
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
        //localStorage.setItem("user", JSON.stringify(user));
        toast.success("Welcome to atomica");
        console.log('user data ___________>', user)
          console.log("user token___________",response.token)
        console.log(response.token.role,'response of login my form submit')
        localStorage.setItem('accesToken',response.token.accessToken)
        localStorage.setItem('refreshToken',response.token.refreshToken)
        localStorage.setItem('role',response.token.role)

        dispatch((setUser({
          id: user._id,
          name: user.name,
          email: user.email,
          role: 'user',
          blocked: user.is_blocked
        })))

        // Redirect to home page after a  delay
        setTimeout(() => {
          router.replace(`/`);
        }, 1500);
      } else {
        // Log error and handle different error messages
        console.log("res msg =>>>>", response?.response.data.message)
        if (response?.response.data.message == "access denied") {
          toast.error("Access denied");
        } else if (response?.response.data.message == 'incorrect password') {
          toast.error("Incorrect password");
        } else if (response?.response.data.message == 'invalid email id') {
          toast.error("Invalid email");
        } else {
          toast.error('An unexpected error occured')
        }

      }
    } catch (error) {
      console.log(error)
    }
  };

  

  const googleSubmit = async (credentialResponse: any) => {


    console.log('gooogle')
    try {
      const decoded: any = jwtDecode(credentialResponse.credential)
      console.log("decoded", decoded);
      let response = await userGoogleLogin({ name: decoded.name, email: decoded.email, password: decoded.sub })
      console.log(response.user);
      if (response.user) {
        localStorage.setItem('accesToken', response.token.accessToken)
        localStorage.setItem('refreshToken', response.token.refreshToken)
        localStorage.setItem('role', response.token.role)
        dispatch(setUser({
          role: response.token.role,
          name: response.user.name,
          email: response.user.email,
          id: response.user._id,
          blocked: response.user.blocked,

        }
        ))
        router.push('/')

      } else {
        const { message } = response.response?.data
        toast.error(message)
      }
      const user = response.data.user;
    } catch (error) {
      console.log(error)
    }
  }


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
                  {/* <a href="/forgotPassword" className="text-blue-500 hover:underline">
                    Forgot Password?
                  </a> */}
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

          

            <GoogleOAuthProvider clientId="419017382512-dhm3aao5ojq7lkshbpm5buablq016piq.apps.googleusercontent.com">
              <div>
                <GoogleLogin
                  onSuccess={googleSubmit}
                  onError={() => console.error("Google Login Failed")}
                />
              </div>
            </GoogleOAuthProvider>

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