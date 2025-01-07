'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { resendOtp, verifyOTP } from '@/api/userAuthentication';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const OTPPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const email = pathname.split('/').pop() || ''

  const [otp, setOtp] = useState<string[]>(Array(4).fill(''));
  const [counter, setCounter] = useState<number>(10);
  const [resendDisabled, setResendDisabled] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setResendDisabled(false);
    }
  }, [counter]);

  const handleResend = async () => {
    try {
      console.log("Resending OTP for:", email);
        // const response = await resendOtp(email);
        let payload = {
          "email": email
        }
     
        const response2 = await resendOtp(email)
        console.log("Response from server:", response2);

      setCounter(10);
      setResendDisabled(true);
    } catch (error: any) {
      toast.error(error.message || 'Failed to resend OTP');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const nextSibling = document.getElementById(`otp-input-${index + 1}`);
      nextSibling?.focus();
    } else if (!value && index > 0) {
      const prevSibling = document.getElementById(`otp-input-${index - 1}`);
      prevSibling?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const otpValue = otp.join('');
    if (otpValue.length !== otp.length) {
      toast.error(`Please enter ${otp.length} digits`);
      setIsSubmitting(false);
      return;
    }

    try {
      const response: any = await verifyOTP(otpValue, email);
      if (response._id) {
        toast.success('User Registered Successfully');
        router.replace('/');
      } else {
        toast.error(response.response?.data?.message || 'Verification failed');
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
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Enter OTP</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-2">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(e, index)}
                className="w-12 h-12 text-xl text-center border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              type="button"
              onClick={handleResend}
              disabled={resendDisabled}
              className={`text-sm font-medium ${
                resendDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500 hover:underline'
              }`}
            >
              Resend OTP
            </button>
            <span className="text-sm text-gray-500">
              00:{counter < 10 ? `0${counter}` : counter}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 ${
              isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default OTPPage;
