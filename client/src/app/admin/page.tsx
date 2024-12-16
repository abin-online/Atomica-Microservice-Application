'use client';

import { useForm } from 'react-hook-form';

export default function AdminLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {/* Centered Container */}
      <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section - Image */}
        <div className="hidden lg:block lg:w-1/2 bg-blue-500">
          <img
            src="https://cdn.wallpapersafari.com/13/89/wb4WOU.jpg"
            alt="Admin Login Visual"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Section - Login Form */}
        <div className="flex items-center justify-center w-full lg:w-1/2 p-8 bg-white">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center text-gray-800">ATOMICA</h2>
            <h5 className="text-3xl font-bold text-center text-gray-800">ADMIN LOGIN</h5>

            <p className="text-sm text-center text-gray-500 mt-2">Secure access to the admin dashboard</p>
            <form  className="space-y-6 mt-6">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Admin Email
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Please enter a valid email address.',
                    },
                  })}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <p className="text-red-600 mt-1">{errors.email?.message as string}</p>
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
                  {...register('password', {
                    required: 'Password is required',
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_+~`|}{[\]:;?><,./-]).{8,}$/,
                      message:
                        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.',
                    },
                  })}
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <p className="text-red-600 mt-1">{errors.password?.message as string}</p>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Login
                </button>
              </div>
            </form>

            {/* Forgot Password */}
            <div className="flex justify-end text-sm mt-4">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
