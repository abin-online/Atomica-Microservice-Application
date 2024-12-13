'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { resendOtp, verifyOTP } from '@/api/user';
import { useRouter, useSearchParams } from 'next/navigation';

const OTPPage: React.FC<{ params: { email: string } }> = ({ params }) => {  const router = useRouter();
  
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string[]>(Array(4).fill(''));
  const [counter, setCounter] = useState<number>(60);
  const [resendDisabled, setResendDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (params) {
      setEmail(params.email);
    }
  }, [params]);


  useEffect(() => {
    const timer: any =
      counter > 0 &&
      setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);

    if (counter === 0) {
      setResendDisabled(false);
    }

    return () => clearInterval(timer);
  }, [counter]);

  type otpData = {
    email : string;
  }

  const handleResend = async() => {
    
    setCounter(60);
    setResendDisabled(true);
    toast.success('OTP resent successfully!');
    // Add functionality to resend OTP via API if required
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // otp validation

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatic focus 
    if (value && index < otp.length - 1) {
      const nextSibling = document.getElementById(`otp-input-${index + 1}`);
      nextSibling?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpValue = otp.join('');
    console.log(otpValue)
    if (!email) {
      console.log('email  =>', email)
      toast.error('Email ID is missing or invalid');
      return;
    }

    if (otpValue.length === 4) {
      try {
        console.log("daaaaaaa",otpValue)
        const response: any = await verifyOTP(otpValue, email);
        if (response._id) {
          toast.success('User Registered Successfully ');
          return router.replace('/');
        }
        toast.error(response.response.data.message || 'Your verification is failed.');
      } catch (error: any) {
        toast.error(error.message || 'Something went wrong.');
      }
    } else {
      toast.error(`Please enter ${otp.length} digits`);
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
                className="w-12 h-12 text-xl text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default OTPPage;
