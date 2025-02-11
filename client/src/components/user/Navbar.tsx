'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch } from '@/lib/hook';
import { removeUser } from '@/lib/features/users/userSlice';
import { usePathname, useRouter } from 'next/navigation';
import { logOut } from '@/api/userAuthentication';
import toast from 'react-hot-toast';
import { useConfirmationDialog } from '@/app/customHooks/useConfirmationDialog';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { getProfilePicture } from '@/api/badge';
import { PROFILE_PIC } from '@/lib/constants';

const navigation = [
  { name: 'ATOMICA', href: '/', path: '/' },
  { name: 'ABOUT US', href: '/about', path: '/about' },
  { name: 'QUICK TEST', href: '/quickTest', path: '/quickTest' },
  { name: 'PROBLEM', href: '/problems', path: '/problems' },
  { name: 'CONTEST', href: '/contests', path: '/contests' }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}


export default function NavBar() {

  const path = usePathname()
  const pathname = path.split('/').pop() || '';

  const { dialog, openDialog } = useConfirmationDialog();
  const router = useRouter();
  const user1 = localStorage.getItem('user') || '{}';
  const user = JSON.parse(user1);
  const [btnNameReact, setBtnNameReact] = useState(user._id ? 'LOGOUT' : 'LOGIN');
  const [DP, setDP] = useState('')
  const dispatch = useAppDispatch();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);  // Mobile menu state

  useEffect(() => {
    const storedUser = localStorage.getItem('user') || '{}';
    const parsedUser = JSON.parse(storedUser);
    setBtnNameReact(parsedUser._id ? 'LOGOUT' : 'LOGIN');
  }, []);


  useEffect(() => {
    const fecthDP = async () => {
      try {
        const response: any = await getProfilePicture();
        console.log("profile pic", response.data.response.profilePicture)
        setDP(response.data.response.profilePicture)
      } catch (error) {
        return error
      }
    }
    fecthDP()
  }, [])

  const handleLogOut = async () => {
    const response = await logOut();
    if (response.message === 'logout success') {
      dispatch(removeUser());
      localStorage.removeItem('user');
      toast.success('Logged out successfully');
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    } else {
      toast.error('Something went wrong');
    }
  };

  const confirmLogOut = () => {
    openDialog({
      title: 'Logout Confirmation',
      message: 'Are you sure you want to log out?',
      onConfirm: handleLogOut,
    });
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton
              className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>

          {/* Logo and navigation links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={pathname === item.href ? 'page' : undefined} // Set 'current' dynamically
                    className={classNames(
                      pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          {dialog}
          {/* Profile and logout in the profile dropdown */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt="User Avatar"
                    src={DP || PROFILE_PIC}
                    className="size-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    onClick={confirmLogOut}  // Log out action when 'Sign out' is clicked
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={pathname == item.href ? 'page' : undefined}
              className={classNames(
                pathname == item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

