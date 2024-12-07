"use client";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AUTH_SERVICE_URL } from '@/utils/constants'
import Link from 'next/link';


function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false);


    type signup = {
        firstName: String
        lastName: String
        email: String
        password: String
        confirmPassword: String
        phone: number

    }
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<signup>();
    const router = useRouter()
    const onSubmit = async (data: signup) => {

        try {
            setIsSubmitting(true); 
            localStorage.clear();

            let response = await axios.post(`${AUTH_SERVICE_URL}/user-signup`, data, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (response.data.success) {
                toast.info('Verify OTP')
                setTimeout(() => {
                    router.push(`otpPage?id=${data.email}`)
                }, 3000);
            } else {
                toast.error('User Already exists')
            }
        } catch (error: any) {
            console.log(error);
        }finally {
            setIsSubmitting(false); 
        }
    }
    return (
        <>

            <div className="flex justify-center items-center min-h-screen bg-cover bg-center"
                style={{ backgroundImage: `url('images/homepage1.jpg')` }}>                <form
                    onSubmit={handleSubmit(onSubmit)}

                    className="w-full max-w-lg bg-black p-8 rounded-lg shadow-lg"
                >
                    <h2 className="text-3xl font-semibold text-white text-center mb-6">Sign Up to start <span className="text-green-400">{`Job hunt`}</span></h2>

                    <div className="mb-4">
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
                        <p className="text-red-600">{errors.firstName?.message as string}</p>
                    </div>

                    <div className="mb-4">
                        <input
                            {...register("lastName", {
                                required: "Last name is required",
                                pattern: {
                                    value: /^(?=.{1,15}$)[A-Za-z][A-Za-z0-9._]*$/,
                                    message:
                                        "Username can only contain letters, numbers, periods, and underscores. It must start with a letter.",
                                },
                            })}
                            type='text'
                            placeholder="Last Name"
                            className="w-full px-4 py-2 text-lg text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <p className="text-red-600">{errors.lastName?.message as string}</p>
                    </div>


                    <div className="mb-4">
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Please enter a valid email address.",
                                },
                            })}
                            type='email'
                            placeholder="Enter email"
                            className="w-full px-4 py-2 text-lg text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <p className="text-red-600">{errors.email?.message as string}</p>
                    </div>

                    <div className="mb-4">
                        <input
                            {...register("phone", {
                                required: "Phone is required",
                                pattern: {
                                    value: /^\d{10}$/,
                                    message: "Please enter a valid 10-digit mobile number.",
                                }
                            })}
                            type='tel'
                            placeholder="Enter phone"
                            className="w-full px-4 py-2 text-lg text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <p className="text-red-600">{errors.phone?.message as string}</p>
                    </div>

                    <div className="mb-4">
                        <input
                            {...register("password", {
                                required: "Enter password",
                                pattern: {
                                    value:
                                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_+~`|}{[\]:;?><,./-]).{8,}$/,
                                    message:
                                        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
                                },
                            })}
                            type='password'
                            placeholder="Enter password"
                            className="w-full px-4 py-2 text-lg text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <p className="text-red-600">{errors.password?.message as string}</p>
                    </div>

                    <div className="mb-6">
                        <input
                            {...register("confirmPassword", {
                                required: "Confirm Password",
                                validate: (value) => value === getValues("password") || "Passwords do not match",
                                pattern: {
                                    value:
                                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_+~`|}{[\]:;?><,./-]).{8,}$/,
                                    message:
                                        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
                                },
                            })}
                            type='password'
                            placeholder="Confirm password"
                            className="w-full px-4 py-2 text-lg text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <p className="text-red-600">{errors.confirmPassword?.message as string}</p>
                    </div>
                    <button
    type="submit"
    className={`w-full ${isSubmitting ? 'bg-green-400' : 'bg-green-500 hover:bg-green-600'} 
                text-white font-semibold py-3 rounded-lg transition-colors duration-300`}
    disabled={isSubmitting} // Disable button while submitting
>
    {isSubmitting ? (
        <div className="flex justify-center items-center">
            <svg
                className="animate-spin h-5 w-5 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
            </svg>
            Please wait...
        </div>
    ) : (
        "Sign Up"
    )}
</button>
                    <div>
                        <br />

                        <Link href={'/login'}>
                            Already having an account?
                            <button className=" text-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition">
                                Login
                            </button>
                        </Link>
                    </div>


                </form>
            </div>
        </>

    )
}

export default Page