'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useRouter, usePathname } from 'next/navigation';
import { resetPassword } from '@/api/userAuthentication';
import { useForm } from 'react-hook-form';

const ResetPassword: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const email = pathname.split('/').pop() || '';

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            const response: any = await resetPassword(email, data.password);
            if (response.status == 200) {
                toast.success('Password reset successful');
                router.replace('/login');
            } else {
                toast.error(response.message || 'Password reset failed');
            }
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
            >
                <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Reset Password</h2>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            {...register("password", {
                                required: "Enter a new password",
                                pattern: {
                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_+~`|}{[\]:;?><,./-]).{8,}$/,
                                    message: "Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character",
                                },
                            })}
                            type="password"
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {errors.password?.message && typeof errors.password.message === 'string' && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}

                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            {...register("confirmPassword", {
                                required: "Confirm your password",
                                validate: (value) => value === watch("password") || "Passwords do not match",
                            })}
                            type="password"
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {errors.confirmPassword?.message && typeof errors.confirmPassword.message === 'string' && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                        )}                    </div>
                    <motion.button
                        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                        {isSubmitting ? 'Resetting...' : 'Reset Password'}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default ResetPassword;
