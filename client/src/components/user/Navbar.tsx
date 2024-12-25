'use client'

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { RootState } from '@/lib/store';
import { removeUser } from '@/lib/features/users/userSlice';
import { useRouter } from 'next/navigation';
import { logOut } from '@/api/user';
import toast from 'react-hot-toast';
import { useConfirmationDialog } from '@/app/customHooks/useConfirmationDialog';

const NavBar = () => {

  const { dialog, openDialog } = useConfirmationDialog();

  const router = useRouter(); 
  const user = useAppSelector((state: RootState) => state.user);
  const [btnNameReact, setBtnNameReact] = useState(user.id ? 'LOGOUT' : 'LOGIN');
  const dispatch = useAppDispatch()
  useEffect(() => {
    // Update button name whenever the user's login state changes
    setBtnNameReact(user.id ? 'LOGOUT' : 'LOGIN');
  }, [user.id]);


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);  // State for toggling menu

  const handleLogOut = async ()=> {

   const response = await logOut()
    if(response.message == 'logout success') {
      console.log('user logouted',dispatch(removeUser()))
      toast.success('Logged out successfully')
    }else{
      toast.error('Something error')
    }



  }

  const confirmLogOut = () => {
    openDialog({
      title: "Logout Confirmation",
      message: "Are you sure you want to log out?",
      onConfirm: handleLogOut,
    });
  };

  return (
    <div className="flex justify-between sm:justify-start shadow-lg mb-1 p-4 bg-gray-800">
      {/* Logo - Center in mobile, Left in desktop */}
      {/* <div className="logo-container sm:mr-auto text-center p-4 sm:text-left">
        <p className="text-2xl font-bold text-white">ATOMICA</p>
      </div> */}
  
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        <div className="flex items-center">
          <ul className="flex p-4 m-3 gap-10 text-base font-medium text-white">
            <li className="transform hover:scale-105 transition duration-300">
              <Link href="/">ATOMICA</Link>
            </li>
            <li className="transform hover:scale-105 transition duration-300">
              <Link href="/about">ABOUT US</Link>
            </li>
            <li className="transform hover:scale-105 transition duration-300">
              <Link href="/quickTest">QUICK TEST</Link>
            </li>
            <li className="transform hover:scale-105 transition duration-300">
              <Link href="/grocery">PROBLEM</Link>
            </li>
            <button
              className="border-black text-white"
              onClick={() => {
                if (user.id) {
                  confirmLogOut();
                } else {
                  router.push('/login'); // Redirect to /login route
                }
              }}
            >
              {btnNameReact}
            </button>
          </ul>
        </div>
      </div>
  
      {/* Mobile Navigation */}
      <div className="sm:hidden flex items-center relative">
        <button
          className="text-2xl p-4 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Toggle mobile menu
        >
          ☰
        </button>
  
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-0 left-0 bg-gray-700 w-48 shadow-lg mt-16">
            <ul className="flex flex-col p-4 gap-6 text-xl font-medium text-white">
              <li className="transform hover:scale-105 transition duration-300">
                <Link href="/about">ABOUT US</Link>
              </li>
              <li className="transform hover:scale-105 transition duration-300">
                <Link href="/contact">QUICK TEST</Link>
              </li>
              <li className="transform hover:scale-105 transition duration-300">
                <Link href="/grocery">PROBLEM</Link>
              </li>
              <li className="transform hover:scale-105 transition duration-300">
                <button
                  onClick={() => {
                    if (user.id) {
                      confirmLogOut();
                    } else {
                      router.push('/login'); // Redirect to /login route
                    }
                  }}
                >
                  {btnNameReact}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      {dialog}
    </div>
  );
  
  

}

export default NavBar;
