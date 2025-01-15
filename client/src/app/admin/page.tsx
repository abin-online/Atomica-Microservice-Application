'use client';

import { adminLogin } from '@/api/adminAuthentication';
import { adminAuth } from '@/api/middleware/middleware';
import { setAdmin } from '@/lib/features/users/adminSlice';
import { useAppDispatch } from '@/lib/hook';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  // adminAuth()

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      dispatch(setAdmin(JSON.parse(storedAdmin)));
      router.push(`/admin/dashboard`)
    } else {
    }
  }, [dispatch]);



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  type Login = {
    email: string;
    password: string
  }

  const onSubmit = async (data: Login) => {
    try {
      // Perform the login request

      const response = await adminLogin(data); // Assuming `login` is an API function
      console.log("Response received:", response);

      const admin = response?.admin;
      const success = response?.data?.success;
      const errorMessage = response?.data?.errorMessage;

      if (admin) {
        // Store user data in localStorage and show success toast
        // localStorage.setItem("admin", JSON.stringify(admin));

        const adminData = {
          id: admin._id,
          name: 'ATOM',
          email: admin.email,
          role: admin.role,
        };

        dispatch(setAdmin(adminData));
        //localStorage.setItem('admin', JSON.stringify(adminData));
        console.log("Admin Token ",response.token)
        localStorage.setItem('adminAccessToken', response.token.accessToken);
        localStorage.setItem('adminRefreshToken', response.token.refreshToken);
        localStorage.setItem('adminRole', response.token.role);


        toast.success("Welcome to Admin Dashboard");
        console.log('admin data ___________>', admin)



        // Redirect to home page after a brief delay
        setTimeout(() => {
          router.replace(`/admin/dashboard`);
        }, 1500);
      } else {
        // Log error and handle different error messages
        console.log("res msg admin =>>>>", response?.response.data.message)
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


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">

      <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left --> Image */}
        <div className="hidden lg:block lg:w-1/2 bg-blue-500">
          <img
            src="https://cdn.wallpapersafari.com/13/89/wb4WOU.jpg"
            alt="Admin Login Visual"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right ---> Login Form */}
        <div className="flex items-center justify-center w-full lg:w-1/2 p-8 bg-white">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center text-gray-800">ATOMICA</h2>
            <h5 className="text-3xl font-bold text-center text-gray-800">ADMIN LOGIN</h5>

            <p className="text-sm text-center text-gray-500 mt-2">Secure access to the admin dashboard</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
              {/* Email */}
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

              {/* Password  */}
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
