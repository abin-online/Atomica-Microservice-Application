'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { forgotPassword } from '@/api/userAuthentication';
import { useRouter } from 'next/navigation';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()
  const handleSubmit = async () => {
    try {
      console.log("forgot password", email)
      const response = await forgotPassword(email)
      router.push(`/forgotOtpVerify`)
    } catch (error) {

    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Forgot Password</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Enter your email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 text-sm border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <motion.button
            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
              }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
