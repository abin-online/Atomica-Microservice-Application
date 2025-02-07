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
// import { userAuth } from "@/api/middleware/middleware";
function Page() {

 // userAuth()
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
      {/* Left Side - Image */}
      <div className="lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0  from-black-800 to-black-900 opacity-50"></div>
        <img
          src="https://cdn.wallpapersafari.com/13/89/wb4WOU.jpg"
          alt="Login Visual"
          className="object-cover w-full h-full opacity-"
        />
        <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
          <h2 className="text-4xl font-bold mb-6">Welcome Back!</h2>
          <p className="text-lg mb-8">Start your journey with us and unlock amazing possibilities.</p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="ml-4">Secure and reliable platform</p>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <p className="ml-4">Join our growing community</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="lg:w-1/2 p-12 lg:p-16">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h2>
          <p className="text-gray-600 mb-8">Please sign in to continue to your account</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Enter password",
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_+~`|}{[\]:;?><,./-]).{8,}$/,
                    message: "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
                  },
                })}
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02]"
            >
              Sign In
            </button>
          </form>

      {/* Forgot Password Button */}
      <div className="mt-4 text-center">
          <a
            href="/forgotPassword"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Forgot Password?
          </a>
        </div>

          <div className="my-8 flex items-center justify-center space-x-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">or continue with</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="flex justify-center mb-8">
            <GoogleOAuthProvider clientId="419017382512-dhm3aao5ojq7lkshbpm5buablq016piq.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={googleSubmit}
                onError={() => console.error("Google Login Failed")}
              />
            </GoogleOAuthProvider>
          </div>

          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Page;